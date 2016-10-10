#include "pcapWorker.h"

//Flag to stop worker thread
bool runWorker = true;
//Global handler
pcap_t *pcap_handle;
//Buffer to hold current packets
struct Packet buffer[BUFFER_SIZE];
//Current index of the buffer
int bufferIndex = 0;
//Semaphore for mutex
sem_t sem;
//pcap error buffer
char errbuf[PCAP_ERRBUF_SIZE];

void HandlePacket( u_char *args, const struct pcap_pkthdr *cap_header, const u_char *packet )
{
    sem_wait(&sem);
    //CRITICAL REGION
    if( bufferIndex < BUFFER_SIZE )
    {
        buffer[bufferIndex].h = (const struct pcap_pkthdr*)malloc(sizeof(const struct pcap_pkthdr));
        memcpy((void*)buffer[bufferIndex].h, cap_header, sizeof(const struct pcap_pkthdr));

        buffer[bufferIndex].p = (const u_char *)malloc( cap_header->len );
        memcpy((void*)buffer[bufferIndex].p, packet, cap_header->len);

        bufferIndex++;
    }
    sem_post(&sem);
}

static void *startRoutine(void *args)
{
    pcap_loop( pcap_handle, -1, HandlePacket, NULL );
    pcap_close( pcap_handle );
    pthread_exit(NULL);
}

PcapWorker::PcapWorker(Nan::Callback *callback, Nan::Callback *progress, char* f, size_t s): AsyncProgressWorkerBase(callback), progress(progress)
{
    this->length = s;
    if( s != 0 ){
        this->filters = (char*)malloc( s );
        strncpy(this->filters, f, s);
    }


};

PcapWorker::~PcapWorker()
{
    if( this->length != 0 ){
        free(this->filters);
    }
}

void PcapWorker::Execute(const ExecutionProgress& progress)
{

    //ID for the pcap thread
    pthread_t pid;
    //The device to capture packets on
    char* device;
    //A filter to set to the pcap handler to filter out specific packets
    struct bpf_program filterProgram;
    //Ip of our device
    bpf_u_int32 net;

    //Get the device to sniff on
    device = pcap_lookupdev( errbuf );
    //Check if the device was found succesfuly
    if( device == NULL )
    {
        //ERROR
        SetErrorMessage(errbuf);
        return;
    }
    //Attempt to hopen a pcap session
    pcap_handle = pcap_open_live( device, 4096, 1, 0, errbuf );
    //Error check
    if( pcap_handle == NULL )
    {
        //ERROR
        SetErrorMessage(errbuf);
        return;
    }
    //Check if there was filters passed to the worker
    if( this->length != 0 )
    {
        //Compile the filter
        if( pcap_compile(pcap_handle, &filterProgram, this->filters, 0, net ) == -1 )
        {
            //ERROR
            SetErrorMessage(pcap_geterr(pcap_handle));
            return;
        }

        //Set the filter to the pcap handler
        if( pcap_setfilter( pcap_handle, &filterProgram ) == -1 )
        {
            //Error
            SetErrorMessage(pcap_geterr(pcap_handle));
            return;
        }
    };

    if( sem_init( &sem, 0, 1 ) == -1 )
    {
        //Error
        SetErrorMessage("ERROR: sem_init");
        return;
    }

    if( pthread_create(&pid, NULL, startRoutine, NULL) != 0 )
    {
        //Error
        SetErrorMessage("ERROR: pthread_create");
        return;
    }

    while(runWorker){
        if( bufferIndex )
        {
            progress.Signal();
        }
        sleep(1);
    }

    if( sem_destroy(&sem) == -1 )
    {
        //Error
        SetErrorMessage("ERROR: sem_destroy");
        return;
    }
}

void PcapWorker::HandleProgressCallback( const Packet* data, size_t size )
{

    Nan::HandleScope scope;
    v8::Local<v8::Array> response = Nan::New<v8::Array>();
    //The time that the packet was captured in a unix timestamp
    uint32_t timeSinceEpoch;
    //Number of arguments in the callback
    const unsigned argc = 2;

    sem_wait(&sem);
    //CRITICAL REGION

    for( int i = 0; i < bufferIndex; i++ )
    {
        //Create a new object
        v8::Local<v8::Object> obj = Nan::New<v8::Object>();
        //Get time of capture
        timeSinceEpoch = buffer[i].h->ts.tv_sec;
        //Set the tumestamp in the object
        Nan::Set(obj,Nan::New("timestamp").ToLocalChecked(),Nan::New(timeSinceEpoch));
        //Set the packet size in bytes to the object
        Nan::Set(obj,Nan::New("size").ToLocalChecked(),Nan::New(buffer[i].h->len));
        //Set all the headers from the packet
        setHeaders( &obj, buffer[i].p, buffer[i].h->len );
        response->Set(i, obj );
        //Free memory allocated with malloc
        free( (void*)buffer[i].h );
        free( (void*)buffer[i].p );

    }
    //Create return arguments
    v8::Local<v8::Value> argv[argc] = { response, Nan::Null() };
    // v8::Local<v8:String>
    progress->Call(argc, argv);
    //Look into
    bufferIndex = 0;
    sem_post(&sem);

}

void PcapWorker::HandleErrorCallback()
{
    Nan::HandleScope scope;
    //Number of arguments in the callback
    const unsigned argc = 2;
    v8::Local<v8::Value> argv[argc] = { Nan::Null(), Nan::New<v8::String>(ErrorMessage()).ToLocalChecked() };
    progress->Call(argc, argv);

}

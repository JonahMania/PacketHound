#include "pacCap.h"

#define BUFFER_SIZE 1024

//Global handler
pcap_t *pcap_handle;
//Global error buffer
char errbuf[PCAP_ERRBUF_SIZE];

struct Packet{
    const struct pcap_pkthdr *h;
    const u_char *p;
};

//Flag to stop worker thread
bool runWorker = true;
//Buffer to hold current packets
struct Packet buffer[BUFFER_SIZE];
//Current index of the buffer
int bufferIndex = 0;
//Semaphore for mutex
sem_t sem;

void HandlePacket( u_char *args, const struct pcap_pkthdr *cap_header, const u_char *packet )
{
    sem_wait(&sem);
    //CRITICAL REGION
    printf("Setting packet %d\n",bufferIndex);
    if( bufferIndex < BUFFER_SIZE )
    {
        printf("CALLBACK SIZE: %d\n", cap_header->len);
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

class PcapWorker : public Nan::AsyncProgressWorkerBase<Packet>
{
    public:
        PcapWorker(Nan::Callback *callback, Nan::Callback *progress): AsyncProgressWorkerBase(callback), progress(progress)
        {
        }
        void Execute(const ExecutionProgress& progress)
        {
            pthread_t pid;
            printf("running\n");

            if( sem_init( &sem, 0, 1 ) == -1 )
            {
                //Error
                // perror("sem");
                //USE THROW HERE
                return;
            }

            if( pthread_create(&pid, NULL, startRoutine, NULL) != 0 )
            {
                //Error
                //USE THROW HERE
                return;
            }

            while(runWorker){
                //GATHER PACKETS AND FLUSH AND SEND TO JS

                if( bufferIndex ){

                    //((ExecutionProgress*)args)->Send(&p, sizeof(Packet) );
                    progress.Signal();

                }
                sleep(1);

            }

            if( sem_destroy(&sem) == -1 )
            {
                //Error
                //USE THROW HERE
                return;
            }
        }

        void HandleProgressCallback( const Packet* data, size_t size )
        {

            Nan::HandleScope scope;
            v8::Local<v8::Array> response = Nan::New<v8::Array>();
            //The time that the packet was captured in a unix timestamp
            uint32_t timeSinceEpoch;
            //Number of arguments in the callback
            const unsigned argc = 1;

            sem_wait(&sem);
            //CRITICAL REGION
            printf("Clearing buffer of size %d \n", bufferIndex );

            for( int i = 0; i < bufferIndex; i++ )
            {
                // printf("packet %d size\n",buffer[i].h->len);
                //Create a new object
                v8::Local<v8::Object> obj = Nan::New<v8::Object>();
                //Get time of capture
                timeSinceEpoch = buffer[i].h->ts.tv_sec;
                //Set the tumestamp in the object
                Nan::Set(obj,Nan::New("timestamp").ToLocalChecked(),Nan::New(timeSinceEpoch));
                //Set the packet size in bytes to the object
                Nan::Set(obj,Nan::New("size").ToLocalChecked(),Nan::New(buffer[i].h->len));
                //Set all the headers from the packet
                setHeaders( &obj, buffer[i].p );
                response->Set(i, obj );
                //Free memory allocated with malloc
                free( (void*)buffer[i].h );
                free( (void*)buffer[i].p );

            }
            //Create return arguments
            v8::Local<v8::Value> argv[argc] = { response };
            progress->Call(argc, argv);
            //Look into
            // memset(buffer, 0, sizeof buffer);
            bufferIndex = 0;
            printf("IN CALLBACK\n");
            sem_post(&sem);





        }

    private:

        Nan::Callback *callback;
        Nan::Callback *progress;
};

NAN_METHOD(start)
{
    //The device to capture packets on
    char* device;
    //Create callback function for each caught packet
    Nan::Callback *callback = new Nan::Callback(info[0].As<v8::Function>());
    //A filter to set to the pcap handler to filter out specific packets
    struct bpf_program filterProgram;
    //String of filter options to compile the filter with
    char *filters;
    //Ip of our device
    bpf_u_int32 net;

    //Check that at least one argument was passed
    if (info.Length() < 1)
    {
        Nan::ThrowTypeError("Wrong Number of arguments");
        return;
    }
    //Check if the second argument passed is a string
    if (info.Length() > 1 && !info[1]->IsString())
    {
        Nan::ThrowTypeError("Wrong argument type");
        return;
    }

    //Get the device to sniff on
    device = pcap_lookupdev( errbuf );
    //Check if the device was found succesfuly
    if( device == NULL )
    {
        info.GetReturnValue().Set(false);
        return;
    }
    //Attempt to hopen a pcap session
    pcap_handle = pcap_open_live( device, 4096, 1, 0, errbuf );
    //Error check
    if( pcap_handle == NULL )
    {
        info.GetReturnValue().Set(false);
        return;
    }

    //If there was a second argument set a filter
    if( info.Length() > 1 )
    {
        //Get the filter argument
        filters = *Nan::Utf8String(info[1]->ToString());

        //Compile the filter
        if( pcap_compile(pcap_handle, &filterProgram, filters, 0, net ) == -1 )
        {
            Nan::ThrowError("Could no compile filter");
            info.GetReturnValue().Set(false);
            return;
        }

        //Set the filter to the pcap handler
        if( pcap_setfilter( pcap_handle, &filterProgram ) == -1 )
        {
            Nan::ThrowError("Could not set filter");
            info.GetReturnValue().Set(false);
            return;
        }
    }

    Nan::AsyncQueueWorker(new PcapWorker(callback,callback));

    info.GetReturnValue().Set(true);
}

NAN_METHOD(getError)
{
    //Return errbuf as string
    info.GetReturnValue().Set( v8::String::NewFromUtf8(info.GetIsolate(), errbuf));
}

NAN_METHOD(close)
{
    if( pcap_handle ){
        pcap_breakloop( pcap_handle );
    }
    runWorker = false;
}

NAN_MODULE_INIT(Init)
{
    v8::Local<v8::Function> startfn = Nan::GetFunction(Nan::New<v8::FunctionTemplate>(start)).ToLocalChecked();
    Nan::Set(target, Nan::New("start").ToLocalChecked(), startfn);
    v8::Local<v8::Function> getErrorfn = Nan::GetFunction(Nan::New<v8::FunctionTemplate>(getError)).ToLocalChecked();
    Nan::Set(target, Nan::New("getError").ToLocalChecked(), getErrorfn);
    v8::Local<v8::Function> closefn = Nan::GetFunction(Nan::New<v8::FunctionTemplate>(close)).ToLocalChecked();
    Nan::Set(target, Nan::New("close").ToLocalChecked(), closefn);
}

NODE_MODULE(pacCap, Init)

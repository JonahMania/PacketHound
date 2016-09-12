#include "pacCap.h"

//Global handler
pcap_t *pcap_handle;
//Global error buffer
char errbuf[PCAP_ERRBUF_SIZE];

/*
* The callback for pcap_loop
* @param {u_char*} args The user supplied arguments to the callback
* @param {const struct pcap_pkthdr*} cap_header The pcap header for the packet
* @param {cost u_char*} packet The raw packet data
*/
void handlePacket( u_char *args, const struct pcap_pkthdr *cap_header, const u_char *packet )
{
    //The time that the packet was captured in a unix timestamp
    uint32_t timeSinceEpoch;
    //Number of arguments in the callback
    const unsigned argc = 1;

    //Create a new object
    v8::Local<v8::Object> obj = Nan::New<v8::Object>();
    //Get time of capture
    timeSinceEpoch = cap_header->ts.tv_sec;
    //Set the tumestamp in the object
    Nan::Set(obj,Nan::New("timestamp").ToLocalChecked(),Nan::New(timeSinceEpoch));
    //Set the packet size in bytes to the object
    Nan::Set(obj,Nan::New("size").ToLocalChecked(),Nan::New(cap_header->len));
    //Set all the headers from the packet
    setHeaders( &obj, packet );
    //Create return arguments
    v8::Local<v8::Value> argv[argc] = { obj };
    //Call the callback function
    ((Nan::Callback*)args)->Call(argc, argv);
}

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

    pcap_loop( pcap_handle, -1, handlePacket, (u_char*)callback );
    pcap_close( pcap_handle );

    info.GetReturnValue().Set(true);
}

NAN_METHOD(getError)
{
    //Return errbuf as string
    info.GetReturnValue().Set( v8::String::NewFromUtf8(info.GetIsolate(), errbuf));
}

NAN_METHOD(close)
{
    pcap_breakloop( pcap_handle );
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

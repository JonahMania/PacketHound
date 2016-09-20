#include "pacCap.h"

NAN_METHOD(start)
{
    //Callback
    Nan::Callback *callback;
    //Filter to pass to worker thread
    char* filters;
    //Size of filter string
    int length;
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

    //Create callback function for each caught packet
    callback = new Nan::Callback(info[0].As<v8::Function>());

    //If there was a second argument set a filter
    if( info.Length() > 1 )
    {
        //Get the filter argument
        length = Nan::Utf8String(info[1]->ToString()).length();
        filters = *Nan::Utf8String(info[1]->ToString());
    }else{
        filters = '\0';
        length = 0;
    }

    Nan::AsyncQueueWorker(new PcapWorker(callback,callback,filters,length));

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
    info.GetReturnValue().Set(true);
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

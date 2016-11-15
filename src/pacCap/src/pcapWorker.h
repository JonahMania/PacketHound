#ifndef __PCAPWORKER_H__
#define __PCAPWORKER_H__

#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <pcap.h>
#include <time.h>
#include <fcntl.h>
#include <unistd.h>
#include <signal.h>
#include <node.h>
#include <pthread.h>
#include <nan.h>

#include "headers/setHeaders.h"

//Packet buffer size
#define BUFFER_SIZE 1024

//Flag to stop worker thread
extern bool runWorker;
//Global error buffer
extern char errbuf[PCAP_ERRBUF_SIZE];
//Global handler
extern pcap_t *pcap_handle;
//Struct to hold raw packet data
struct Packet {
    const struct pcap_pkthdr *h;
    const u_char *p;
};
//Struct to hold device information
struct Device {
    char* name;
    struct in_addr address;
    struct in_addr mask;
};

class PcapWorker : public Nan::AsyncProgressWorkerBase<Packet>
{
    public:
        PcapWorker(Nan::Callback *callback, Nan::Callback *progress, char* f, size_t s);
        ~PcapWorker();
        void Execute(const ExecutionProgress& progress);
        void HandleProgressCallback( const Packet* data, size_t size );
        Device *setDevice( char* device, int length );
    private:
        char* filters;
        size_t length;
        //The device to capture packets on
        Device *device;
        Nan::Callback *callback;
        Nan::Callback *progress;

    protected:
        void HandleErrorCallback();
};

#endif

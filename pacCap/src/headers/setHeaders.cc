#include "setHeaders.h"

//Sets the headers in packet to the object obj
int setHeaders( v8::Local<v8::Object> *obj, const u_char *packet )
{
    //Ethernet header
    const struct etherHeader *ethr;
    //IP header
    const struct ipHeader *ip;
    //Cast packet to header structs
    ethr = (const struct etherHeader *)packet;
    ip = (const struct ipHeader *)(packet+ETHER_HDR_LEN);
    //Set header struct values to object
    Nan::Set(*obj,Nan::New("ipSrcAddr").ToLocalChecked(),Nan::New(inet_ntoa( *(struct in_addr*)&(ip->ipSrcAddr))).ToLocalChecked());
    Nan::Set(*obj,Nan::New("ipDestAddr").ToLocalChecked(),Nan::New(inet_ntoa( *(struct in_addr*)&(ip->ipDestAddr))).ToLocalChecked());

    return 0;
}

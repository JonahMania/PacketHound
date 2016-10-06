#include "setHeaders.h"
#include "../utils/hexDump.h"

//Sets the headers in packet to the object obj
int setHeaders( v8::Local<v8::Object> *obj, const u_char *packet )
{
    //Ethernet header
    const struct etherHeader *ethr;
    //IP header
    const struct ipHeader *ip;
    //TCP header
    const struct tcpHeader *tcp;
    //Cast packet to header structs
    ethr = (const struct etherHeader *)packet;
    ip = (const struct ipHeader *)(packet+ETHER_HDR_LEN);
    tcp = (const struct tcpHeader*)(packet+ETHER_HDR_LEN+sizeof(struct ipHeader));
    //Ethernet dest mac address in hex
    char etherDestAddrHex[ETHER_ADDR_LEN*2+1];
    //Ethernet src max address in hex
    char etherSrcAddrHex[ETHER_ADDR_LEN*2+1];
    //Set header struct values to object
    //Ethernet header
    hexDump(ethr->etherDestAddr,ETHER_ADDR_LEN, etherDestAddrHex);
    hexDump(ethr->etherSrcAddr,ETHER_ADDR_LEN, etherSrcAddrHex);

    Nan::Set(*obj,Nan::New("etherDestAddr").ToLocalChecked(),Nan::New(etherDestAddrHex).ToLocalChecked());
    Nan::Set(*obj,Nan::New("etherSrcAddr").ToLocalChecked(),Nan::New(etherSrcAddrHex).ToLocalChecked());
    Nan::Set(*obj,Nan::New("etherType").ToLocalChecked(),Nan::New(ethr->etherType));
    //IP header
    Nan::Set(*obj,Nan::New("ipLen").ToLocalChecked(),Nan::New(ntohs(ip->ipLen)));
    Nan::Set(*obj,Nan::New("ipId").ToLocalChecked(),Nan::New(ntohs(ip->ipId)));
    Nan::Set(*obj,Nan::New("ipType").ToLocalChecked(),Nan::New(ip->ipType));
    Nan::Set(*obj,Nan::New("ipSrcAddr").ToLocalChecked(),Nan::New(inet_ntoa( *(struct in_addr*)&(ip->ipSrcAddr))).ToLocalChecked());
    Nan::Set(*obj,Nan::New("ipDestAddr").ToLocalChecked(),Nan::New(inet_ntoa( *(struct in_addr*)&(ip->ipDestAddr))).ToLocalChecked());
    //TCP header
    Nan::Set(*obj,Nan::New("tcpSrcPort").ToLocalChecked(),Nan::New(ntohs(tcp->tcpSrcPort)));
    Nan::Set(*obj,Nan::New("tcpDestPort").ToLocalChecked(),Nan::New(ntohs(tcp->tcpDestPort)));

    return 0;
}

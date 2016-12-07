#include "setHeaders.h"
#include "../utils/hexDump.h"

//Sets the headers in packet to the object obj
int setHeaders( v8::Local<v8::Object> *obj, const u_char *packet, int packetSize )
{
    //Ethernet header
    const struct etherHeader *ethr;
    //IP header
    const struct ipHeader *ip;
    //TCP header
    const struct tcpHeader *tcp;
    //Ethernet dest mac address in hex
    char etherDestAddrHex[ETHER_ADDR_LEN*2+1];
    //Ethernet src max address in hex
    char etherSrcAddrHex[ETHER_ADDR_LEN*2+1];
    //Length of all headers
    int totalHeaderSize = 0;
    //Size of packet data
    int packetDataSize = 0;

    //Set header struct values to object
    //Ethernet header
    ethr = (const struct etherHeader *)packet;
    hexDump(ethr->etherDestAddr,ETHER_ADDR_LEN,etherDestAddrHex);
    hexDump(ethr->etherSrcAddr,ETHER_ADDR_LEN,etherSrcAddrHex);
    Nan::Set(*obj,Nan::New("etherDestAddr").ToLocalChecked(),Nan::New(etherDestAddrHex).ToLocalChecked());
    Nan::Set(*obj,Nan::New("etherSrcAddr").ToLocalChecked(),Nan::New(etherSrcAddrHex).ToLocalChecked());
    Nan::Set(*obj,Nan::New("etherType").ToLocalChecked(),Nan::New(ethr->etherType));

    //If the next header not an ip header dump hex for the whole packet
    if( ethr->etherType != 8 ){
        totalHeaderSize = ETHER_HDR_LEN;
    }else{
        //IP header
        ip = (const struct ipHeader *)(packet+ETHER_HDR_LEN);
        Nan::Set(*obj,Nan::New("ipLen").ToLocalChecked(),Nan::New(ntohs(ip->ipLen)));
        Nan::Set(*obj,Nan::New("ipId").ToLocalChecked(),Nan::New(ntohs(ip->ipId)));
        Nan::Set(*obj,Nan::New("ipType").ToLocalChecked(),Nan::New(ip->ipType));
        Nan::Set(*obj,Nan::New("ipSrcAddr").ToLocalChecked(),Nan::New(inet_ntoa( *(struct in_addr*)&(ip->ipSrcAddr))).ToLocalChecked());
        Nan::Set(*obj,Nan::New("ipDestAddr").ToLocalChecked(),Nan::New(inet_ntoa( *(struct in_addr*)&(ip->ipDestAddr))).ToLocalChecked());

        //Switch for third header
        switch(ip->ipType){
            //TCP
            case 6:
                //TCP header
                tcp = (const struct tcpHeader*)(packet+ETHER_HDR_LEN+sizeof(struct ipHeader));
                Nan::Set(*obj,Nan::New("tcpSrcPort").ToLocalChecked(),Nan::New(ntohs(tcp->tcpSrcPort)));
                Nan::Set(*obj,Nan::New("tcpDestPort").ToLocalChecked(),Nan::New(ntohs(tcp->tcpDestPort)));
                Nan::Set(*obj,Nan::New("tcpSeq").ToLocalChecked(),Nan::New(tcp->tcpSeq));
                Nan::Set(*obj,Nan::New("tcpAck").ToLocalChecked(),Nan::New(tcp->tcpAck));
                //Set boolean values for flags
                if( tcp->tcpFlags & TCP_FIN ){
                    Nan::Set(*obj,Nan::New("tcpFIN").ToLocalChecked(),Nan::True());
                }
                if( tcp->tcpFlags & TCP_SYN ){
                    Nan::Set(*obj,Nan::New("tcpSYN").ToLocalChecked(),Nan::True());
                }
                if( tcp->tcpFlags & TCP_RST ){
                    Nan::Set(*obj,Nan::New("tcpRST").ToLocalChecked(),Nan::True());
                }
                if( tcp->tcpFlags & TCP_PUSH ){
                    Nan::Set(*obj,Nan::New("tcpPUSH").ToLocalChecked(),Nan::True());
                }
                if( tcp->tcpFlags & TCP_ACK ){
                    Nan::Set(*obj,Nan::New("tcpACK").ToLocalChecked(),Nan::True());
                }
                if( tcp->tcpFlags & TCP_URG ){
                    Nan::Set(*obj,Nan::New("tcpURG").ToLocalChecked(),Nan::True());
                }
                Nan::Set(*obj,Nan::New("tcpWindow").ToLocalChecked(),Nan::New(tcp->tcpWindow));
                Nan::Set(*obj,Nan::New("tcpChecksum").ToLocalChecked(),Nan::New(tcp->tcpChecksum));
                Nan::Set(*obj,Nan::New("tcpUrgent").ToLocalChecked(),Nan::New(tcp->tcpUrgent));
                //Packet data
                totalHeaderSize = ETHER_HDR_LEN+sizeof(struct ipHeader)+(4 * tcp->tcpOffset);
                break;
            default:
                totalHeaderSize = ETHER_HDR_LEN+sizeof(struct ipHeader);
                break;
        }
    }

    //Create and set hex dump
    packetDataSize = packetSize - totalHeaderSize;
    char packetData[packetDataSize*2+1];
    hexDump( (u_char*)packet+totalHeaderSize,packetDataSize,packetData );
    Nan::Set(*obj,Nan::New("data").ToLocalChecked(),Nan::New(packetData).ToLocalChecked());

    return 0;
}

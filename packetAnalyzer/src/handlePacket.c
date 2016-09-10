#include "handlePacket.h"

void handlePacket( u_char *user_args, const struct pcap_pkthdr *cap_header, const u_char *packet )
{
    //Ethernet header
    const struct etherHeader *ethr;
    //IP header
    const struct ipHeader *ip;
    //Get time of capture
    struct timeval tv;
    gettimeofday( &tv, NULL );
    unsigned long long timeSinceEpoch = (unsigned long long)(tv.tv_sec) * 1000 +
        (unsigned long long)(tv.tv_usec) / 1000;

    ethr = (const struct etherHeader *)packet;
    ip = (const struct ipHeader *)(packet+ETHER_HDR_LEN);

    printf("%llu\n",timeSinceEpoch);
    printf( "Source: %s ", inet_ntoa( *(struct in_addr*)&(ip->ip_src_addr) ) );
    printf( "Dest: %s \n", inet_ntoa( *(struct in_addr*)&(ip->ip_dest_addr) ) );
    printf( "Captured a packet of size %d bytes\n", cap_header->len );

}

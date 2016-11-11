#ifndef __ETHERHEADER_H__
#define __ETHERHEADER_H__

#define ETHER_ADDR_LEN 6
#define ETHER_HDR_LEN 14

struct __attribute__((__packed__)) etherHeader {
    unsigned char etherDestAddr[ETHER_ADDR_LEN]; //Destinition MAC address
    unsigned char etherSrcAddr[ETHER_ADDR_LEN]; //Source MAC address
    unsigned short etherType; //Type of packet
};

#endif

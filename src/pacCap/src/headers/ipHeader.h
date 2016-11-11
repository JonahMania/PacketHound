#ifndef __IPHEADER_H__
#define __IPHEADER_H__

struct __attribute__((__packed__)) ipHeader {
    unsigned char ipVersionAndHeaderLength; //Version and header length
    unsigned char ipTos; //Type of service
    unsigned short ipLen; //Total length
    unsigned short ipId; //ID number
    unsigned short ipFragOffset; //Fragment offset and flags
    unsigned char ipTtl; //Time to live
    unsigned char ipType; //Protocol type
    unsigned short ipChecksum; //Checksum
    unsigned int ipSrcAddr; //Source IP address
    unsigned int ipDestAddr; //Destination IP address
};

#endif

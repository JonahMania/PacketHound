struct __attribute__((__packed__)) tcpHeader {
    unsigned short tcpSrcPort; //Source TCP port
    unsigned short tcpDestPort; //Destination TCP port
    unsigned int tcpSeq; //TCP sequence number
    unsigned int tcpAck; //TCP acknowledgment number
    unsigned char reserved:4; //4 bits from the 6 bits of reserved space
    unsigned char tcpOffset:4; //TCP data offset for little-endian host
    unsigned char tcpFlags; //TCP flags ( and 2 bits from reserved space )

    #define TCP_FIN 0x01
    #define TCP_SYN 0x02
    #define TCP_RST 0x04
    #define TCP_PUSH 0x08
    #define TCP_ACK 0x10
    #define TCP_URG 0x20

    unsigned short tcpWindow; //TCP window size
    unsigned short tcpChecksum; //TCP checksum
    unsigned short tcpUrgent; //TCP urgent pointer
};

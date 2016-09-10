struct __attribute__((__packed__)) tcpHeader {
    unsigned short tcp_src_port; //Source TCP port
    unsigned short tcp_dest_port; //Destination TCP port
    unsigned int tcp_seq; //TCP sequence number
    unsigned int tcp_ack; //TCP acknowledgment number
    unsigned char reserved:4; //4 bits from the 6 bits of reserved space
    unsigned char tcp_offset:4; //TCP data offset for little-endian host
    unsigned char tcp_flags; //TCP flags ( and 2 bits from reserved space )

    #define TCP_FIN 0x01
    #define TCP_SYN 0x02
    #define TCP_RST 0x04
    #define TCP_PUSH 0x08
    #define TCP_ACK 0x10
    #define TCP_URG 0x20

    unsigned short tcp_window; //TCP window size
    unsigned short tcp_checksum; //TCP checksum
    unsigned short tcp_urgent; //TCP urgent pointer
};

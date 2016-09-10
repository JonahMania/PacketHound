#define ETHER_ADDR_LEN 6
#define ETHER_HDR_LEN 14

struct __attribute__((__packed__)) etherHeader {
    unsigned char ether_dest_addr[ETHER_ADDR_LEN]; //Destinition MAC address
    unsigned char ether_src_addr[ETHER_ADDR_LEN]; //Source MAC address
    unsigned short ether_type; //Type of packet
};

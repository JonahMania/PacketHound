
struct __attribute__((__packed__)) ipHeader {
    unsigned char ip_version_and_header_length; //Version and header length
    unsigned char ip_tos; //Type of service
    unsigned short ip_len; //Total length
    unsigned short ip_id; //ID number
    unsigned short ip_frag_offset; //Fragment offset and flags
    unsigned char ip_ttl; //Time to live
    unsigned char ip_type; //Protocol type
    unsigned short ip_checksum; //Checksum
    unsigned int ip_src_addr; //Source IP address
    unsigned int ip_dest_addr; //Destination IP address
};

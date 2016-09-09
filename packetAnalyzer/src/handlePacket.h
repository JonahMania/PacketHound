#ifndef __HANDLEPACKET_H__
#define __HANDLEPACKET_H__

#include <pcap.h>
#include <time.h>
#include <gdbm.h>

void handlePacket( u_char *user_args, const struct pcap_pkthdr *cap_header, const u_char *packet );


#endif

#ifndef __HANDLEPACKET_H__
#define __HANDLEPACKET_H__

#include <pcap.h>
#include <arpa/inet.h>
#include "headers/etherHeader.h"
#include "headers/ipHeader.h"

void handlePacket( u_char *user_args, const struct pcap_pkthdr *cap_header, const u_char *packet );

#endif

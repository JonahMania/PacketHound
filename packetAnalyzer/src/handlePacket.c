#include "handlePacket.h"

void handlePacket( u_char *user_args, const struct pcap_pkthdr *cap_header, const u_char *packet )
{
    char header[64];
    time_t t;
    struct tm *ltime;

    t = time(NULL);
    ltime = localtime( &t );

    printf( "Captured a packet of size %d bytes\n", cap_header->len );

    // if( fwrite( ltime, sizeof( struct tm ), 1, file ) < 1 )
    // {
    //     perror( "fwrite" );
    // }
    //
    // if( fwrite( cap_header, sizeof( struct pcap_pkthdr ), 1, file ) < 1 )
    // {
    //     perror( "fwrite" );
    // }
    //
    // if( fwrite( packet, cap_header->len, 1, file ) < 1 )
    // {
    //     perror( "fwrite" );
    // }
}

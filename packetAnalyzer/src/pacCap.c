#include "pacCap.h"

#define OPTS "df:i:l:n:o:r:t:"

//Pcap handler
pcap_t *pcap_handle;

//Method to print help message
void printHelp( char* path )
{
    printf("Usage: %s [OPTION]\n", path );
    printf("The hound will sniff out and store packets on a specific device\n");
    printf("\n");
    printf("  -d        demonize\n");
    printf("  -f        optional file to apply filters to pcap\n");
    printf("  -i        interface to sniff on\n");
    printf("  -l        optional log file output\n");
    printf("  -t        time in minuites before the program will close default is infinity\n");
}



//Method that runs when ctrl+c is pressed
void signalHandler( int x )
{
    //Close the pcap handler
    pcap_close( pcap_handle );
    //Exit with success
    exit( 0 );
}

int main( int argc, char **argv )
{
    struct pcap_pkthdr cap_header;
    const u_char *packet;
    const u_char *pkt_data;
    char errbuf[PCAP_ERRBUF_SIZE];
    char* device;
    int opt;
    //The filter program
    struct bpf_program filterProgram;
    //Ip of our device
    bpf_u_int32 net;
    //String of filter options to compile pcap with
    char *filters;
    //Flag to set if the users has supplied filters
    int useFilters = 0;

    //Register signal handler
    signal( SIGINT, signalHandler );

    //Print a help message if one is requested
    if( argv[1] && strcmp( argv[1], "--help" ) == 0 )
    {
        printHelp(argv[0]);
        return 0;
    }
    //Process command line arguments
    while( ( opt = getopt( argc, argv, OPTS ) ) != -1 )
    {
        switch( opt )
        {
            case 'd':
                printf("d\n");
                break;
             case 'f':
                useFilters = 1;
                filters = optarg;
                break;
             case 'i':
                device = optarg;
                break;
             case 'l':
                printf("l\n");
                break;
           case 't':
                printf("t\n");
                break;
            case '?':
                printf("Use --help for option details\n");
                return 0;
            default:
                printf("default\n");
                return 0;
        }
    }

    if( device == NULL )
    {
        device = pcap_lookupdev( errbuf );
    }
    if( device == NULL )
    {
        printf( "ERROR: %s\n", errbuf );
        perror( "pcap_lookupdev" );
        return -1;
    }

    printf( "Capturing on device %s\n", device );

    pcap_handle = pcap_open_live( device, 4096, 1, 0, errbuf );

    if( pcap_handle == NULL )
    {
        printf( "ERROR: %s\n", errbuf );
        perror( "pcap_handle" );
        return -1;
    }

    if( useFilters ){
        if( pcap_compile(pcap_handle, &filterProgram, filters, 0, net ) == -1 ){
            printf("%s\n",pcap_geterr(pcap_handle));
            perror( "pcap_compile" );
            return -1;
        }

        if( pcap_setfilter( pcap_handle, &filterProgram ) == -1 ){
            perror( "pcap_setfilter" );
            return -1;
        }
    }

    pcap_loop( pcap_handle, -1, handlePacket, NULL );

    pcap_close( pcap_handle );

    return 0;
}

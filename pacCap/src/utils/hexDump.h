#ifndef __HEXDUMP_H__
#define __HEXDUMP_H__
//Formats data as hex
void hexDump( const unsigned char *data, int length, char* hexString )
{
    int i;
    for( i = 0; i < length; i++ )
    {
        sprintf(&hexString[i*2], "%02X", data[i]);
    }

}
#endif

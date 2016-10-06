#ifndef __SETHEADERS_H__
#define __SETHEADERS_H__

#include <node.h>
#include <arpa/inet.h>
#include <nan.h>

#include "etherHeader.h"
#include "ipHeader.h"
#include "tcpHeader.h"

//Sets the headers in packet to the object obj
int setHeaders( v8::Local<v8::Object> *obj, const u_char *packet );

#endif

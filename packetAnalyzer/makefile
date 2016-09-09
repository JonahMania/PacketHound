PAC_CAP_SRC = src/pacCap.c
RM = rm -f
CFLAGS = -g -lpcap

all: pacCap

pacCap: $(PAC_CAP_SRC)
	gcc $(PAC_CAP_SRC) -o pacCap $(CFLAGS)

clean:
	-$(RM) pacCap

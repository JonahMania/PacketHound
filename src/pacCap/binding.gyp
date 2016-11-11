{
  "targets": [
    {
      "target_name": "pacCap",
      "sources": [ "src/pacCap.cc", "src/headers/setHeaders.c", "src/pcapWorker.cc" ],
      "libraries": ["-lpcap","-pthread"],
      "include_dirs" : [
            "<!(node -e \"require('nan')\")"
        ]
    }
  ]
}

{
  "targets": [
    {
      "target_name": "pacCap",
      "sources": [ "src/pacCap.cc", "src/headers/setHeaders.c" ],
      "libraries": ["-lpcap","-pthread"],
      "include_dirs" : [
            "<!(node -e \"require('nan')\")"
        ]
    }
  ]
}

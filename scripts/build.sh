#!/bin/bash

emcc -O2 \
    hello.cc\
    -s ENVIRONMENT=shell \
    -s NO_EXIT_RUNTIME=1 \
    -s NO_FILESYSTEM=1 \
    -s TOTAL_MEMORY=157286400 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s DEMANGLE_SUPPORT=1 \
    -s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall']" \
    -s MODULARIZE=1 \
    -s EXPORT_NAME="'Hello'" \
    -o output/hello.js

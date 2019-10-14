#!/bin/bash

emcc -O2 \
    ./src/main.cpp\
    -s ENVIRONMENT=shell \
    -s NO_EXIT_RUNTIME=1 \
    -s NO_FILESYSTEM=1 \
    -s TOTAL_MEMORY=157286400 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s DEMANGLE_SUPPORT=1 \
    -s 'EXTRA_EXPORTED_RUNTIME_METHODS=["ccall", "cwrap", "UTF8ToString", "allocateUTF8"]' \
    -s DISABLE_DEPRECATED_FIND_EVENT_TARGET_BEHAVIOR=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME="'Main'" \
    -o playground/public/output/main.js

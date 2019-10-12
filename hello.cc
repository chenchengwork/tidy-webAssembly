//
// Created by chencheng on 19-10-11.
//

#include <stdio.h>
#include <emscripten/emscripten.h>

int main() {
    printf("你好，世界！\n");
    return 0;
}

EMSCRIPTEN_KEEPALIVE
int add(int a, int b) {
    return a + b;
}
//
// Created by chencheng on 19-10-11.
//

#include <stdio.h>
#include "macro.h"
#include "myMath.cpp"

//EM_PORT_API(int) add(int a, int b) {
//    return a + b;
//}

// 导出字符串
EM_PORT_API(const char*) get_string() {
    static const char str[] = "Hello, wolrd! 你好，世界！";

    return str;
}

long g_int = 42;
//double g_double = 3.1415926;
EM_PORT_API(long *) get_int_ptr() {
    return &g_int;
}
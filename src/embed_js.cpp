//
// Created by chencheng on 19-10-14.
//

#include "macro.h"

EM_PORT_API(int) js_add(int a, int b);              // 导入的js方法
EM_PORT_API(void) js_console_log_int(int param);    // 导入的js方法

//
EM_PORT_API(void) do_embed_js() {
    int i = js_add(21, 21);
    js_console_log_int(i);


    // 执行js方法
    EM_ASM(
            var k = 42;  //define k
            console.log('The answer is:', k);
    );

    char buf[32];
    double pi = 3.14159;
    EM_ASM_(
            {
                console.log('addr of buf:', $0);
                console.log('sqrt(pi):', $1);
            },
            buf, sqrt(pi)
    );


    char str[] = "你好，中国！";
    EM_ASM({
           console.log('embeb_js_str->:', UTF8ToString($0));
    }, str);
}
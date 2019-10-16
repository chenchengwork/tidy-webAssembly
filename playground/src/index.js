const ModuleFactory = require("../public/output/main");


export const loadASM = (url, importObj = {}) => new Promise((resolve, reject) =>{

    fetch(url).then(async (resp) => {
        const arrayBuffter = await resp.arrayBuffer();

        ModuleFactory({
            instantiateWasm(imports, successCallback) {
                WebAssembly.instantiate(arrayBuffter, Object.assign({}, imports, importObj))
                    .then((output) => {
                        console.log("output.instance->", output.instance)
                        successCallback(output.instance);
                    })
                    .catch((e) => {
                        throw e
                    })
                return {}
            }
        }).then(moduleH => {
            // 注意：一定要删除导出的then方法,否则执行`resolve(moduleH)`会造成死循环
            delete moduleH.then;
            resolve(moduleH)
        })
    }).catch((e) => reject(e))
});


loadASM(`output/main.wasm?time=${Date.now()}`).then((module) =>{
    const { asm: exports, UTF8ToString, HEAP32, HEAP8, allocateUTF8, _free} = module;
    // console.log("exports->", exports)

    const sum = exports._add(1, 2);
    console.log("sum->", sum)

    // 执行嵌入的js方法
    exports._do_embed_js();

    // ---获取字符串---
    const ptr = exports._get_string();
    const str = UTF8ToString(ptr);
    console.log("str->", str);


    var int_ptr = exports._get_int_ptr();
    var int_value = HEAP8[int_ptr];
    console.log("JS{int_value:" + int_value + "}");

    const ptr1 = allocateUTF8("你好，Emscripten！");

    const a = exports._mdmd(ptr1)
    console.log(UTF8ToString(a))
    _free(ptr1)


}).catch((e) => console.error(e))

let isInitialized = false

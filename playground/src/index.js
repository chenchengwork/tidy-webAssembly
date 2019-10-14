const ModuleFactory = require("../public/output/main");


export const loadASM = (url) => new Promise((resolve, reject) =>{

    fetch(url).then(async (resp) => {
        const arrayBuffter = await resp.arrayBuffer();

        ModuleFactory({
            instantiateWasm(imports, successCallback) {
                WebAssembly.instantiate(arrayBuffter, imports)
                    .then((output) => {
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
    const { asm: exports, UTF8ToString, HEAP32, HEAP8} = module;
    // console.log("exports->", exports)

    const sum = exports._add(1, 2);
    console.log("sum->", sum)
    // ---获取字符串---
    const ptr = exports._get_string();
    const str = UTF8ToString(ptr);
    console.log("str->", str);


    var int_ptr = exports._get_int_ptr();
    // console.log(int_ptr)
    // console.log(int_ptr >> 2)
    var int_value = HEAP8[int_ptr];
    console.log("JS{int_value:" + int_value + "}");


}).catch((e) => console.error(e))

let isInitialized = false

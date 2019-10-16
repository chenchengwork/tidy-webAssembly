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
    const { asm: exports, UTF8ToString, HEAP32, HEAP8, HEAPU8, allocateUTF8, _free} = module;
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



    let radii = 200, delta = 1, canvas = null;

    function update() {
        if(!canvas){
            canvas = document.createElement("canvas");
            canvas.width = 400;
            canvas.height = 400;
            document.querySelector("#wrapper").appendChild(canvas);
        }

        const buf_addr = exports._get_img_buf(400, 400);
        exports._draw_circle(200, 200, radii);

        radii += delta;
        if (radii > 200 || radii < 0) delta = -delta;

        const u8o = new Uint8ClampedArray(HEAPU8.subarray(buf_addr, buf_addr + 400 * 400 * 4));
        const imgData = new ImageData(u8o, 400, 400);

        var ctx = canvas.getContext('2d');
        ctx.putImageData(imgData, 0, 0);

        window.requestAnimationFrame(update);
    }

    update()

}).catch((e) => console.error(e))

let isInitialized = false

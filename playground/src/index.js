console.log(111111)
console.log(111111)
const OnigasmModuleFactory = require("../lib/hello");
console.log(OnigasmModuleFactory);


export let onigasmH;

async function initModule(bytes) {
    return new Promise((resolve, reject) => {
        OnigasmModuleFactory({
            instantiateWasm(imports, successCallback) {
                WebAssembly.instantiate(bytes, imports)
                    .then((output) => {
                        console.log("output.instance->", output.instance)
                        successCallback(output.instance);
                    })
                    .catch((e) => {
                        throw e
                    })
                return {}
            },
        })
            .then(moduleH => {
                onigasmH = moduleH
                resolve()
            })
    })
}

let isInitialized = false

/**
 * Mount the .wasm file that will act as library's "backend"
 * @param data Path to .wasm file or it's ArrayBuffer
 */
export async function loadWASM(data) {
    if (isInitialized) {
        throw new Error(`Onigasm#init has been called and was succesful, subsequent calls are not allowed once initialized`)
    }
    if (typeof data === 'string') {
        const arrayBuffer = await (await fetch(data)).arrayBuffer()
        await initModule(arrayBuffer)
    } else if (data instanceof ArrayBuffer) {
        await initModule(data)
    } else {
        throw new TypeError(`Expected a string (URL of .wasm file) or ArrayBuffer (.wasm file itself) as first parameter`)
    }

    isInitialized = true
}

loadWASM("hello.wasm")
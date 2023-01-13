const fs = require('fs');

// Считать файл по 2 байта с интервалами в 1 сек
const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 2});
let chunkCount = 0

readStream.on('data', (chunk) => {
    readStream.pause()
    setTimeout(() => {
        chunkCount++;
        console.log(chunk.toString());
        readStream.resume()
    }, 1000);
})

// Считывать process.stdin по 4 байта, и писать в файл потоком по 8 байт
const { Duplex } = require('node:stream');
class DuplexCustom extends Duplex {
    constructor(options) {
        super(options);
    }

    _read(){
    }

    _write(chunk, encoding, callback){
        this.push(chunk);
    }
}

const duplex = new DuplexCustom({readableHighWaterMark: 4, writableHighWaterMark: 8});

const processWriteStream = fs.createWriteStream('./input.txt', {highWaterMark: 8});

process.stdin.pipe(duplex).pipe(processWriteStream);
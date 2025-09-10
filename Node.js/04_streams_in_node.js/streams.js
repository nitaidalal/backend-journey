const { Readable, Writable } = require("stream")

const readableStream = new Readable({
    highWaterMark:6,
    read(){}
});

const writableStream = new Writable({
    write(streamData){
        console.log("Writing...",streamData.toString())
    }
})

readableStream.on("data",(chunk) => {
    writableStream.write(chunk);
})

readableStream.push("Hello");








/*---------Backpressure Handling---------------

const { Readable, Writable } = require("stream");

const readableStream = new Readable({
  highWaterMark: 4,
  read() {},
});

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    console.log("Writing:", chunk.toString());
    // simulate slow write
    setTimeout(callback, 1000);
  },
});

function pushData() {
  let i = 0;
  const interval = setInterval(() => {
    const canContinue = readableStream.push("Data" + i++);
    if (!canContinue) {
      console.log("Readable paused (buffer full)...");
      clearInterval(interval);
    }
  }, 200);
}

readableStream.pipe(writableStream);
pushData();
*/
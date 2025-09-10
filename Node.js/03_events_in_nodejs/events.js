const EventEmitter = require("events")

const emitter = new EventEmitter()

//keymethods

//on(eventName, Listener) --> create an event
emitter.on("GREET",(args) => {
    console.log(`Hello ${args.username} and your id is ${args.id}`);
})

//emit(eventName, [args])
emitter.emit("GREET",{
    username:"Nitai",
    id:"1jkjfk343w3"
});
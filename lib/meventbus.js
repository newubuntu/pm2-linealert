const EventEmitter = require('events');

class meventbus extends EventEmitter {
    constructor() {
        super();
    } 
}

module.exports = new meventbus()
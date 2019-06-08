const EventEmitter = require("events");

class Promisify {
    constructor(callback) {
        this.stateEvent = new EventEmitter();
        this.state = "pending";
        this.data = null;
        callback(this.resolve.bind(this), this.reject.bind(this));
        this.thens = [];
        this.catchs = [];
    }
    resolve(data) {
        this.data = data;
        this.state = "completed";
        this.thens.forEach(then => {this.data = then(this.data)});
    }
    reject(data) {
        this.state = "rejected";
        this.catchs.forEach(ctch => {data = then(data)});
    }
    then(thenCallback){
        this.thens.push(thenCallback);
        return this;
    }
    catch(catchCallback) {
        this.catchs.push(catchCallback);
    }
}

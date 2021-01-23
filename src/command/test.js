const Command = require("../command");

class test extends Command {
    constructor(...args) {
        super(...args);

        this.name = 'test',
        this.aliases = [ 't' ]
        this.hidden = true;
    }

    async run ({ message }) {
        message.channel.send('the')
    }
}

module.exports = test;
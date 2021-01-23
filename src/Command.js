class Command {
    constructor(name, aliases, hidden) {

        this.name = name || '',
        this.aliases = aliases || []
        this.hidden =  hidden || false

    }
}

module.exports = Command;
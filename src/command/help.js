const { MessageEmbed } = require("discord.js");
const Command = require("../Command");

class help extends Command {
    constructor(...args) {
        super(...args);

        this.name = 'help',
        this.aliases = [ 'commands' ]
    }

    run ({ message, commands, prefix, Client }) {
        message.channel.send(
            new MessageEmbed()
            .setColor('GREEN')
            .setDescription([
                commands.filter(c => !c.hidden).map(c => {
                return `**\`${prefix}${c.name}\`**`
            }).join('\n'),
            ])
        )
    }
}

module.exports = help;
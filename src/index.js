let Discord = require('discord.js');
require('dotenv').config()
let fs = require('fs');

let Client = new Discord.Client()

let commands = [];

let folder = fs.readdirSync('./src/command')

for ( let files of folder ) {
    let cmd = require(`./command/${files}`)
    console.info('loading ' + files)
    commands.push(new cmd())
}

let prefix = process.env.PREFIX

Client.on('ready', () => {
    console.log('ready on ' + Client.user.tag)
})


/**
 * stolen from amongcord :/
 * https://github.com/pedrofracassi/amongcord
 */

Client.on('message', (message) => {
  if (message.author.id === Client.user.id) return
  if (message.channel.type !== 'text') return
  if (message.author.bot) return

  if ([`<@!${Client.user.id}>`, `<@${Client.user.id}>`].includes(message.content)) return message.channel.send(`**Hi, I\'m Ari** For help, type \`${prefix}help\`.`)

  const safePrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const commandExpression = new RegExp(`^${safePrefix}([a-z]*) ?`)
  
  const commandMatch = commandExpression.exec(message.content)
  if (!commandMatch) return

  const invokedCommand = commandMatch[1]

  const command = commands.find(c => c.name === invokedCommand || c.aliases.includes(invokedCommand))
  if (!command) return

  command.run({message, Client, commands, prefix})
})

Client.login(process.env.BOT_TOKEN)
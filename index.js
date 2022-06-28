const { Client, MessageButton, MessageEmbed, MessageMenu, MessageActionRow, MessageSelectMenu } = require("discord.js")
const client = new Client({intents:[32767], disableMentions:["everyone"]})
const setting = require("./src/settings.json")
const db = require("inflames.db") //By Cheeini
const discordModals = require('discord-modals'); // Define the discord-modals package!
const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals'); // Import all
discordModals(client); // discord-modals needs your client in order to interact with modals
client.on("ready", () => {
  client.user.setActivity(setting.activity,{type:setting.activityType})
  client.user.setStatus("idle")
    console.log("Bot connected!")
})
/*Menus*/



const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select an Action')
					.addOptions([
						{
							label: 'Edit',
							description: 'Edit Note',
							emoji: "✍️",
							value: 'edit_note',
						},
                        {
                            label:"List",
                            description:"List All Your Notes",
                            emoji:"📜",
                            value:"list_notes"
                        },
						{
							label: 'Delete',
							description: 'Delete Note',
							emoji:"❌",
					 value: 'delete_note',
						},
					]),
                	)
const row2 = new MessageActionRow()
.addComponents(
    new MessageButton()
                .setLabel("Search")
                .setEmoji("🔍")
                .setStyle("PRIMARY")
                .setCustomId("search_notes")
    
				
)
					/*Modals*/
				client.on('modalSubmit', async (modal) => {
  if(modal.customId === 'modal-edit') {
    const nameResponse = modal.getTextInputValue('notename');
    const contentResponse = modal.getTextInputValue('notecontent');
    db.set(`notes_${modal.user.id}`, {noteName: nameResponse, note: contentResponse})
    modal.reply(`**Your Note Updated!**`, {ephemeral: true})
  }  
                    if(modal.customId === "modal-search"){
                        const searchResponse = modal.getTextInputValue("note_search")
                        const kontrol = db.get(`notes_${modal.user.id}`)
                        if(searchResponse <= kontrol.noteName) return modal.reply("**This note not avaliable on our system!**", {ephemeral: true})
                   else {
                       const embed = new MessageEmbed()
                       .setTitle("*Search Results....*")
                       .setAuthor(modal.user.username,modal.user.avatarURL())
                       .setColor("GOLD")
                       .setDescription(`
Note Owner: \`${modal.user.username}\`
Note Name: ${kontrol.noteName}
Note Content: 
\`\`\`
${kontrol.note}
\`\`\`
`)
                       modal.reply({embeds:[embed],ephemeral: true})
                    
                       
                   }
                    }
});

  
/*Embeds*/
let prefix = setting.prefix;
const addError = new MessageEmbed()
.setTitle("Error!")
//.setAuthor(message.user.username,message.user.avatarURL())
.setColor("RED")
.setDescription(`**Please Write  Note Name and Note Content.** `)
.addField("**Usage;**",`\`\`\`${prefix}add-note [Note Name] [Note Content]\`\`\``)

const addLengthError = new MessageEmbed()
.setTitle("Error!")
//.setAuthor(message.user.username,message.user.avatarURL())
.setColor("RED")
.setDescription(`
**Note Name length not higher than 15!**
`)

.setFooter("Made By Cheeini (Nicat.dcw)")


client.on("messageCreate", async (message) => {
  let prefix = setting.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
  if(message.author.bot) return;
  if(command === `add-note`){
      let kontrol = db.fetch(`notes_${message.author.id}`);
      if(args[0] <= kontrol) return message.reply("**This Note Already exists on our system!**")
    if(!args[0]) return message.channel.send({embeds:[addError]})
    if(args[1].length > 15) return message.channel.send({embeds:[addLengthError]})
    else {
      db.add(`notes_${message.author.id}`, {noteName: args[0], note: args[1] })
        
const added = new MessageEmbed()
.setTitle("Successfuly!")
//.setAuthor(message.user.username,message.user.avatarURL())
.setColor("BLURPLE")
.setDescription(`
*Your Note Successfully Added!*


Details;
• Note Name: ${args[0]}
• Note Content: 
\`\`\`md
${args[1]}
\`\`\`
`)
        .setFooter("By Cheeini | This Message Avaliable 10 Seconds.")
       message.channel.send({embeds:[added], components: [row, row2], ephemeral: true}).then(x => {
             setTimeout(function(){
                 
             
           x.delete()
             },10000)
            })
    }
  }
    if(command === "list"){
       const QuickBoard = require('quickboard');
const board = new QuickBoard({
  max: 10,
 data: client.guilds.cache.get(message.guild.id).members.cache.map(member => ({ value: db.fetch(`notes_${member.user.id}`), member })), // client = discord.js client, database = quick.db
  map: (item, index) => `${index + 1}. ${item.member.displayName} - ${item.note} `,
  sort: (according, current) => current.value - according.note,
}).create();

        message.reply(`
             ${board || null ? `Note Name: ${db.get(`notes_`)} | Owner: You. `: "ejejjs"}`)
                     
               //getLeaderboard (1, 5)
    
    
    }
  
})
client.on('interactionCreate', interaction => {
	if (!interaction.isSelectMenu()) return;
	if(interaction.customId === "select"){
	  if(interaction.values[0] === "edit_note"){
	  	let fetch = db.fetch(`notes_${interaction.user.id}`)
	  	const modal = new Modal() // We create a Modal
	  	  .setCustomId('modal-edit')
	  	  .setTitle('Edit Note')
	  	  .addComponents(
	  	    new TextInputComponent() // We create a Text Input Component
	  	    .setCustomId('notename')
	  	    .setLabel('Note Name')
	  	    .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
	  	    .setPlaceholder(fetch.noteName)
	  	    .setRequired(true), // If it's required or not,
	  	    new TextInputComponent() // We create a Text Input Component
	  	    .setCustomId('notecontent')
	  	    .setLabel('Note Content')
	  	    .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
	  	    .setPlaceholder(fetch.note)
	  	    .setRequired(true) // If it's required or not,
	  	    
	  	  )
	  	  showModal(modal, {
      client: client, // Client to show the Modal through the Discord API.
      interaction: interaction // Show the modal with interaction data.
    });
      }
	
	if(interaction.values[0] === "delete_note"){
	  db.delete(`notes_${interaction.user.id}`)
        const msgId = db.fetch(`notesMsg_${interaction.user.id}`)
      
      return interaction.reply("**Your Note was Deleted!**")
	}
    }
	console.log(interaction);
});
client.on("interactionCreate", (interaction) => {
    if(!interaction.isButton()) return;
    if(interaction.customId === "search_notes"){
        const modal = new Modal() // We create a Modal
	  	  .setCustomId('modal-search')
	  	  .setTitle('Search Note')
	  	  .addComponents(
	  	    new TextInputComponent() // We create a Text Input Component
	  	    .setCustomId('note_search')
	  	    .setLabel('Note Name')
	  	    .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
	  	    .setPlaceholder("Write Note Name!")
	  	    .setRequired(true), // If it's required or not,
	  	)
        showModal(modal, {
      client: client, // Client to show the Modal through the Discord API.
      interaction: interaction // Show the modal with interaction data.
    });
    }
})
client.login("")

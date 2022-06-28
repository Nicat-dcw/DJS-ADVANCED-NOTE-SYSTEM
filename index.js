const { Client, MessageButton, MessageEmbed, MessageMenu, MessageActionRow, MessageSelectMenu } = require("discord.js")

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


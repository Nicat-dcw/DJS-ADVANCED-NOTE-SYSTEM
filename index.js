const { Client, MessageButton, MessageEmbed, MessageMenu, MessageActionRow, MessageSelectMenu } = require("discord.js")

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

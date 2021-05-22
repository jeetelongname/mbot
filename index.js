require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const guildID = "711576565112373319";

const commands = {
  hello: {
    description: "hello world",
    function: (interaction, _args) => {
      slashReturnText(interaction, "hello world!");
    },
  },

  f: {
    description: "reply with f",
    function: (interaction, _args) => {
      slashReturnText(
        interaction,
        `
⠀⠀⠀⢀⡤⢶⣶⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣠⣤⣤⣤⣿⣧⣀⣀⣀⣀⣀⣀⣀⣀⣤⡄⠀
⢠⣾⡟⠋⠁⠀⠀⣸⠇⠈⣿⣿⡟⠉⠉⠉⠙⠻⣿⡀
⢺⣿⡀⠀⠀⢀⡴⠋⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠙⠇
⠈⠛⠿⠶⠚⠋⣀⣤⣤⣤⣿⣿⣇⣀⣀⣴⡆⠀⠀⠀
⠀⠀⠀⠀⠠⡞⠋⠀⠀⠀⣿⣿⡏⠉⠛⠻⣿⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠈⠁⠀⠀
⠀⠀⣠⣶⣶⣶⣶⡄⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀
⠀⢰⣿⠟⠉⠙⢿⡟⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀
⠀⢸⡟⠀⠀⠀⠘⠀⠀⠀⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠈⢿⡄⠀⠀⠀⠀⠀⣼⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠙⠷⠶⠶⠶⠿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀
`
      );
    },
  },

  ping: {
    description: "reply with pong",
    function: (interaction, _args) => {
      slashReturnText(interaction, "pong");
    },
  },
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  for (const command of Object.keys(commands)) {
    slashSimpleDefine(command, commands[command].description);
  }

  client.ws.on("INTERACTION_CREATE", async (interaction) => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;

    commands[command].function(interaction, args);
  });
});

function slashReturnText(interaction, text) {
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: text,
      },
    },
  });
}

function slashSimpleDefine(name, description) {
  client.api
    .applications(client.user.id)
    .guilds(guildID)
    .commands.post({
      data: {
        name: name,
        description: description,
        // possible options here e.g. options: [{...}]
      },
    });
}

client.login(process.env.TOKEN);

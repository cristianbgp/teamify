const Discord = require("discord.js");
const bot = new Discord.Client();

const token = "NzA2NTg3NTc5NDYxNTMzNzM3.Xq8bnw.BeoAfVwDzY5ENif3sJTRvVU-Ils";

const PREFIX = "$";

bot.on("ready", () => {
  console.log("Bot is online");
});

bot.on("message", (message) => {
  if (message.content.indexOf(PREFIX) === 0) {
    const args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
      case "oe":
        const randomReplies = [
          "Habla",
          "Que fueeeee",
          "Safa causa",
        ];
        message.reply(
          randomReplies[Math.floor(Math.random() * randomReplies.length)]
        );
        break;

      case "clear":
        if (!args[1]) {
          message.react("😡");
          return message.reply("Dime cuantos mensajes primero");
        }
        const maxNumber = 20;
        message.channel.bulkDelete(args[1] > maxNumber ? maxNumber : args[1]);
        break;

      case "team":
        if (message.mentions.users.size === 0) {
          message.react("😡");
          return message.reply("Etiqueta a la gente");
        } else {
          if (message.member.voice.channel) {
            message.mentions.users.forEach((user) => {
              message.member.voice.channel.createInvite().then((invite) => {
                user.send(`Entra mano! ${!!invite ? invite : ""}`);
              });
            });
          } else {
            message.mentions.users.forEach((user) => {
              user.send(`Entra mano!`);
            });
          }
        }

        break;

      case "help":
        message.channel.send(`
        Comandos
        - **$oe** : Saludo
        - **$clear** : Eliminar mensajes (máximo 20 mensajes)
        - **$team** : Etiqueta a tus amigos para avisarles que vas a jugar y se unan a tu canal de voz
        `);
        break;

      default:
        break;
    }
  } else if (message.mentions.users.find((user) => user === bot.user)) {
    message.react("😡");
    message.reply("Que quieres mano? usa `$help` si no sabes que hacer");
  }
});

bot.login(token);

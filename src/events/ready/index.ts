import { REST, Routes } from 'discord.js';
import { AppCommands } from '../../commands/commands';
import { BOT_TOKEN, ENV, GUILD_IDS } from '../../config/environment';
import { EventModule } from '../events';

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

export default function ({ app, appCommands }: EventModule) {
  app.once('ready', async () => {
    try {
      registerApplicationCommands();
      console.log("I'm booting up! (◕ᴗ◕✿)");
    } catch (error) {
      console.log(error);
    }
  });
  const registerApplicationCommands = async () => {
    if (!appCommands) return;
    const commandList = Object.keys(appCommands)
      .map((key) => {
        const commandKey = appCommands[key as keyof AppCommands];
        if (commandKey) return commandKey.data;
      })
      .map((command) => command && command.toJSON());

    try {
      if (ENV === 'dev') {
        if (GUILD_IDS) {
          //Registering guild-only commands to the bot; I like to use a different bot for dev purposes
          //TODO: Change id here to placeholder
          await rest.put(Routes.applicationGuildCommands('929421200797626388', GUILD_IDS), {
            body: commandList,
          });
          console.log('Successfully registered guild application commands');
        }
      } else {
        //Registering global commands for the bot i.e. every guild will see the commands; I mostly just use this in production
        //TODO: Change id here to placeholder
        await rest.put(Routes.applicationCommands('518196430104428579'), { body: commandList });
        console.log('Successfully registered global application commands');
      }
    } catch (error) {
      //TODO: Add error handling
      console.log(error);
    }
  };
}

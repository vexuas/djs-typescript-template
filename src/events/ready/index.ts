import { REST, Routes } from 'discord.js';
import { AppCommand } from '../../commands/commands';
import { BOT_TOKEN, ENV, GUILD_IDS, USE_DATABASE } from '../../config/environment';
import { createGuildTable, populateGuilds } from '../../services/database';
import { sendBootNotification, sendErrorLog } from '../../utils/helpers';
import { EventModule } from '../events';

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

const registerApplicationCommands = async (commands?: AppCommand[]) => {
  if (!commands) return;
  console.log(commands);
  // const commandList = Object.keys(commands)
  //   .map((key) => {
  //     const commandKey = commands[key as keyof AppCommands];
  //     if (commandKey) return commandKey.data;
  //   })
  //   .map((command) => command && command.toJSON());
  // console.log(commandList);
  try {
    if (ENV === 'dev') {
      if (GUILD_IDS) {
        //Registering guild-only commands to the bot; I like to use a different bot for dev purposes
        //TODO: Change id here to placeholder
        await rest.put(Routes.applicationGuildCommands('929421200797626388', GUILD_IDS), {
          body: [],
        });
        console.log('Successfully registered guild application commands');
      }
    } else {
      //Registering global commands for the bot i.e. every guild will see the commands; I mostly just use this in production
      //TODO: Change id here to placeholder
      await rest.put(Routes.applicationCommands('518196430104428579'), { body: [] });
      console.log('Successfully registered global application commands');
    }
  } catch (error) {
    sendErrorLog({ error });
  }
};

export default function ({ app, appCommands }: EventModule) {
  app.once('ready', async () => {
    try {
      await registerApplicationCommands(appCommands);
      if (USE_DATABASE) {
        await createGuildTable();
        await populateGuilds(app.guilds.cache);
      }
      await sendBootNotification(app);
    } catch (error) {
      console.log(error);
    }
  });
}

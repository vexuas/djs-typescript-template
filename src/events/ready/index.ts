import { REST, Routes } from 'discord.js';
import { AppCommand } from '../../commands/commands';
import { BOT_ID, BOT_TOKEN, DATABASE_CONFIG, ENV, GUILD_ID } from '../../config/environment';
import { createGuildTable, populateGuilds } from '../../services/database';
import { sendBootNotification, sendErrorLog } from '../../utils/helpers';
import { EventModule } from '../events';

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

const registerApplicationCommands = async (commands?: AppCommand[]) => {
  if (!commands) return;
  const commandList = commands.map((command) => command.data.toJSON());

  try {
    if (ENV === 'dev') {
      if (GUILD_ID) {
        //Registering guild-only commands to the bot i.e. only specified servers will see commands; I like to use a different bot when in development
        await rest.put(Routes.applicationGuildCommands(BOT_ID, GUILD_ID), {
          body: commandList,
        });
        console.log('Successfully registered guild application commands');
      }
    } else {
      //Registering global commands for the bot i.e. every server bot is in will see commands; use this in production
      await rest.put(Routes.applicationCommands(BOT_ID), { body: commandList });
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
      if (DATABASE_CONFIG) {
        await createGuildTable();
        await populateGuilds(app.guilds.cache);
      }
      await sendBootNotification(app);
    } catch (error) {
      console.log(error);
    }
  });
}

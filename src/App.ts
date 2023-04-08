import { Client, GatewayIntentBits } from 'discord.js';
import { BOT_TOKEN } from './config/environment';
import { registerEventHandlers } from './events/events';
import { sendErrorLog } from './utils/helpers';

const app: Client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const initialize = async (): Promise<void> => {
  try {
    await app.login(BOT_TOKEN);
    registerEventHandlers({ app });
  } catch (error) {
    sendErrorLog({ error });
  }
};

initialize();

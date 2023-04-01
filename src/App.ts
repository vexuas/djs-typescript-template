import { Client, GatewayIntentBits } from 'discord.js';
import { BOT_TOKEN } from './config/environment';

const app: Client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const initialize = async (): Promise<void> => {
  try {
    await app.login(BOT_TOKEN);
  } catch (error) {
    console.log(error);
  }
};

initialize();

import { Client, GatewayIntentBits } from 'discord.js';

const app: Client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const initialize = async (): Promise<void> => {
  try {
    await app.login();
  } catch (error) {
    console.log(error);
  }
};

initialize();

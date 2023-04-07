import { Client } from 'discord.js';

interface Props {
  app: Client;
}
export default function ({ app }: Props) {
  app.once('ready', async () => {
    try {
      console.log("I'm booting up! (◕ᴗ◕✿)");
    } catch (error) {
      console.log(error);
    }
  });
}

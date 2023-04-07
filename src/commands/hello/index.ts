import { SlashCommandBuilder } from 'discord.js';
import { AppCommand, AppCommandOptions } from '../commands';

export default {
  data: new SlashCommandBuilder().setName('hello').setDescription('Greets the user!'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      await interaction.editReply('Hello!');
    } catch (error) {
      console.log(error);
    }
  },
} as AppCommand;

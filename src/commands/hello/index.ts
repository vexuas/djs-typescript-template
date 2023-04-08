import { SlashCommandBuilder } from 'discord.js';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export default {
  data: new SlashCommandBuilder().setName('hello').setDescription('Greets the user!'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      await interaction.editReply('Hello!');
      throw new Error('This is a test');
    } catch (error) {
      console.log(interaction.commandName);
      sendErrorLog(error);
    }
  },
} as AppCommand;

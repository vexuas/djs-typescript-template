import { SlashCommandBuilder } from 'discord.js';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export default {
  data: new SlashCommandBuilder().setName('hello').setDescription('Greets the user!'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      throw new Error('This is a test');
      await interaction.deferReply();
      await interaction.editReply('Hello!');
    } catch (error) {
      sendErrorLog(error);
    }
  },
} as AppCommand;

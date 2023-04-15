import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { codeMark, sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export const generateHelpEmbed = (): APIEmbed => {
  const embed = {
    color: 55296,
    description: 'Below you can see all the commands that I know!',
    fields: [
      {
        name: 'Information',
        value: `${codeMark('about')}, ${codeMark('help')}, ${codeMark('invite')}`,
        inline: false,
      },
    ],
  };
  return embed;
};
export default {
  data: new SlashCommandBuilder().setName('help').setDescription('Directory hub of commands'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      const embed = generateHelpEmbed();
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;

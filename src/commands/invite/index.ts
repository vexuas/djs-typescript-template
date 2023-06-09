import { AppCommand, AppCommandOptions } from '../commands';
import { APIEmbed, hyperlink, SlashCommandBuilder } from 'discord.js';
import { getEmbedColor, sendErrorLog } from '../../utils/helpers';

export const generateInviteEmbed = (): APIEmbed => {
  const embed = {
    description: hyperlink('Add me to your servers! (◕ᴗ◕✿)', ''),
    color: getEmbedColor(),
  };
  return embed;
};

export default {
  commandType: 'Information',
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Generates an invite link for My App'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const embed = generateInviteEmbed();
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;

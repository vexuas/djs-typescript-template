import { APIEmbed, Client, SlashCommandBuilder } from 'discord.js';
import { BOT_UPDATED_AT, BOT_VERSION } from '../../version';
import { AppCommand, AppCommandOptions } from '../commands';
import { format } from 'date-fns';
import { getEmbedColor, sendErrorLog } from '../../utils/helpers';

export const generateAboutEmbed = (app?: Client): APIEmbed => {
  const embed = {
    title: 'Info',
    description:
      "Hi there! This is where you'd want to explain what your App does and any other cool stuff about it! :D",
    color: getEmbedColor(),
    thumbnail: {
      url: 'https://vexuas.b-cdn.net/mitsuha.jpg',
    },
    fields: [
      {
        name: 'Creator',
        value: '-',
        inline: true,
      },
      {
        name: 'Date Created',
        value:
          app && app.application ? format(app.application.createdTimestamp, 'dd-MM-yyyy') : 'N/A',
        inline: true,
      },
      {
        name: 'Version',
        value: BOT_VERSION,
        inline: true,
      },
      {
        name: 'Library',
        value: 'discord.js',
        inline: true,
      },
      {
        name: 'Last Updated',
        value: BOT_UPDATED_AT,
        inline: true,
      },
      {
        name: 'Support Server',
        value: '-',
        inline: true,
      },
    ],
  };
  return embed;
};
export default {
  commandType: 'Information',
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Displays information about My App'),
  async execute({ interaction, app }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const embed = generateAboutEmbed(app);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;

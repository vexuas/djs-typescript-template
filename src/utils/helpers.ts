import {
  AnySelectMenuInteraction,
  APIEmbed,
  ButtonInteraction,
  Channel,
  ChatInputCommandInteraction,
  Client,
  Guild,
  GuildChannel,
  inlineCode,
  WebhookClient,
} from 'discord.js';
import { capitalize, isEmpty } from 'lodash';
import {
  BOOT_NOTIFICATION_CHANNEL_ID,
  ERROR_NOTIFICATION_WEBHOOK_URL,
} from '../config/environment';
import { v4 as uuid } from 'uuid';

export const serverNotificationEmbed = async ({
  app,
  guild,
  type,
}: {
  app: Client;
  guild: Guild;
  type: 'join' | 'leave';
}): Promise<APIEmbed> => {
  const defaultIcon =
    'https://cdn.discordapp.com/attachments/248430185463021569/614789995596742656/Wallpaper2.png';
  const guildIcon = guild.icon && guild.iconURL();
  const guildOwner =
    type === 'join'
      ? await guild.members.fetch(guild.ownerId).then((guildMember) => guildMember.user.tag)
      : '-';

  const embed = {
    title: type === 'join' ? 'Joined a new server' : 'Left a server',
    description: `I'm now in **${app.guilds.cache.size}** servers!`,
    color: getEmbedColor(type === 'join' ? '#33FF33' : '#FF0000'),
    thumbnail: {
      url: guildIcon ? guildIcon.replace(/jpeg|jpg/gi, 'png') : defaultIcon,
    },
    fields: [
      {
        name: 'Name',
        value: guild.name,
        inline: true,
      },
      {
        name: 'Owner',
        value: guildOwner,
        inline: true,
      },
      {
        name: 'Members',
        value: guild.memberCount.toString(),
        inline: true,
      },
    ],
  };
  return embed;
};

export const sendErrorLog = async ({
  error,
  interaction,
  option,
  subCommand,
  customTitle,
}: {
  error: any;
  interaction?: ChatInputCommandInteraction | AnySelectMenuInteraction | ButtonInteraction;
  option?: string | null;
  subCommand?: string;
  customTitle?: string;
}) => {
  console.error(error);
  const errorID = uuid();
  if (interaction) {
    const errorEmbed = {
      description: `Oops something went wrong! D:\n\nError: ${
        error.message ? inlineCode(error.message) : inlineCode('Unexpected Error')
      }\nError ID: ${inlineCode(errorID)}`,
      color: getEmbedColor('#FF0000'),
    };
    await interaction.editReply({ embeds: [errorEmbed], components: [] });
  }
  if (ERROR_NOTIFICATION_WEBHOOK_URL && !isEmpty(ERROR_NOTIFICATION_WEBHOOK_URL)) {
    const interactionChannel = interaction?.channel as GuildChannel | undefined;
    const notificationEmbed: APIEmbed = {
      title: customTitle
        ? `Error | ${customTitle}`
        : interaction
        ? `Error | ${interaction.isCommand() ? capitalize(interaction.commandName) : ''}${
            subCommand ? ` ${capitalize(subCommand)}` : ''
          } Command`
        : 'Error',
      color: getEmbedColor('#FF0000'),
      description: `uuid: ${errorID}\nError: ${
        error.message ? error.message : 'Unexpected Error'
      }\n${option ? `Option: ${option}` : ''}`,
      fields: interaction
        ? [
            {
              name: 'User',
              value: interaction.user.username,
              inline: true,
            },
            {
              name: 'User ID',
              value: interaction.user.id,
              inline: true,
            },
            {
              name: 'Channel',
              value: interactionChannel ? interactionChannel.name : '-',
              inline: true,
            },
            {
              name: 'Channel ID',
              value: interaction.channelId,
              inline: true,
            },
            {
              name: 'Guild',
              value: interaction.guild ? interaction.guild.name : '-',
              inline: true,
            },
            {
              name: 'Guild ID',
              value: interaction.guildId ? interaction.guildId : '-',
              inline: true,
            },
          ]
        : undefined,
    };
    const notificationWebhook = new WebhookClient({ url: ERROR_NOTIFICATION_WEBHOOK_URL });
    await notificationWebhook.send({
      embeds: [notificationEmbed],
      username: 'My App Error Notification',
      avatarURL: '',
    });
  }
};

export const sendBootNotification = async (app: Client) => {
  console.log("I'm booting up! (◕ᴗ◕✿)");
  const bootNotificationChannel: Channel | undefined =
    BOOT_NOTIFICATION_CHANNEL_ID && !isEmpty(BOOT_NOTIFICATION_CHANNEL_ID)
      ? app.channels.cache.get(BOOT_NOTIFICATION_CHANNEL_ID)
      : undefined;
  bootNotificationChannel &&
    bootNotificationChannel.isTextBased() &&
    (await bootNotificationChannel.send("I'm booting up! (◕ᴗ◕✿)"));
};

//Helper to pass in a hexadecimal string color that converts it to a number code that discord accepts
//Returns a default color if no argument is passed
export const getEmbedColor = (color?: string): number => {
  return parseInt(color ? color.replace('#', '0x') : '#3399FF'.replace('#', '0x'));
};

export const sendWrongUserWarning = async ({
  interaction,
}: {
  interaction: ButtonInteraction | AnySelectMenuInteraction;
}) => {
  const wrongUserEmbed = {
    description: `Oops looks like that interaction wasn't meant for you! I can only properly interact with your own commands.\n\nTo check what I can do, type ${inlineCode(
      '/help'
    )}!`,
    color: getEmbedColor('#FF0000'),
  };
  await interaction.deferReply({ ephemeral: true });
  interaction.editReply({ embeds: [wrongUserEmbed] });
};

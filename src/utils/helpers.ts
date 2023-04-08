import { APIEmbed, Client, CommandInteraction, Guild, WebhookClient } from 'discord.js';
import { capitalize, isEmpty } from 'lodash';
import { ERROR_NOTIFICATION_WEBHOOK_URL } from '../config/environment';
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
    color: type === 'join' ? 55296 : 16711680,
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
}: {
  error: any;
  interaction?: CommandInteraction;
}) => {
  console.log(error);
  if (ERROR_NOTIFICATION_WEBHOOK_URL && !isEmpty(ERROR_NOTIFICATION_WEBHOOK_URL)) {
    const embed = {
      title: interaction ? `Error | ${capitalize(interaction.commandName)} Command` : 'Error',
      color: 16711680,
      description: `uuid: ${uuid()}\nError: ${error.message ? error.message : 'Unexpected Error'}`,
    };
    const notificationWebhook = new WebhookClient({ url: ERROR_NOTIFICATION_WEBHOOK_URL });
    await notificationWebhook.send({
      embeds: [embed],
      username: 'My App Error Notification',
      avatarURL: '',
    });
  }
};

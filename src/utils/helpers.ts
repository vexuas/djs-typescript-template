import { Client, Guild } from 'discord.js';

export const serverNotificationEmbed = async ({
  app,
  guild,
  status,
}: {
  app: Client;
  guild: Guild;
  status: 'join' | 'leave';
}) => {
  try {
    const defaultIcon =
      'https://cdn.discordapp.com/attachments/248430185463021569/614789995596742656/Wallpaper2.png';
    const guildIcon = guild.icon && guild.iconURL();
    const guildOwner =
      status === 'join'
        ? await guild.members.fetch(guild.ownerId).then((guildMember) => guildMember.user.tag)
        : '-';

    const embed = {
      title: status === 'join' ? 'Joined a new server' : 'Left a server',
      description: `I'm now in **${app.guilds.cache.size}** servers!`,
      color: status === 'join' ? 55296 : 16711680,
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
  } catch (error) {
    //TODO: Add error handling
    console.log(error);
  }
};

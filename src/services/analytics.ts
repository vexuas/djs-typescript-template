import { Guild, TextBasedChannel, User } from 'discord.js';
import { capitalize } from 'lodash';
import { Mixpanel } from 'mixpanel';

type CommandEvent = {
  user: User;
  channel: TextBasedChannel;
  guild: Guild;
  command: string;
  client: Mixpanel;
  options?: string;
  properties?: Object;
};

export function sendCommandEvent({
  user,
  channel,
  guild,
  command,
  client,
  options,
  properties,
}: CommandEvent): void {
  if (channel.isDMBased()) return;
  const eventName = `Use ${capitalize(command)} Command`;

  client.track(eventName, {
    distinct_id: user.id,
    user: user.tag,
    user_name: user.username,
    channel: channel.name,
    channel_id: channel.id,
    guild: guild.name,
    guild_id: guild.id,
    command: command,
    arguments: options ? options : 'none',
    ...properties,
  });
}

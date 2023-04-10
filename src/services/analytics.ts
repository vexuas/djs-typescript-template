import {
  DMChannel,
  Guild,
  PartialDMChannel,
  PartialGroupDMChannel,
  TextBasedChannel,
  User,
} from 'discord.js';
import { capitalize } from 'lodash';
import { Mixpanel } from 'mixpanel';

type CommandEvent = {
  client: Mixpanel;
  user: User;
  channel: TextBasedChannel;
  guild: Guild;
  command: string;
  options?: string;
  properties?: Object;
};
type UserProfile = {
  client: Mixpanel;
  user: User;
  channel: Exclude<TextBasedChannel, DMChannel | PartialDMChannel | PartialGroupDMChannel>;
  guild: Guild;
  command?: string;
};

function setUserProfile({ client, user, channel, guild, command }: UserProfile) {
  client.people.set(user.id, {
    $name: user.username,
    $created: user.createdAt.toISOString(),
    tag: user.tag,
    guild: guild.name,
    guild_id: guild.id,
  });
  client.people.set_once(user.id, {
    first_used: new Date().toISOString(), //Unfortunately this is only after v2.5
    first_command: command,
    first_used_in_guild: guild.name,
    first_used_in_channel: channel.name,
  });
}
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
  setUserProfile({ client, user, guild, channel, command });
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

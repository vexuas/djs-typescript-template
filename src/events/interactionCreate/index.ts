import { ApplicationCommandOptionType, CacheType, Interaction } from 'discord.js';
import { capitalize } from 'lodash';
import { sendAnalyticsEvent } from '../../services/analytics';
import { sendErrorLog, sendWrongUserWarning } from '../../utils/helpers';
import { EventModule } from '../events';

export default function ({ app, appCommands, mixpanel }: EventModule) {
  app.on('interactionCreate', async (interaction: Interaction<CacheType>) => {
    try {
      if (!interaction.inGuild() || !appCommands) return;

      if (interaction.isChatInputCommand()) {
        const { commandName, options } = interaction;
        const hasArgument =
          options.data[0] && options.data[0].type === ApplicationCommandOptionType.String;
        const subCommand = interaction.options.getSubcommand(false);
        const command = appCommands.find((command) => command.data.name === commandName);
        command && (await command.execute({ interaction, app, appCommands }));

        if (mixpanel) {
          const eventName = `Use ${capitalize(commandName)}${
            subCommand ? ` ${capitalize(subCommand)}` : ''
          } Command`;
          sendAnalyticsEvent({
            user: interaction.user,
            channel: interaction.channel,
            guild: interaction.guild,
            command: commandName,
            client: mixpanel,
            options: hasArgument ? options.data[0].value : null,
            eventName,
            subCommand,
          });
        }
      }
      if (interaction.isButton() || interaction.isAnySelectMenu()) {
        if (
          interaction.message.interaction &&
          interaction.user.id !== interaction.message.interaction.user.id
        ) {
          sendWrongUserWarning({ interaction });
          return;
        }
      }
      if (interaction.isButton()) {
        switch (interaction.customId) {
          default:
            return;
        }
      }
      if (interaction.isAnySelectMenu()) {
        switch (interaction.customId) {
          default:
            return;
        }
      }
    } catch (error) {
      sendErrorLog({ error });
    }
  });
}

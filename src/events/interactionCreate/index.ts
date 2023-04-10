import { CacheType, Interaction } from 'discord.js';
import { AppCommands } from '../../commands/commands';
import { sendCommandEvent } from '../../services/analytics';
import { sendErrorLog } from '../../utils/helpers';
import { EventModule } from '../events';

export default function ({ app, appCommands, mixpanel }: EventModule) {
  app.on('interactionCreate', async (interaction: Interaction<CacheType>) => {
    try {
      if (!interaction.inGuild() || !appCommands) return;

      if (interaction.isCommand()) {
        const { commandName } = interaction;
        const command = appCommands[commandName as keyof AppCommands];
        command && (await command.execute({ interaction, app }));
        mixpanel &&
          sendCommandEvent({
            user: interaction.user,
            channel: interaction.channel,
            guild: interaction.guild,
            command: commandName,
            client: mixpanel,
          });
      }
      //Maybe add buttons, selections and modal handlers here eventually
    } catch (error) {
      sendErrorLog({ error });
    }
  });
}

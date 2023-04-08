import { CacheType, Interaction } from 'discord.js';
import { AppCommands } from '../../commands/commands';
import { EventModule } from '../events';

export default function ({ app, appCommands }: EventModule) {
  app.on('interactionCreate', async (interaction: Interaction<CacheType>) => {
    try {
      if (!interaction.inGuild() || !appCommands) return;

      if (interaction.isCommand()) {
        const { commandName } = interaction;
        const command = appCommands[commandName as keyof AppCommands];
        command && (await command.execute({ interaction, app }));
      }
      //Maybe add buttons, selections and modal handlers here eventually
    } catch (errors) {
      //TODO: Add error handling
      console.log(errors);
    }
  });
}
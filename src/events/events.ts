import { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { AppCommands, getApplicationCommands } from '../commands/commands';
import { sendErrorLog } from '../utils/helpers';

const appCommands = getApplicationCommands();

interface Props {
  app: Client;
}
type ExportedEventModule = {
  default: (data: EventModule) => void;
};
export type EventModule = {
  app: Client;
  appCommands?: AppCommands;
};
export function registerEventHandlers({ app }: Props): void {
  const loadModules = (directoryPath: string) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (error, files) => {
      if (error) {
        sendErrorLog({ error });
      }
      files &&
        files.forEach((file) => {
          const filePath = path.join(directoryPath, file.name);
          if (file.isDirectory()) {
            return loadModules(filePath);
          }
          if (file.name === 'index.js') {
            const modulePath = `.${filePath.replace('dist/events', '')}`;
            const currentModule = require(modulePath) as ExportedEventModule;
            currentModule.default({ app, appCommands });
          }
        });
    });
  };
  loadModules('./dist/events');
}

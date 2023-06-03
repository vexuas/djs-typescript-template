<div align="center">
  <img src="https://cdn.discordapp.com/attachments/1089616880576245853/1094559253395689562/mitsuha.jpg" style="width: 180px" />
</div>

# djs-typescript-template

A complete and opinionated template to create full Discord bots using discordjs and typescript

This project came about from me realising I take a ridiculous amount of time trying to set up a new Discord bot from scratch. Not only from initialising the project but also adding the relevant foundations and features that I primarily use. Since most of my coding projects revolve around Discord and me being a sucker for productivity, I decided to create a boilerplate modelled after how I normally develop them.

I'm not sure exactly how much time would be saved but it did feel pretty significant when I used this on [Nino, a random anime image bot](https://github.com/vexuas/nino), which took roughly just under a week from initialising the project to having a running production instance. Pretty good numbers if you ask me 🤷‍♂️


## Prerequisites
I wasn't really tailoring this template to be accessible to everyone (since I was creating it more for myself) but I would think overall it's not too complicated. That being said, this does assume you have a good grasp of Typescript or just Javascript in general. Having some experience with creating Discord bots previously does help but not really required.

You would also need the following before getting started:
- Have a Discord Application created from the [Discord Dev Portal](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- Have the Discord Application [invited to a Discord Server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
- [Node](https://heynode.com/tutorial/install-nodejs-locally-nvm/) with a version of at least v16.13.0
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## Installation
1. Use this template to create a new repository
2. Clone the new repository and then change directly into it
    - `git clone [your new repo]`
    - `cd [your new repo file]`
3. Install dependencies
    - `yarn install`
4. Add required environment variables
    - To start your Discord bot, you would need the following core environment variables:
        - `BOT_TOKEN`
        - `BOT_ID`
        - `GUILD_ID`
    - These can be defined by creating a `environment.ts` file under `src/config`
        - `mkdir src/config && touch src/config/environment.ts`
    - Finally, export the variables above with your data
    ```
    export const BOT_TOKEN = 'Your Discord Bot Token';
    export const BOT_ID = 'Your Discord Bot ID';
    export const GUILD_ID = 'The Discord Server ID you want the bot to register Slash Commands in'
    ```
 5. Start your App
     - `yarn start`

## Command List
This template uses Discord's Slash Commands `/`:
- `about` - information hub of Your App
- `help` - list of commands
- `invite` - generates Your App's invite link

## Usage
### Starting the App
This uses [tsc-watch](https://github.com/gilamran/tsc-watch) to start and automatically restart the app whenever a file is changed. Basically it's nodemon for Typescript but instead of directly listening to file changes, it listens to the compilation status. I find this quite useful since I don't have to remember to always compile my latest changes and then restart my app.

More information of the scripts used in `package.json` but you can just use `yarn start` and pretty much forget about it
### Creating Commands
Commands can be easily created in the format of `src/commands/your_command_name/index.ts`. This is important so that it can be automatically registered to Discord through the handler in `src/commands/commands.ts`.

A typical command is structured and can be set up as
```
src/commands/hello/index.ts
import { SlashCommandBuilder } from 'discord.js';
import { AppCommand, AppCommandOptions } from '../commands';

export default {
  commandType: 'Fun', 
  data: new SlashCommandBuilder().setName('hello').setDescription('Says hello!'),
  async execute({ interaction }: AppCommandOptions){
    await interaction.reply('hello'); 
  }
} as AppCommand;
```
where 
- `commandType` - Optional but used for categorisation in the /help command
- `data` - For registering to Discord purposes. Uses a Discord.js helper to quickly build a Slash command; this is what you'll see in the chat menu
- `execute()` - Handler when the /hello command is triggered; this is where you'd put whatever the command does

![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/cb83042f-b109-404f-aa80-e6ba6912f477)
![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/2f649324-8807-4338-b03d-9bfaac599b50)
![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/e7bc1543-23e7-465c-a8f6-3596467115d5)


### Attaching Event Listeners
### Tests
### Releasing
### Deployment

## Advanced Features
By default, this template can be immediately used without any of the fancy features below. However if you want to use a specific feature or even all of them, it's pretty straightforward by defining the relevant environment variables attached to its corresponding feature
### Database
### Product Usage Tracking
### TopGG Server No. Tracking
### Server Notifications
### Error Notifications
### Booting Up Notifications
### Full Environment File


## Contributing
This might be an opionated template but any contributions are greatly appreciated! If you have any suggestions that would make this better, you can either create a pull request or simply open an issue!
1. Create a new branch
    - `git checkout -b your-new-branch`
2. Commit your changes
    - `git commit -a -m 'Description of the changes'`
3. Push your branch
    - `git push origin your-new-branch`
4. Open a pull request

## License
Distributed under the [MIT License](https://github.com/vexuas/djs-typescript-template/blob/feature/add-detailed-readme/LICENSE)

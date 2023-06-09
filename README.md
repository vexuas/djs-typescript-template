<div align="center">
  <img src="https://cdn.discordapp.com/attachments/1089616880576245853/1094559253395689562/mitsuha.jpg" style="width: 180px" />
</div>

# djs-typescript-template

A complete and opinionated template to create full Discord bots using [discordjs](https://discord.js.org/#/) and typescript

This project came about from me realising I take a ridiculous amount of time trying to set up a new Discord bot from scratch. Not only from initialising the project but also adding the relevant foundations and features that I primarily use. Since most of my coding projects revolve around Discord and me being a sucker for productivity, I decided to create a boilerplate modelled after how I normally develop them.

I'm not sure exactly how much time would be saved but it did feel pretty significant when I used this on [Nino, a random anime image bot](https://github.com/vexuas/nino), which took roughly just under a week from initialising the project to having a running production instance. Pretty good numbers if you ask me 🤷‍♂️

Discord.js version used: **v14.8.0**

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
    - You would need the following core environment variables in order to start your Discord bot:
        - `BOT_TOKEN`
        - `BOT_ID`
        - `GUILD_ID`
    - Generate these configurations using:
        ```
        yarn config:init
        ```
    - Finally, fill in the required variables above with your data
        ```ts
        src/config/environment.ts
        //Bot Configuration; Required
        export const BOT_TOKEN = 'Your Discord Bot Token';
        export const BOT_ID = 'Your Discord Bot ID';
        export const GUILD_ID = 'The Discord Server ID you want the bot to register Slash Commands in'
        ```
    - Note: You may have noticed at this point there are other environment variables generated as well. These are optional to use and is not necessary for the bot to run but they are defined to avoid typescript errors. More information on these [variables here](https://github.com/vexuas/djs-typescript-template#advanced-features)
 5. Start your App
     - `yarn start`

## Command List
This template uses Discord's Slash Commands `/`:
- `about` - information hub of Your App
- `help` - list of commands
- `invite` - generates Your App's invite link

## Usage
### Starting the App
The template uses [tsc-watch](https://github.com/gilamran/tsc-watch) to start and automatically restart the app whenever a file is changed. Basically it's nodemon for Typescript but instead of directly listening to file changes, it listens to the compilation status. I find this quite useful since I don't have to remember to always compile my latest changes and then restart my app.

More information of the scripts used in `package.json` but you can just use `yarn start` and pretty much forget about it
### Creating Commands
Commands can be easily created in the format of `src/commands/your_command_name/index.ts`

A typical command follows the structure:
```ts
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
- `execute` - Function to handle when the /hello command is triggered; this is where you'd put whatever the command does

![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/cb83042f-b109-404f-aa80-e6ba6912f477)
![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/2f649324-8807-4338-b03d-9bfaac599b50)
![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/e7bc1543-23e7-465c-a8f6-3596467115d5)

### Registering Commands
Registering commands to Discord is automatic as long as a command is created using the format mentioned above. You can see more in detail how they are exported inside `src/commands/commands.ts` and how they're registered in `src/events/ready/index.ts`.

The template registers the commands in **one server** by default. If you want to register the commands globally i.e. in every server the bot is in, you can change the `ENV` environment variable with a value of `prod`
```ts
src/config/environment.ts
export const ENV = 'prod';
```

### Attaching Event Listeners
Similar to creating commands, creating an event listener is also straightforward and will be automatically exported using the format `src/events/event_name/index.ts`. You can see more in detail how they are exported inside `src/events/events.ts`.

For example, if you want to listen to the `guildCreate` event whenever your bot joins a new Discord server, this will be structured as:
```ts
src/events/guildCreate/index.ts
import { Guild } from 'discord.js';
import { EventModule } from '../events';

export default function({ app }: EventModule){
  app.on('guildCreate', async (guild: Guild) => {
    console.log(`my bot just joined a new server, ${guild.name}! :D`)
  })
};
```

Unlike commands where just creating the file is enough, you would also need to enable [Gateway Intents](https://discord.com/developers/docs/topics/gateway#list-of-intents) for your bot. Discord introduced Gateway Intents so developers can choose which events their bot receives based on which data it needs to function. This means that if you do not specify intents, you won't receive the data from that particular event even if the event file is created.

Using the example above, the Gateway Intent for the `guildCreate` event is `Guilds`. We can then define this intent for our bot during initialisation:
```ts
App.ts
import { Client, GatewayIntentBits } from 'discord.js';

const app: Client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
```

More reading here: https://discordjs.guide/popular-topics/intents.html

### Testing
Testing discord applications end-to-end is frustratingly complicated especially with Slash commands and Typescript. [Cordejs](https://github.com/cordejs/corde) used to somewhat get this done with prefix commands but sadly it doesn't really support Slash commands. An alternative is to mock the whole discordjs client and each of its classes but this is an insane amount of work just so we can test discord itself. 

There is talk that discordjs would eventually support e2e testing natively but in the meantime, this template takes advantage of using [jest](https://jestjs.io/) unit tests. Instead of testing the interaction of discord with the bot, we would test the content that we send to Discord.

For example, a `hello` command can be created as:
```ts
src/commands/hello/index.ts
import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export function generateHelloEmbed(): APIEmbed {
  const embed: APIEmbed = {
    title: 'Hello Command',
    color: 55296,
    description: 'Hi there! (◕ᴗ◕✿)',
    thumbnail: {
      url: 'https://cdn.discordapp.com/attachments/1089616880576245853/1094559253395689562/mitsuha.jpg',
    },
    fields: [
      {
        name: 'Field 1',
        value: 'This is a normal field!',
      },
      {
        name: 'Field 2',
        value: 'This is an inline field!',
        inline: true,
      },
      {
        name: 'Field 3',
        value: 'This is an inline field too!',
        inline: true,
      },
    ],
  };
  return embed;
}

export default {
  data: new SlashCommandBuilder().setName('hello').setDescription('Greets the user!'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const embed = generateHelloEmbed();
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
```
and this can be tested as
```ts
src/commands/hello/index.test.ts
import { generateHelloEmbed } from '.';

describe('Hello Command', () => {
  it('generates an embed correctly', () => {
    const embed = generateHelloEmbed();

    expect(embed).not.toBeUndefined();
  });
  it('displays the correct fields in the embed', () => {
    const embed = generateHelloEmbed();

    expect(embed.description).not.toBeUndefined();
    expect(embed.color).not.toBeUndefined();
    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields.length).toBe(3);
  });
});
```

### Releasing
This template uses [Auto](https://intuit.github.io/auto/index) to automate its release process. It's not necessary to follow it since any process suitable for you can work but if you decide to use auto, you would need to first create a [github token that has repo access](https://intuit.github.io/auto/docs/welcome/getting-started#2-configure-environment-variables). Then create a `.env` file with a `GH_TOKEN` variable that stores your token
```
.env
GH_TOKEN='Your Token Here'
```
You would then need to create your project's labels. These labels are necessary in your pull requests as they keep track of your project's version.
```
yarn auto create-labels //Creates the labels defined in .autorc
```
Note that this script might throw an error if there are duplicate labels in your project already; this is fine to ignore.

Finally during release, you can just do `yarn release` which will generate changelogs and bump up the version number based on previous pull requests

![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/51889a7a-99ba-43e7-bed9-fceb01e04424)

### Deployment
There's no deployment process to follow for this template as frankly that should be up to you where you want to host your production instance. There is however a workflow setup that runs whenever a release gets published. It only really sends a success notification to a discord channel through a webhook currently but it's expected to have your deployment process before it.

If you do want to follow this workflow, this is the only time you're required to add a [Github Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) called `DISCORD_NOTIFICATION_WEBHOOK` to your repo with a value of a [Discord webhook url](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

I personally deploy to [DigitalOcean droplets](https://www.digitalocean.com/products/droplets) and use pm2 to start the bot (hence the `deploy.config.js`). Example workflow:
```yml
- name: Logs in to DigitalOcean droplet and deploy changes
        uses: appleboy/ssh-action@v0.1.8
        with:
          host: ${{ secrets.DO_HOST }}
          username: ${{ secrets.DO_USERNAME }}
          password: ${{ secrets.DO_PASSWORD }}
          script: |
            export NVM_DIR=~/.nvm
            source ~/.nvm/nvm.sh
            nvm install 16.13.0
            pm2 stop MyApp
            pm2 delete MyApp
            cd MyApp
            git restore .
            git clean -f
            git checkout develop
            git pull
            git fetch --tags
            git branch | grep -v "develop" | xargs git branch -D            
            git checkout tags/${{ github.ref_name }} -b prod/${{ github.ref_name }}
            echo "${{ secrets.ENVIRONMENT_PROD }}" > src/config/environment.ts
            yarn update:version
            yarn install
            rm -R dist
            yarn build
            pm2 start deploy.config.js --env prod
``` 

## Advanced Features
By default, this template can be immediately used and expanded upon without any of the fancy features below. However if you want to use a specific feature or even all of them, it's pretty straightforward by defining the relevant environment variables attached to its corresponding feature

### Booting Up Notifications
Sends a message to a discord channel when the bot successfully boots up. Requires a Discord Channel ID.
```ts
src/config/environment.ts
export const BOOT_NOTIFICATION_CHANNEL_ID = 'A Discord Channel ID';
```
![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/a95f9039-1442-4656-b282-fdeae1746387)

### Server Notifications
Sends a message embed with relevant server data whenever the bot gets invited or kicked from a server. Requires a Discord Channel Webhook URL.
```ts
src/config/environment.ts
export const GUILD_NOTIFICATION_WEBHOOK_URL = 'A Discord Channel Webhook URL';
```
![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/a1afeb67-8c4e-42d9-b5e3-96edcbe6f570)

### Error Notifications
Sends a message embed with relevant error data whenever an error occurs in the bot. Requires a Discord Channel Webhook URL.
```ts
src/config/environment.ts
export const ERROR_NOTIFICATION_WEBHOOK_URL = 'A Discord Channel Webhook URL';
```
![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/a98f0f1d-7e02-469b-82b1-e447ef682e5a)

### Database
Use a [PostgreSQL](https://www.postgresql.org/) database to store relevant server data using [node-postgres](https://node-postgres.com/). By default this only handles server data but it can be expanded to store any kind. Requires a PostgreSQL database config.
```ts
export const DATABASE_CONFIG = {
  database: '',
  host: '',
  user: '',
  port: 1234,
  password: '',
  ssl: {
    rejectUnauthorized: false
  }
}
```

I personally use [DigitalOcean databases](https://www.digitalocean.com/products/managed-databases) for the ease-of-use and also since a requirement for a Discord bot to get verified is to have stored data to be encrypted which DigitalOcean does. A bit unrelated but I also like [Trevor](https://trevor.io/) for data visualisation.

### Product Usage Tracking
Use [Mixpanel](https://mixpanel.com/) to track product usage and user analytics. Requires a Mixpanel Project Token.
```ts
export const MIXPANEL_ID = 'Mixpanel Project Token'
```
![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/f8b25e13-591e-403f-8a2c-72f20c1eebe8)

### TopGG Server No. Tracking
Sends server number updates to [Top.gg](https://top.gg/), an app directory for Discord bots. Only useful if you decide to market your bot to their website. Requires an approved bot in Top.gg and a Top.gg bot token.
```ts
export const TOP_GG_TOKEN = 'Topgg bot token';
```
![image](https://github.com/vexuas/djs-typescript-template/assets/42207245/8c9431ac-f2ed-41ce-8d24-846e65a7bb49)

### Full Environment File
If you decide to use all the features above or just want to follow how I structure my environment file, this is how it'll look like:
```ts
const env = process.env.BOT_ENV || 'dev';

type EnvironmentVariables = {
  ENV: 'prod' | 'dev';
  BOT_TOKEN: string;
  BOT_ID: string;
  GUILD_ID: string;
  MIXPANEL_ID?: string;
  TOP_GG_TOKEN?: string;
  GUILD_NOTIFICATION_WEBHOOK_URL?: string;
  ERROR_NOTIFICATION_WEBHOOK_URL?: string;
  BOOT_NOTIFICATION_CHANNEL_ID?: string;
  DATABASE_CONFIG?: DatabaseConfig | null;
};
type DatabaseConfig = {
  database: string;
  host: string;
  user: string;
  port: number;
  password: string;
  ssl: {
    rejectUnauthorized: boolean;
  };
};
const initialiseEnvironment = (): EnvironmentVariables => {
  if (env === 'prod') {
    return {
      ENV: 'prod',
      BOT_TOKEN: '',
      BOT_ID: '',
      MIXPANEL_ID: '',
      TOP_GG_TOKEN: '',
      GUILD_ID: '',
      GUILD_NOTIFICATION_WEBHOOK_URL: '',
      ERROR_NOTIFICATION_WEBHOOK_URL: '',
      BOOT_NOTIFICATION_CHANNEL_ID: '',
      DATABASE_CONFIG: null,
    };
  }
  return {
    ENV: 'dev',
    BOT_TOKEN: '',
    BOT_ID: '',
    GUILD_ID: '',
    MIXPANEL_ID: '',
    TOP_GG_TOKEN: '',
    GUILD_NOTIFICATION_WEBHOOK_URL: '',
    ERROR_NOTIFICATION_WEBHOOK_URL: '',
    BOOT_NOTIFICATION_CHANNEL_ID: '',
    DATABASE_CONFIG: {
      database: '',
      host: '',
      user: '',
      port: 1234,
      password: '',
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
};

export const {
  ENV,
  BOT_TOKEN,
  MIXPANEL_ID,
  TOP_GG_TOKEN,
  GUILD_ID,
  GUILD_NOTIFICATION_WEBHOOK_URL,
  ERROR_NOTIFICATION_WEBHOOK_URL,
  BOOT_NOTIFICATION_CHANNEL_ID,
  BOT_ID,
  DATABASE_CONFIG,
}: EnvironmentVariables = initialiseEnvironment();
```

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

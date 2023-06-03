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
By default, this template is set up so that it can be immediately used without any of the fancy features below. However if you want to use or follow any of the paradigms, it's as easy as just defining the relevant environment variables attached to its corresponding feature

### Starting the App
### Creating Commands
### Attaching Event Listeners
### Tests
### Workflows
### Releasing

## Advanced Features
### Database
### Product Usage Tracking
### TopGG Server No. Tracking
### Server Notifications
### Error Notifications
### Booting Up Notifications
### Full Usage Environment File


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

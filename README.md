<div align="center">
  <img src="https://cdn.discordapp.com/attachments/1089616880576245853/1094559253395689562/mitsuha.jpg" style="width: 180px" />
</div>

# djs-typescript-template

A complete and opinionated template to create full Discord apps using discordjs and typescript

This project came about from me realising I take a ridiculous amount of time trying to set up a new Discord app from scratch. Not only from initialising the project but also adding the relevant foundations and features that I primarily use. Since most of my coding projects revolve around Discord and me being a sucker for productivity, I decided to create a boilerplate modelled after how I normally develop them.

I'm not sure exactly how much time would be saved but it did feel pretty significant when I used this on [Nino, a random anime image app](https://github.com/vexuas/nino), which took roughly just under a week from initialising the project to having a running production instance. Pretty good numbers if you ask me 🤷‍♂️


## Prerequisites
I wasn't really tailoring this template to be accessible to everyone (since I was creating it more for myself) but I would think overall it's not too complicated. That being said, this does assume you have a good grasp of Typescript or just Javascript in general. Having some experience with creating Discord apps previously does help but not really required.

You would also need the following before getting started:
- Have a Discord Application created from the [Discord Dev Portal](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- Node with a version of at least v16.13.0
- Yarn

## Quick Installation
1. Use this template to create a new repository
2. Clone the new repository and then change directly into it
    - `git clone [your new repo]`
    - `cd [your new repo file]`
3. Install dependencies
    - `yarn intall`
4. Add required environment variables
    - To start your Discord app, you would need the following core environment variables:
        - `ENV`
        - `BOT_TOKEN`
        - `BOT_ID`
        - `GUILD_IDS`
    - Create a `environment.ts` file under `src/config`
        - `mkdir src/config && touch src/config/environment.ts`
    - Export the relevant variables above
    ```
    export const ENV = 'dev';
    export const BOT_TOKEN = 'Your Discord Bot Token';
    export const BOT_ID = 'Your Discord Bot ID';
    export const GUILD_IDS = 'The Discord Server ID you want the bot to register Slash Commands in'
    ```
 5. Start your App
     - `yarn start`

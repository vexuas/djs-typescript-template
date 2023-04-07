const env = process.env.BOT_ENV || 'dev';

type EnvironmentVariables = {
  ENV: 'prod' | 'dev';
  DEFAULT_PREFIX: string;
  BOT_TOKEN: string;
  MIXPANEL_ID?: string;
  TOP_GG_TOKEN?: string;
  GUILD_IDS?: string;
  GUILD_NOTIFICATION_WEBHOOK_URL?: string;
};
const initialiseEnvironment = (): EnvironmentVariables => {
  if (env === 'prod') {
    return {
      ENV: 'prod',
      DEFAULT_PREFIX: '$',
      BOT_TOKEN: '',
      MIXPANEL_ID: '',
      TOP_GG_TOKEN: '',
      GUILD_IDS: '',
      GUILD_NOTIFICATION_WEBHOOK_URL: '',
    };
  }
  return {
    ENV: 'dev',
    DEFAULT_PREFIX: '$',
    BOT_TOKEN: '',
    MIXPANEL_ID: '',
    TOP_GG_TOKEN: '',
    GUILD_IDS: '',
    GUILD_NOTIFICATION_WEBHOOK_URL: '',
  };
};

export const {
  ENV,
  DEFAULT_PREFIX,
  BOT_TOKEN,
  MIXPANEL_ID,
  TOP_GG_TOKEN,
  GUILD_IDS,
  GUILD_NOTIFICATION_WEBHOOK_URL,
}: EnvironmentVariables = initialiseEnvironment();

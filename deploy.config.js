module.exports = {
  apps: [
    {
      name: 'MyApp',
      script: './dist/App.js',
      watch: false,
      env: {
        BOT_ENV: 'dev',
      },
      env_prod: {
        BOT_ENV: 'prod',
      },
    },
  ],
};

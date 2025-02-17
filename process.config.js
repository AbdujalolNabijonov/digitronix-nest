module.exports = {
  apps: [
    {
      name: 'digitronix-nest',
      watch: true,
      cwd: './',
      script: './dist/apps/digitronix/main.js',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
};

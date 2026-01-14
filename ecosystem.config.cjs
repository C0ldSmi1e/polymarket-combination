require('dotenv').config();

module.exports = {
  apps: [{
    name: 'polymarket-combination',
    script: 'node_modules/next/dist/bin/next',
    args: `start -p ${process.env.PORT || 3000}`,
    interpreter: 'bun',
    env: {
      NODE_ENV: 'production',
      ...require('dotenv').config().parsed
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}

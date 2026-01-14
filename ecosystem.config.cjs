module.exports = {
  apps: [{
    name: 'polymarket-combination',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    interpreter: 'bun',
    env_file: '.env',
    env: {
      NODE_ENV: 'production'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}

module.exports = {
    apps: [
      {
        name: 'Mapx Frontend',
        port: 3000,
        // cwd: '/home/administrator/www/ict4rm_frontend',
        exec_mode: 'cluster',
        instances: 2, // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start',
        env: {
          NODE_ENV: 'production',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  }
  
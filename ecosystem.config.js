module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : 'nocc-server',
      script    : './dist/index.js',
      cwd: './',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      },
      max_memory_restart: '300M',
      instances  : 2,
      watch: [  // 监控变化的目录，一旦变化，自动重启
        'dist'
      ]
    }
  ]
}

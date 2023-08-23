module.exports = {
  apps: [
    {
      name: "backend",
      script: "index.js",
      cwd: process.env.PWD,
      exec_mode: "cluster",
      instances: process.env.APP_INSTANCES || 2,
      max_restarts: 5,
      min_uptime: "30s",
      wait_ready: true,
      restart_delay: 2000,
      listen_timeout: 10000,
    },
  ],
};

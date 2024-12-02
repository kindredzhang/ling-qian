module.exports = {
  apps: [{
    name: "ling-qian",
    script: "ts-node",
    args: "src/app.ts",
    watch: true,
    env: {
      NODE_ENV: "development",
      PORT: 8036
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 8036
    }
  }]
} 
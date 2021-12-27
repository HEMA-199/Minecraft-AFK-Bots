module.exports = {
    apps : [
        {
          name: "Example_Name", // PM2 name
          script: "./index.js",
          restart_delay: 60000, // Restart time (1 minute wait after sleep exit)
          watch: true,
          env: {
            "NAME": "Example farmer", // Bot name ingame
            "SERVER": "example.minecraftserver.com" // Server ip address
          }
        }
    ]
  }
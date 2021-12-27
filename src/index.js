const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: process.env.SERVER,
  username: process.env.NAME,
})

const botName = process.env.NAME;

const spawn = new Date();
const spawnDate = `${spawn.getFullYear()}-${spawn.getMonth()+1}-${spawn.getDate()}`;
const spawnTime = `${spawn.getHours()}:${spawn.getMinutes()}`;

bot.once('spawn', async () => {
  // Sucessfully logged in with XY at XY
  console.log(`${botName} - Sikeres belépés ${spawnDate} ${spawnTime}-kor`);
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return

  // Time difference calculation
  const endTime = new Date();
  let timeDiff = endTime - spawn;
  timeDiff /= 1000;

  // Get seconds
  const diffSeconds = Math.round(timeDiff % 60);
  timeDiff = Math.floor(timeDiff / 60);

  // Get minutes
  const diffMinutes = Math.round(timeDiff % 60);
  timeDiff = Math.floor(timeDiff / 60);

  // Get hours
  const diffHours = Math.round(timeDiff % 24);
  timeDiff = Math.floor(timeDiff / 24);

  //  Get days
  const diffDays = timeDiff;

  switch (message) {
    case 'uptime':
      if(diffDays >= 1) { // Longer than 1 day
        bot.chat(`${diffDays} nap ${diffHours} óra ${diffMinutes} perc ${diffSeconds} másodperce aktív ${botName} a szerveren`);
        break;
      } else  if(diffHours >= 1) { // Longer than 1 hour
        bot.chat(`${diffHours} óra ${diffMinutes} perc ${diffSeconds} másodperce aktív ${botName} a szerveren`);
        break;
      } else if(diffMinutes >= 1) { // Longer than 1 minute
        bot.chat(`${diffMinutes} perc ${diffSeconds} másodperce aktív ${botName} a szerveren`);
        break;
      } else { // Default time
        bot.chat(`${diffSeconds} másodperce aktív ${botName} a szerveren`);
        break;
      }
    case 'sleep':
      console.log(`${botName} - Alvás parancs végrehajtása folyamatban...`);
      console.log(`${botName} - Kilépés ${spawnDate} ${spawnTime}-kor. 1 perc múlva újracsatlakozási kísérlet!`);
      process.exit(1); // Exit then wait X time to reconnect (time can be set in the config)
  }
})

// Log errors and kick reasons:
bot.once('kicked', console.log)
bot.once('error', console.log)
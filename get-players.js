import 'dotenv/config';
import fs from 'fs';
import chalk from 'chalk';
import clear from 'clear';
import { sleep } from './utils/sleep.js';
import { Timer } from './utils/timer.js';
import { showBanner } from './utils/show-banner.js';

const { API_KEY, QUEUE, TIER, DIVISION, REQUEST_DELAY, PLAYER_LIMIT } = process.env;

async function getPlayers(queue, tier, division) {
  const timer = new Timer();

  let currentPage = 1;
  let continuePlayerLoop = true;
  let playerList = [];
  let serializedPlayers = [];

  clear();
  timer.start();

  showBanner();

  console.log(chalk.cyan('=> GET PLAYERS'))

  while (continuePlayerLoop) {
    console.log(`- page ${currentPage}`)

    const response = await fetch(`https://br1.api.riotgames.com/lol/league/v4/entries/${queue}/${tier}/${division}?api_key=${API_KEY}&page=${currentPage}`)

    await sleep(REQUEST_DELAY);

    const data = await response.json();

    if (data.length !== 0) {
      playerList = [...playerList, ...data];

      console.log(` |- ${data.length} new players`)
      console.log(` |- ${playerList.length} total players`)
      console.log(` |- Current time: ${timer.getElapsedTimeFormatted()}`)

      currentPage++;
    }

    if (data.length === 0 || playerList.length >= PLAYER_LIMIT){
      continuePlayerLoop = true;
      break;
    }
  }
  
  console.log(chalk.cyan('=> GET EXTRA INFO FROM PLAYERS'))

  for (let i = 0; i < playerList.length; i++) {
    const player = playerList[i];
    console.log(`- player ${i + 1} of ${playerList.length} (${player.summonerName})`)
    console.log(` |- Current time: ${timer.getElapsedTimeFormatted()}`)

    const response = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${player.summonerName}?api_key=${API_KEY}`)

    await sleep(REQUEST_DELAY);

    const { puuid, accountId, id } = await response.json();

    serializedPlayers[i] = {
      ...player,
      puuid,
      accountId,
      id
    }

    if (serializedPlayers.length == PLAYER_LIMIT) {
      break;
    }
  }

  console.log(chalk.cyan('=> WRITE JSON FILE'))
  // write a json file with the data
  fs.writeFile(`./data/${queue}-${tier}-${division}-entries.json`, JSON.stringify(serializedPlayers), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  
  timer.stop();
  console.log(`=> ⏱️- ELAPSED TIME: ${timer.getElapsedTimeFormatted()}`);
}

getPlayers(QUEUE, TIER, DIVISION);

import 'dotenv/config';
import fs from 'fs';
import chalk from 'chalk';
import clear from 'clear';

import { LeagueOfLegendsApi } from './services/leagueOfLegendsApi.js';

import { Timer } from './utils/timer.js';
import { showBanner } from './utils/show-banner.js';

const { QUEUE, TIER, DIVISION, PLAYER_LIMIT } = process.env;

async function getPlayers() {
  const timer = new Timer();

  let currentPage = 1;
  let playerList = [];
  let serializedPlayers = [];
  let leagueOfLegendsApi = new LeagueOfLegendsApi();

  clear();
  timer.start();
  showBanner();
  
  console.log(chalk.cyan('=> SETTINGS'))
  console.log(` |- QUEUE: ${QUEUE}`)
  console.log(` |- TIER: ${TIER}`)
  console.log(` |- DIVISION: ${DIVISION}`)
  console.log(` |- PLAYER_LIMIT: ${PLAYER_LIMIT}`)

  console.log(chalk.cyan('=> GET PLAYERS'))

  while (true) {
    const players = await leagueOfLegendsApi.getPlayers(QUEUE, TIER, DIVISION, currentPage);

    if (players.length !== 0) {
      playerList = [...playerList, ...players];

      console.log(` |- ${players.length} new players`)
      console.log(` |- ${playerList.length} total players`)
      console.log(` |- Current time: ${timer.getElapsedTimeFormatted()}`)

      currentPage++;
    }

    if (players.length === 0 || playerList.length >= PLAYER_LIMIT){
      break;
    }
  }
  
  console.log(chalk.cyan('=> GET EXTRA INFO FROM PLAYERS'))

  for (let i = 0; i < playerList.length; i++) {
    const player = playerList[i];

    console.log(`- #${i + 1} of ${playerList.length} (${player.summonerName})`)
    console.log(` |- Current time: ${timer.getElapsedTimeFormatted()}`)

    const { puuid, accountId, id } = await leagueOfLegendsApi.getPlayerInfoBySummonerName(player.summonerName);

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
  fs.writeFile(`./data/${QUEUE}-${TIER}-${DIVISION}-entries.json`, JSON.stringify(serializedPlayers), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  
  timer.stop();

  console.log(`=> ⏱️- ELAPSED TIME: ${timer.getElapsedTimeFormatted()}`);
}

getPlayers();

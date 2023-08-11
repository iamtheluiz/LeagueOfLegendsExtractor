import 'dotenv/config';
import fs from 'fs';
import chalk from 'chalk';
import clear from 'clear';

import { LeagueOfLegendsApi } from './services/leagueOfLegendsApi.js';

import { matchSerializer } from './serializers/matchSerializer.js';

import { Timer } from './utils/timer.js';
import { showBanner } from './utils/show-banner.js';

const { QUEUE, TIER, DIVISION, MATCHES_PER_PLAYER, MATCH_LIMIT } = process.env;

let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
oneMonthAgo = Math.ceil(oneMonthAgo / 1000);

// Read json file and store in variable
const players = JSON.parse(fs.readFileSync(`./data/${QUEUE}-${TIER}-${DIVISION}-entries.json`, 'utf8'));

let matches = [];
let breakLoop = false;

async function getMatches() {
  const timer = new Timer();

  let leagueOfLegendsApi = new LeagueOfLegendsApi();

  clear();
  timer.start();
  showBanner();
  
  console.log(chalk.cyan('=> SETTINGS'))
  console.log(` |- QUEUE: ${QUEUE}`)
  console.log(` |- TIER: ${TIER}`)
  console.log(` |- DIVISION: ${DIVISION}`)
  console.log(` |- MATCHES_PER_PLAYER: ${MATCHES_PER_PLAYER}`)
  console.log(` |- MATCH_LIMIT: ${MATCH_LIMIT}`)

  console.log(`=> LOADED ${players.length} PLAYERS`)

  for (let i = 0; i < players.length; i++) {
    const playerMatches = await leagueOfLegendsApi.getMatchesByPuuid(players[i].puuid, MATCHES_PER_PLAYER, oneMonthAgo);

    console.log(`- player ${i + 1} of ${players.length} (${players[i].summonerName}) => ${playerMatches.length} matches`)
    
    for (let j = 0; j < playerMatches.length; j++) {
      const matchId = playerMatches[j];

      console.log(` |- match ${j + 1} of ${playerMatches.length} (#${matches.length + 1} - ${matchId})`)
      console.log(` |-> Current time: ${timer.getElapsedTimeFormatted()}`)

      if (!matches.map(match => match.matchId).includes(matchId)) {
        const match = await leagueOfLegendsApi.getMatchById(matchId);

        let serializedMatchInfo = matchSerializer(match);

        matches.push(serializedMatchInfo);
      }

      if (matches.length == MATCH_LIMIT) {
        breakLoop = true;
        break;
      }
    }

    if (breakLoop) {
      break;
    }
  }

  console.log('=> WRITE JSON FILE')

  // write a json file with the data
  fs.writeFile(`./data/${QUEUE}-${TIER}-${DIVISION}-matches.json`, JSON.stringify(matches), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  timer.stop();
  console.log(`=> ⏱️- ELAPSED TIME: ${timer.getElapsedTimeFormatted()}`);
}

getMatches();
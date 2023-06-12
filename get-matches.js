import 'dotenv/config';
import fs from 'fs';
import { sleep } from './utils/sleep.js';
import { Timer } from './utils/timer.js';

const { API_KEY, QUEUE, TIER, DIVISION, REQUEST_DELAY, MATCHES_PER_PLAYER, MATCH_LIMIT } = process.env;

let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
oneMonthAgo = Math.ceil(oneMonthAgo / 1000);

// Read json file and store in variable
const players = JSON.parse(fs.readFileSync(`./data/${QUEUE}-${TIER}-${DIVISION}-entries.json`, 'utf8'));

let matches = [];
let breakLoop = false;

async function getMatches() {
  const timer = new Timer();

  timer.start();
  console.log(`=> LOADED ${players.length} PLAYERS`)

  for (let i = 0; i < players.length; i++) {
    const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${players[i].puuid}/ids?start=0&count=${MATCHES_PER_PLAYER}&type=ranked&startTime=${oneMonthAgo}&api_key=${API_KEY}`)

    await sleep(REQUEST_DELAY);

    const data = await response.json();

    console.log(`- player ${i + 1} of ${players.length} (${players[i].summonerName}) => ${data.length} matches`)
    
    for (let j = 0; j < data.length; j++) {
      const matchId = data[j];

      console.log(` |- match ${j + 1} of ${data.length} (#${matches.length + 1} - ${matchId})`)
      console.log(` |-> Current time: ${timer.getElapsedTimeFormatted()}`)

      if (!matches.map(match => match.matchId).includes(matchId)) {
        const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`)

        await sleep(REQUEST_DELAY);

        const match = await response.json();

        let serializedMatchInfo = {
          matchId: match.metadata.matchId,
          gameMode: match.info.gameMode,
          gameType: match.info.gameType,
          gameVersion: match.info.gameVersion,
          mapId: match.info.mapId,
          participants: match.info.participants.map(participant => {
            return {
              puuid: participant.puuid,
              summonerName: participant.summonerName,
              teamId: participant.teamId,
              team: participant.teamId === 100 ? 'blue' : 'red',
              championId: participant.championId,
              champLevel: participant.champLevel,
              championName: participant.championName,
              kills: participant.kills,
              deaths: participant.deaths,
              assists: participant.assists,
              totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
              damageDealtToObjectives: participant.damageDealtToObjectives,
              totalMinionsKilled: participant.totalMinionsKilled,
              goldEarned: participant.goldEarned,
              visionScore: participant.visionScore,
              dragonKills: participant.dragonKills,
              baronKills: participant.baronKills,
              turretKills: participant.turretKills,
              firstBloodKill: participant.firstBloodKill,
              firstTowerKill: participant.firstTowerKill,
              win: participant.win,
            }
          }),
          teams: match.info.teams.map(team => {
            return {
              teamId: team.teamId,
              team: team.teamId === 100 ? 'blue' : 'red',
              champion: team.objectives.champion.kills,
              baron: team.objectives.baron.kills,
              dragon: team.objectives.dragon.kills,
              inhibitor: team.objectives.inhibitor.kills,
              tower: team.objectives.tower.kills,
              win: team.win
            }
          })
        };

        matches.push(serializedMatchInfo);
      }

      if (matches.length === MATCH_LIMIT) {
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
import 'dotenv/config';
import { sleep } from '../utils/sleep.js';

const API_KEY = process.env.API_KEY;
const REQUEST_DELAY = process.env.REQUEST_DELAY;

export class LeagueOfLegendsApi {
  constructor() {
  }

  async getMatchesByPuuid(puuid, count, startTime) {
    const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&type=ranked&startTime=${startTime}&api_key=${API_KEY}`);

    await sleep(REQUEST_DELAY);

    const data = await response.json();

    return data;
  }

  async getMatchById(matchId) {
    const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`);

    await sleep(REQUEST_DELAY);

    const data = await response.json();

    return data;
  }

  async getPlayers(queue, tier, division, page) {
    const response = await fetch(`https://br1.api.riotgames.com/lol/league/v4/entries/${queue}/${tier}/${division}?api_key=${API_KEY}&page=${page}`);

    await sleep(REQUEST_DELAY);

    const data = await response.json();

    return data;
  }

  async getPlayerInfoBySummonerName(summonerName) {
    const response = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`);

    await sleep(REQUEST_DELAY);

    const data = await response.json();

    return data;
  }
}
export function matchSerializer(match) {
  return {
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
  }
}
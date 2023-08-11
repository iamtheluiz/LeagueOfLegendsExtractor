# 📊 League of Legends Extractor

Data extraction project from League of Legends ClientAPI.

<p align="center">
  <img alt="Javascript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img alt="Node" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

## 📝 Table of Contents

- [Google Colab Notebook](#-google-colab-notebook)
- [Technologies](#-technologies)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Authors](#-authors)
- [License](#-license)

## 📊 Google Colab Notebook

This project was used as a base for a Google Colab Notebook that can be found [here](https://colab.research.google.com/drive/1uObZXI2RN4CGHkV6g2UPrGblnyZ50nK5?usp=sharing).

## 💻 Technologies

* [Node](https://nodejs.org/en/)

## 🏃 Getting Started

First, clone this repository and access the created folder:

```bash
# Cloning repository
git clone https://github.com/iamtheluiz/LeagueOfLegendsExtractor.git

cd LeagueOfLegendsExtractor/
```

Inside the folder, install all project dependencies:

```bash
npm install
# or
yarn install
```

Create a ".env" file inside the project root folder, following the ".env.example" structure.

## 👨🏽‍💻 Usage

To run this project in a local environment use:

```bash
node get-players.js
```

After running, wait the script and you will have a folder "/data" in your project root with JSON files with extracted data.

The command above will generate a JSON file in the following format:

```JSON
[
  {
    "leagueId": "",
    "queueType": "",
    "tier": "",
    "rank": "",
    "summonerId": "",
    "summonerName": "",
    "leaguePoints": 0,
    "wins": 0,
    "losses": 0,
    "veteran": false,
    "inactive": false,
    "freshBlood": false,
    "hotStreak": false,
    "puuid": "",
    "accountId": "",
    "id": ""
  }
]
```

It's possible to get matches information from the previous list by using the command:

```bash
node get-matches.js
```

The command above will generate a JSON file in the following format:

```JSON
[
  {
    "matchId": "",
    "gameMode": "CLASSIC",
    "gameType": "MATCHED_GAME",
    "gameVersion": "13.11.513.8260",
    "mapId": 11,
    "participants": [
      {
        "puuid": "",
        "summonerName": "",
        "teamId": 100,
        "team": "blue",
        "championId": 83,
        "champLevel": 13,
        "championName": "Yorick",
        "kills": 1,
        "deaths": 4,
        "assists": 2,
        "totalDamageDealtToChampions": 5105,
        "damageDealtToObjectives": 7156,
        "totalMinionsKilled": 125,
        "goldEarned": 7650,
        "visionScore": 11,
        "dragonKills": 0,
        "baronKills": 0,
        "turretKills": 2,
        "firstBloodKill": false,
        "firstTowerKill": false,
        "win": true
      },
      {
        "puuid": "",
        "summonerName": "",
        "teamId": 200,
        "team": "red",
        "championId": 48,
        "champLevel": 14,
        "championName": "Trundle",
        "kills": 6,
        "deaths": 3,
        "assists": 1,
        "totalDamageDealtToChampions": 16383,
        "damageDealtToObjectives": 5416,
        "totalMinionsKilled": 188,
        "goldEarned": 10761,
        "visionScore": 13,
        "dragonKills": 0,
        "baronKills": 0,
        "turretKills": 2,
        "firstBloodKill": false,
        "firstTowerKill": false,
        "win": false
      }
    ],
    "teams": [
      {
        "teamId": 100,
        "team": "blue",
        "champion": 34,
        "baron": 0,
        "dragon": 2,
        "inhibitor": 0,
        "tower": 6,
        "win": true
      },
      {
        "teamId": 200,
        "team": "red",
        "champion": 21,
        "baron": 0,
        "dragon": 0,
        "inhibitor": 0,
        "tower": 2,
        "win": false
      }
    ]
  },
```

## 💼 Authors

* **Luiz Gustavo** - *Development* - [iamtheluiz](https://github.com/iamtheluiz)
  * Website: https://iamtheluiz.github.io
  * Github: [@iamtheluiz](https://github.com/iamtheluiz)
  * LinkedIn: [Luiz Gustavo da Silva Vasconcellos](https://www.linkedin.com/in/luiz-gustavo-da-silva-vasconcellos-05192a192?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BbQkVQ3sTTv6XCn%2FiToGGcA%3D%3D)

## 📃 License

This project is under the GNU License - see the [LICENSE](LICENSE) file for details.

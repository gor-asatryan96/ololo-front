import React from 'react'
import { useLanguageData } from '../../../context/LanguageProvider'
import classes from './HowToPlay.module.scss'

const howToStartList = [
  "Click Join and wait for an opponent or join an already waiting player.",
  "Before joining the game, a request is sent to the other player asking if they want to join the round or not.",
  "If a pair is not made in 5 minutes, the system closes automatically and returns your bet amount.",
  "The game starts when both players connect to the table after choosing between stone/paper/scissors in 2 minutes.",
  "If the bet is not placed within those 2 minutes, the player loses the game.",
]

const whoWinsParagraphs = [
  "Scissors beat Paper",
  "Paper beats Rock",
  "Rock beats Scissors",
]

const whoWinsList = [
  "Each game has only 1 round and 1 winner.",
  "After the first round, the same participants can continue the game together by paying the same price for each round.",
  "The player can have a maximum of 2 opened cash tables simultaneously.",
]

const forExampleParagraphs = [
  "Players bet TZS 100 per round each. One of them chooses Rock, and the other one chooses Paper. The one showing Paper wins TZS 190.",
  "(TZS 100)  Player 1 (Stone) VS (Paper) Player 2  (TZS 100) = (Paper) Player 2 takes TZS 190",
  "TZS 10 (5%) is taken as a commission*",
]

const noteList = [
  "If a disconnection occurs after an active game round and your bets are accepted by the server, the game will proceed as normal. Any winnings will be processed according to the game result, regardless of the disconnection.",
  "For every game, in case of any divergences between Swahili and English, the English text is considered the original.",
  "The organizer can make changes in the game, informing the participants in advance.",
]

const HowToPlay = () => {
  const { t } = useLanguageData()
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <div className={classes.title}>
          {t['Ololo is a 2-player, real-time game.']}
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.title}>
          {t['How to start:']}
        </div>
        <ul className={classes.list}>
            {howToStartList.map(item => (
              <li key={item} className={classes.listItem}>{t[item]}</li>
            ))}
        </ul>
      </div>
      <div className={classes.section}>
        <div className={classes.title}>
          {t['Who wins?']}
        </div>
        <div className={classes.paragraphs}>
            {whoWinsParagraphs.map(par => (
              <p key={par} className={classes.paragraph}>{t[par]}</p>
            ))}
        </div>
        <ul className={classes.list}>
            {whoWinsList.map(item => (
              <li key={item} className={classes.listItem}>{item}</li>
            ))}
        </ul>
      </div>
      <div className={classes.section}>
        <div className={classes.title}>
          {t['For example:']}
        </div>
        <div className={classes.paragraphs}>
            {forExampleParagraphs.map(par => (
              <p key={par} className={classes.paragraph}>{t[par]}</p>
            ))}
        </div>
      </div>
      <div className={classes.section}>
        <div className={classes.title}>
          {t['Note:']}
        </div>
        <ul className={classes.list}>
            {noteList.map(item => (
              <li key={item} className={classes.listItem}>{item}</li>
            ))}
        </ul>
      </div>
      <div className={classes.section}>
        <div className={classes.title}>
          {t['Good luck!']}
        </div>
      </div>
    </div>
  )
}

export default HowToPlay
<template>
  <img class="form" src="../../public/images_and_icons\form.png">
  <button class="masterybutton" @click="toggleMastery()">
      <img class="masterybuttonimg" src="../../public/images_and_icons\mastery.png" />
  </button>

  <button class="playerbutton" @click="toggleChamp()">
      <img class="playerbuttonimg" src="../../public/images_and_icons\player.png" />
  </button>

  {{ jsonData.teams[0].win }}

  <button class="vote-button1"
    @click="checkwin(jsonData.teams[0].win)"
    :class="{ 'correct': isitcorrect, 'wrong': isitwrong  }"
    :disabled="isitcorrect || isitwrong"
    >WIN</button>
  <button class="vote-button2"
    @click="checkwin(jsonData.teams[1].win)"
    :class="{ 'correct': isitcorrect, 'wrong': isitwrong  }"
    :disabled="isitcorrect || isitwrong"
    >WIN</button>
  
  
    <div class="center">
      <div class="boxcontainer1">
          <div class="champcontainer" v-for="player in jsonData.teams[0].players" :key="player.participantId" @click="showElement(player.participantId)">
            <img class="champimg" :src="`images_and_icons/champs/${player.championName}_0.jpg`"/>
            <img class="rankedborder" :src="`images_and_icons/rankedborders/${player.rank}.png`" />
            <div class="summonername">{{ player.summonerName }}</div>
            <div class="championname" v-if="!isElementVisible[player.participantId]">{{ player.championName }}</div>
            <img class="summoner1" :src="!isElementVisible[player.participantId] ? `images_and_icons/summonerspells/${player.summoner1Id}.png` : ''"/>
            <img class="summoner2" :src="!isElementVisible[player.participantId] ? `images_and_icons/summonerspells/${player.summoner2Id}.png` : ''"/>
            <img class="perkimg1" :src="!isElementVisible[player.participantId] ? `images_and_icons/perks/Styles/${player.perks.styles[0].style}/${player.perks.styles[0].selections[0].perk}.png` : ''"/>
            <img class="perkimg2" :src="!isElementVisible[player.participantId] ? `images_and_icons/perks/Styles/${player.perks.styles[1].style}.png`: ''"/>
            <div :class="{'gradient': !isElementVisible[player.participantId]}"></div>

            
  
            <div v-if="isElementVisible[player.participantId]" class="hidden-element">
              <img :src="`images_and_icons/masteryicons/${player.championlevel}.png`" class="masteryicon"/>
              <div class="masterylevel">Level {{ player.championlevel }}</div>
              <div class="championpoints">{{ player.championPoints }} pts</div>
              <div class="gradient2"></div>
            </div>
          </div>
      </div>
      <div class="boxcontainer2">
        <div class="champcontainer" v-for="player in jsonData.teams[1].players" :key="player.participantId" @click="showElement(player.participantId)">
          <img class="champimg" :src="`images_and_icons/champs/${player.championName}_0.jpg`" />
          <img class="rankedborder" :src="`images_and_icons/rankedborders/${player.rank}.png`" />
          <div class="summonername">{{ player.summonerName }}</div>
          <div class="championname" v-if="!isElementVisible[player.participantId]">{{ player.championName }}</div>
          <img class="summoner1" :src="!isElementVisible[player.participantId] ? `images_and_icons/summonerspells/${player.summoner1Id}.png` : ''"/>
          <img class="summoner2" :src="!isElementVisible[player.participantId] ? `images_and_icons/summonerspells/${player.summoner2Id}.png` : ''"/>
          <img class="perkimg1" :src="!isElementVisible[player.participantId] ? `images_and_icons/perks/Styles/${player.perks.styles[0].style}/${player.perks.styles[0].selections[0].perk}.png` : ''" />
          <img class="perkimg2" :src="!isElementVisible[player.participantId] ? `images_and_icons/perks/Styles/${player.perks.styles[1].style}.png`: ''" />
          <div class="gradient"> 
          </div>
  
          <div v-if="isElementVisible[player.participantId]" class="hidden-element">
              <img :src="`images_and_icons/masteryicons/${player.championlevel}.png`" class="masteryicon"/>
              <div class="masterylevel">Level {{ player.championlevel }}</div>
              <div class="championpoints">{{ player.championPoints }} pts</div>
              <div class="gradient2"></div>
          </div>
        </div>
      </div>
    </div>
    </template>
      
    <script>
    import jsonMatch from '../../public/json-files/match2.json'
      
      export default {
          data() {
              return {
                jsonData: null,
                counter: 0,
                correct: false,
                isElementVisible: [false, false, false, false, false, false, false, false, false, false],
                isitcorrect: false,
                isitwrong: false
              }
          },
          created() {
          this.setMatchIndex();
          },
          methods: {
  
          toggleMastery(){
            for (let i = 1; i < 11; i++) {
              this.isElementVisible[i] = true;
            }
          },
  
          toggleChamp(){
            for (let i = 1; i < 11; i++) {
              this.isElementVisible[i] = false;
            }
          },
  
          showElement(participantId) {
            if (this.isElementVisible[participantId] != true){
            this.isElementVisible[participantId] = true;}
            else {this.isElementVisible[participantId] = false}
            },
            
          toggleFullscreen() {
            const element = document.documentElement;
            if (!document.fullscreenElement) {
              if (element.requestFullscreen) {
                element.requestFullscreen();
              }
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              }
            }
          },
  
          checkwin(teamresult){
            if (teamresult) {
              this.isitcorrect = true;
              this.counter++;
              setTimeout(() => {
                this.isitcorrect = false;
                this.setMatchIndex();
              }, 2000);
            } else  {
            this.counter = 0;
            this.isitwrong = true;
            setTimeout(() => {
                this.isitwrong = false;
                this.setMatchIndex();
              }, 2000);
            }
          },
  
          setMatchIndex(){
            const randomIndex = Math.floor(Math.random() * jsonMatch.length);
            this.jsonData = jsonMatch[randomIndex];
            console.log(this.jsonData.gameId)
          }
    },
  }
    </script>
    
    <style scoped>
  .form {
    position: absolute;
    top: 0;
    left: 44%;
    width: 12vw;
  }

  button.masterybutton {
    width: 4vw;
    position: absolute;
    top: 0.5%;
    left: 45.5%;
    background: none;
    border: none;
    margin: 0 !important;
    padding: 0 !important;
    cursor: pointer;
  }
  button.playerbutton {
    width: 4vw;
    position: absolute;
    top: 0.5%;
    left: 49.5%;
    background: none;
    border: none;
    margin: 0 !important;
    padding: 0 !important;
    cursor: pointer;
  }

  .masterybuttonimg, .playerbuttonimg {
    height: 1.6vh;
    opacity: 0.7
  }

  .masterybuttonimg:hover, .playerbuttonimg:hover {
    opacity: 1
  }



  .hidden-element {
  display: contents;
  }
  
  
  button.vote-button1 {
      position: fixed;
      top: 24.5vh;
      left: 17vh;
      width: 35vh;
      height: 2.5vw;
      rotate: 270deg;
      text-align: center;
      font-size: 0.85vw;
      padding: 0;
    }
    button.vote-button2 {
      position: fixed;
      top: 67.5vh;
      right: 17vh;
      width: 35vh;
      height: 2.5vw;
      rotate: 90deg;
      text-align: center;
      font-size: 0.85vw;
      padding: 0;
  }
  
    button.vote-button1:active, button.vote-button2:active {
      transform: translateY(3px);
    }

    button.vote-button1::after, button.vote-button1::before, button.vote-button2::after, button.vote-button2::after {
      border-radius: 3px;
    }

    .vote-button1,.vote-button2 {
      background-color: transparent;
      color: #ffffff;
    }
    .vote-button1:hover,.vote-button2:hover {
      background-color: transparent;
      box-shadow: none;
      color: #ffffff;
    }
    .vote-button1::before,.vote-button2::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 3px solid #ffffff;
      transition: opacity 0.3s, border 0.3s;
    }
    .vote-button1:hover::before,.vote-button2:hover::before {
      opacity: 0;
    }
    .vote-button1::after,.vote-button2::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: 3px solid #aa8833;
      opacity: 0;
      z-index: -1;
      transform: scaleX(1.1) scaleY(1.3);
      transition: transform 0.3s, opacity 0.3s;
    }
    .vote-button1:hover::after,.vote-button2:hover::after {
      opacity: 1;
      transform: scaleX(1) scaleY(1);
    }
    .correct, .correct::after {
    background-color: rgb(42, 133, 42);
    transition: background-color 0.3s; /* Adjust the transition duration as needed */
    }

    .wrong, .wrong::after {
    background-color: rgb(173, 48, 48);
    transition: background-color 0.3s; /* Adjust the transition duration as needed */
    }

    .vote-button1:onclick {
    background-color: rgb(42, 133, 42);
    color: #861c1c; /* You can adjust the text color if needed */
    transition: background-color 0.3s; /* Adjust the transition duration as needed */
    }

    
    
    
  
    .center {
      position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
    }
    .summonername{
      position: absolute;
      top: 94%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      font-size: 0.7vw;
      letter-spacing: 0.5px;
      z-index: 3;
    }
    
    .championname{
      position: absolute;
      top: 79%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.75vw;
      letter-spacing: 0.5px;
      z-index: 3;
    }
  
    .masteryicon{
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 20%;
      z-index: 3
    }
  
    .masterylevel{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.75vw;
      letter-spacing: 0.5px;
      z-index: 3;
    }
  
    .championpoints{
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.75vw;
      letter-spacing: 0.5px;
      z-index: 3;
    }
    
  
    .summoner1 {
      position: absolute;
      top: 83%;
      left: 70%;
      height: 5.5%;
      z-index: 3;
    }
    .summoner2 {
      position: absolute;
      top: 83%;
      left: 83%;
      height: 5.5%;
      z-index: 3;
    }
    
    .perkimg1 {
      position: absolute;
      top: 83%;
      left: 8%;
      height: 6.5%;
      z-index: 3;
    }
    .perkimg2 {
      position: absolute;
      top: 85%;
      left: 19%;
      height: 4.5%;
      z-index: 3;
    }
    
    .rankedborder {
      position: absolute;
        top: -6.5%;
        left: -5%;
        width: 110.5%;
        height: 107%;
        -webkit-user-drag: none;
        z-index: 4;
    }
    
    .gradient {
      background-image: linear-gradient(0deg, rgba(1,2,4,1) 0%, rgba(17,20,27,0.9) 70%, rgba(0,0,0,0) 100%);
        position: absolute;
        left: 0%;
        top: 74%;
        z-index: 2;
        height: 25%;
        width: 100%;
    }
  
    .gradient2 {
      background-image: linear-gradient(0deg, rgba(1,2,4,1) 0%, rgba(17,20,27,0.9) 99%, rgba(0,0,0,0) 100%);
        position: absolute;
        left: 0%;
        top: -1%;
        z-index: 2;
        height: 100%;
        width: 100%;
    }
    
    .gameinfos {
      position: absolute;
      width: 20vw;
      align-items:center;
      display:flex;
      left:0;
      top:0;
      bottom:0;
      justify-content: space-evenly;
    }
    </style>
    
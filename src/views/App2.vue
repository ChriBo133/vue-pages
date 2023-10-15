<template>

  <img class="form" src="../../public/images_and_icons\form.png">
  <a @click="toggleMastery()">
      <img class="masterybuttonimg" src="../../public/images_and_icons/mastery.png" />
  </a>
  <a @click="toggleChamp()">
      <img class="playerbuttonimg" src="../../public/images_and_icons\player.png" />
  </a>
  <div class="counter">
    {{ counter }}
  </div>

  <button class="vote-button1"
    @click="checkwin1(jsonData.teams[0].win)"
    :class="{ 'correct1': isitcorrect1, 'wrong1': isitwrong1  }"
    :disabled="isitcorrect2 || isitwrong2 || isitcorrect1 || isitwrong1"
    >WIN</button>
  <button class="vote-button2"
    @click="checkwin2(jsonData.teams[1].win)"
    :class="{ 'correct2': isitcorrect2, 'wrong2': isitwrong2  }"
    :disabled="isitcorrect2 || isitwrong2 || isitcorrect1 || isitwrong1"
    >WIN</button>
  
  
    <div class="center">
      <div class="boxcontainer1">
          <div class="champcontainer" v-for="player in jsonData.teams[0].players" :key="player.participantId" @click="showElement(player.participantId)">
            <img class="champimg" :src="`images_and_icons/champs/${player.championName}_0.jpg`"/>
            <img class="rankedborder" :src="`images_and_icons/rankedborders/${player.rank}.png`" />
            <img class="summbg1" :src="!isElementVisible[player.participantId] ? `images_and_icons/summbg.png` : ''"/>
            <img class="summbg2" :src="!isElementVisible[player.participantId] ? `images_and_icons/summbg.png` : ''" />
            <img class="perkbg1" :src="!isElementVisible[player.participantId] ? `images_and_icons/perkborder.png` : ''"/>
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
          <img class="summbg1" :src="!isElementVisible[player.participantId] ? `images_and_icons/summbg.png` : ''"/>
          <img class="summbg2" :src="!isElementVisible[player.participantId] ? `images_and_icons/summbg.png` : ''" />
          <img class="perkbg1" :src="!isElementVisible[player.participantId] ? `images_and_icons/perkborder.png` : ''"/>
          <div class="summonername">{{ player.summonerName }}</div>
          <div class="championname" v-if="!isElementVisible[player.participantId]">{{ player.championName }}</div>
          <img class="summoner1" :src="!isElementVisible[player.participantId] ? `images_and_icons/summonerspells/${player.summoner1Id}.png` : ''"/>
          <img class="summoner2" :src="!isElementVisible[player.participantId] ? `images_and_icons/summonerspells/${player.summoner2Id}.png` : ''"/>
          <img class="perkimg1" :src="!isElementVisible[player.participantId] ? `images_and_icons/perks/Styles/${player.perks.styles[0].style}/${player.perks.styles[0].selections[0].perk}.png` : ''" />
          <img class="perkimg2" :src="!isElementVisible[player.participantId] ? `images_and_icons/perks/Styles/${player.perks.styles[1].style}.png`: ''" />
          <div class="gradient"> </div>

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
                isitcorrect1: false,
                isitwrong1: false,
                isitcorrect2: false,
                isitwrong2: false,
                bigstatus: false
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
  
          checkwin1(teamresult){
            if (teamresult) {
              this.isitcorrect1 = true;
              this.counter++;
              setTimeout(() => {
                this.isitcorrect1 = false;
                this.setMatchIndex();
                this.bigstatus=false;
              }, 1500);
            } else  {
            this.counter = 0;
            this.isitwrong1 = true;
            setTimeout(() => {
                this.isitwrong1 = false;
                this.setMatchIndex();
                this.bigstatus=false;
              }, 1500);
            }
            this.bigstatus=true;
          },
          checkwin2(teamresult){
            if (teamresult) {
              this.isitcorrect2 = true;
              this.counter++;
              setTimeout(() => {
                this.isitcorrect2 = false;
                this.setMatchIndex();
                this.bigstatus=false;
              }, 1500);
            } else  {
            this.counter = 0;
            this.isitwrong2 = true;
            setTimeout(() => {
                this.isitwrong2 = false;
                this.bigstatus=false;
                this.setMatchIndex();
              }, 1500);
            }
            this.bigstatus=true;
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
.summbg1 {
  position: absolute;
        top: 83%;
        left: 70%;
        height: 6%;
        z-index: 4;
}

.summbg2 {
  position: absolute;
        top: 83%;
        left: 83%;
        height: 6%;
        z-index: 4;
}

.perkbg1 {
  position: absolute;
        top: 82.6%;
        left: 7.7%;
        height: 7.4%;
        z-index: 4;
}


.counter {
    font-size: 5vw;
    position: absolute;
    height: auto;
    width: 99vw;
    text-align: right;
    padding-right: 1vw;
    pointer-events: auto;
    pointer-events: none;
}
  .form {
    position: absolute;
    top: 0;
    left: 44%;
    width: 12vw;
  }
  .masterybuttonimg{
    height: 1.6vh;
    opacity: 0.7;
    position: absolute;
    top: 0.35%;
    left: 47.5%;
    background: none;
    border: none;
    margin: 0 !important;
    padding: 0 !important;
    cursor: pointer;
  }

  .playerbuttonimg { 
    height: 1.6vh;
    opacity: 0.7;
    position: absolute;
    top: 0.35%;
    left: 51%;
    background: none;
    border: none;
    margin: 0 !important;
    padding: 0 !important;
    cursor: pointer;


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

    .vote-button1,.vote-button2 {
      background-color: transparent;
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
      border: 3px solid #eec14e;
      opacity: 0;
      z-index: -1;
      transform: scaleX(1.1) scaleY(1.3);
      transition: transform 0.3s, opacity 0.3s;
    }
    .vote-button1:hover::after,.vote-button2:hover::after {
      opacity: 1;
      transform: scaleX(1) scaleY(1);
    }
    .correct1 {
    background-color: rgb(42, 133, 42);
    color: #ffffff;
    transition: background-color 0.3s;
    }
    .correct1::before, .correct1::after {
      border: 3px solid rgb(42, 133, 42);
      transition: none;
    }

    .wrong1 {
    background-color: rgb(173, 48, 48);
    color: #ffffff;
    transition: background-color 0.3s;
    }
    .wrong1::before, .wrong1::after {
      border: 3px solid rgb(173, 48, 48);
      transition: none;
    }

    .correct2 {
    background-color: rgb(42, 133, 42);
    color: #ffffff;
    transition: background-color 0.3s;
    }
    .correct2::before, .correct2::after {
      border: 3px solid rgb(42, 133, 42);
      transition: none;
    }

    .wrong2 {
    background-color: rgb(173, 48, 48);
    color: #ffffff;
    transition: background-color 0.3s;
    }
    .wrong2::before, .wrong2::after {
      border: 3px solid rgb(173, 48, 48);
      transition: none;
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
      color: #e9e4d9;
    }
    
    .championname{
      position: absolute;
      top: 79%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.75vw;
      letter-spacing: 0.5px;
      z-index: 3;
      color: #e9e4d9;
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
      font-size: 0.65vw;
      letter-spacing: 0.5px;
      z-index: 3;
      color:rgb(187, 185, 185);
    }
    
  
    .summoner1 {
      position: absolute;
    top: 83%;
    left: 70%;
    height: 6%;
    z-index: 3;
    }
    .summoner2 {
      position: absolute;
      top: 83%;
      left: 83%;
      height: 6%;
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
      left: 19.5%;
      height: 4.2%;
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
    
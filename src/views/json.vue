<template>
  
  <label for="selectedOption">Division</label>
    <select v-model="selectedDivision">
      <option value="I">I</option>
      <option value="II">II</option>
      <option value="III">III</option>
      <option value="IV">IV</option>
    </select>

  <label for="selectedOption">Tier</label>
    <select v-model="selectedTier">
      <option value="DIAMOND">DIAMOND</option>
      <option value="EMERALD">EMERALD</option>
      <option value="PLATINUM">PLATINUM</option>
      <option value="GOLD">GOLD</option>
      <option value="SILVER">SILVER</option>
      <option value="BRONZE">BRONZE</option>
      <option value="IRON">IRON</option>
    </select>

  <button @click="getPuiids">Puuids auflisten</button>
  

  <input v-model="inputText" type="text" style="margin-top: 10vh">
  <button @click="handleButtonClick">Text übergeben</button>
  <button @click="manipulateData">Download</button>

  <ul>
      <li v-for="(item, index) in puiidlist" :key="index">{{ item }}</li>
    </ul>

</template>
  
<script>
  
  export default {
    data() {
        return {
          jsonData: null,
          userInput: '',
          modifiedJson: null,
          inputText:'',
          gamesArray: [],
          puiidlist: []
        }
    },
    created() {
    // this.loadJSON();
    },
    methods: {

      getPuiids() {
        this.givePuiids(this.selectedDivision,this.selectedTier);
      },

      givePuiids(selectedDivision, selectedTier){
        fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/RANKED_SOLO_5x5/${selectedTier}/${selectedDivision}?page=1&api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)        
        .then(response => response.json())
        .then(data => {

          for (let i = 0; i<10; i++){
          fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${data[i].summonerId}?api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)
          .then(response => response.json())
          .then(data => {
            this.puiidlist.push(data.puuid)
          })
          }
          
        })
      },

      loadJSON(puuid){
        fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=1&api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)        
        .then(response => response.json())
        .then(data => {

          for (let i = 0; i<data.length; i++){
          fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${data[i]}?api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)
          .then(response => response.json())
          .then(data => {

              delete data.metadata;

              const {info, ...rest} = data; 
              this.modifiedJson = { ...info, ...rest }; // Unnötige Sachen wegkürzen

              this.modifiedJson.teams = [{players:[{},{},{},{},{}], objectives:{}, teamId: 100, win:null},{players:[{},{},{},{},{}], objectives:{}, teamId: 200, win:null}] // Basis-Objekt formulieren

              this.modifiedJson.teams[0].objectives = data.info.teams[0].objectives
              this.modifiedJson.teams[1].objectives = data.info.teams[1].objectives // Objectives initiieren
              this.modifiedJson.teams[0].win = data.info.teams[0].win
              this.modifiedJson.teams[1].win = data.info.teams[1].win // Win-Information initiieren

              for (let i = 0; i<this.modifiedJson.teams.length;i++){
              for (let j = 0; j<this.modifiedJson.teams[0].players.length;j++){
              this.modifiedJson.teams[i].players[j].bans = data.info.teams[i].bans[j]
              }} // Bans initiieren
        
              
              for (let i = 0; i<5;i++){
                this.modifiedJson.teams[0].players[i] = data.info.participants[i]
              } // Spieler-Informationen für Team 1 initiieren

              for (let i = 0; i<5;i++){
                this.modifiedJson.teams[1].players[i] = data.info.participants[5+i]
              } // Spieler-Informationen für Team 2 initiieren

              delete this.modifiedJson.participants; // Alte Spieler-Informationen entfernen

              for (let i = 0; i<5; i++){ 
              fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.info.participants[i].summonerId}?api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)
              .then(response => response.json())
              .then(data => {
                for (let j=0; j<data.length; j++){
                  if (data[j].queueType === 'RANKED_SOLO_5x5'){
                    this.modifiedJson.teams[0].players[i].rank = data[j].tier
                    break;
                  }
                  else {
                    this.modifiedJson.teams[0].players[i].rank = 'UNRANKED'
                      }
                    }            
                })
              }
              for (let i = 0; i<5; i++){ 
              fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.info.participants[5+i].summonerId}?api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)
              .then(response => response.json())
              .then(data => {
                for (let j=0; j<data.length; j++){
                  if (data[j].queueType === 'RANKED_SOLO_5x5'){
                    this.modifiedJson.teams[1].players[i].rank = data[j].tier
                    break;
                  }
                  else {
                    this.modifiedJson.teams[1].players[i].rank = 'UNRANKED'
                      }
                    }            
                })
              }


              for (let i = 0; i<5; i++){ 
              fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${data.info.participants[i].puuid}/by-champion/${data.info.participants[i].championId}?api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)
              .then(response => response.json())
              .then(data => {
                    this.modifiedJson.teams[0].players[i].championlevel = data.championLevel
                    this.modifiedJson.teams[0].players[i].championPoints = data.championPoints.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 3 })
                  }
              )}  

              for (let i = 0; i<5; i++){ 
              fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${data.info.participants[5+i].puuid}/by-champion/${data.info.participants[5+i].championId}?api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)
              .then(response => response.json())
              .then(data => {
                    this.modifiedJson.teams[1].players[i].championlevel = data.championLevel
                    this.modifiedJson.teams[1].players[i].championPoints = data.championPoints.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 3 })
                  }
              )} 


          this.jsonData = this.modifiedJson
              this.gamesArray.push(this.jsonData)
              console.log(this.gamesArray)
          
        })
        }})
      },
       
      manipulateData(){
        console.log("downloading now")
        this.downloadJSON(this.gamesArray, 'modified_data.json')
      },
      handleButtonClick() {
        this.loadJSON(this.inputText);
      },
      downloadJSON(data, filename) {
        const jsonContent = JSON.stringify(data);
        const blob = new Blob([jsonContent], { type: 'application/json' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
    }
  }
</script>

<style scoped>
</style>


<template>

  <input v-model="inputText" type="text" style="margin-top: 10vh">
  <button @click="handleButtonClick">Text übergeben</button>

</template>
  
<script>
  
  export default {
    data() {
        return {
          jsonData: null,
          userInput: '',
          modifiedJson: null,
          inputText:'',
          gamesArray: []
        }
    },
    created() {
    // this.loadJSON();
    },
    methods: {
      async loadJSON(puuid){
        await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)        
        .then(response => response.json())
        .then(async data => {

          for (let i = 0; i<data.length; i++){
          await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/${data[i]}?api_key=RGAPI-24e29f3d-0e9a-4afc-9a35-768e69d98ab6`)
          .then(response => response.json())
          .then(data => {

              delete data.metadata;

              const {info, ...rest} = data;
              this.modifiedJson = { ...info, ...rest };

              this.modifiedJson.teams = [{players:[{},{},{},{},{}], objectives:{}, teamId: 100, win:null},{players:[{},{},{},{},{}], objectives:{}, teamId: 200, win:null}]

              this.modifiedJson.teams[0].objectives = data.info.teams[0].objectives
              this.modifiedJson.teams[1].objectives = data.info.teams[1].objectives
              this.modifiedJson.teams[0].win = data.info.teams[0].win
              this.modifiedJson.teams[1].win = data.info.teams[1].win

              for (let i = 0; i<this.modifiedJson.teams.length;i++){
              for (let j = 0; j<this.modifiedJson.teams[0].players.length;j++){
              this.modifiedJson.teams[i].players[j].bans = data.info.teams[i].bans[j]
              }}

              for (let i = 0; i<5;i++){
                this.modifiedJson.teams[0].players[i] = data.info.participants[i]
              }

              for (let i = 0; i<5;i++){
                this.modifiedJson.teams[1].players[i] = data.info.participants[5+i]
              }

              delete this.modifiedJson.participants;

              this.jsonData = this.modifiedJson
              this.gamesArray.push(this.jsonData)
              console.log(this.gamesArray)
              
            })
          }
          
        })
        this.manipulateData()  
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


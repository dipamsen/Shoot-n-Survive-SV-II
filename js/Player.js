
class Player {
    constructor(){
      this.index = null;
      this.name = null;
      this.rank = null;
      this.character = null;
      this.health = 2000;
      this.x=-100;
      this.y=-100;//800,600 (30,30)(width-30,30),(30,height-30),(width-30,height-30);
      if(this.index !== null){
        var pos= [[30,30],[width-30,30],[30,height-30],[width-30,height-30]]
        var x = 0, y = 1;
        this.x = pos[this.index-1][x]
        this.y = pos[this.index-1][y]
      }
    }
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
    spawn(){
        if(this.index == 1){
          this.x = 30; this.y = 30;
        } else if (player.index == 2){
          this.x = width-30; this.y = 30;
        } else if(this.index == 3){
          this.x = 30; this.y = height-30;
        } else if(player.index == 4){
          this.x = width-30; this.y = height-30;
        }
        this.update();
    }
    update(){
      var playerIndex = "players/player" + this.index;

      database.ref(playerIndex).update({
        name:this.name,
        position:{
            x: this.x,
            y: this.y,
        },
        character: this.character,
        health: this.health,
        index: this.index
      });
    }
    attack() {
      inRange = [];
      for(var plr in allPlayers){
        if(allPlayers[plr].position.x < this.x+50 && allPlayers[plr].position.x>this.x-50
          && allPlayers[plr].position.y<this.y+50 && allPlayers[plr].position.y>this.y-50){
            inRange.push(allPlayers[plr].index);
          }
      }
    }
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }
  
    getPlayersRemaining(){
      database.ref('PlayersRemaining').on("value",(data)=>{
        this.rank = data.val();
      })
    }
  
    static updatePlayersRemaining(rank){
      database.ref('/').update({
        PlayersRemaining: rank,
      });
    }
  }
  
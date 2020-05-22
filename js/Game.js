class Game {
    constructor(){}
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      p1 = createSprite(30,30,20,20);
      //p1.addImage(img1);
      p2 = createSprite(width-30,30,20,20);
      //p2.addImage(img2);
      p3 = createSprite(30,height-30,20,20);
      //p3.addImage(img3);
      p4 = createSprite(width-30,height-30,20,20);
      //p4.addImage(img4);
      playerSprites = [p1, p2, p3, p4];
    }
  
    play(){
      //player.spawn();
      form.hide();
      fill("green");
      Player.getPlayerInfo();
      player.getPlayersRemaining();
      //var position = [[30,30],[width-30, 30],[height-30, 30],[width-30, height-30]]
      if(spawned == false){
        player.spawn();
        spawned = true;
      }
      if(allPlayers !== undefined){
        background(255);
        
        var index = 0;
  
        rect(0,0,width, height);
        var x;
        var y;
        
        for(var plr in allPlayers){
          index = index + 1 ;
          if(player.index == 1){
            x = 30; y = 30;
          } else if (player.index == 2){
            x = width-30; y = 30;
          } else if(player.index == 3){
            x = 30; y = height-30;
          } else if(player.index == 4){
            x = width-30; y = height-30;
          }
          /*if(plr == player1){
            x = 30; y=30;
          } else if(plr == player2){
            x=width-30; y=30;
          } else if(plr == player3){
            x=30; y=height-30;
          }else if(plr == player4){
            x=width-30; y=height-30;
          }*/
          x = allPlayers[plr].position.x;
          y = allPlayers[plr].position.y;

          playerSprites[index-1].x = x
          playerSprites[index-1].y = y;
          

          if (index === player.index){
            player.x=  playerSprites[index-1].x;
            player.y = playerSprites[index-1].y;
            playerSprites[index - 1].shapeColor = "blue";
            camera.position.x = playerSprites[index-1].x;
            camera.position.y = playerSprites[index-1].y;
          }
          
        }
      }
      if(keyIsDown(UP_ARROW) && player.index !== null && gameState === 1){
        //playerSprites[index-1].y -=10;
        //allPlayers[plr].position.y-=10;
        player.y-=10;
        player.update();
      }
      if(keyIsDown(DOWN_ARROW) && player.index !== null && gameState === 1){
        //playerSprites[index-1].y +=10;
        //allPlayers[plr].position.y+=10
        player.y+=10;
        player.update();
      }
      if(keyIsDown(LEFT_ARROW) && player.index !== null && gameState === 1){
        //playerSprites[index-1].x -=10
        //allPlayers[plr].position.x-=10
        player.x-=10;
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW) && player.index !== null && gameState === 1){
        //playerSprites[index-1].x +=10
        //allPlayers[plr].position.x+=10
        player.x+=10;
        player.update();
      }
      if(keyIsDown(32) && player.index !== null && gameState === 1){
        fill('red');
        noStroke()
        rect(player.x-50, player.y-50, 100, 100);
        player.attack();
      }
      if(player.health<=0) {
        gameState = 2;
        player.rank--;
        Player.updatePlayersRemaining(player.rank-1);
      }
      drawSprites();
    }
    end(){
      console.log("GAME OVER!");
      console.log("Rank: " + player.rank);      
    }
  }
  
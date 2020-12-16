class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value", function(data){
            gameState = data.val()
        })
        
    }

    updateState(state){
        database.ref('/').update({
            gameState:state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){ 
                playerCount = playerCountRef.val();
                player.getCount(); 
            }

            form = new Form()
            form.display()

            player1 = createSprite(100,displayHeight/2)
            player1.addImage("player1",soldier1Img)
            player2 = createSprite(displayWidth-100,displayHeight/2)
            //player2.addImage("player2",soldier2Img)

            players=[player1,player2]

            wallGroup = new Group()
            
        }
    }

    play(){
        form.hide()

        image(bgImg,0,0,displayWidth,displayHeight);
        drawSprites();
        Player.getPlayerInfo();

        if(allPlayers != undefined){
            var index = 0
            for(var plr in allPlayers){
                index += 1
                if(index === 1){
                    players[index-1].x = width/4 + allPlayers[plr].distanceX
                    players[index-1].y = height/2 + allPlayers[plr].distanceY
                }
                if(index === 2){
                    players[index-1].x = 3*width/4 + allPlayers[plr].distanceX
                    players[index-1].y = height/2 + allPlayers[plr].distanceY
                }

            }

                
        }
        

        if(keyDown(RIGHT_ARROW) && player.index != null){
            player.distanceX += 10
            player.updatePlayerInfo()
        }

        if(keyDown(LEFT_ARROW) && player.index != null){
            player.distanceX -= 10
            player.updatePlayerInfo()
        }

        if(keyDown(UP_ARROW) && player.index != null){
            player.distanceY -= 10
            player.updatePlayerInfo()
        }

        if(keyDown(DOWN_ARROW) && player.index != null){
            player.distanceY += 10
            player.updatePlayerInfo()
        }

        if(frameCount%50 === 0){
           wall = createSprite(random(50,width-50),random(0,height-50)) 
           wall.addImage("wall", wallImg)
           wall.scale = 0.5 
           wall.lifetime = 250
           wallGroup.add(wall)
        }

        if(keyDown("space")){
            bullet1 = createSprite(200,200)
            bullet1.x = player1.x
            bullet1.y = player1.y
            bullet1.addImage("bullet1",bullet1Img)
            bullet1.velocityX = 4
        }

        
        
    }
}
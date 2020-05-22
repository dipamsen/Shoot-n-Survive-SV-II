class Form{
    constructor(){
        this.radioButton = null;
        this.reset = createButton('RESET');
        this.greeting;
        this.input;
        this.title;
        this.play;
    }
    display(){
        this.title = createElement('h1');
        this.title.html("Shoot n Survive");
        this.title.position(width/2, 50);
        this.input = createInput('Name');
        this.input.position(width/2, height/2);
        this.radioButton = createRadio();
        this.radioButton.option('Boy');
        this.radioButton.option('Girl');
        this.radioButton.position(width/2, height*2/3);
        this.play = createButton('Play!')
        this.play.position(width/2, height*3/4);
        this.play.mousePressed(()=>{
            player.name = this.input.value();
            if(this.radioButton.value()){
                player.character = this.radioButton.value();
            } else {
                player.character = "Boy";    
            }
            playerCount++;
            player.index = playerCount;
            this.input.hide();
            this.radioButton.hide();
            this.play.hide();
            player.update();
            player.updateCount(playerCount);
            this.greeting = createElement('p');
            this.greeting.html("Please Wait...");
            this.greeting.position(width/2, height/2);
        });
        this.reset.position(displayWidth/8, displayHeight/6);
        this.reset.mousePressed(()=>{
            player.updateCount(0);
            game.update(0);
            
        })
    }
    hide(){
        this.greeting.hide();
        this.play.hide();
        this.input.hide();
        this.title.hide();
        this.radioButton.hide();
    }
}
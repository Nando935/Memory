/*Ejemplo de jugabilidad en minijuego Memoria*/

var clickUno = 0, clickDos = 0;

GamePlayManager = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        this.flagFirstMouseDown = false;
    },
    preload: function() {
        game.load.image('background', 'assets/images/fondo.jpg');
        game.load.spritesheet('cuadros', 'assets/images/cuadros.png', 279, 279, 4);
    },
    create: function() {
        game.add.sprite(0, 0, 'background');

        cuadroAzul = game.add.sprite(0,0,'cuadros');
        cuadroAzul.frame = 2;
        cuadroAzul.x = game.width/4;
        cuadroAzul.y = game.height/4;
        cuadroAzul.anchor.setTo(0.5);
        cuadroAzul.inputEnabled = true;
        cuadroAzul.events.onInputDown.add(this.comprobarPares, this);
        cuadroAzul.events.onInputDown.add(this.cambiarColor, this);

        cuadroRojo = game.add.sprite(0,0,'cuadros');
        cuadroRojo.frame = 2;
        cuadroRojo.x = game.width/4;
        cuadroRojo.y = (game.height/4)+279;
        cuadroRojo.anchor.setTo(0.5);
        cuadroRojo.inputEnabled = true;
        cuadroRojo.events.onInputDown.add(this.comprobarParesRojos, this);
        cuadroRojo.events.onInputDown.add(this.cambiarColor3, this);

        this.cuadroAzul = game.add.sprite(0,0,'cuadros');
        this.cuadroAzul.frame = 2;
        this.cuadroAzul.x = (game.width/4)+500;
        this.cuadroAzul.y = (game.height/4)+279;
        this.cuadroAzul.anchor.setTo(0.5);
        this.cuadroAzul.inputEnabled = true;
        this.cuadroAzul.events.onInputDown.add(this.comprobarPares, this);
        this.cuadroAzul.events.onInputDown.add(this.cambiarColor2, this);


        this.cuadroRojo = game.add.sprite(0,0,'cuadros');
        this.cuadroRojo.frame = 2;
        this.cuadroRojo.x = (game.width/4)+500;
        this.cuadroRojo.y = game.height/4;
        this.cuadroRojo.anchor.setTo(0.5);
        this.cuadroRojo.inputEnabled = true;
        this.cuadroRojo.events.onInputDown.add(this.comprobarParesRojos, this);
        this.cuadroRojo.events.onInputDown.add(this.cambiarColor4, this);

        this.currentScore = 0;
        this.scoreText = game.add.text(game.width/1.5, 40, '0');

        this.totalTime = 30;
        this.timerText = game.add.text(200, 40, this.totalTime+'');
        this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND,function(){
            console.log("timer");
            this.totalTime--;
            this.timerText.text = this.totalTime+'';
            if(this.totalTime<=0){
                 game.time.events.remove(this.timerGameOver);
                 this.endGame = true;
            }
        }, this);
    },

    //Buscar una forma de hacerlo dentro de la funcion "ComprobarPares"
    cambiarColor:function(){
        cuadroAzul.frame = 0;
    },
    cambiarColor2:function(){
        this.cuadroAzul.frame = 0;
    },
    cambiarColor3:function(){
        cuadroRojo.frame = 1;
    },
    cambiarColor4:function(){
        this.cuadroRojo.frame = 1;
    },
    //Buscar una forma de hacerlo dentro de la funcion "ComprobarPares"

    comprobarPares:function(){ // Conprueba si la pareja de basureros es correcta 
        if(clickUno == 0 && clickDos == 0){
            clickUno = 1;
            return;
        }
        if(clickUno == 1 && clickDos == 0){
            clickDos=1;
        }
        if(clickUno == 0 && clickDos == 1){
            clickUno=1;
        }
        if(clickUno == 1 && clickDos == 1){
            this.increaseScore();
            this.cuadroAzul.inputEnabled = false;
            cuadroAzul.inputEnabled = false;
        }else{
            this.pierdeTiempo();
            this.reset();
        }
    },

    comprobarParesRojos:function(){ //comprueba la pareja de las botellas
        if(clickUno == 0 && clickDos == 0){
            clickUno = 2;
            return;
        }
        if(clickUno == 2 && clickDos == 0){
            clickDos=2;
        }
        if(clickUno == 0 && clickDos == 2){
            clickUno=2;
        }
        if(clickUno == 2 && clickDos == 2){
            this.increaseScore();
            this.cuadroRojo.inputEnabled = false;
            cuadroRojo.inputEnabled = false;
        }else{
            this.pierdeTiempo();
            this.reset(); 
        }
    },

    reset:function(){
        clickUno = 0;
        clickDos = 0;
    },

    pierdeTiempo:function(){
        console.log("Pierde tiempo");
        this.totalTime-=10;
        this.timerText.text = this.totalTime+'';
        this.cuadroAzul.frame = 2;
        cuadroAzul.frame = 2;
        this.cuadroRojo.frame = 2;
        cuadroRojo.frame = 2;
    },

    increaseScore:function(){
        this.currentScore+=10;
        this.scoreText.text = this.currentScore;
        this.reset();
    },
    
    update: function() {
        cuadroAzul.scale.setTo(0.5,0.5);
        this.cuadroAzul.scale.setTo(0.5,0.5);
        cuadroRojo.scale.setTo(0.5,0.5);
        this.cuadroRojo.scale.setTo(0.5,0.5);
    }
}

var game = new Phaser.Game(1136, 640, Phaser.CANVAS);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");
/*Ejemplo de jugabilidad en minijuego Memoria*/

var clickUno = 0, clickDos = 0;
var puntosGanar = 0;
var timeUp=0;
var tapar = 1;

GamePlayManager = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        this.flagFirstMouseDown = false;
        this.endGame=false;
    },
    preload: function() {
        game.load.image('background', 'assets/images/fondo.png');
        game.load.spritesheet('cuadros', 'assets/images/cuadros.png', 184, 299, 4);
    },
    create: function() {
        game.add.sprite(0, 0, 'background');

        cuadroAzul = game.add.sprite(0,0,'cuadros');
        cuadroAzul.frame = 2;
        cuadroAzul.x = 557.5;
        cuadroAzul.y = 330;
        cuadroAzul.anchor.setTo(0,0);
        cuadroAzul.inputEnabled = true;
        cuadroAzul.events.onInputDown.add(this.comprobarPares, this);
        cuadroAzul.events.onInputDown.add(this.cambiarColor, this);

        cuadroRojo = game.add.sprite(0,0,'cuadros');
        cuadroRojo.frame = 2;
        cuadroRojo.x = 380;
        cuadroRojo.y = 330;
        cuadroRojo.anchor.setTo(0,0);
        cuadroRojo.inputEnabled = true;
        cuadroRojo.events.onInputDown.add(this.comprobarParesRojos, this);
        cuadroRojo.events.onInputDown.add(this.cambiarColor3, this);

        this.cuadroAzul = game.add.sprite(0,0,'cuadros');
        this.cuadroAzul.frame = 2;
        this.cuadroAzul.x = 380;
        this.cuadroAzul.y = 169;
        this.cuadroAzul.anchor.setTo(0,0);
        this.cuadroAzul.inputEnabled = true;
        this.cuadroAzul.events.onInputDown.add(this.comprobarPares, this);
        this.cuadroAzul.events.onInputDown.add(this.cambiarColor2, this);


        this.cuadroRojo = game.add.sprite(0,0,'cuadros');
        this.cuadroRojo.frame = 2;
        this.cuadroRojo.x = 557.5;
        this.cuadroRojo.y = 169;
        this.cuadroRojo.anchor.setTo(0,0);
        this.cuadroRojo.inputEnabled = true;
        this.cuadroRojo.events.onInputDown.add(this.comprobarParesRojos, this);
        this.cuadroRojo.events.onInputDown.add(this.cambiarColor4, this);

        this.currentScore = 0;
        this.scoreText = game.add.text(game.width/5.5, 42, '0');
        game.add.text(game.width/11.5, 40, 'Puntos: ');
        game.add.text(game.width/2.5, 590, 'Tiempo: ');

        this.totalTime = 30;
        this.timerText = game.add.text(game.width/2.0, 590, this.totalTime+'');
        this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND,function(){
            console.log("timer");
            this.totalTime--;
            this.timerText.text = this.totalTime+'';
            if(this.totalTime<=0){
                 this.showFinalMessage('Nivel Perdido')
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
            if (tapar==1){
                this.tapartodo();
            }
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
            if(tapar==1){
                this.tapartodo();
            }
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

    tapartodo:function(){
        this.cuadroAzul.frame = 2;
        cuadroAzul.frame = 2;
        this.cuadroRojo.frame = 2;
        cuadroRojo.frame = 2;
    },

    pierdeTiempo:function(){
        console.log("Pierde tiempo");
        this.totalTime-=10;
        this.timerText.text = this.totalTime+'';
        tapar=1;
    },

    increaseScore:function(){
        this.currentScore+=10;
        this.scoreText.text = this.currentScore;
        tapar=2;
        this.reset();
        
        this.puntosGanar=this.currentScore;

        if(this.puntosGanar==20){
            this.showFinalMessage('Nivel completado')
            this.endGame=true;
        }
    },

    showFinalMessage:function(msg){
        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0,0,game.width, game.height);
        
        var bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;
        
        var style = {
            font: 'bold 60pt Arial',
            fill: '#FFFFFF',
            align: 'center'
          }
        
        this.textFieldFinalMsg = game.add.text(game.width/2, game.height/2, msg, style);
        this.textFieldFinalMsg.anchor.setTo(0.5);
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
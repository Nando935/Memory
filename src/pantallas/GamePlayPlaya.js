/*Minijuego Memoria*/

var clickUno = 0, clickDos = 0;
var puntosGanar = 0;
var timeUp=0;
var tapar = 1;
var click1=0;
var click2=0;
var cartaClickeada1;
var cartaClickeada1nombre;
var mismaCarta=0;
var play=false;
var first_click=false;

//Arreglos


var posiciones = {
    
    posXPosY: [
        {x:window.innerWidth/4.0,y:window.innerHeight/4.5},/*Primera carta*/
        {x:window.innerWidth/2.46, y:window.innerHeight/4.5},/*Segunda carta*/
        {x:window.innerWidth/1.78,y: window.innerHeight/4.5},/*Tercera carta*/
        {x:window.innerWidth/1.40,y:window.innerHeight/4.5},/*Cuarta carta*/
        /*1.8 1.4 */
        {x:window.innerWidth/4.0,y:window.innerHeight/2.6},
        {x:window.innerWidth/2.46, y:window.innerHeight/2.6},
        {x:window.innerWidth/1.78,y: window.innerHeight/2.6},
        {x:window.innerWidth/1.40,y:window.innerHeight/2.6},

        {x:window.innerWidth/4.0,y:window.innerHeight/1.8},
        {x:window.innerWidth/2.46, y:window.innerHeight/1.8},
        {x:window.innerWidth/1.78,y: window.innerHeight/1.8},
        {x:window.innerWidth/1.40,y:window.innerHeight/1.8},

        {x:window.innerWidth/4.0,y:window.innerHeight/1.4},
        {x:window.innerWidth/2.46, y:window.innerHeight/1.4},
        {x:window.innerWidth/1.78,y: window.innerHeight/1.4},
        {x:window.innerWidth/1.40,y:window.innerHeight/1.4}
    ],

    
 }

var GamePlayPlaya = function() {};

GamePlayPlaya.prototype = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        // this.flagFirstMouseDown = false;
        // this.endGame=false;
    },
    preload: function() {
        game.load.image('background', 'assets/img/playa/images/fondo1.png');
        game.load.image('boton_play', 'assets/img/playa/images/inicio.png');
        game.load.spritesheet('cuadros1', 'assets/img/playa/images/cuadros1.png', 184, 299);
        game.load.image('background_inicio', 'assets/img/playa/images/start_screen.png');
        game.load.spritesheet('boton_start', 'assets/img/playa/images/boton_inicio.png', 74, 29);
        game.load.image('boton_inst', 'assets/img/playa/images/instrucciones.png');
        game.load.image('inst_screen', 'assets/img/playa/images/reglas.png');
        game.load.image('boton_back', 'assets/img/playa/images/back.png');
        game.load.image('recarga', 'assets/img/playa/images/reload.png');
        game.load.image('home', 'assets/img/playa/images/home.png');
        game.load.image('pausa', 'assets/img/playa/images/pausa.png');
        game.load.image('pausa_screen', 'assets/img/playa/images/pausa_screen.png');
        game.load.image('resume', 'assets/img/playa/images/resume.png');

        game.load.image('victoria0', 'assets/img/playa/images/victoria.png');
        game.load.image('victoria1', 'assets/img/playa/images/victoria1.png');
        game.load.image('victoria2', 'assets/img/playa/images/victoria2.png');
        game.load.image('victoria3', 'assets/img/playa/images/victoria3.png');

        game.load.image('derrota0', 'assets/img/playa/images/derrota0.png');
        game.load.image('derrota1', 'assets/img/playa/images/derrota1.png');
        game.load.image('derrota2', 'assets/img/playa/images/derrota2.png');
        game.load.image('derrota3', 'assets/img/playa/images/derrota3.png');
    },
    
    create: function() {
        game.time.events.remove(this.timerGameOver);
        game.paused=false;
        var style = {
            font: '20pt Impact',
            fill: '#FF4000'
          }
    
        var fondo_inicio = game.add.sprite(0, 0, 'background_inicio');
        fondo_inicio.width = window.innerWidth;
        fondo_inicio.height = window.innerHeight;
        
        boton_start = game.add.button(window.innerWidth/1.52, window.innerHeight/1.15, 'boton_start', this.onTap, this);
        boton_inst = game.add.button(window.innerWidth/1.12, window.innerHeight/1.15, 'boton_inst', this.showInstrucciones, this);
        
//    var indices={};
   var tipo=[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];


   if(play){
    var fondo = game.add.sprite(0, 0, 'background');
    fondo.width = window.innerWidth;
    fondo.height = window.innerHeight;
    this.cartas = game.add.group();
    this.cartas.inputEnableChildren = true;
    var numero=0;
    do{
        this.posicionCarta = Math.floor(Math.random() * (16 - 0)) + 0;
        // console.log(this.posicionCarta);
        if(posiciones.posXPosY[numero]!=null && tipo[this.posicionCarta]!=null){
            // console.log("x: "+posiciones.posXPosY[this.posicionCarta].x+" y: "+posiciones.posXPosY[this.posicionCarta].y);
            this.carta = this.cartas.create(posiciones.posXPosY[numero].x, posiciones.posXPosY[numero].y, 'cuadros1');
            this.carta.anchor.setTo(0.5);
            this.carta.frame = 8;
            this.carta.bloqueo = false;
            this.carta.encontrada = false;
            this.carta.inputEnabled = true;
            this.carta.name="carta"+numero;
            this.carta.scale.setTo(0.2);
            // if(tipo[this.posicionCarta]!=null){
            this.carta.tipo = tipo[this.posicionCarta];
            tipo[this.posicionCarta]=null;
            numero++;
            // }
        }
    }while(numero<16);


    
        this.cartas.onChildInputDown.add(function onDown(sprite) {
            // console.log(sprite.tipo);
            // console.log(sprite.name);
            sprite.loadTexture('cuadros1', sprite.tipo, false);
                    if(click1==0 && click2==0 && sprite.encontrada==false){
                    
                        click1=1;
                        mismaCarta=sprite.name; 
                        console.log("primer Click: "+click1+"segundo Click: "+click2);
                        cartaClickeada1 = sprite.tipo;
                        cartaClickeada1nombre=sprite.name;
                    //    console.log( this.cartas);
                    }
                   else if(click1==1 /*&& click2==0*/ && sprite.encontrada==false && !sprite.bloqueo && mismaCarta!=sprite.name){
                       click2=1;
                       console.log("primer aaClick: "+click1+" segundo aaClick: "+click2);
                    // console.log(this.volteada1.frame+" "+this.volteada2.frame);
                    if(cartaClickeada1 == sprite.tipo && sprite.encontrada==false){
                        this.increaseScore();
                        for(var i=0; i<this.cartas.length;i++){
                            if(this.cartas.children[i].name == cartaClickeada1nombre){
                                this.cartas.children[i].encontrada =true;
                                
                            }
                           }
                      
                        sprite.encontrada=true;
                        click1=0;
                        click2=0;
                        
                     
                    }
                    else{
                        this.pierdeTiempo();
                        game.time.events.add(Phaser.Timer.SECOND/4,function(){
                            if(click1==1 && click2 == 1 &&  sprite.encontrada==false){
                                for(var i=0; i<this.cartas.length;i++){
                                    if(this.cartas.children[i].name == cartaClickeada1nombre){
                                        this.cartas.children[i].frame =8;
                                        this.cartaClickeada1=null;/*Quiza sirva */
                                    }
                                   }
                                   sprite.frame=8;
                                        click1=0;
                                        click2=0;
                            }
                            
                        }, this);
                        
                      
                    }
                   }
                   this.cartaClickeada1=null;
        }, this);
    
        this.currentScore = 0;
        this.scoreText = game.add.text(window.innerWidth/4, 3, '0', style);
        
        boton_pausa = game.add.button(window.innerWidth/1.12, 2, 'pausa', this.stop_game, this);

      this.pintarPuntos=  game.add.text(window.innerWidth/50, 2, 'Pares: ', style);
       this.pintarTiempo= game.add.text(window.innerWidth/3.6, window.innerHeight-70, 'Tiempo: ', style);
           this.totalTime = 150;
            this.timerText = game.add.text(window.innerWidth/1.7, window.innerHeight -70, this.totalTime+'', style);
            this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND,function(){
                console.log("timer");
                this.totalTime--;
                this.timerText.text = this.totalTime+'';
                if(this.totalTime<=0){
                    this.timerText.visible=false;
                    this.pintarTiempo.visible=false;
                    this.pintarPuntos.visible=false;
                    this.scoreText.visible=false;
                     this.showFinalMessageFail()
                     game.time.events.remove(this.timerGameOver);
                     this.cartas.kill();
                   
                    //  this.endGame = true;
                }
            }, this);
    };

        
},

    onTap:function(){
        play=true;
        if(first_click==false){
            this.create();
            first_click=true;
            console.log("primerclick");
        };
       
        console.log("escucha el lalalala click "+play);
    },

    stop_game:function(){
        game.paused=true;
        this.cartas.kill();
        this.show_pausa();
    },

    continue_game:function(){
        game.paused=false;
        this.cartas.revive();
        boton_pausa.revive();
        pausa_screen.kill();
        boton_home.kill();
        boton_reload.kill();
        boton_resume.kill();
        bg.kill();
    },

    return_home:function(){
        play=false;
        first_click=false;
        this.create();
    },

    pierdeTiempo:function(){
        this.totalTime-=10;
        this.timerText.text = this.totalTime+''
        if(this.totalTime<=0){
            this.timerText.text = '0';
        }
    
    },

    increaseScore:function(){
        this.currentScore+=1;
        this.scoreText.text = this.currentScore;
        // tapar=2;
        // this.reset();
        
        this.puntosGanar=this.currentScore;

        if(this.puntosGanar==8){
            this.showFinalMessage()
            game.time.events.remove(this.timerGameOver);
            this.timerText.visible=false;
                this.pintarTiempo.visible=false;
                this.pintarPuntos.visible=false;
                this.scoreText.visible=false;
            // this.endGame=true;
        }
    },

    showFinalMessage:function(msg){

        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0,0,game.width, game.height);
        
        var bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;

        
        var num_pantalla = Math.floor((Math.random() * 3) + 0);

        console.log(num_pantalla);
        
        var victoria_screen = game.add.sprite(window.innerWidth/2, window.innerHeight/2, 'victoria'+num_pantalla);
        victoria_screen.anchor.setTo(0.5);
        boton_pausa.kill();
    },

    showFinalMessageFail:function(msg){

        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0,0,game.width, game.height);
        
        var bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;

        
        var num_pantalla = Math.floor((Math.random() * 3) + 0);

        console.log(num_pantalla);
        
        var derrota_screen = game.add.sprite(window.innerWidth/2, window.innerHeight/2, 'derrota'+num_pantalla);
        derrota_screen.anchor.setTo(0.5); 

        boton_home = game.add.button((window.innerWidth/2)+15, (window.innerHeight/2)+115, 'home', this.return_home, this);
        boton_reload = game.add.button((window.innerWidth/2)+49, (window.innerHeight/2)+115, 'recarga', this.create, this);
        boton_pausa.kill();
    },

    showInstrucciones:function(msg){

        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0,0,game.width, game.height);
        
        var bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;
        
        var instrucciones_screen = game.add.sprite(window.innerWidth/2, window.innerHeight/2, 'inst_screen');
        instrucciones_screen.anchor.setTo(0.5);
        instrucciones_screen.width = window.innerWidth;
        instrucciones_screen.height = window.innerHeight; 

        boton_back = game.add.button(window.innerWidth/1.12, window.innerHeight/1.15, 'boton_back', this.create, this);
    },

    show_pausa:function(msg){
        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0,0,game.width, game.height);

        bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;

        pausa_screen = game.add.sprite(window.innerWidth/2, window.innerHeight/2, 'pausa_screen');
        pausa_screen.anchor.setTo(0.5);
        boton_home = game.add.button((window.innerWidth/2)-49, (window.innerHeight/2)+115, 'home', this.return_home, this);
        boton_reload = game.add.button((window.innerWidth/2)-15, (window.innerHeight/2)+115, 'recarga', this.create, this);
        boton_resume = game.add.button((window.innerWidth/2)+20, (window.innerHeight/2)+115, 'resume', this.continue_game, this);
        
           
        
        boton_pausa.kill();
    },
    
    update: function() {


    /*    cuadroAzul.scale.setTo(0.5,0.5);
        this.cuadroAzul.scale.setTo(0.5,0.5);
        cuadroRojo.scale.setTo(0.5,0.5);*/
        //this.carta.scale.setTo(0.1,0.1);
    }
}

//var game = new Phaser.Game(500, 800, Phaser.CANVAS);
    
game.state.add("gameplayPlaya", GamePlayPlaya);
//game.state.start("gameplay");
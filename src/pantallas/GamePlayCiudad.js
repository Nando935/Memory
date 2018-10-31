//Llamar evento cada cierto tiempo game.time.events.loop(Phaser.Timer.SECOND * 4, this.killDesecho, this);
var STATE_GAME_NONE = 0;
var STATE_GAME_LOADING = 1;
var STATE_GAME_PLAYING = 2;
var STATE_GAME_GAME_OVER = 3;
var STATE_GAME_WIN = 4;
var STATE_GAME_MENU = 5;
var stateGame = STATE_GAME_NONE;

GamePlayCiudad = {
    init: function() {
        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        this.numero = 0;



    },
    preload: function() {
        stateGame = STATE_GAME_LOADING;
        game.load.image('background', 'assets/img/recolectaBasura/bg.jpg');
        game.load.atlasJSONArray('personajeCaminando', 'assets/img/recolectaBasura/top_walk.png', 'assets/img/recolectaBasura/top_walk.json');
        game.load.atlasJSONArray('personajeCaminandoArriba', 'assets/img/recolectaBasura/personajeCaminandoArriba.png', 'assets/img/recolectaBasura/personajeCaminandoArriba.json');
        game.load.atlasJSONArray('personajeCaminandoDerecha', 'assets/img/recolectaBasura/personajeCaminandoDerecha.png', 'assets/img/recolectaBasura/personajeCaminandoDerecha.json');
        game.load.image('manzana', 'assets/img/recolectaBasura/manzana.png');
        game.load.spritesheet("BotonPlay", 'assets/img/recolectaBasura/botonPlay.png', 178, 176, 3);
        game.load.image('mapa', 'assets/img/recolectaBasura/mapa3.png');
        game.load.image('scoreFondo', 'assets/img/recolectaBasura/score.png');
        game.load.image('tiempo', 'assets/img/recolectaBasura/time.png');
        game.load.image('barraTiempo', 'assets/img/recolectaBasura/timeBar.png');
        game.load.image('statsFinal', 'assets/img/recolectaBasura/stats.png');
        game.load.image('recargar', 'assets/img/recolectaBasura/Reload.png');
        game.load.image('estrella', 'assets/img/recolectaBasura/estrella.png');
        game.load.audio('loopMusic', 'assets/Sonidos/Principal.mp3');
        game.load.audio('aplausos', 'assets/Sonidos/aplausos.wav');


    },
    create: function() {
        this.personasRe = [];
        this.personasMuertas = [];
        this.fondo = game.add.sprite(0, 0, 'mapa');
        this.fondo.anchor.setTo(0);
        this.fondo.width = window.innerWidth;
        this.fondo.height = window.innerHeight;
        //    this.fondo.scale.setTo(0.37);
        this.persona = game.add.group();
        this.desecho = game.add.group();
        this.desecho.inputEnableChildren = true;
        this.scoreF = game.add.sprite(2, 60, 'scoreFondo');
        this.scoreF.scale.setTo(0.6);
        this.tiempo = game.add.sprite(2, 10, 'tiempo');
        this.tiempo.scale.setTo(0.09);
        // this.crearPersona(8);
        var styleBG = {
            fill: 'black',
        }
        var style = {
            font: 'bold 25pt Arial',
            fill: 'white',
            align: 'center'
        }
        this.currentScore = 800;
        this.textfield = game.add.text(107, 92, this.currentScore.toString(), style);
        this.textfield.anchor.setTo(0.5)
        this.bar = game.add.sprite(50, 21, 'barraTiempo');
        this.bar.anchor.setTo(0);
        // darle tamaÃ±o a la barra
        this.bar.width = 118;
        this.bar.height = 20;
        this.buttonPlay = game.add.button(window.innerWidth/2, window.innerHeight/2, 'BotonPlay', this.startGame, this, 1, 0, 3, 0);
        this.buttonPlay.scale.setTo(0.5);
        this.buttonPlay.anchor.setTo(0.4);
        // Crear musica y sfx
        this.sfxGameOver = game.add.audio('aplausos');
        this.loopMusic = game.add.audio('loopMusic');
    },
    increaseScore: function() {
        this.currentScore += 100;
        this.textfield.text = this.currentScore.toString();
    },
    refreshBar: function(value) {
        // calcular el nuevo tamaÃ±o de la barra (tamaÃ±o actual + valor que entra por parametro)
        var newWidth = this.bar.width + value;
        // si la barra se pasa del ancho de la pantalla se le asigna el ancho de la pantalla
        if (newWidth > 118) {
            newWidth = 118;
        }
        // si la barra es menor que 0 se le asigna el valor de 0 y se acaba el juego
        if (newWidth <= 0) {
            newWidth = 0;
            this.gameOver();

        }
        // actualizar el tamaÃ±o de la barra con el nuevo tamaÃ±o
        this.bar.width = newWidth;
    },
    crearPersona: function(cantPersonas) {
        numeroPersonas = cantPersonas;
        this.distancia = 50;
        for (var i = 0; i < numeroPersonas; i++) {
            let rumbo = game.rnd.integerInRange(0, 1);
            let numberX = game.rnd.integerInRange(200, 500);
            var personas = this.persona.create(166.4, 650 + this.distancia, 'personajeCaminandoArriba');
            this.distancia += 50;
            personas.name = "persona" + i;
            personas.caminando = false;
            personas.direccion = 0;
            personas.rumbo = rumbo;
            personas.aumentarY = 0;
            personas.aumentarX = 0;
            personas.anchor.setTo(0.5, 1);

        }
    },
    crearDesecho: function() {


        for (var i = 0; i < numeroPersonas; i++) {
            this.desechos = this.desecho.create(0, 0, 'manzana');

            this.desechos.name = "desecho" + i;
            this.desechos.vida = 2;
            this.desechos.anchor.setTo(1);
            this.desechos.scale.setTo(0.08);
            this.desechos.kill();
        }
    },
    pintarDesecho: function() {
        this.crearDesecho();

        this.desechoP = this.desecho.getFirstDead();
        // console.log("numero de personas: " +this.persona.length);

        this.numeroP = game.rnd.integerInRange(0, 7);
        console.log(this.numeroP);
        this.desechoP.reset(this.persona.children[this.numeroP].x, this.persona.children[this.numeroP].y);



    },
    quitarvida: function() {
        for (i = 0; i < numeroPersonas; i++) {
            if (this.desecho.children[i].vida > 1) {
                this.desecho.children[i].vida -= 1;
            } else {
                this.desecho.children[i].kill();
            }
        }
    },
    repintarPersona: function() {

        this.personaNueva = this.persona.getFirstDead();
        this.personasRe.push(this.personaNueva);
        this.crearPersona(this.personasRe.length);
    },
    moverPersonaje: function(personaje) {
        this.persona.children[personaje].loadTexture("personajeCaminandoArriba");
        this.persona.children[personaje].animations.add('personajeCaminandoArriba', Phaser.Animation.generateFrameNames('personajeCaminandoArriba', ['A1', 'A2', 'A4', 'A1']), 4, true);
        this.persona.children[personaje].animations.play('personajeCaminandoArriba');
    },
    moverPersonajeDerecha: function(personaje) {
        this.persona.children[personaje].loadTexture("personajeCaminandoDerecha");
        this.persona.children[personaje].animations.add('personajeCaminandoDerecha', Phaser.Animation.generateFrameNames('personajeCaminandoDerecha', ['D1', 'D2', 'D4', 'D1']), 4, true);
        this.persona.children[personaje].animations.play('personajeCaminandoDerecha');
    },
    caminar: function() {
        for (i = 0; i < numeroPersonas; i++) {
            if (!this.persona.children[i].caminando) {
                numeroY = Math.random() * (1 - 0.7) + 0.7;
                numeroX = Math.random() * (1 - 0) + 0;
                this.persona.children[i].aumentarX = 1;
                this.persona.children[i].aumentarY = 0.7;
                this.persona.children[i].caminando = true;
            } else {
                console.log('esta caminando');
                console.log(numeroY);
            }
        }


    },
    startGame: function() {
        stateGame = STATE_GAME_PLAYING;
        this.crearPersona(8);
        this.loopMusic.loop = true;
        this.loopMusic.play();
        this.bar.width = game.width;
        this.personasRe = [];
        this.personasMuertas = [];

        game.time.events.loop(Phaser.Timer.SECOND, this.pintarDesecho, this);
        for (i = 0; i < numeroPersonas; i++) {
            if (this.persona.children[i].rumbo == 0) {
                console.log("rumbo Arriba = 0 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name);
                this.moverPersonaje(i);
            } else {
                console.log("rumbo derecha = 1 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name);
                this.persona.children[i].reset(-50 - this.distancia, 226, 'personajeCaminandoDerecha');
                this.distancia -= 50;
            }

        }

        this.caminar();
        this.desecho.onChildInputDown.add(function onDown(sprite) {
            // console.log("Click");
            // console.log(sprite);
            console.log(sprite.name + " vida:" + sprite.vida);

            // sprite.vida-=1;
            // console.log(sprite.name+" vida:" + sprite.vida); 
            // if(sprite.name ==="desecho0"){
            if (sprite.vida > 1) {
                sprite.vida -= 1;
            } else {
                sprite.kill();
                sprite.vida = 4;
                this.increaseScore();
            }
            // }
            // else{
            //     console.log("no es el 0");
            // }


        }, this);
        this.buttonPlay.visible = false;
    },
    gameOver: function() {
        stateGame = STATE_GAME_GAME_OVER;
        this.desecho.kill();
        this.persona.kill();
        this.tiempo.kill();
        this.scoreF.kill();
        // this.desecho.visible=false;
        // this.persona.visible=false;
        // this.tiempo.visible =false;
        // this.scoreF.visible = false;

        this.loopMusic.stop();
        // this.recargar= game.add.sprite(140,535,'recargar');
        // this.recargar.scale.setTo(0.5);
        // this.recargar.inputEnabled = true;



        // this.recargar.events.onInputDown.add(this.startGame, this);
        // se reproduce el efecto de que perdio
        this.sfxGameOver.play();
        this.textfield.destroy();
        this.fondo.alpha = 0.2;
        this.statsFinal = game.add.sprite(window.innerWidth/2, (window.innerHeight/2)-30, 'statsFinal');
        this.statsFinal.alpha = 0;

        game.add.tween(this.statsFinal).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        this.statsFinal.anchor.setTo(0.5);
        this.statsFinal.scale.setTo(0.5);
        this.desecho.scale.setTo(0.8);
        this.estrella = game.add.group();
        this.estrella.scale.setTo(0.63);

        var style = {
            font: 'bold 25pt Arial',
            fill: 'white',
            align: 'center'
        }
        this.textfield = game.add.text(85, 475, "Puntaje: " + this.currentScore.toString(), style);
        this.estrella.alpha = 0;
        game.add.tween(this.estrella).to({ alpha: 5 }, 2000, Phaser.Easing.Linear.None, true);
        if (this.currentScore >= 100 && this.currentScore <= 300) {
            this.estrellas = this.estrella.create(105, 414, 'estrella');
            this.estrella.children[1].anchor.setTo(0.5);
        } else if (this.currentScore >= 400 && this.currentScore <= 600) {
            this.estrellas = this.estrella.create(105, 414, 'estrella');

            this.estrellas = this.estrella.create(214, 373, 'estrella');
            this.estrella.children[0].anchor.setTo(0.5);
            this.estrella.children[1].anchor.setTo(0.5);
            // this.estrella.children[1].scale.setTo(1.1);
        } else if (this.currentScore >= 700) {
            this.estrellas = this.estrella.create(105, 414, 'estrella');
            this.estrellas = this.estrella.create(214, 373, 'estrella');
            // this.estrella.children[1].scale.setTo(1.1);
            this.estrellas = this.estrella.create(window.innerWidth, 414, 'estrella');
            this.estrella.children[0].anchor.setTo(0.5);
            this.estrella.children[1].anchor.setTo(0.5);
            this.estrella.children[2].anchor.setTo(0.5);
        }


    },
    update: function() {

        switch (stateGame) {
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_PLAYING:
                this.refreshBar(-0.9);
                // console.log(this.persona);
                for (i = 0; i < numeroPersonas; i++) {
                    if (this.persona.children[i].x > 360 && this.persona.children[i].rumbo == 0) {
                        // this.persona.children[i].destroy();
                    } else if (this.persona.children[i].y < 10 && this.persona.children[i].rumbo == 1) {
                        // this.persona.children[i].destroy();
                    }
                }
                if (this.persona.length <= 3) {
                    this.repintarPersona();
                    console.log("etnro repintar");
                }


                for (i = 0; i < numeroPersonas; i++) {

                    if (this.persona.children[i].caminando && this.persona.children[i].y >= 444.2 && this.persona.children[i].rumbo == 0) {
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;

                    } else if (this.persona.children[i].caminando && this.persona.children[i].x >= 214 && this.persona.children[i].rumbo == 1) {


                        if (this.persona.children[i].direccion == 1) {

                            this.moverPersonaje(i);
                            this.persona.children[i].direccion = 0;

                        }
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;

                    } else {
                        if (this.persona.children[i].direccion == 0) {
                            this.moverPersonajeDerecha(i);


                        }
                        this.persona.children[i].direccion = 1;
                        direccion = 1;
                        this.persona.children[i].x += this.persona.children[i].aumentarY;


                    }



                }

                break;

            case STATE_GAME_GAME_OVER:

                break;

            case STATE_GAME_WIN:

                break;
            case STATE_GAME_MENU:

                break;
        }





    },
    // render : function () {

    //     game.debug.pointer(game.input.mousePointer);

    // }
}
var numeroX = 0;
var numeroY = 0;
var desecho;
var personas;
var numeroPersonas;
var direccion = 0;
var afuera = 0;
// var personas;
var persona2;
//var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add("gameplayCiudad", GamePlayCiudad);
//game.state.start("gameplay");
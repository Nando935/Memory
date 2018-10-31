var STATE_GAME_NONE = 0;
var STATE_GAME_LOADING = 1;
var STATE_GAME_PLAYING = 2;
var STATE_GAME_OVER = 3;
var STATE_GAME_WIN = 4;
var STATE_GAME_MENU = 5;
var STATE_GAME_LEVEL = 0;
var puntos_level = 0;
var loop = 0;
var stateGame;
var puntaje = 0;
// son los e4stados de juego se le asignan valores numericos
/*var paperBasket={
	id:0,idImage: 'basureroPapel',x:0,y:100,ruta:'juegoBasketball/basureroPapel.png'
};
var aluminiumBasket={
	id:1,idImage: 'basureroAluminio',x:0,y:100,ruta:'juegoBasketball/basureroAluminio.png'
};
var TBBasket={
	id:2,idImage: 'basureroTB',x:0,y:100,ruta:'juegoBasketball/basureroTB.png'
};
var OrganicBasket={
	id:3,idImage: 'basureroOrganico',x:0,y:100,ruta:'juegoBasketball/basureroOrganico.png'
};

var paperDesecho={
	id:0,idImage: 'desechoPapel',x:0,y:250,ruta:'juegoBasketball/papelCarton.png'
};
var aluminiumDesecho={
	id:1,idImage: 'desechoAluminio',x:0,y:250,ruta:'juegoBasketball/aluminio.png'
};
var TBDesecho={
	id:2,idImage: 'desechoTB',x:0,y:250,ruta:'juegoBasketball/Tb.png'
};
var OrganicDesecho={
	id:3,idImage: 'desechoOrganico',x:0,y:250,ruta:'juegoBasketball/organico.png'
};*/

var basureros_array = [{ id: 0, idImage: 'basureroOrganico', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroOrganico.png' },
    { id: 1, idImage: 'basureroVidrio', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroVidrio.png' },
    { id: 2, idImage: 'basureroEnvases', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroEnvases.png' },
    { id: 3, idImage: 'basureroCarton', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroCartonYPapel.png' },
    { id: 4, idImage: 'basureroLatas', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroLatasYAluminio.png' },
    { id: 5, idImage: 'basureroEspecial', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroManejoEspecial.png' }
];


var desechoOrganicos = [{ id: 0, idImage: 'desechoOrganico1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico1.png' },
    { id: 0, idImage: 'desechoOrganico2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico2.png' },
    { id: 0, idImage: 'desechoOrganico3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico3.png' },
    { id: 0, idImage: 'desechoOrganico4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico4.png' },
    { id: 0, idImage: 'desechoOrganico5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico5.png' },
    { id: 0, idImage: 'desechoOrganico6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico1.png' }
];

var desechoLata = [{ id: 4, idImage: 'desechoLata1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio1.png' },
    { id: 4, idImage: 'desechoLata2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio2.png' },
    { id: 4, idImage: 'desechoLata3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio3.png' },
    { id: 4, idImage: 'desechoLata4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio4.png' },
    { id: 4, idImage: 'desechoLata5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio5.png' },
    { id: 4, idImage: 'desechoLata6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio3.png' }
];

var desechoPapel = [{ id: 3, idImage: 'desechoPapel1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton1.png' },
    { id: 3, idImage: 'desechoPapel2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton2.png' },
    { id: 3, idImage: 'desechoPapel3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton3.png' },
    { id: 3, idImage: 'desechoPapel4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton4.png' },
    { id: 3, idImage: 'desechoPapel5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton5.png' },
    { id: 3, idImage: 'desechoPapel6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton2.png' }
];

var desechoVidrio = [{ id: 1, idImage: 'desechoVidrio1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio1.png' },
    { id: 1, idImage: 'desechoVidrio2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio2.png' },
    { id: 1, idImage: 'desechoVidrio3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio3.png' },
    { id: 1, idImage: 'desechoVidrio4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio4.png' },
    { id: 1, idImage: 'desechoVidrio5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio5.png' },
    { id: 1, idImage: 'desechoVidrio6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio3.png' }
];

var desechoEnvase = [{ id: 2, idImage: 'desechoEnvases1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases1.png' },
    { id: 2, idImage: 'desechoEnvases2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases1.png' },
    { id: 2, idImage: 'desechoEnvases3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases2.png' },
    { id: 2, idImage: 'desechoEnvases4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases3.png' },
    { id: 2, idImage: 'desechoEnvases5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases4.png' },
    { id: 2, idImage: 'desechoEnvases6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases5.png' }
];

var desechoEspecial = [{ id: 5, idImage: 'desechoEspecial1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial1.png' },
    { id: 5, idImage: 'desechoEspecial2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial2.png' },
    { id: 5, idImage: 'desechoEspecial3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial3.png' },
    { id: 5, idImage: 'desechoEspecial4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial4.png' },
    { id: 5, idImage: 'desechoEspecial5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial3.png' },
    { id: 5, idImage: 'desechoEspecial6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial2.png' }
];
//Estos son arreglos con las caracteristicas de cada uno de los basureros estas caracteristicas
//se utilizan para las opciones de Phaser 
GameOverManager = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        //ESto hace responsivo el proyecto

    },
    preload: function() {
        game.load.image('background', 'assets/img/juegoBasketball/fondo.png');
    },
    create: function() {
        this.style = {
            font: 'bold 30pt Arial',
            fill: '#FFFFFF',
            align: 'center',
        }
        this.gameOver();
    },
    update: function() {
        switch (stateGame) {
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_OVER:

                break;

            case STATE_GAME_WIN:

                break;

            case STATE_GAME_MENU:

                break;
        }
    },
    gameOver: function() {
        this.fondo = game.add.sprite(0, 0, 'background');
        this.fondo.scale.setTo(0.478, 0.489);
        this.gameOverMessage = game.add.text(game.width / 2, 400, 'GameOver', this.style);
        this.gameOverMessage.anchor.setTo(0.5);
        this.scoreText = game.add.text(game.width / 2, 40, '0', this.style);
        this.scoreText.anchor.setTo(0.5);
        this.scoreText.text = puntaje;
    }

}
var GamePlayParque = function() {};

GamePlayParque.prototype = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        //ESto hace responsivo el proyecto
        var valor = 1;

    },
    preload: function() {
        stateGame = STATE_GAME_LOADING;
        game.load.image('background', 'assets/img/juegoBasketball/fondo/fondo.png');
        game.load.image('can', 'assets/img/juegoBasketball/canion/cañon.png');
        game.load.image('base', 'assets/img/juegoBasketball/canion/baseCañon.png');
        game.load.spritesheet("BotonPlay", 'assets/img/juegoBasketball/botonPlay.png', 330, 328, 3);
        game.load.spritesheet("BotonMenu", 'assets/img/juegoBasketball/botonPlay.png', 178, 176, 3);
        game.load.image('line', 'assets/img/juegoBasketball/charge.png');
        /*game.load.image(paperBasket.idImage,paperBasket.ruta);
        game.load.image(aluminiumBasket.idImage,aluminiumBasket.ruta);
        game.load.image(TBBasket.idImage,TBBasket.ruta);
        game.load.image(OrganicBasket.idImage,OrganicBasket.ruta);
        game.load.image(paperDesecho.idImage,paperDesecho.ruta);
        game.load.image(aluminiumDesecho.idImage,aluminiumDesecho.ruta);
        game.load.image(TBDesecho.idImage,TBDesecho.ruta);
        game.load.image(OrganicDesecho.idImage,OrganicDesecho.ruta);*/
        //game.load.spritesheet('desecho', 'juegoBasketball/desecho.png', 50,50);
        game.load.image('v', 'assets/img/juegoBasketball/circulos/simboloBasuraVidrio.png');
        game.load.image('p', 'assets/img/juegoBasketball/circulos/simboloBasuraPapelYCarton.png');
        game.load.image('te', 'assets/img/juegoBasketball/circulos/simboloBasuraTratoEspecial.png');
        game.load.image('o', 'assets/img/juegoBasketball/circulos/simboloBasuraOrganica.png');
        game.load.image('e', 'assets/img/juegoBasketball/circulos/simboloBasuraEnvases.png');
        game.load.image('a', 'assets/img/juegoBasketball/circulos/simboloBasuraAluminioYLatas.png');
        game.load.image('cincuenta', 'assets/img/juegoBasketball/canion/cincuenta.png');
        game.load.image('cien', 'assets/img/juegoBasketball/canion/cien.png');

        game.load.image(basureros_array[0].idImage, basureros_array[0].ruta);
        game.load.image(basureros_array[1].idImage, basureros_array[1].ruta);
        game.load.image(basureros_array[2].idImage, basureros_array[2].ruta);
        game.load.image(basureros_array[3].idImage, basureros_array[3].ruta);
        game.load.image(basureros_array[4].idImage, basureros_array[4].ruta);
        game.load.image(basureros_array[5].idImage, basureros_array[5].ruta);

        game.load.image(desechoOrganicos[0].idImage, desechoOrganicos[0].ruta);
        game.load.image(desechoOrganicos[1].idImage, desechoOrganicos[1].ruta);
        game.load.image(desechoOrganicos[2].idImage, desechoOrganicos[2].ruta);
        game.load.image(desechoOrganicos[3].idImage, desechoOrganicos[3].ruta);
        game.load.image(desechoOrganicos[4].idImage, desechoOrganicos[4].ruta);
        game.load.image(desechoOrganicos[5].idImage, desechoOrganicos[5].ruta);

        game.load.image(desechoLata[0].idImage, desechoLata[0].ruta);
        game.load.image(desechoLata[1].idImage, desechoLata[1].ruta);
        game.load.image(desechoLata[2].idImage, desechoLata[2].ruta);
        game.load.image(desechoLata[3].idImage, desechoLata[3].ruta);
        game.load.image(desechoLata[4].idImage, desechoLata[4].ruta);
        game.load.image(desechoLata[5].idImage, desechoLata[5].ruta);

        game.load.image(desechoPapel[0].idImage, desechoPapel[0].ruta);
        game.load.image(desechoPapel[1].idImage, desechoPapel[1].ruta);
        game.load.image(desechoPapel[2].idImage, desechoPapel[2].ruta);
        game.load.image(desechoPapel[3].idImage, desechoPapel[3].ruta);
        game.load.image(desechoPapel[4].idImage, desechoPapel[4].ruta);
        game.load.image(desechoPapel[5].idImage, desechoPapel[5].ruta);

        game.load.image(desechoEnvase[0].idImage, desechoEnvase[0].ruta);
        game.load.image(desechoEnvase[1].idImage, desechoEnvase[1].ruta);
        game.load.image(desechoEnvase[2].idImage, desechoEnvase[2].ruta);
        game.load.image(desechoEnvase[3].idImage, desechoEnvase[3].ruta);
        game.load.image(desechoEnvase[4].idImage, desechoEnvase[4].ruta);
        game.load.image(desechoEnvase[5].idImage, desechoEnvase[5].ruta);

        game.load.image(desechoEspecial[0].idImage, desechoEspecial[0].ruta);
        game.load.image(desechoEspecial[1].idImage, desechoEspecial[1].ruta);
        game.load.image(desechoEspecial[2].idImage, desechoEspecial[2].ruta);
        game.load.image(desechoEspecial[3].idImage, desechoEspecial[3].ruta);
        game.load.image(desechoEspecial[4].idImage, desechoEspecial[4].ruta);
        game.load.image(desechoEspecial[5].idImage, desechoEspecial[5].ruta);

        game.load.image(desechoVidrio[0].idImage, desechoVidrio[0].ruta);
        game.load.image(desechoVidrio[1].idImage, desechoVidrio[1].ruta);
        game.load.image(desechoVidrio[2].idImage, desechoVidrio[2].ruta);
        game.load.image(desechoVidrio[3].idImage, desechoVidrio[3].ruta);
        game.load.image(desechoVidrio[4].idImage, desechoVidrio[4].ruta);
        game.load.image(desechoVidrio[5].idImage, desechoVidrio[5].ruta);

        //Todo lo que se quiere utilizar se tiene que pre cargar aca

        game.load.image('ins', 'assets/img/juegoBasketball/instrucciones.png');

    },

    create: function() {
        this.instrucciones = game.add.sprite(10, 20, 'ins');
        //this.instrucciones.anchor.setTo(0.5);
        this.instrucciones.width = window.innerWidth;
        this.instrucciones.height = window.innerHeight;
        this.instrucciones.scale.setTo(0.7);
        game.input.onDown.add(this.onTap, this);
        this.flag = true;
        // se crean las variables globales por asi decirlo
    },
    onTap: function() {
        if (this.flag) {
            this.fondo = game.add.sprite(0, 0, 'background');
            this.fondo.scale.setTo(0.478, 0.489);
            this.fondo.width = window.innerWidth;
            this.fondo.height = window.innerHeight;
            this.line = game.add.sprite(63, 7, 'line');
            this.line.scale.setTo(0.29);

            this.base = game.add.sprite(window.innerWidth/2, window.innerHeight-20, 'base');
            this.base.anchor.setTo(0.5, 0.5);
            this.base.scale.setTo(0.5, 0.5);

            this.can = game.add.sprite(this.base.centerX + 10, this.base.centerY - 20, 'can');
            this.can.anchor.setTo(0.5, 1);
            this.can.scale.setTo(0.4, 0.4);
            this.can.angle = -17;
            this.desecho = game.add.group();
            this.desecho.enableBody = true;
            //this.desecho.game.physics.arcade.gravity.y=-400;
            this.valor = 0;
            this.secuencia = [];
            this.basureros = [];
            this.secuenciaDesechos = [];
            this.desechosArreglo = [];
            this.play = true;
            this.cincuenta = game.add.sprite(150, 50, 'cincuenta');
            this.cincuenta.visible = false;
            this.cincuenta.scale.setTo(0.3, 0.3);
            this.cien = game.add.sprite(250, 50, 'cien');
            this.cien.visible = false;
            this.cien.scale.setTo(0.25, 0.25);
            this.style = {
                font: 'bold 30pt Arial',
                fill: '#FFFFFF',
                align: 'center',
            }
            this.scoreText = game.add.text(game.width / 2, 40, '0', this.style);
            this.scoreText.anchor.setTo(0.5);
            this.instrucciones.visible = false;
            this.buttonPlay = game.add.button(window.innerWidth/2, window.innerHeight/2, 'BotonPlay', this.empezarJuego, this, 1, 0, 3, 0);
            this.buttonPlay.scale.setTo(0.3);
            this.buttonPlay.anchor.setTo(0.4);
            this.lanzado = false;
        }
        this.flag = false
    },
    empezarJuego: function() {
        stateGame = STATE_GAME_PLAYING;
        this.buttonPlay.visible = false;
        //this.crearSecuencia();

        this.crearSecuenciaDesecho();
        this.crearpoolDesechos();
        this.agregarbasureros();
        this.agregarDesechos();
        game.input.onDown.add(this.tocandoDesecho, this);
    },
    sumarPuntos: function() {
        puntaje += 100;
        this.scoreText.text = puntaje;
    },
    restarPuntos: function() {
        this.scoreText.text = puntaje;
        this.restarBarra(25);
    },
    permitirGravedad: function(objeto) {
        this.lanzado = true;
        objeto.visible = true;
        objeto.body.allowGravity = true;
        objeto.input.enableDrag(true);
        objeto.body.velocity.setTo(0, -480);
    },
    restarBarra: function(resta) {
        this.line.width -= resta;
        if (this.line.width < 5) {
            stateGame = STATE_GAME_OVER;
        }
    },
    tocandoDesecho: function() {

        this.valor++;
        if (this.valor >= this.desechosArreglo.length - 1) {
            this.valor = 0;

        }
        this.imprimirTipos(this.desecho.children[this.valor]);
        this.desecho.children[this.valor - 1].reset(window.innerWidth/2, window.innerHeight-100);
        this.desecho.children[this.valor].visible = false;
        this.permitirGravedad(this.desecho.children[this.valor - 1]);
        this.agregarDetalles();
    },
    agregarDetalles: function() {
        this.desecho.children[this.valor].reset(window.innerWidth/2 + 90, window.innerHeight-50);
        this.desecho.children[this.valor + 1].reset(window.innerWidth/2 + 200, window.innerHeight-50);
    },
    moverBasureros: function() {

        for (var i = 0; i < this.basureros.length; i++) {
            this.basureros[i].x += 1.87;
            if (this.basureros[i].x > 650) {
                this.basureros[i].x = -6000;
            }
        }
    },
    imprimirTipos: function(objeto) {

        if (objeto.id == 0) {
            this.tipoBasuraLayer = game.add.sprite(window.innerWidth/2, window.innerHeight-40, 'o');
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.scale.setTo(0.12);
            this.tipoBasuraLayer.events.onInputDown.add(this.tocandoDesecho);
        }
        if (objeto.id == 1) {
            this.tipoBasuraLayer = game.add.sprite(window.innerWidth/2, window.innerHeight-40, 'v');
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.scale.setTo(0.12);

        }
        if (objeto.id == 2) {
            this.tipoBasuraLayer = game.add.sprite(window.innerWidth/2, window.innerHeight-40, 'e');
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.scale.setTo(0.12);
        }
        if (objeto.id == 3) {
            this.tipoBasuraLayer = game.add.sprite(window.innerWidth/2, window.innerHeight-40, 'p');
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.scale.setTo(0.12);
        }
        if (objeto.id == 4) {
            this.tipoBasuraLayer = game.add.sprite(window.innerWidth/2, window.innerHeight-40, 'a');
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.scale.setTo(0.12);
        }
        if (objeto.id == 5) {
            this.tipoBasuraLayer = game.add.sprite(window.innerWidth/2, window.innerHeight-40, 'te');
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.scale.setTo(0.12);
        }

    },

    agregarbasureros: function() {
        var posicionX = -5700;
        for (var i = 0; i < this.secuencia.length; i++) {
            var rndNum = game.rnd.integerInRange(100, 200);
            this.secuencia[i].x = posicionX += rndNum;
            this.basurero = game.add.sprite(this.secuencia[i].x, this.secuencia[i].y - 100, this.secuencia[i].idImage);
            this.basurero.id = this.secuencia[i].id;
            this.basurero.name = "basurero" + i;
            this.basurero.anchor.setTo(0.5, 0.5);
            this.basurero.scale.setTo(0.12, 0.12);
            // this.basurero.bounds=this.getBoundsBasurero(this.basurero);
            this.basureros[i] = this.basurero;

        }
        console.log(this.basureros);
    },
    getBoundsBasurero: function(currentBasurero) {
        var x0 = currentBasurero.x - Math.abs(currentBasurero.width) / 6;
        var width = Math.abs(currentBasurero.width) / 4;
        var y0 = currentBasurero.y - currentBasurero.height - 12;
        var height = currentBasurero.height;
        return new Phaser.Rectangle(x0, y0, width, height);
    },
    getBoundsDesecho: function(currentDesecho) {
        var x0 = currentDesecho.x - Math.abs(currentDesecho.width) / 3;
        var width = Math.abs(currentDesecho.width) / 2;
        var y0 = currentDesecho.y - currentDesecho.height / 2;
        var height = currentDesecho.height;

        return new Phaser.Rectangle(x0, y0, width, height);
    },
    isRectanglesOverlapping: function(rect1, rect2) {
        if (rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) {
            return false;
        }
        if (rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height) {
            return false;
        }
        return true;
    },
    crearpoolDesechos: function() {
        for (var i = 0; i < this.secuenciaDesechos.length; i++) {
            var desechos = this.desecho.create(0, 0, this.secuenciaDesechos[i].idImage);
            desechos.anchor.setTo(0.5, 0.5);
            desechos.scale.setTo(0.09, 0.09);
            desechos.inputEnabled = true;
            desechos.id = this.secuenciaDesechos[i].id;
            desechos.body.allowGravity = false;
            desechos.events.onInputDown.add(this.tocandoDesecho, this);
            desechos.kill();
        }
    },

    agregarDesechos: function() {
        for (var i = 0; i < this.secuenciaDesechos.length; i++) {
            var desechos = this.desecho.getFirstDead();
            this.desechosArreglo.push(desechos);

        }

        this.desecho.children[this.valor].reset(window.innerWidth/2,window.innerHeight-30);
        this.desecho.children[this.valor].visible = false;
        this.imprimirTipos(this.desecho.children[this.valor]);
        this.agregarDetalles();

    },

    crearSecuenciaDesecho: function() {
        // se crea una secuencia de basureros random
        for (var i = 0; i < 40; i++) {
            var number = game.rnd.integerInRange(0, 5);
            var indice = game.rnd.integerInRange(0, 5);
            var indice2 = game.rnd.integerInRange(0, 5);
            var indice3 = game.rnd.integerInRange(0, 5);
            var indice4 = game.rnd.integerInRange(0, 5);
            var indice5 = game.rnd.integerInRange(0, 5);
            var indice6 = game.rnd.integerInRange(0, 5);
            if (number == 0) {

                this.secuenciaDesechos.push(desechoOrganicos[indice]);
                this.secuencia.push(basureros_array[0]);
            }
            if (number == 1) {

                this.secuenciaDesechos.push(desechoPapel[indice2]);
                this.secuencia.push(basureros_array[1]);
            }
            if (number == 2) {

                this.secuenciaDesechos.push(desechoEspecial[indice3]);
                this.secuencia.push(basureros_array[2]);

            }
            if (number == 3) {

                this.secuenciaDesechos.push(desechoLata[indice4]);
                this.secuencia.push(basureros_array[3]);
            }
            if (number == 4) {

                this.secuenciaDesechos.push(desechoVidrio[indice5]);
                this.secuencia.push(basureros_array[4]);
            }
            if (number == 5) {
                this.secuencia.push(basureros_array[5]);
                this.secuenciaDesechos.push(desechoEnvase[indice6]);
            }
        }

    },

    crearSecuencia: function() {
        // se crea una secuencia de basureros random
        for (var i = 0; i < 20; i++) {
            var number = game.rnd.integerInRange(0, 5);
            if (number == 0) {
                this.secuencia.push(basureros_array[0]);
            }
            if (number == 1) {
                this.secuencia.push(basureros_array[1]);
            }
            if (number == 2) {
                this.secuencia.push(basureros_array[2]);
            }
            if (number == 3) {
                this.secuencia.push(basureros_array[3]);
            }
            if (number == 4) {
                this.secuencia.push(basureros_array[4]);
            }
            if (number == 5) {
                this.secuencia.push(basureros_array[5]);
            }
        }


    },
    compararObjetos: function(objeto1, objeto2, int1, int2x) {
        if (objeto1.id == objeto2.id) {
            this.sumarPuntos();
            this.cien.visible = true;
            var tween = game.add.tween(this.cien);
            tween.to({ x: 250, y: 25 }, 600, Phaser.Easing.Exponential.Out);
            tween.start();
            this.desecho.children[int1].kill();

        } else {
            this.restarPuntos();
            this.cincuenta.visible = true;
            var tween = game.add.tween(this.cincuenta);
            tween.to({ x: 125, y: 25 }, 600, Phaser.Easing.Exponential.Out);
            tween.start();
            //  this.desecho.children[int1].kill();
            var tweenDesecho = game.add.tween(this.desecho.children[int1]);
            var x = game.rnd.integerInRange(0, 600);
            var y = game.rnd.integerInRange(200, 500);
            tweenDesecho.to({ x: x, y: y }, 1500, Phaser.Easing.Exponential.Out);
            tweenDesecho.start();
            this.contaminacion = game.add.sprite(x, y, this.desecho.children[int1].key);
            this.contaminacion.scale.setTo(0.1, 0.1);
            // console.log(this.desecho.children[int1].key);
            //console.log(puntos_level);
        }

    },
    render: function() {
        /*
        for(var i=0; i<this.secuenciaDesechos.length; i++){

          for(var j=0; j<this.secuencia.length; j++){
            game.debug.spriteBounds(this.desecho.children[i]);
            game.debug.spriteBounds(this.basureros[1]);
          }*/

    },
    rotarcan: function() {
        loop++;
        this.can.angle = loop;

    },
    contaminar: function() {

    },
    update: function() {
        switch (stateGame) {
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_OVER:
                game.state.start("gameOver");

                break;

            case STATE_GAME_WIN:

                break;

            case STATE_GAME_MENU:

                break;

            case STATE_GAME_PLAYING:

                this.moverBasureros();
                if (this.cincuenta.y < 26) {
                    this.cincuenta.visible = false;
                    this.cincuenta.x = 150;
                    this.cincuenta.y = 50;
                }
                if (this.cien.y < 26) {
                    this.cien.visible = false;
                    this.cien.x = 250;
                    this.cien.y = 50;
                }
                for (var i = 0; i < this.secuenciaDesechos.length; i++) {

                    for (var j = 0; j < this.secuencia.length; j++) {
                        var rectBasurero = this.getBoundsBasurero(this.basureros[j]);
                        var rectDesecho = this.getBoundsDesecho(this.desecho.children[i]);
                        if (this.desecho.children[i].visible && this.isRectanglesOverlapping(rectDesecho, rectBasurero)) {
                            this.compararObjetos(this.basureros[j], this.desecho.children[i], i, j);
                            this.desecho.children[i].visible = false;
                            this.desecho.children[i].kill();
                        }
                    }
                }
                break;
        }

    }

}

//var game = new Phaser.Game(500, 800, Phaser.AUTO);

game.state.add("gameplayParque", GamePlayParque);
//game.state.add("InicioParque", empezarJuego);
game.state.add("gameOver", GameOverManager);
//game.state.start("gameplay");
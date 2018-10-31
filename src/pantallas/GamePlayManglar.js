var GRAVEDAD_Y = 200;
var GRAVEDAD_XN = 0;
var AMOUNT_PLATAFORMAS = 2;
var AMOUNT_BASUREROS = 4;
var AMOUNT_REMOLINOS = 1;
var pantalla = 1;
var cant_plat_1 = 8;
var cant_tron_1 = 2;
var tipoBola;
var flagResultEndGame = false;

var GamePlayManglar = function() {};

GamePlayManglar.prototype = {

        init: function() {
            //Escala las dimensiones de img y sprites dentro del espacio disponible del juego, manteniendo la escala
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //game.width = window.innerWidth;
            
            //Alinea el objeto juego al centrohorizontal Y centrovertical de la pantalla
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            this.flagDropBall = false; //Booleano para controlar la influencia de la gravedad sobre el objeto bola
            this.flagEndGame = false; //Booleano para controlar la condiciion de fin del juego
            //Array de troncos
            this.troncos = [];
            //this.flagIsSliding=false;
            //this.flagHasSlide=false;
        },
        create: function() {
            /********************************Materiales del juego*******************************************/
            game.physics.startSystem(Phaser.Physics.P2JS);
            game.physics.p2.gravity.y = GRAVEDAD_Y;
            this.worldMaterial = game.physics.p2.createMaterial('worldMaterial');
            game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
            this.materialPlataforma = game.physics.p2.createMaterial('materialPlataforma');

            //Array de plataformas
            this.plataformas = [];
            //Array de Basureros;
            this.basureros = [];
            //Array de Remolinos
            this.remolinos = [];

            this.bola_basura;
            /*******************************Diseño de nivel limpio*************************************/
            if (pantalla == 1) {
                /********Seccion de creacion de las imagenes y recursos******/
                //Fondo
                var fondillo = game.add.sprite(0, 0, 'fondoLimpio');
                fondillo.width = window.innerWidth;
                //Basuras        
                tipoBola = Math.floor(Math.random() * 4);
                var frameBola = Math.floor(Math.random() * 5);
                switch (tipoBola) {
                    case 0:
                        this.bola_basura = game.add.sprite(12, 0, 'organico', frameBola);
                        break;
                    case 1:
                        this.bola_basura = game.add.sprite(366, 0, 'vidrio', frameBola);
                        break;
                    case 2:
                        this.bola_basura = game.add.sprite(366, 0, 'plastico', frameBola);
                        break;
                    case 3:
                        this.bola_basura = game.add.sprite(366, 0, 'papel', frameBola);
                        break;
                }
                //Plataformas
                var plat_lvlLimpio0 = game.add.sprite(window.innerWidth-10, window.innerHeight-20, 'lvlLimpio_0');
                var plat_lvlLimpio1 = game.add.sprite(135, 460, 'lvlLimpio_1');
                var plat_lvlLimpio2 = game.add.sprite(330, 60, 'lvlLimpio_2');
                var plat_lvlLimpio3 = game.add.sprite(210, 60, 'lvlLimpio_3');
                var plat_lvlLimpio4 = game.add.sprite(260, 150, 'lvlLimpio_4');
                var plat_lvlLimpio5 = game.add.sprite(220, 216, 'lvlLimpio_5');
                var plat_lvlLimpio6 = game.add.sprite(80, 130, 'lvlLimpio_6');
                var plat_lvlLimpio7 = game.add.sprite(44, 242, 'lvlLimpio_7');

                //Troncos
                var v_troncoLimpio_0 = game.add.sprite(315, 48, 'tronco');
                var v_troncoLimpio_1 = game.add.sprite(380, 205, 'tronco_flat');

                //Remolinos
                var remolino_0 = game.add.sprite(185, 30, 'remolino_0');

                this.remolinos[0] = remolino_0;


                //Basureros
                var basurero_0 = game.add.sprite(140, 148, 'basureros');
                basurero_0.frame = 0;
                var basurero_1 = game.add.sprite(300, 75, 'basureros');
                basurero_1.frame = 1;
                var basurero_2 = game.add.sprite(360, 292, 'basureros');
                basurero_2.frame = 2;
                var basurero_3 = game.add.sprite(70, 220, 'basureros');
                basurero_3.frame = 3;
                basurero_3.anchor.setTo(0.5);
                basurero_3.angle = 60;
                //Esto es para hacer match con las basura correspondiente
                this.basureros[0] = basurero_0;
                this.basureros[0].id = 0;
                this.basureros[1] = basurero_1;
                this.basureros[1].id = 1;
                this.basureros[2] = basurero_2;
                this.basureros[2].id = 2;
                this.basureros[3] = basurero_3;
                this.basureros[3].id = 3;

                //Plataformas
                this.plataformas[0] = plat_lvlLimpio0;
                this.plataformas[1] = plat_lvlLimpio1;
                this.plataformas[2] = plat_lvlLimpio2;
                this.plataformas[3] = plat_lvlLimpio3;
                this.plataformas[4] = plat_lvlLimpio4;
                this.plataformas[5] = plat_lvlLimpio5;
                this.plataformas[6] = plat_lvlLimpio6;
                this.plataformas[7] = plat_lvlLimpio7;

                for (var i = 0; i < cant_plat_1; i++) {
                    this.plataformas[i].anchor.setTo(0.5);
                    game.physics.p2.enable(this.plataformas[i]);
                    //Se elimina el objeto body creado por default
                    this.plataformas[i].body.clearShapes();
                    //Carga poligonos
                    this.plataformas[i].body.loadPolygon("plvlLimpio_" + i, "lvlLimpio_" + i);
                    //Se establece el material para las plataformas
                    this.plataformas[i].body.setMaterial(this.materialPlataforma);
                    /*En esta sección se modifican las plataformas para que la gravedad no les afecte
                    Se declaran estáticas para que aparezcan en pantalla aún con la propiedad mass modificada.
                    Mass=0 evita que la gravedad les afecta al hacer contacto.*/
                    this.plataformas[i].body.motionState = 2; //Las plataformas se declaran como objetos estáticos
                    this.plataformas[i].body.mass = 0; //Evita que el contacto empuje las plataformas al suelo.	
                }
                //Troncos
                this.troncos[0] = v_troncoLimpio_0;
                this.troncos[1] = v_troncoLimpio_1;

                for (var i = 0; i < cant_tron_1; i++) {
                    this.troncos[i].anchor.setTo(0.5, 0.5);
                    this.troncos[i].name = i;
                    this.troncos[i].activado = false;
                    //Se habilita el sprite como objeto seleccionable
                    this.troncos[i].inputEnabled = true;
                    //Se le agrega el evento al sprite
                    game.physics.p2.enable(this.troncos[i], true);
                    this.troncos[i].body.clearShapes();
                    switch (i) {
                        case 0:
                            this.troncos[i].body.loadPolygon("tronco_neutral", "tronco_diagonal");
                            break;
                        case 1:
                            this.troncos[i].body.loadPolygon("tronco_flat", "tronco_flat");
                            break;
                            defalut: ;
                    }
                    this.troncos[i].body.setMaterial(this.materialPlataforma);
                    this.troncos[i].body.motionState = 2;
                    this.troncos[i].body.mass = 0;
                    this.troncos[i].events.onInputDown.add(this.tocandoTronco, this);
                }
            }

            //createContactMaterial crea colisiones entre 2 materiales. Las colisiones tienen propiedades específicas. Para más info buscar en documentacion de phaser
            var plataformaMundo = game.physics.p2.createContactMaterial(this.materialPlataforma, this.worldMaterial, { friction: 0 });
            game.input.onDown.add(this.onTap, this); //Control del evento on click 
        },
        //Devuelve un rectangulo para colision
        getBounds: function(spriteActual) {
            return new Phaser.Rectangle(0.5, 0.5, spriteActual.width, spriteActual.height);
        },
        getRemolinoBounds(remolinoActual) {
            return new Phaser.Rectangle(remolinoActual.left, remolinoActual.top, remolinoActual.width, remolinoActual.height);
        },
        tocandoTronco: function(tronco) {
            console.log("entro a tocando tronco");
            if (pantalla == 1) {
                tronco.body.moves = false;
                if (!tronco.activado) {
                    this.troncos[tronco.name].activado = true;
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].body.loadPolygon("tronco_down", "tronco_down");
                    tronco.activado = true;
                } else {
                    this.troncos[tronco.name].activado = false;
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].angle -= 120;
                    this.troncos[tronco.name].body.loadPolygon("tronco_neutral", "tronco_diagonal");
                    tronco.activado = false;
                }
            }
        },
        onTap: function() {
            this.flagDropBall = true;
            game.physics.p2.enable(this.bola_basura);
            this.materialBola = game.physics.p2.createMaterial('materialBola');
            this.bola_basura.body.setMaterial(this.materialBola);
            this.bola_basura.allowRotation = true;

            var plataformaBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialPlataforma, { friction: -3 });
        },
        getBounds: function(currentPlataform) {
            return new Phaser.Rectangle(currentPlataform.left, currentPlataform.top, currentPlataform.width, currentPlataform.height);
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
        showFinalMessage: function(msg) {
            var bgAlpha = game.add.bitmapData(game.width, game.height);
            bgAlpha.ctx.fillStyle = '#000000';
            bgAlpha.ctx.fillRect(0, 0, game.width, game.height);

            var bg = game.add.sprite(0, 0, bgAlpha);
            bg.alpha = 0.5;

            var style = {
                font: 'bold 12pt Arial',
                fill: '#FFFFFF',
                align: 'center'
            }

            this.textFieldFinalMsg = game.add.text(game.width / 2, game.height / 2, msg, style);
            this.textFieldFinalMsg.anchor.setTo(0.5);
        },
        render: function() {
            /*for(var i=0; i<cant_plat_1; i++){
                //game.debug.bodyInfo(this.plataformas[i],0,0)
                game.debug.body(this.plataformas[i]);
                }

                 for(var i=0; i<cant_tron_1; i++){
                //game.debug.bodyInfo(this.plataformas[i],0,0)
                game.debug.body(this.troncos[i]);
                }
                */
        },
        update: function() {
            /*Condicional que controla cuando el juego termina*/
            if (this.flagEndGame) {
                //Resultado cuando el juego termina
            } else {
                /*Habilita el control de arrastre de la bola*/
                if (this.flagDropBall) {
                    //Checa colisiones con basureros
                    for (var i = 0; i < AMOUNT_BASUREROS; i++) {
                        var rectBola = this.getBounds(this.bola_basura);
                        var rectBas = this.getBounds(this.basureros[i]);

                        if (this.isRectanglesOverlapping(rectBola, rectBas)) {
                            if (tipoBola == this.basureros[i].id) {
                                //this.showFinalMessage('Basurero correcto');
                                flagResultEndGame = true;
                                this.state.start('estadoFinal');
                            } else {
                                //this.showFinalMessage('Basurero incorrecto');
                                flagResultEndGame = false
                                this.state.start('estadoFinal');
                            }
                            flagEndGame = true;
                        }
                    }
                    //Checa colisiones con remolinos
                    for (var i = 0; i < AMOUNT_REMOLINOS; i++) {
                        var rectBola = this.getBounds(this.bola_basura);
                        var rectRemolino = this.getRemolinoBounds(this.remolinos[i]);
                        if (this.isRectanglesOverlapping(rectBola, rectRemolino)) {
                            this.physics.p2.gravity.x = -1000;
                        } else
                            this.physics.p2.gravity.x = 0;
                    }
                } else {
                    /*Habilita el arrastre sobre la bola una vez que la gravedad empieza a afectarle*/
                    var pointerX = game.input.x;
                    var distX = pointerX - this.bola_basura.x;
                    this.bola_basura.x += distX * 0.02; /*Velocidad de arrastre se reduce*/
                }
            }
        }
    }
    /*Variable de estado de la pantalla de inicio*/
var estadoPrincipal = {
    init: function() {
        /*Control de escala del menu de inicio*/
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    preload: function() {
        game.load.image('fondoLimpio', 'assets/img/mapaInteractivo/fondo/fondo_limpio.png');
        game.load.image('boton_jugar', 'assets/img/mapaInteractivo/Pantallas/boton_jugar.png');
        game.load.image('boton_salir', 'assets/img/mapaInteractivo/Pantallas/boton_salir.png');
        //game.stage.backGroundColor='#FFFFFF'//Fondo de color negro
        game.load.image('boton', 'assets/img/btn.png'); //Carga la imagen del boton
    },
    create: function() {
        game.add.sprite(0, 0, 'fondoLimpio');
        var boton = this.add.button(game.width / 2, (game.height / 2) - 50, 'boton_jugar', this.iniciarJuego, this); //Crea el boton y le indica la funcion de control de evento
        boton.anchor.setTo(0.5); //El jeje del boton se coloca en su centro
        var botonSalir = this.add.button(game.width / 2, (game.height / 2) + 50, 'boton_salir', null, this);
        botonSalir.anchor.setTo(0.5);
    },
    /*Funcion del boton iniciar*/
    iniciarJuego: function() {
        this.state.start('gameplayManglar'); //Se cambia el estado de juego del menu de inicio al gameplay
    },
}

var estadoFinal = {
    init: function() {
        /*Control de escala del menu de inicio*/
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    preload: function() {
        game.load.image('fondoLimpio', 'assets/img/mapaInteractivo/fondo/fondo_limpio.png');
        game.load.image('boton_reinicar', 'assets/img/mapaInteractivo/Pantallas/boton_reinicar.png');
        //game.stage.backGroundColor='#FFFFFF'//Fondo de color negro
        game.load.image('boton', 'assets/img/btn.png'); //Carga la imagen del boton
    },
    create: function() {
        game.add.sprite(0, 0, 'fondoLimpio');
        if (flagResultEndGame) {
            var text = game.add.text(game.width / 2, (game.height / 2) - 100, 'Has Ganado');
        } else {
            var text = game.add.text(game.width / 2, (game.height / 2) - 100, 'Has Perdido');
        }
        text.anchor.setTo(0.5);
        var boton = this.add.button(game.width / 2, (game.height / 2) + 150, 'boton_reinicar', this.iniciarJuego, this); //Crea el boton y le indica la funcion de control de evento
        boton.anchor.setTo(0.5); //El jeje del boton se coloca en su centro
    },
    /*Funcion del boton iniciar*/
    iniciarJuego: function() {
        this.state.start('gameplayManglar'); //Se cambia el estado de juego del menu de inicio al gameplay
    },
}


//var game = new Phaser.Game(414, 628, Phaser.AUTO); /*Objeto juego credo por el framework, se indica las dimensiones del juego y el tipo de render*/
game.state.add('gameplayManglar', GamePlayManglar);
game.state.add('inicio', estadoPrincipal);
game.state.add('estadoFinal', estadoFinal);
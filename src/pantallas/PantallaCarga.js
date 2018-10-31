var escalar;
var PantallaCarga = function() {};

PantallaCarga.prototype = { //Cargar toda la pantalla

    loadScripts: function() {
        game.load.script('style', 'src/librerias/style.js');
        game.load.script('WebFont', 'src/librerias/webfontloader.js');
        game.load.script('menuprincipal', 'src/pantallas/MenuPrincipal.js');
        game.load.script('planetas', 'src/pantallas/PlanetasMenu.js');
        game.load.script('planetasmenu', 'src/pantallas/MenuPrincipal.js');
        game.load.script('menuconfiguracion', 'src/pantallas/MenuConfiguracion.js');
        game.load.script('GamePlayCiudad', 'src/pantallas/GamePlayCiudad.js');
        game.load.script('GamePlayManglar', 'src/pantallas/GamePlayManglar.js');
        game.load.script('GamePlayParque', 'src/pantallas/GamePlayParque.js');
        game.load.script('GamePlayPlaya', 'src/pantallas/GamePlayPlaya.js');
        game.load.script('StateTransition', 'phaser-state-transition.js');
    },

    //Para cargar la musica del juego
    /* loadBgm: function () {
       game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
       game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
     },*/

    // cargar background de las pantallas
    loadImages: function() {
        //Pantalla de menu de inicio
        game.load.image('menu-principal-bg', 'assets/img/menuPrincipal/fondoMenuInicio.png');
        game.load.spritesheet('botonJugarC', 'assets/img/menuPrincipal/botonJugarMenuPrincipal.png', 294, 94);
        game.load.spritesheet('botonSalir', 'assets/img/menuPrincipal/botonSalirMenuPrincipal.png', 294, 94);
        game.load.spritesheet('botonConfiguracion', 'assets/img/menuPrincipal/configMenuPrincipal.png', 52, 52);

        //Pantalla de
        game.load.image('menu-bg', 'assets/img/menuPrincipal/menu-bg.jpg');
        game.load.image('botonUniversal', 'assets/img/pantallaNiveles/planetas.png');

        //Botones inferiores de salida
        game.load.image('volverPrincipalPlanetas', 'assets/img/pantallaNiveles/salir.png');
        game.load.image('salirConfig', 'assets/img/pantallaNiveles/salir.png');
        game.load.image('configMenu', 'assets/img/pantallaNiveles/salir.png');

        game.load.image('background', 'assets/img/pantallaNiveles/background.png');
        game.load.image('botonUniversal', 'assets/img/pantallaNiveles/planetas.png');
        game.load.image('volver', 'assets/img/pantallaNiveles/salir.png');


        game.load.spritesheet('mundo1', 'assets/img/pantallaNiveles/Ciudad.png', 265, 257);
        game.load.spritesheet('mundo2', 'assets/img/pantallaNiveles/Playa.png', 265, 186);
        game.load.spritesheet('mundo3', 'assets/img/pantallaNiveles/Manglar.png', 265, 223);
        game.load.spritesheet('mundo4', 'assets/img/pantallaNiveles/ciudad.png', 265, 257);

        /*********Interactua mapa********/
        //Fondo
       // game.load.image('fondoLimpio', 'assets/img/fondo/fondo_limpio.png');
        //Plataformas sprites
        game.load.image('lvlLimpio_0', 'assets/img/mapaInteractivo/plataformas/lvlLimpio_0.png');
        game.load.image('lvlLimpio_1', 'assets/img/mapaInteractivo/plataformas/lvlLimpio_1.png');
        game.load.image('lvlLimpio_2', 'assets/img/mapaInteractivo/plataformas/lvlLimpio_2.png');
        game.load.image('lvlLimpio_3', 'assets/img/mapaInteractivo/plataformas/lvlLimpio_3.png');
        game.load.image('lvlLimpio_4', 'assets/img/mapaInteractivo/plataformas/lvlLimpio_4.png');
        game.load.image('lvlLimpio_5', 'assets/img/mapaInteractivo/plataformas/lvlLimpio_5.png');
        game.load.image('lvlLimpio_6', 'assets/img/mapaInteractivo/plataformas/lvlLimpio_6.png');
        game.load.image('lvlLimpio_7', 'assets/img/mapaInteractivo/plataformas/lvlLimpio_7.png');
        //Plataformas physics
        game.load.physics('plvlLimpio_0', 'assets/physic/plataformas/lvlLimpio_0.json');
        game.load.physics('plvlLimpio_1', 'assets/physic/plataformas/lvlLimpio_1.json');
        game.load.physics('plvlLimpio_2', 'assets/physic/plataformas/lvlLimpio_2.json');
        game.load.physics('plvlLimpio_3', 'assets/physic/plataformas/lvlLimpio_3.json');
        game.load.physics('plvlLimpio_4', 'assets/physic/plataformas/lvlLimpio_4.json');
        game.load.physics('plvlLimpio_5', 'assets/physic/plataformas/lvlLimpio_5.json');
        game.load.physics('plvlLimpio_6', 'assets/physic/plataformas/lvlLimpio_6.json');
        game.load.physics('plvlLimpio_7', 'assets/physic/plataformas/lvlLimpio_7.json');
        //Basura
        game.load.spritesheet('organico', 'assets/img/mapaInteractivo/basuras/organico_min.png', 18.368, 18);
        game.load.spritesheet('papel', 'assets/img/mapaInteractivo/basuras/papel_min.png', 18.368, 18);
        game.load.spritesheet('plastico', 'assets/img/mapaInteractivo/basuras/plastico_min.png', 18.368, 18);
        game.load.spritesheet('vidrio', 'assets/img/mapaInteractivo/basuras/vidrio_min.png', 18.368, 18);
        //Troncos sprites
        game.load.image('tronco', 'assets/img/mapaInteractivo/troncos/tronco_diagonal.png');
        game.load.image('tronco_flat', 'assets/img/mapaInteractivo/troncos/tronco_flat.png');
        game.load.image('tronco_abajo', 'assets/img/mapaInteractivo/troncos/tronco_down.png');
        //Troncos physics
        game.load.physics('tronco_neutral', 'assets/physic/troncos/tronco_neutral.json');
        game.load.physics('tronco_down', 'assets/physic/troncos/tronco_down.json');
        game.load.physics('tronco_flat', 'assets/physic/troncos/tronco_flat.json');
        //Basureros
        game.load.spritesheet('basureros', 'assets/img/mapaInteractivo/basureros/basureros.png', 31, 28);
        //Remolinos
        game.load.image('remolino_0', 'assets/img/mapaInteractivo/remolinos/remolino_0.png');

        //////////*Keylor*//////////////
        //stateGame = STATE_GAME_LOADING;
        /*    game.load.image('background', 'assets/img/recolectaBasura/bg.jpg');
            game.load.atlasJSONArray('personajeCaminando', 'assets/img/recolectaBasura/top_walk.png', 'Assets/img/recolectaBasura/top_walk.json');
            game.load.atlasJSONArray('personajeCaminandoArriba', 'assets/img/recolectaBasura/personajeCaminandoArriba.png', 'Assets/img/recolectaBasura/personajeCaminandoArriba.json');
            game.load.atlasJSONArray('personajeCaminandoDerecha', 'assets/img/recolectaBasura/personajeCaminandoDerecha.png', 'Assets/img/recolectaBasura/personajeCaminandoDerecha.json');
            game.load.image('manzana', 'assets/img/recolectaBasura/manzana.png');
            game.load.spritesheet("BotonPlay", 'assets/img/recolectaBasura/botonPlay.png', 178, 176, 3);
            game.load.image('mapa', 'assets/img/recolectaBasura/mapa2.png');
            game.load.image('scoreFondo', 'assets/img/recolectaBasura/score.png');
            game.load.image('tiempo', 'assets/img/recolectaBasura/time.png');
            game.load.image('barraTiempo', 'assets/img/recolectaBasura/timeBar.png');
            game.load.image('statsFinal', 'assets/img/recolectaBasura/stats.png');
            game.load.image('recargar', 'assets/img/recolectaBasura/Reload.png');
            game.load.image('estrella', 'assets/img/recolectaBasura/estrella.png');
            game.load.audio('loopMusic', 'assets/Sonidos/Principal.mp3');
            game.load.audio('aplausos', 'assets/Sonidos/aplausos.wav');*/
    },

    loadFonts: function() {
        //Para cargar tipografias
        WebFontConfig = {
            custom: {
                families: ['TheMinion'],
                urls: ['assets/style/theminion.css']
            }
        }
    },

    init: function() { //orientacion x ,orientacion y, Recibe la img llamada en main.js(brand y loading)
        this.logo = game.make.sprite(game.world.centerX, game.world.centerY, 'brand');
        utils.centerGameObjects([this.logo]);
    },

    preload: function() {
        game.scale.forceOrientation(false, true);
        game.add.sprite(0, 0, 'stars');

        if (window.innerWidth < 630) {
            escalar = window.innerWidth / 1000;
        } else {
            escalar = window.innerWidth / 1400;
        }

        game.add.existing(this.logo).scale.setTo(escalar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        //this.loadBgm();   -----> llama a cargar la musica

    },

    addGameStates: function() {

        game.state.add("MenuPrincipal", MenuPrincipal);
        game.state.add("PlanetasMenu", PlanetasMenu);
        game.state.add("MenuConfiguracion", MenuConfiguracion);
        game.state.add("GamePlayManglar", GamePlayManglar);
        game.state.add("GamePlayCiudad", GamePlayCiudad);
        game.state.add("GamePlayParque", GamePlayParque);
        game.state.add("GamePlayPlaya", GamePlayPlaya);
    },

    /*addGameMusic: function () {
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    },*/

    create: function() {
        this.addGameStates();
        //this.addGameMusic();     -----> Agrega el cargarMusica

        setTimeout(function() {
            game.state.start("MenuPrincipal");
        }, 1000);
    }
};
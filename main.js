// Global Variables

// game definition, 100% of browser window dimension
/*var game = new Phaser.Game("100%","100%",Phaser.CANVAS,"",{
   preload:onPreload,
   create:onCreate,
   resize:onResize // <- this will be called each time the game is resized
 }),*/
var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, this),
    Main = function() {};



Main.prototype = {

    preload: function() {
        game.load.image('stars', 'assets/img/pantallaCarga/background.png');
        //game.load.image('loading','assets/img/pantallaCarga/loading.png');
        game.load.image('brand', 'assets/img/pantallaCarga/logoITM.png');

        game.load.script('polyfill', 'src/librerias/polyfill.js');
        game.load.script('utils', 'src/librerias/utils.js');
        game.load.script('splash', 'src/pantallas/PantallaCarga.js');
    },

    create: function() {
        game.state.add('PantallaCarga', PantallaCarga);
        game.state.start('PantallaCarga');
    }

};

game.state.add('Main', Main);
game.state.start('Main');
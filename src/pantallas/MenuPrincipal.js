var botonJugar, botonSalir, botonCreditos, botonConfig, escalarAncho, escalarAlto, posicionY, botonesX, botonJugarY, botonSalirY, botonConfigY;
var tamanioBotonesH, tamanioBotonesW;

var MenuPrincipal = function() {};

MenuPrincipal.prototype = {

    init: function() {
        this.titleText = game.make.text(game.world.centerX, 100, "ITM GAMES", {
            font: 'bold 35pt TheMinion',
            fill: '#fff',
            align: 'center'
        });
        //this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    },
    create: function() {


        if (window.innerWidth < 630) {
            //Mobile
            escalarAncho = window.innerWidth;
            escalarAlto = window.innerHeight;
            posicionY = 0;
            tamanioBotonesJugarSalir = 0.65;
        } else {
            //Tablet
            escalarAncho = window.innerWidth;
            escalarAlto = window.innerHeight + 110;
            posicionY = -50;
            tamanioBotonesJugarSalir = 1;
        }
        //this.fondo = game.add.sprite(0, posicionY, 'menu-principal-bg'); // this.fondo.width = escalarAncho;
        //this.fondo.height = escalarAlto;

        botonesX = window.innerWidth / 2 - 95;
        if (window.innerHeight > 590) {
            //console.log("HOLA celulares grandes");
            botonJugarY = window.innerHeight / 2 + 15;
            botonSalirY = window.innerHeight / 2 + 95;
            botonConfigY = window.innerHeight - 125;

            if (window.innerWidth > 750) {
                //console.log("HOLATablet");
                botonesX = window.innerWidth / 2 - 140;
                botonJugarY = window.innerHeight / 2 + 45;
                botonSalirY = window.innerHeight / 2 + 170;
                botonConfigY = window.innerHeight - 125;
            }
        } else {
            if (window.innerHeight > 540) {
                //console.log("HOLAMedianos");
                botonJugarY = window.innerHeight / 2;
                botonSalirY = window.innerHeight / 2 + 75;
                botonConfigY = window.innerHeight - 110;
            } else {
                //console.log("HOLA peques");
                botonJugarY = window.innerHeight / 2;
                botonSalirY = window.innerHeight / 2 + 70;
                botonConfigY = window.innerHeight - 85;
            }
        }

        // button = game.add.button(game.world.centerX, game.world.centerY, 'botonP', clickJugar, this);
        // button.scale.set(0.35);
        //	Set the anchor of the sprite in the center, otherwise it would rotate around the top-left corner
        //  button.scale.setTo(0.4, 0.4);

        //button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
        botonJugar = game.add.button(botonesX, botonJugarY, 'botonJugarC', clickJugar, this);
        botonSalir = game.add.button(botonesX, botonSalirY, 'botonSalir', clickSalir, this);
        // botonJugar.width = 197;
        //botonJugar.width = tamanioBotonesW;
        //botonJugar.height = 63;
        //botonJugar.scale.set(0.4, 0.4);
        botonJugar.scale.setTo(tamanioBotonesJugarSalir, tamanioBotonesJugarSalir);
        botonSalir.scale.setTo(tamanioBotonesJugarSalir, tamanioBotonesJugarSalir);


        botonConfig = game.add.button(20, botonConfigY, 'botonConfiguracion', menuConfigClick, this);
    },
};

function clickJugar() {
    //game.state.start("PlanetasMenu", Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    game.state.start("PlanetasMenu");
}

function clickSalir() {
    console.log("Salir");
}

function menuConfigClick() {
    game.state.start("MenuConfiguracion");
}

//Phaser.Utils.mixinPrototype(MenuPrincipal.prototype);
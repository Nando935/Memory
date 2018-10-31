var botonVolver;
var MenuConfiguracion = function() {};

MenuConfiguracion.prototype = {

  init: function () {
    
  },
  create: function () {
    game.load.spritesheet('botonVolverMenu', 'salirConfig', 20, 20);

    botonVolver = game.add.button(20, window.innerHeight - 70, 'salirConfig', volverMenuPrincipalConfig, this, 0);


  },

};

function volverMenuPrincipalConfig () {
    game.state.start("MenuPrincipal", Phaser.Plugin.StateTransition.Out.SlideBottom, Phaser.Plugin.StateTransition.In.SlideBottom); 
}
function clickMundo1 () {
    console.log("clickMundo1");
}
function clickMundo2 () {
    console.log("clickMundo2");
}
function clickMundo3 () {
    console.log("clickMundo3");
}
function clickMundo4 () {
    console.log("clickMundo4");
}

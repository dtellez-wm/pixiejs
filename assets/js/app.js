let app = new PIXI.Application({ width: 1000, height: 500 });
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();

const puntos = [{
    id : 1,
    x : 150,
    y : 150,
},
{
    id : 2,
    x : 300,
    y : 200,
},
{
    id : 3,
    x : 400,
    y : 400,
},
{
    id : 4,
    x : 600,
    y : 400,
}
]



for (i = 0; i < puntos.length; i++) {
    let value_x = puntos[i].x;
    let value_y = puntos[i].y;
    dibujar_circulo(value_x, value_y);
    dibujar_linea(value_x, value_y);
}

function dibujar_circulo(value_x, value_y) {

    graphics.lineStyle(0);
    graphics.beginFill(0xDE3239, 1);
    graphics.drawCircle(value_x, value_y, 5);
    graphics.endFill();
}

function dibujar_linea(value_x, value_y) {
    graphics.lineStyle(2, 0xDE9239, 1);
    graphics.moveTo(puntos[0].x, puntos[0].y);
    graphics.lineTo(value_x, value_y);
}

const realPath = new PIXI.Graphics();
    
app.stage.addChild(realPath);
app.stage.addChild(graphics);
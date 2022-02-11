let app = new PIXI.Application({ width: 1000, height: 500 });
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();


const puntos = [{
    id : 1,
    x : 10,
    y : 400,
},
{
    id : 2,
    x : 40,
    y : 250,
},
{
    id : 3,
    x : 200,
    y : 150,
},
{
    id : 4,
    x : 160,
    y : 200,
}
]



for (i = 0; i < puntos.length; i++) {
    let value_x = puntos[i].x;
    let value_y = puntos[i].y;
    dibujar_circulo(value_x, value_y);
}

function dibujar_circulo(value_x, value_y) {

    graphics.lineStyle(0);
    graphics.beginFill(0xDE3239, 1);
    graphics.drawCircle(value_x, value_y, 5);
    graphics.endFill();
    }

    const realPath = new PIXI.Graphics();

    realPath.lineStyle(2, 0xDE9239, 1);
    realPath.moveTo(10, 400);
    realPath.lineTo(40, 250);
    realPath.lineTo(200, 150);
    realPath.lineTo(160, 200);
    
    
app.stage.addChild(realPath);

app.stage.addChild(graphics);
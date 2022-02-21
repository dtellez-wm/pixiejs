// let app = new PIXI.Application({ width: 1500, height: 500 });
// document.body.appendChild(app.view);

// const graphics = new PIXI.Graphics();

// const puntos = [{
//     id : 1,
//     x : 150,
//     y : 150,
// },
// {
//     id : 2,
//     x : 300,
//     y : 200,
// },
// // {
// //     id : 3,
// //     x : 400,
// //     y : 400,
// // },
// // {
// //     id : 4,
// //     x : 600,
// //     y : 400,
// // }
// ]

// for (i = 0; i < puntos.length; i++) {
//     let value_x = puntos[i].x;
//     let value_y = puntos[i].y;
//     dibujar_circulo(value_x, value_y);
//     dibujar_linea(value_x, value_y);
// }

// function dibujar_circulo(value_x, value_y) {

//     graphics.lineStyle(0);
//     graphics.beginFill(0xDE3239, 1);
//     graphics.drawCircle(value_x, value_y, 5);
//     graphics.endFill();
//     graphics.interactive = true;
//     graphics.buttonMode = true;
    
// }

// function dibujar_linea(value_x, value_y) {
//     graphics.lineStyle(2, 0xDE9239, 1);
//     graphics.moveTo(puntos[0].x, puntos[0].y);
//     graphics.lineTo(value_x, value_y);
// }

// const onDragStart = event => {
//     graphics.data = event.data;
//     graphics.dragging = true;
// };
// const onDragEnd = event => {
//     delete graphics.data;
//     graphics.dragging = false;
// };
// const onDragMove = event => {
//     if(graphics.dragging === true)
//     {
//         const newPosition = graphics.data.getLocalPosition(graphics.parent);
//         graphics.x = newPosition.x;
//         graphics.y = newPosition.y;
//         console.log(newPosition);
//     }
// };
// graphics.on('pointerdown', onDragStart);
// graphics.on('pointerup', onDragEnd);
// graphics.on('pointerupoutside', onDragEnd);
// graphics.on('pointermove', onDragMove);

// const realPath = new PIXI.Graphics();
    
// app.stage.addChild(realPath);
// app.stage.addChild(graphics);



const Application = PIXI.Application;
const app = new Application({ width: 1500, height: 500 });
app.renderer.backgroundColor = 0x061639;
document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;

let circle_x = 500;
let circle_y = 150;

const circle = new Graphics()
.beginFill(0xDE3239, 1)
.drawCircle(circle_x, circle_y, 10)
.lineStyle(0)
.endFill();

const line = new Graphics()
.lineStyle(2, 0xDE9239, 1)
.moveTo(0, 0)
.lineTo(circle_x, circle_y);

app.stage.addChild(line);
app.stage.addChild(circle);
circle.interactive = true
circle.buttonMode = true

const onDragStart = event => {
    line.data = event.data;
    circle.data = event.data;
    circle.dragging = true;
};

const onDragEnd = event => {
    delete circle.data;
    delete line.data;
    circle.dragging = false;
};

const onDragMove = event => {
    if(circle.dragging === true)
    {
        const newPosition = circle.data.getLocalPosition(circle.parent);
        circle.x = newPosition.x - circle_x;
        circle.y = newPosition.y - circle_y;
        const newPosition_line = line.data.getLocalPosition(line.parent);
        line.x = newPosition_line.x - circle_x;
        line.y = newPosition_line.y - circle_y;
        console.log(newPosition_line);
    }
};

circle.on('pointerdown', onDragStart);
circle.on('pointerup', onDragEnd);
circle.on('pointerupoutside', onDragEnd);
circle.on('pointermove', onDragMove);
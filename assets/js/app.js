// // create render
// let app = new PIXI.Application({ width: 1500, height: 500 });
// // add canvas to html
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
// {
//     id : 3,
//     x : 400,
//     y : 400,
// },
// {
//     id : 4,
//     x : 600,
//     y : 400,
// }
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

//         console.log(newPosition);
//         console.log(graphics.data);

//         for (i = 0; i < puntos.length; i++) {

//             graphics.x = newPosition.x - puntos[i].x;
//             graphics.y = newPosition.y - puntos[i].y;
//         }
//     }
// };

// graphics.on('pointerdown', onDragStart);
// graphics.on('pointerup', onDragEnd);
// graphics.on('pointerupoutside', onDragEnd);
// graphics.on('pointermove', onDragMove);

// const realPath = new PIXI.Graphics();
    
// app.stage.addChild(realPath);
// app.stage.addChild(graphics);




// Disable interaction plugin (for PixiJS 6)
// eslint-disable-next-line no-underscore-dangle
delete PIXI.Renderer.__plugins.interaction;


// Create app
const Application = PIXI.Application;
const app = new Application({ width: 1500, height: 500 });
app.renderer.backgroundColor = 0x061639;
document.body.appendChild(app.view);


// Install EventSystem, if not already (PixiJS 6 doesn't add it by default)
if (!('events' in app.renderer)) {
    app.renderer.addSystem(PIXI.EventSystem, 'events');
}

const Graphics = PIXI.Graphics;

// Make the whole scene interactive
app.stage.interactive = true;
// Make sure stage captures all events when interactive
app.stage.hitArea = app.renderer.screen;
// Handle clicks on the canvas
app.stage.addEventListener('click', onClick);

let circle_x = 0;
let circle_y = 0;



const line = new Graphics()
.lineStyle(2, 0xDE9239, 1)
.moveTo(0, 0)
.lineTo(circle_x, circle_y);

// Populate scene graph with bunnies
for (let i = 0; i < 10; i++) {
    // Create our little bunny friend..
    let circle = new Graphics()
    .beginFill(0xDE3239, 1)
    .drawCircle(circle_x, circle_y, 10)
    .lineStyle(0)
    .endFill();

    // let circle = new PIXI.graphics(circle);

    // Enable the bunny to be interactive... this will allow it to respond to
    // mouse and touch events
    circle.interactive = true;

    // This button mode will mean the hand cursor appears when you roll over
    // the bunny with your mouse
    circle.buttonMode = true;

    // // Center the bunny's anchor point.
    // circle.anchor.set(0.5);
    

    // // Make it a bit bigger, so it's easier to grab.
    // circle.scale.set(3);

    // Setup events for mouse + touch using the pointer events
    circle.addEventListener('pointerdown', onDragStart);
    circle.addEventListener('pointerup', onDragEnd);
    circle.addEventListener('pointerupoutside', onDragEnd);

    // Move the sprite to its designated position
    circle.x = Math.floor(Math.random() * app.screen.width);
    circle.y = Math.floor(Math.random() * app.screen.height);

    // Add it into the scene
    app.stage.addChild(circle);
}

// Store the bunny being dragged
let selectedTarget;

// Make bunny semi-transparent and listen to drag-move events when one is
// pressed.
function onDragStart(e) {
    // Show that the bunny can now be dragged.
    e.target.alpha = 0.5;
    selectedTarget = e.target;

    // Start listening to dragging on the stage
    app.stage.addEventListener('pointermove', onDragMove);
}

// Restore the dragTarget bunny's alpha & deregister listener when the bunny is
// released.
function onDragEnd() {
    // Restore the original bunny alpha.
    selectedTarget.alpha = 1;

    // Stop listening to dragging on the stage
    app.stage.removeEventListener('pointermove', onDragMove);
}

// Copy the position of the cursor into the dragTarget's position.
function onDragMove(e) {
    // Don't use e.target because the pointer might move out of the bunny if
    // the user drags fast, which would make e.target become the stage.
    selectedTarget.parent.toLocal(e.global, null, selectedTarget.position);
}

function onClick(e) {
    if (selectedTarget) {
        selectedTarget.position.copyFrom(e.global);
    }
}

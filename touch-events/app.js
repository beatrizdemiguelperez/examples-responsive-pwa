// Add listeners
const drawer = document.querySelector('#drawer');

drawer.addEventListener('touchstart', touchStartHandler);
drawer.addEventListener('touchend', touchMoveHandler);
drawer.addEventListener('touchleave', touchMoveHandler);
drawer.addEventListener('touchmove', touchMoveHandler);


const ongoingTouches = [];
const ctx = drawer.getContext("2d");
const { offsetLeft, offsetTop } = this.getCanvasOffset();

ctx.canvas.width = ctx.canvas.offsetWidth; 
ctx.canvas.height = ctx.canvas.offsetHeight;  

// <------ draw functions -------->

const color = '#7f7ff1';

function drawCircle(x, y) {    
    console.log(`circle ${x}, ${y}`);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(fromX, fromY, toX, toY) {
    console.log(`line from ${fromX}, ${fromX} to ${toX}, ${toY}`);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// <------ draw functions -------->

function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
}

function removeOngoingTouch(touch) {
    const index = ongoingTouches.indexOf(touch);
    ongoingTouches.splice(index, 1);
}

function touchStartHandler(event) {
    console.log('touchStartHandler: New touch on the surface has occurred');

    event.preventDefault();

    const touches = event.changedTouches;
    let x, y, touch;

    for (let i = 0; i < touches.length; i++) {
        touch = touches[i];
        x = touch.pageX - offsetLeft;
        y = touch.pageY - offsetTop;

        ongoingTouches.push(copyTouch(touch));
        drawCircle(x, y);
    }
}

function touchMoveHandler(event) {
    console.log('touchMoveHandler: touch point is moved along the touch surface.');

    event.preventDefault();

    const touches = event.changedTouches;

    let touch, isContinuingTouch;

    for (var i = 0; i < touches.length; i++) {
        touch = touches[i];
        continuingTouch = ongoingTouchById(touch.identifier);

        if (isContinuingTouch) {
            drawLine(
                continuingTouch.pageX - offsetLeft,
                continuingTouch.pageY - offsetTop,
                touch.pageX - offsetLeft,
                touch.pageY - offsetLeft
            );
            removeOngoingTouch(continuingTouch);
            ongoingTouches.push(touch);
        }
    }
}

function ongoingTouchById(idToFind) {
    return ongoingTouches.find((touch) => touch.identifier == idToFind);
}


// Calculate canvas's top left corner
// It's its offsetLeft and offsetTop plus its offsetParent's value and its offsetParent
// offsetParent's value, and on and on recursively through all parents
function getCanvasOffset() {
    let offsetLeft = 0;
    let offsetTop = 0;
    let element = drawer;

    while (element) {
        offsetLeft += element.offsetLeft;
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return {
        offsetLeft,
        offsetTop
    };
};
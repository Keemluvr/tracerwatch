var tracerBody, tracerHead, tracerGlass

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;


// ----------------------  Corpo da tracer ----------------------
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('./models/Tracer_Body_Printable.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./models/Tracer_Body_Printable.obj', function (object) {
        tracerBody = object;
        tracerBody.scale.set(0.4, 0.4, 0.4)
        tracerBody.rotation.set(0,-0.5,0)

        scene.add(tracerBody);

    });

});

// ----------------------  Cabeça da tracer ----------------------
mtlLoader.load('./models/Tracer_Head_Printable.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    // materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    
    objLoader.setMaterials(materials);
    objLoader.load('./models/Tracer_Head_Printable.obj', function (object) {
        tracerHead = object;
        tracerHead.scale.set(0.4, 0.4, 0.4)
        tracerHead.rotation.set(0,-0.5,0)

        scene.add(tracerHead);

    });

});

// ----------------------  Óculos da tracer ----------------------
mtlLoader.load('./models/Tracer_Glass_Printable.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./models/Tracer_Glass_Printable.obj', function (object) {
        tracerGlass = object;
        tracerGlass.scale.set(0.4, 0.4, 0.4)
        tracerGlass.rotation.set(0,-0.5,0)

        scene.add(tracerGlass);

    });

});

function desenhar() {
    if ( controls.isLocked === true ) {
        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;
        var intersections = raycaster.intersectObjects( objects );
        var onObject = intersections.length > 0;
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions
        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
        if ( onObject === true ) {
            velocity.y = Math.max( 0, velocity.y );
            canJump = true;
        }
        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );
        controls.getObject().position.y += ( velocity.y * delta ); // new behavior
        if ( controls.getObject().position.y < 10 ) {
            velocity.y = 0;
            controls.getObject().position.y = 10;
            canJump = true;
        }
        prevTime = time;
    }
    requestAnimationFrame(desenhar)
}

requestAnimationFrame(desenhar)

// movimento
var raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
document.onkeyup = (evt) => {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;
        case 37: // left
        case 65: // a
            moveLeft = false;
            break;
        case 40: // down
        case 83: // s
            moveBackward = false;
            break;
        case 39: // right
        case 68: // d
            moveRight = false;
            break;
    }
};

document.onkeydown = (evt) => {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;
        case 37: // left
        case 65: // a
            moveLeft = true;
            break;
        case 40: // down
        case 83: // s
            moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            moveRight = true;
            break;
        case 32: // space
            if ( canJump === true ) velocity.y += 350;
            canJump = false;
            break;
    }
}
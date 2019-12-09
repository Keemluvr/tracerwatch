var tracerBody, tracerHead, tracerGlass

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

// inicia um vetor de 256 teclas
let teclas = []
for (let i = 0; i < 256; i++) {
    teclas[i] = false
}

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
    processaTeclas()
    requestAnimationFrame(desenhar)
}

requestAnimationFrame(desenhar)

document.onkeydown = (evt) => {
    teclas[evt.keyCode] = true
}

document.onkeyup = (evt) => {
    teclas[evt.keyCode] = false
}

function processaTeclas() {
    // Movimentação
    if (teclas[87]&&teclas[68]) { // W - frente
        tracerBody.position.x -= 2
        tracerHead.position.x -= 2
        tracerGlass.position.x -= 2

        tracerBody.position.z -= 2
        tracerHead.position.z -= 2
        tracerGlass.position.z -= 2

        tracerBody.rotation.y = 3.5
        tracerHead.rotation.y = 3.5
        tracerGlass.rotation.y = 3.5
        
    }
    if (teclas[87]) { // W - frente
        tracerBody.position.z -= 2
        tracerHead.position.z -= 2
        tracerGlass.position.z -= 2
        tracerBody.rotation.y = 3
        tracerHead.rotation.y = 3
        tracerGlass.rotation.y = 3
        
    }
    if (teclas[83]) { // S - trás
        tracerBody.position.z += 2
        tracerHead.position.z += 2
        tracerGlass.position.z += 2

        tracerBody.rotation.y = 0
        tracerHead.rotation.y = 0
        tracerGlass.rotation.y = 0   

    }
    if (teclas[68]) { // D - direita
        tracerBody.position.x += 2
        tracerHead.position.x += 2
        tracerGlass.position.x += 2

        tracerBody.rotation.y = 1
        tracerHead.rotation.y = 1
        tracerGlass.rotation.y = 1   
    }
    if (teclas[65]) { // A - esquerda
        tracerBody.position.x -= 2
        tracerHead.position.x -= 2
        tracerGlass.position.x -= 2
        
        tracerBody.rotation.y = 4
        tracerHead.rotation.y = 4
        tracerGlass.rotation.y = 4
    }

}


// ----------------------  Arena ----------------------
var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('./models/stadium_obj/LM7_football_stadium.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./models/stadium_obj/LM7_football_stadium.obj', function (object) {
        arena = object;
        //arena.scale.set(10, 10, 10)
        //tracerBody.rotation.set(0,-0.5,0)

        cena.add(arena);
    });
});
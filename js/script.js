"use strict"
//three.js - Isometric Projection using an Orthographic Camera
// https://github.com/chandlerprall/Physijs    -  http://learningthreejs.com/blog/2012/06/05/3d-physics-with-three-js-and-physijs/
//https://blog.mozvr.com/jinglesmash-physics/

//var mesh, renderer, scene, camera, controls;

var time = 0;
var tracer = null;

let cena = new THREE.Scene()

let render = new THREE.WebGLRenderer( { antialias: true } )
render.shadowMapEnabled = true;
render.shadowMapSoft = true;
render.setSize(window.innerWidth, window.innerHeight)
let canvas = render.domElement
document.body.appendChild(canvas)

let aspect = window.innerWidth / window.innerHeight;
var d = 50;
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
//let camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

//camera.rotation.order = 'YXZ';
//camera.rotation.y = -Math.PI / 4;
//camera.rotation.x = Math.atan(-1 / Math.sqrt(2));

camera.position.x = -5
camera.position.y = 56
camera.position.z = 30
camera.rotation.x = -1

let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
cena.add(ambientLight);

let light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0, 50, 50);

light.castShadow = true;
// Will not light anything closer than 0.1 units or further than 25 units
light.shadow.camera.near = 1 ;
light.shadow.camera.far = 2500;
cena.add(light);

// axes
let axes = new THREE.AxisHelper(40)
axes.position.y=25
cena.add(axes);


function desenhar() {
	//camera.lookAt(tracer.position);
	processaTeclas()
	render.render(cena, camera)
    requestAnimationFrame(desenhar)
}
requestAnimationFrame(desenhar)
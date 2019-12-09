//three.js - Isometric Projection using an Orthographic Camera
// https://github.com/chandlerprall/Physijs    -  http://learningthreejs.com/blog/2012/06/05/3d-physics-with-three-js-and-physijs/
//https://blog.mozvr.com/jinglesmash-physics/

var mesh, renderer, scene, camera, controls;
var time = 0;

init();
render();

function init() {

	// info
	info = document.createElement('div');
	info.style.position = 'absolute';
	info.style.top = '30px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#fff';
	info.style.fontWeight = 'bold';
	info.style.backgroundColor = 'transparent';
	info.style.zIndex = '1';
	info.style.fontFamily = 'Monospace';
	info.innerHTML = 'three.js - Isometric Projection<br/>drag mouse to rotate camera';
	document.body.appendChild(info);

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// scene
	scene = new THREE.Scene;

	// camera
	var aspect = window.innerWidth / window.innerHeight;
	var d = 100;
	camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 0.1, 1000);
	camera.lookAt(scene.position);

	// /////////////////////////////////////////////////////////////////////////

	// method 1 - use lookAt
	//camera.position.set( 20, 20, 20 );
	//camera.lookAt( scene.position );

	// method 2 - set the x-component of rotation
	camera.position.set(40, 40, 40);
	camera.rotation.order = 'YXZ';
	camera.rotation.y = -Math.PI / 4;
	camera.rotation.x = Math.atan(-1 / Math.sqrt(2));

	// /////////////////////////////////////////////////////////////////////////

	// controls
	 controls = new THREE.OrbitControls(camera, renderer.domElement);
	 controls.addEventListener('change', render);
	 controls.enableZoom = true;
	 controls.enablePan = false;
	 controls.maxPolarAngle = Math.PI / 2;

	// ambient
	scene.add(new THREE.AmbientLight(0x444444));

	// light
	var light = new THREE.PointLight(0xffffff, 0.8);
	light.position.set(0, 50, 50);
	scene.add(light);

	// axes
	scene.add(new THREE.AxisHelper(40));

	// grid
	var geometry = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
	var material = new THREE.MeshToonMaterial();
	var grid = new THREE.Mesh(geometry, material);
	grid.rotation.order = 'YXZ';
	grid.rotation.y = -Math.PI / 2;
	grid.rotation.x = -Math.PI / 2;
	scene.add(grid);
	//grid.position.y = -20

}



function render() {
	renderer.render(scene, camera);
	requestAnimationFrame(render)
}
requestAnimationFrame(render)
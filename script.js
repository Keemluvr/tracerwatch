"use strict"
let cena = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
let render = new THREE.WebGLRenderer()

render.setSize(window.innerWidth, window.innerHeight)
let canvas = render.domElement
document.body.appendChild(canvas)


// ---------------------- Movimentação ----------------------------
let controles = new THREE.OrbitControls(camera, render.domElement)

var cameraPerspectiva = new THREE.PerspectiveCamera(45, 0, 1, 1000);
cena.add(cameraPerspectiva)


function desenhar() {
    render.render(cena, camera)
    requestAnimationFrame(desenhar)
}

requestAnimationFrame(desenhar)
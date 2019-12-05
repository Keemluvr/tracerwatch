// -------------------------- Luz ---------------------------------


// Luz ambiente (ilumina tudo)
let luzAmbiente = new THREE.AmbientLight(0x333333)


// Intensidade
luzAmbiente.intensity = 2


// Ponto de luz
let luzPonto = new THREE.PointLight(0x888888)
luzPonto.position.set(2, 2, 3)


// Adiciona à cena
scene.add(
    luzAmbiente,
    luzPonto
)

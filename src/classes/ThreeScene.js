import * as THREE from "three"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import RAF from '../utils/raf'

class ThreeScene {
    constructor() {
        this.bind()

        this.camera
        this.scene
        this.renderer
        this.controls
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        document.body.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 5)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enabled = true
        this.controls.maxDistance = 1500
        this.controls.minDistance = 0

        let light = new THREE.AmbientLight()
        let pointLight = new THREE.PointLight()
        pointLight.position.set(10, 10, 0)
        this.scene.add(light, pointLight)

        const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
        this.scene.add(cube)

        window.addEventListener("resize", this.resizeCanvas)
        RAF.subscribe('threeSceneUpdate', this.update)
    }

    update() {
        this.renderer.render(this.scene, this.camera);
    }


    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new ThreeScene()
export default _instance
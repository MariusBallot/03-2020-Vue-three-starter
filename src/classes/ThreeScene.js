import * as THREE from "three"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import RAF from '../utils/raf'

import Tube from './Tube'

class ThreeScene {
    constructor() {
        this.bind()

        this.camera
        this.scene
        this.renderer
        this.controls
        this.mouse = new THREE.Vector2(0, 0)
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        document.body.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, -1)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enabled = true
        this.controls.maxDistance = 1500
        this.controls.minDistance = 0

        let light = new THREE.AmbientLight()
        let pointLight = new THREE.PointLight()
        pointLight.position.set(10, 10, 0)
        this.scene.add(light, pointLight)

        new Tube(this.scene)

        window.addEventListener("resize", this.resizeCanvas)
        RAF.subscribe('threeSceneUpdate', this.update)
    }

    mouseMove(e) {
        this.mouse.x = e.clientX - window.innerWidth / 2
        this.mouse.y = e.clientY - window.innerHeight / 2
    }

    update() {
        this.renderer.render(this.scene, this.camera);

        this.camera.position.x += (this.mouse.x / 2000 - this.camera.position.x) * 0.05
        this.camera.position.y += (this.mouse.y / 2000 - this.camera.position.y) * 0.05
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
        this.mouseMove = this.mouseMove.bind(this)

        window.addEventListener('mousemove', this.mouseMove)
    }
}

const _instance = new ThreeScene()
export default _instance
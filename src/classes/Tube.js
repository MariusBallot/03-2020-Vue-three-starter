import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

import RAF from '../utils/raf'

import TextCanvas from './TextCanvas'

import tubeVert from '../shaders/tube.vert'
import tubeFrag from '../shaders/tube.frag'

export default class Tube {
    constructor(scene) {
        this.bind()
        this.scene = scene
        new GLTFLoader().load('tube.glb', this.onLoad)
        this.texLoader = new THREE.TextureLoader()

        this.uniforms = {
            u_tex: {
                value: TextCanvas.canvasTexture
            },
            u_time: {
                type: 'f',
                value: 0
            }
        }

        console.log(TextCanvas.canvasTexture)
        setTimeout(() => {
            console.log(TextCanvas.canvasTexture)
            this.uniforms.u_tex.value = TextCanvas.canvasTexture
        }, 1000)


        this.material = new THREE.ShaderMaterial({
            vertexShader: tubeVert,
            fragmentShader: tubeFrag,
            uniforms: this.uniforms,
        })
    }

    onLoad(glb) {
        console.log(glb)
        glb.scene.traverse(child => {
            if (child instanceof THREE.Mesh)
                this.tubeMesh = child
        })
        const s = 5;
        this.tubeMesh.scale.set(s, s, s)
        this.tubeMesh.material = this.material
        this.scene.add(this.tubeMesh)
    }

    update() {
        if (this.tubeMesh == undefined)
            return
        this.tubeMesh.rotateX(0.01)
        this.uniforms.u_time.value += 0.01


    }

    bind() {
        this.onLoad = this.onLoad.bind(this)
        this.update = this.update.bind(this)
        RAF.subscribe('tubeUpdate', this.update)
    }
}
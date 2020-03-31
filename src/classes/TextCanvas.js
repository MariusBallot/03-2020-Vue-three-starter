import RAF from '../utils/raf'
import * as THREE from 'three'

class TextCanvas {
    constructor() {
        this.bind()
        this.show = false
        this.canvasTexture = new THREE.Texture()
    }

    init(container, textInput) {
        this.textInput = textInput
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.ctx.canvas.width = 2048
        this.ctx.canvas.height = 2048
        this.textSize = 500

        this.canvasTexture = new THREE.Texture(this.ctx.canvas)
        this.canvasTexture.wrapS = this.canvasTexture.wrapT = THREE.RepeatWrapping;



        RAF.subscribe("textCanvasUpdate", this.update)
        if (this.show)
            container.appendChild(this.canvas)
    }

    update() {

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.fillStyle = "black"
        this.ctx.fill()
        this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)


        this.ctx.font = `${this.textSize}px Rubik`
        let string = this.textInput.value

        if (this.ctx.measureText(string).width <= 3)
            return


        while (this.ctx.measureText(string).width > this.ctx.canvas.width) {
            this.textSize--;
            this.ctx.font = `${this.textSize}px Rubik`
        }

        while (this.ctx.measureText(string).width < this.ctx.canvas.width - 10 && string.length >= 0) {
            this.textSize++;
            this.ctx.font = `${this.textSize}px Rubik`
        }
        for (let i = 0; i <= this.ctx.canvas.height + 20; i += this.textSize - this.textSize / 4) {
            this.ctx.beginPath()
            this.ctx.fillStyle = "white"
            this.ctx.fillText(string, 0, i)
            this.ctx.closePath()
        }



        this.canvasTexture.needsUpdate = true

    }

    bind() {
        this.init = this.init.bind(this)
        this.update = this.update.bind(this)
    }
}

const _instance = new TextCanvas()
export default _instance

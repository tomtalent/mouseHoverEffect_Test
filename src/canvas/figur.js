import { Group } from 'three'
import * as THREE from 'three'
import gsap from 'gsap'
import vertShader from './shader/vert.js'
import fragShader from './shader/frag.js'

export default class Figure extends Group {

    constructor(props) {
        super(props)

        this.vertexShader = vertShader
        this.fragmentShader = fragShader
        this.loader = new THREE.TextureLoader()

        this.image = this.loader.load('assets/images/color_img/denim_.jpg')
        this.hoverImage = this.loader.load('assets/images/color_img/handsome.png')
        this.sizes = new THREE.Vector2(0, 0)
        this.offset = new THREE.Vector2(0, 0)

        // this.getSizes()
        this.mouse = new THREE.Vector2(0, 0)

        this.createMesh();
        window.addEventListener('mousemove', (ev) => { this.onMouseMove(ev) });
    }
    getSizes() {
        const { width, height, top, left } = this.image.getBoundingClientRect()

        this.sizes.set(width, height)
        this.offset.set(left - window.innerWidth / 2 + width / 2, -top + window.innerHeight / 2 - height / 2)
    }

    createMesh() {
        this.geometry = new THREE.PlaneBufferGeometry(3, 4, 1, 1)
        // this.material = new THREE.MeshBasicMaterial({
        //     map: this.image
        // })
        this.uniforms = {
            u_image: { type: 't', value: this.image },
            u_imagehover: { type: 't', value: this.hoverImage },
            u_mouse: { value: this.mouse },
            u_time: { value: 0 },
            u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        }
        
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            defines: {
                 PR: window.devicePixelRatio.toFixed(1)
            }
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        // this.mesh.position.set(this.offset.x, this.offset.y, 0)
        // this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
        this.add(this.mesh);
        // this.scene.add(this.mesh)
    }
    onMouseMove(event) {
        const tl = gsap.timeline();
        tl.to(this.mouse, 0.5, {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1,
        })

        tl.to(this.mesh.rotation, 0.5, {
            x: -this.mouse.y * 0.3,
            y: this.mouse.x * (Math.PI / 6)
        })
    }
    update() {
        this.uniforms.u_time.value += 0.01
    }
}
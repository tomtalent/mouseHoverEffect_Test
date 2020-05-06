import React, { Component } from "react";
import * as THREE from "three";
import Light from './canvas/light.js'
import Figure from './canvas/figur.js'

class App extends Component {

  componentDidMount() {
    let scene,
      camera,
      renderer;
    let light = new Light();
    let figure = new Figure();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);
    scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

    scene.add(light);
    scene.add(figure);

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 9);


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);

    this.mount.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize(event) {
      renderer.setSize(window.innerWidth, window.innerHeight);

    }
    function animate(delta) {
      requestAnimationFrame(animate);
      // controls.update();
      render();
    }

    function render() {
      figure.update();
      renderer.render(scene, camera);
    }
    animate();
  }

  render() {
    return (
      <div>
        <div
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
export default App;
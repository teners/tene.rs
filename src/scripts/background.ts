import {
    Group,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer
} from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import * as modelObj from '../static/models/computer.obj'  // webpackMode: "lazy"
import * as modelMtl from '../static/models/computer.mtl' // webpackMode: "lazy"
import '../static/models/computer.png' // webpackMode: "lazy"

let camera: PerspectiveCamera, light: PointLight, renderer: WebGLRenderer, scene: Scene;
let model: Group;

const modelRotationAngle = -0.005;

function initBackground() {
    scene = new Scene();

    camera = new PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,300);
    camera.position.z = 25;

    renderer = new WebGLRenderer({alpha: true, antialias: true});
    renderer.setClearAlpha(0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    light = new PointLight("#ffffe4", 1.4, 1000);
    light.position.set(0,15,15);
    scene.add(light);

    let mtlLoader = new MTLLoader();
    let objLoader = new OBJLoader();
    mtlLoader.load(modelMtl, function (materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(modelObj, function (object) {
            scene.add(object);
            model = object;
            object.position.z -= 150;
            object.position.x = 40;
            object.position.y = -30;
            object.rotateX(0.5);
        });
    });
}

function renderBackground() {
    requestAnimationFrame(renderBackground);
    try {
        model.rotateY(modelRotationAngle);
    }
    catch (e) {}
    renderer.render(scene, camera);
}

initBackground();
renderBackground();

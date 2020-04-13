import {
    Group,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer
} from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

let camera: PerspectiveCamera, light: PointLight, renderer: WebGLRenderer, scene: Scene;
let model: Group;
const modelRotationAngle = -0.005;
const modelBasePath = "https://teners.me/s/voxelComputer/computer";

export function initBackground() {
    scene = new Scene();

    camera = new PerspectiveCamera(45,window.innerWidth/ window.innerHeight,1,300);
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
    mtlLoader.load(`${modelBasePath}.mtl`, function (materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(`${modelBasePath}.obj`, function (object) {
            scene.add(object);
            model = object;
            object.position.z -= 150;
            object.position.x = 40;
            object.position.y = -30;
            object.rotateX(0.5);
        });
    });
}

export async function renderBackground() {
    requestAnimationFrame(renderBackground);
    try {
        model.rotateY(modelRotationAngle);
    }
    catch (e) { await new Promise(r => setTimeout(r, 100)) }
    renderer.render(scene, camera);
}

initBackground()
renderBackground()

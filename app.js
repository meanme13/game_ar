import * as THREE from 'three';

let camera, scene, renderer, video;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    video = document.getElementById( 'video' );
    const texture = new THREE.VideoTexture( video );
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    const geometry = new THREE.PlaneBufferGeometry();
    const material = new THREE.MeshBasicMaterial( { map: texture } );

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    initWebcamInput();

}

function initWebcamInput() {

    if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

        navigator.mediaDevices.getUserMedia( { video: true } ).then( stream => {

            video.src = window.URL.createObjectURL( stream );
            video.play();

        } );

    }

}

function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}
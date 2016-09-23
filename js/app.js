var scene, camera, rendered, mesh, loader;
var iphone;

var ObjectLoaded = null;
var OBJLoaded = null;

init();
animate();

function init(){

    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    //CAMERA
    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
    scene.add(camera);
    camera.position.set(100, 150, 500);
    camera.lookAt(scene.position);

    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer();

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    container = document.getElementById("appScr");
    container.appendChild(renderer.domElement);

    //CONTROLS
    controls = new THREE.OrbitControls( camera, render.domElement );
    controls.rotateSpeed = 0.3;

    // LIGHT
    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0,0,1);
    scene.add(directionalLight);

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl('./iphoneblender');
    mtlLoader.setPath('iphoneblender/');
    mtlLoader.load('phone.mtl', function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath('iphoneblender/');
        objLoader.load('phone.obj', function (object) {

            OBJLoaded = object;
            OBJLoaded.position.set(0,-160,0);

            OBJLoaded.scale.set(350,350,350);
            OBJLoaded.receiveShadow = true;
            scene.add(OBJLoaded);
        })
    });


    var ambientLight = new THREE.AmbientLight(0x101030);
    scene.add(ambientLight);
}

function animate(){
    requestAnimationFrame(animate);
    render();
    update();
}

function update(){
    controls.update();
}

function render(){

    renderer.render( scene, camera );
}
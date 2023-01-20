import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

export function setup(render: (args: ReturnType<typeof setup>) => void) {
  const container = document.querySelector<HTMLDivElement>("#app")!;

  // Setup renderer and add to DOM
  const renderer = new WebGLRenderer({ antialias: true });
  container.appendChild(renderer.domElement);

  // Setup Camera
  const camera = new PerspectiveCamera();
  camera.position.set(20, 80, 200);
  camera.rotation.set(-0.7, 0.2, 0.3);
  // camera.position.set(-20, 0, 100);

  // Setup size
  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const aspect = width / height;

    renderer.setSize(width, height);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(container);

  // Setup scene
  const scene = new Scene();
  scene.background = new Color(0x111122);
  scene.fog = new Fog(0x332222, -100, 400);

  // Directional light
  const directionalLight = new DirectionalLight(0xffffff, 0.2);
  scene.add(directionalLight);

  const ambientLight = new AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const cameraEffectSpeed = 0.5;
  const minCamY = 10;
  const maxCamPos = 20;
  let xSpeed = -0.02 * cameraEffectSpeed;
  let ySpeed = 0.01 * cameraEffectSpeed;
  let zSpeed = 0.05 * cameraEffectSpeed;

  const minRotationX = -0.1;
  const maxRotation = 0.4;
  let rotateXSpeed = 0.0001 * cameraEffectSpeed;
  let rotateYSpeed = -0.0002 * cameraEffectSpeed;

  // Start animation
  function animate() {
    window.requestAnimationFrame(animate);

    render({ renderer, scene, camera });

    // camera movement effect
    scene.position.x += xSpeed;
    scene.position.y += ySpeed;
    scene.position.z += zSpeed;

    if (scene.position.x > maxCamPos || scene.position.x < -maxCamPos) {
      xSpeed = -xSpeed;
    }
    if (
      (ySpeed > 0 && scene.position.y > maxCamPos) ||
      (ySpeed < 0 && scene.position.y < minCamY)
    ) {
      ySpeed = -ySpeed;
    }
    if (scene.position.z > maxCamPos || scene.position.z < -maxCamPos) {
      zSpeed = -zSpeed;
    }

    // camera rotation effect

    scene.rotation.x += rotateXSpeed;
    scene.rotation.y += rotateYSpeed;

    if (
      (rotateXSpeed > 0 && scene.rotation.x > maxRotation) ||
      (rotateXSpeed < 0 && scene.rotation.x < minRotationX)
    ) {
      rotateXSpeed = -rotateXSpeed;
    }
    if (scene.rotation.y > maxRotation || scene.rotation.y < -maxRotation) {
      rotateYSpeed = -rotateYSpeed;
    }

    renderer.render(scene, camera);
  }
  animate();

  return { renderer, scene, camera };
}

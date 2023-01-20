import * as THREE from "three";

export function setup(render: (args: ReturnType<typeof setup>) => void) {
  const container = document.querySelector<HTMLDivElement>("#app")!;

  // Setup renderer and add to DOM
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  container.appendChild(renderer.domElement);

  // Setup Camera
  const camera = new THREE.PerspectiveCamera();
  camera.position.set(10, 64, 60);
  camera.rotation.set(-0.7, 0, 0);
  // camera.position.set(0, 0, 16);

  // Setup size
  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const aspect = width / height;

    renderer.setSize(width, height);
    camera.aspect = aspect;
  }
  resize();
  new ResizeObserver(resize).observe(container);

  // Setup scene
  const scene = new THREE.Scene();

  // Start animation
  function animate() {
    window.requestAnimationFrame(animate);

    render({ renderer, scene, camera });

    renderer.render(scene, camera);
  }
  animate();

  return { renderer, scene, camera };
}

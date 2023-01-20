import { setup } from "./setup";
import { createCar } from "./car";

const [carToFront, moveForward] = createCar();
carToFront.position.x = -15;
carToFront.position.z = 60;

const [carToRight, moveRight] = createCar(14,10,10);
carToRight.rotation.set(0, -Math.PI / 3, 0);
carToRight.position.z = 0;

const { scene } = setup(() => {
  moveForward(0.3);
  moveRight(0.1);
  // carToRight.position.x += 0.06;

  // carToFront.position.z -= 1;

  // if (carToFront.position.z < -1000) {
  //   carToRight.position.x = 0;
  //   carToFront.position.z = 0;
  // }
});

scene.add(carToRight);
scene.add(carToFront);

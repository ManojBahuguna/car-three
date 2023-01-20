import { setup } from "./setup";
import { createCar } from "./car";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

const forwardRoadX = -25;
const backwardRoadX = 20;

const [carForward1, moveCarF1] = createCar(22, 14, 10);
carForward1.position.x = forwardRoadX - 8;
carForward1.position.z = 300;

const [carForward2, moveCarF2] = createCar(20, 13, 12);
carForward2.position.x = forwardRoadX + 10;
carForward2.position.z = 300;

const [carBackward1, moveCarB1] = createCar(18, 10, 10);
carBackward1.rotation.y = -Math.PI;
carBackward1.position.x = backwardRoadX - 10;
carBackward1.position.z = -400;

const [carBackward2, moveCarB2] = createCar(21, 12, 12);
carBackward2.rotation.y = -Math.PI;
carBackward2.position.x = backwardRoadX + 10;
carBackward2.position.z = -400;

const { scene } = setup(() => {
  moveCarF1(0.5, 600);
  moveCarF2(0.8, 600);
  moveCarB1(1.1, 600);
  moveCarB2(0.6, 600);
});

scene.add(carForward1);
scene.add(carForward2);
scene.add(carBackward1);
scene.add(carBackward2);

// ROADS
const forwardRoad = new Mesh(
  new BoxGeometry(40, 2, 2000),
  new MeshStandardMaterial({ color: 0x222 })
);
forwardRoad.position.y = -2;
forwardRoad.position.x = forwardRoadX;

const backwardRoad = new Mesh(
  new BoxGeometry(40, 2, 2000),
  new MeshStandardMaterial({ color: 0x222 })
);
backwardRoad.position.y = -2;
backwardRoad.position.x = backwardRoadX;

function getRoadLine(z: number) {
  const line = new Mesh(
    new BoxGeometry(1, 2.1, 10),
    new MeshStandardMaterial({ color: 0xffffaa })
  );
  line.position.z = z;
  return line;
}

// lines on road
for (let i = 50; i > -50; i--) {
  forwardRoad.add(getRoadLine(i * 20));
  backwardRoad.add(getRoadLine(i * 20));
}

scene.add(forwardRoad);
scene.add(backwardRoad);

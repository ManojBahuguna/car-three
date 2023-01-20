import { BoxGeometry, CylinderGeometry, Mesh, MeshBasicMaterial } from "three";

function createTyreSpot(x: number, y: number, thickness = 1, radius = 1) {
  const tyreSpot = new Mesh(
    new CylinderGeometry(radius, radius, thickness + 0.1),
    new MeshBasicMaterial({ color: 0x332244 })
  );
  tyreSpot.position.set(x, 0, y);

  return tyreSpot;
}

function createTyre(
  x: number,
  z: number,
  thickness: number = 1,
  height: number = 2
) {
  const tyre = new Mesh(
    new CylinderGeometry(height, height, thickness),
    new MeshBasicMaterial({ color: 0x772255 })
  );
  tyre.rotation.z = Math.PI / 2;
  tyre.position.set(x, 0, z);

  tyre.scale.x = 0.97;
  tyre.scale.z = 1.03;

  tyre.add(createTyreSpot(height / 2, 0, thickness, height / 2)); // top
  tyre.add(createTyreSpot(-height / 2, 0, thickness, height / 2)); // bottom
  tyre.add(createTyreSpot(0, -height / 2, thickness, height / 2)); // left
  tyre.add(createTyreSpot(0, height / 2, thickness, height / 2));

  return tyre;
}

export function createCar(length = 8, width = 8, height = 8) {
  const car = new Mesh();

  const tyreThickness = width / 10;
  const tyreHeight = height / 4;

  // CAR BASE
  const baseHeight = height / 2;
  const baseWidth = width - tyreThickness;
  const base = new Mesh(
    new BoxGeometry(width - tyreThickness, baseHeight, length),
    new MeshBasicMaterial({ color: 0xaa5555 })
  );
  base.position.y = baseHeight / 2 - tyreHeight / 2;
  car.add(base);

  // CAR TOP

  const topHeight = height / 3;
  const topLength = length * 0.6;
  const top = new Mesh(
    new BoxGeometry(baseWidth, topHeight, topLength),
    new MeshBasicMaterial({ color: 0xdd6666 })
  );
  top.position.y = base.position.y + baseHeight / 2 + topHeight / 2;
  top.position.z = length / 2 - topLength / 2 - length * 0.02;
  car.add(top);

  // CAR TYRES
  const tyreX = width / 2;
  const tyreZ = length / 2;

  const tyreFrontLeft = createTyre(-tyreX, -tyreZ, tyreThickness, tyreHeight);
  car.add(tyreFrontLeft);

  const tyreFrontRight = createTyre(tyreX, -tyreZ, tyreThickness, tyreHeight);
  car.add(tyreFrontRight);

  const tyreRearLeft = createTyre(-tyreX, tyreZ, tyreThickness, tyreHeight);
  car.add(tyreRearLeft);

  const tyreRearRight = createTyre(tyreX, tyreZ, tyreThickness, tyreHeight);
  car.add(tyreRearRight);

  let tiltRight = true;
  const moveForward = (speed = 0.2) => {
    tyreFrontLeft.rotation.x -= speed / 4;
    tyreFrontRight.rotation.x -= speed / 4;
    tyreRearLeft.rotation.x -= speed / 4;
    tyreRearRight.rotation.x -= speed / 4;

    const maxTilt = 0.05;
    if (car.rotation.z > maxTilt) {
      tiltRight = false;
    } else if (car.rotation.z < -maxTilt) {
      tiltRight = true;
    }
    car.rotation.z += tiltRight ? speed / 40 : -speed / 40;

    car.position.z -= speed;
  };

  const carWrapper = new Mesh();
  carWrapper.add(car);

  return [carWrapper, moveForward] as const;
}

import {
  BoxGeometry,
  CylinderGeometry,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  SphereGeometry,
} from "three";

function createHeadLight(x: number, y: number, z: number) {
  const headLight = new PointLight(0xffff88, 1, 200, 5);
  headLight.castShadow = true;
  headLight.power = 200;

  headLight.add(
    new Mesh(
      new SphereGeometry(1),
      new MeshStandardMaterial({
        emissive: 0xffffff,
        emissiveIntensity: 5,
        color: 0x000000,
      })
    )
  );

  headLight.position.set(x, y, z);
  headLight.castShadow = true;

  return headLight;
}

function createTyreSpot(x: number, y: number, thickness = 1, radius = 1) {
  const tyreSpot = new Mesh(
    new CylinderGeometry(radius, radius, thickness + 0.01),
    new MeshStandardMaterial({ color: 0x662255 })
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
    new MeshStandardMaterial({ color: 0xaa5555 })
  );
  tyre.rotation.z = Math.PI / 2;
  tyre.position.set(x, 0, z);

  tyre.scale.x = 0.97;
  tyre.scale.z = 1.03;

  tyre.add(createTyreSpot(height / 2, 0, thickness, height * 0.6)); // top
  tyre.add(createTyreSpot(-height / 2, 0, thickness, height * 0.6)); // bottom
  tyre.add(createTyreSpot(0, -height / 2, thickness, height * 0.6)); // left
  tyre.add(createTyreSpot(0, height / 2, thickness, height * 0.6));

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
    new MeshStandardMaterial({ color: 0x332244 })
  );
  base.position.y = baseHeight / 2 - tyreHeight / 2;
  car.add(base);

  // CAR TOP

  const topHeight = height / 3;
  const topLength = length * 0.6;
  const top = new Mesh(
    new BoxGeometry(baseWidth, topHeight, topLength),
    new MeshStandardMaterial({ color: 0xdd6666 })
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
  const moveForward = (speed = 0.2, resetAfterDistance = 0) => {
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
    car.rotation.z += tiltRight ? speed / 80 : -speed / 80;

    car.position.z -= speed;

    if (resetAfterDistance && car.position.z < -resetAfterDistance) {
      car.position.z = 0;
    }
  };

  // headlights
  const headLightLeft = createHeadLight(-baseWidth * 0.3, 0, -length * 0.48);
  const headLightRight = createHeadLight(baseWidth * 0.3, 0, -length * 0.48);
  car.add(headLightLeft);
  car.add(headLightRight);

  car.position.y += tyreHeight;

  const carWrapper = new Mesh();
  carWrapper.add(car);

  return [carWrapper, moveForward] as const;
}

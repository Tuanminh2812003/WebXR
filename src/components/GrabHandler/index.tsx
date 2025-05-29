import { useXR } from "@react-three/xr";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GrabHandler() {
  const controllers = (useXR() as any).controllers;
  const grabbed = useRef<{ object: THREE.Object3D; parent: THREE.Object3D | null } | null>(null);

  useFrame(() => {
    const controller = controllers.find((c: any) => c.inputSource?.handedness === "right");
    if (!controller?.grip || !controller.inputSource?.gamepad) return;

    const grip = controller.grip;
    const isPressed = controller.inputSource.gamepad.buttons?.[0]?.pressed;

    if (grabbed.current) {
      if (!isPressed) {
        // Thả object về parent cũ
        grabbed.current.parent?.attach(grabbed.current.object);
        grabbed.current = null;
      }
      return;
    }

    if (isPressed) {
      grip.parent?.traverse((child: THREE.Object3D) => {
        if (
          child.userData?.grabbable &&
          !grabbed.current &&
          child !== grip &&
          child !== grip.parent
        ) {
          const distance = grip.position.distanceTo(child.position);
          if (distance < 0.3) {
            grabbed.current = {
              object: child,
              parent: child.parent,
            };
            grip.attach(child);
          }
        }
      });
    }
  });

  return null;
}

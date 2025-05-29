import { useXR } from "@react-three/xr";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GrabHandler() {
  const controllers = (useXR() as any).controllers;
  const grabbed = useRef<{ object: THREE.Object3D; parent: THREE.Object3D | null } | null>(null);

  useFrame(() => {
    const controller = controllers?.[0];
    if (!controller?.gripSpace || !controller?.inputSource?.gamepad) return;

    const grip = controller.gripSpace;
    const isPressed = controller.inputSource.gamepad.buttons?.[0]?.pressed;

    if (grabbed.current) {
      if (!isPressed) {
        // Thả ra
        grabbed.current.parent?.add(grabbed.current.object);
        grabbed.current = null;
      }
      return;
    }

    if (isPressed) {
      grip.parent?.parent?.traverse((child: THREE.Object3D) => {
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
            grip.add(child);
          }
        }
      });
    }
  });

  return null;
}

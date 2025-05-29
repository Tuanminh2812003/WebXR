import { useXR } from "@react-three/xr";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GrabHandler() {
  const controllers = (useXR() as any).controllers;
  const grabbed = useRef<{ object: THREE.Object3D, parent: THREE.Object3D | null } | null>(null);

  useFrame(() => {
    const controller = controllers?.[0];
    if (!controller?.gripSpace || !controller.inputSource?.gamepad) return;

    const grip = controller.gripSpace;
    const buttonPressed = controller.inputSource.gamepad.buttons?.[0]?.pressed;

    if (grabbed.current) {
      // Nếu đang buông
      if (!buttonPressed) {
        const { object, parent } = grabbed.current;
        parent?.add(object); // Trả lại object về parent gốc
        grabbed.current = null;
      }
      return;
    }

    // Nếu đang nhấn → thử cầm object
    if (buttonPressed) {
      // Lấy tất cả con trong scene để tìm object gần
      grip.parent?.parent?.traverse((child: THREE.Object3D) => {
        if (child.userData?.grabbable && child instanceof THREE.Object3D && !grabbed.current) {
          const distance = grip.position.distanceTo(child.position);
          if (distance < 0.3) {
            // Lưu parent để thả sau
            grabbed.current = {
              object: child,
              parent: child.parent,
            };
            grip.add(child); // Gắn object vào tay
          }
        }
      });
    }
  });

  return null;
}

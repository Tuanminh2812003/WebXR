// pages/HomeXR.tsx
import { useState, useMemo, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore, useXRInputSourceState } from "@react-three/xr";
import PictureModel from "../../../components/PictureModel";
import VRPopup from "../../../components/VRPopup";
import { Locomotion } from "../../../components/Locomotion";
import { useFrame } from "@react-three/fiber";

export const xrStore = createXRStore({});

export default function HomeXR() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupPosition, setPopupPosition] = useState<[number, number, number]>([0, 2, -3]);

  const models = useMemo(
    () => [
      {
        path: "/Virtouria/NTST2/Bamboo Frame.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Ground.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Hanging Books.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Hanging Fabric.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Hanging Picture.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Hanging Silk.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Rubik.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Skybox.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Statue Place.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Water.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: false,
        info: "Tác phẩm Lễ hội Khmer ở Cà Mau - Giải xuất sắc",
      },
      {
        path: "/Virtouria/NTST2/Chair2.glb",
        position: [9.55, 0, -1.75],
        rotation: [0, -78, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Thiết kế nội thất",
        lookAtNum: [1, 1,0],
        imageInfo: "/Image/27.jpg",
      },
      {
        path: "/Virtouria/NTST2/Dress.glb",
        position: [7.45, 0, 4.55],
        rotation: [0, -82, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Thiết kế thời trang",
        lookAtNum: [1, 1,0],
        imageInfo: "/Image/27.jpg",
      },
      {
        path: "/Virtouria/NTST2/Fan Podium.glb",
        position: [0, 0, 10],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Logo Trường Khoa học Liên ngành và Nghệ thuật, Đại học Quốc gia Hà Nội VNU-SIS",
        lookAtNum: [1, 2,-4],
        imageInfo: "/Image/27.jpg",
      },
      {
        path: "/Virtouria/NTST2/Game Station.glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Thiết kế game",
        lookAtNum: [-6, 2,0],
        imageInfo: "/Image/27.jpg",
      },
      {
        path: "/Virtouria/NTST2/Picture Pillar.glb",
        position: [0, 0, -4.95],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Thiết kế đồ họa",
        lookAtNum: [1, 1,0],
        imageInfo: "/Image/27.jpg",
      },
      {
        path: "/Virtouria/NTST2/SIS Outfit.glb",
        position: [0, 0, 2.1],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Đồng phục Trường Khoa học Liên ngành và Nghệ thuật, Đại học Quốc gia Hà Nội VNU-SIS",
        lookAtNum: [1, 1,0],
        imageInfo: "/Image/27.jpg",
      },
      {
        path: "/Virtouria/NTST2/Statue (game).glb",
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Điêu khắc",
        lookAtNum: [-4, 3,8],
        imageInfo: "/Image/27.jpg",
      },
      {
        path: "/Virtouria/NTST2/Statue merge.glb",
        position: [-5.2, 0, 6.2],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        clickable: true,
        info: "Điêu khắc",
        lookAtNum: [1, 2,1],
        imageInfo: "/Image/27.jpg",
      },
    ],
    []
  );

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (loadedCount === models.length) setIsLoaded(true);
  }, [loadedCount]);

  return (
    <>
      <Canvas style={{ width: "100vw", height: "100vh", position: "fixed" }}>
        <XR store={xrStore}>
          <ambientLight intensity={3} />
          <Suspense fallback={null}>
            {models.map((m, i) => (
              <PictureModel
              key={i}
              path={m.path}
              position={m.position as [number, number, number]}
              rotation={m.rotation as [number, number, number]}
              scale={m.scale as [number, number, number]}
              clickable={m.clickable}
              onClick={({ position, lookAt }) => {
                setPopupVisible(true);
                setPopupContent(m.info || "Không có thông tin.");

                console.log(position);
              
                // Mặc định nếu không có lookAtNum thì không cộng thêm gì cả
                const offset = m.lookAtNum ?? [0, 0, 0];
              
                setPopupPosition([
                  lookAt.x + offset[0],
                  lookAt.y + offset[1],
                  lookAt.z + offset[2],
                ]);
              }}
              onLoad={() => setLoadedCount((prev) => prev + 1)}
            />
            ))}
          </Suspense>
          <VRPopup
            visible={popupVisible}
            content={popupContent}
            position={popupPosition}
            onClose={() => setPopupVisible(false)}
          />
          {isLoaded && <Locomotion />}
          <TogglePopupButton onToggle={() => setPopupVisible((prev) => !prev)} />
        </XR>
      </Canvas>
    </>
  );
}

// Nút bật/tắt popup bằng tay cầm (bấm trigger phải)
function TogglePopupButton({ onToggle }: { onToggle: () => void }) {
  const rightHand = useXRInputSourceState("controller", "right");

  useFrame(() => {
    const gamepad = rightHand?.gamepad as Gamepad | undefined;
    if (gamepad?.buttons?.[0]?.pressed) {
      onToggle();
    }
  });

  return null;
}
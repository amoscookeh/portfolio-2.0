import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, PerspectiveCamera, Environment } from "@react-three/drei";
import { Group, MathUtils } from "three";
import { useGesture } from "@use-gesture/react";

interface PyramidProps {
  sectionTitles: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export default function Pyramid({
  sectionTitles,
  currentIndex,
  setCurrentIndex,
}: PyramidProps) {
  const groupRef = useRef<Group>(null);
  const pyramidRef = useRef<any>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const targetRotation = useRef(0);
  const { size, gl } = useThree();

  const sectionAngle = (Math.PI * 2) / sectionTitles.length;

  // Set initial target rotation
  useEffect(() => {
    if (groupRef.current) {
      // Calculate the shortest path to the target rotation
      const newTargetRotation = -currentIndex * sectionAngle;
      const currentRot = groupRef.current.rotation.y;

      // Calculate the difference, ensuring we take the shortest path
      let rotationDiff = (newTargetRotation - currentRot) % (Math.PI * 2);
      if (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2;
      if (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2;

      // Set target rotation as current rotation plus the shortest difference
      targetRotation.current = currentRot + rotationDiff;
    } else {
      targetRotation.current = -currentIndex * sectionAngle;
    }
  }, [currentIndex, sectionAngle]);

  // Handle mouse/touch interactions
  useGesture(
    {
      onDragStart: ({ xy: [x] }) => {
        isDragging.current = true;
        lastX.current = x;
        velocity.current = 0;
      },
      onDrag: ({ xy: [x], delta: [dx] }) => {
        if (groupRef.current && isDragging.current) {
          const rotationSpeed = dx * 0.01;
          groupRef.current.rotation.y += rotationSpeed;
          velocity.current = rotationSpeed;
          lastX.current = x;
        }
      },
      onDragEnd: () => {
        isDragging.current = false;
        if (groupRef.current) {
          // Calculate the closest section
          const currentRotation = groupRef.current.rotation.y % (Math.PI * 2);
          const normalizedRotation =
            currentRotation < 0
              ? currentRotation + Math.PI * 2
              : currentRotation;

          let closestIndex =
            Math.round(normalizedRotation / sectionAngle) %
            sectionTitles.length;
          closestIndex =
            (sectionTitles.length - closestIndex) % sectionTitles.length;

          setCurrentIndex(closestIndex);

          // Calculate the shortest path to the target rotation
          const newTargetRotation = -closestIndex * sectionAngle;
          const currentRot = groupRef.current.rotation.y;

          // Calculate the difference, ensuring we take the shortest path
          let rotationDiff = (newTargetRotation - currentRot) % (Math.PI * 2);
          if (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2;
          if (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2;

          // Set target rotation as current rotation plus the shortest difference
          targetRotation.current = currentRot + rotationDiff;
        }
      },
      onWheel: ({ delta: [, dy] }) => {
        if (groupRef.current && !isDragging.current) {
          const rotationSpeed = dy * 0.001;
          groupRef.current.rotation.y += rotationSpeed;
          velocity.current = rotationSpeed;

          // Calculate the closest section
          const currentRotation = groupRef.current.rotation.y % (Math.PI * 2);
          const normalizedRotation =
            currentRotation < 0
              ? currentRotation + Math.PI * 2
              : currentRotation;

          let closestIndex =
            Math.round(normalizedRotation / sectionAngle) %
            sectionTitles.length;
          closestIndex =
            (sectionTitles.length - closestIndex) % sectionTitles.length;

          setCurrentIndex(closestIndex);

          // Calculate the shortest path to the target rotation
          const newTargetRotation = -closestIndex * sectionAngle;
          const currentRot = groupRef.current.rotation.y;

          // Calculate the difference, ensuring we take the shortest path
          let rotationDiff = (newTargetRotation - currentRot) % (Math.PI * 2);
          if (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2;
          if (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2;

          // Set target rotation as current rotation plus the shortest difference
          targetRotation.current = currentRot + rotationDiff;
        }
      },
    },
    {
      target: gl.domElement,
      eventOptions: { passive: false },
    },
  );

  // Animation loop for rotation and snapping
  useFrame((_, delta) => {
    if (groupRef.current && !isDragging.current) {
      // Apply momentum and damping
      if (Math.abs(velocity.current) > 0.0001) {
        velocity.current *= 0.95;
        groupRef.current.rotation.y += velocity.current;
      } else {
        // Snap to the closest section
        groupRef.current.rotation.y = MathUtils.lerp(
          groupRef.current.rotation.y,
          targetRotation.current,
          delta * 5,
        );
      }
    }
  });

  // Subtle rotation animation
  useFrame(({ clock }) => {
    if (pyramidRef.current) {
      // Very subtle rotation on Z axis for a bit of movement
      pyramidRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Environment preset="sunset" />

      <group ref={groupRef}>
        {/* TODO: replace this with better centre piece */}
        <mesh ref={pyramidRef} position={[0, 0, 0]}>
          <coneGeometry
            args={[
              1, // radius
              1.5, // height
              4, // segments
              1, // height segments
              false, // open ended
            ]}
            rotateX={Math.PI}
          />
          <meshPhysicalMaterial
            color="#000080"
            transmission={0.95}
            roughness={0.05}
            ior={1.5}
            thickness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={0.8}
            transparent
          />
        </mesh>

        {/* Section titles */}
        {sectionTitles.map((title, index) => {
          const angle = (index / sectionTitles.length) * Math.PI * 2;
          const isSelected = index === currentIndex;

          return (
            <group
              key={title}
              position={[Math.sin(angle) * 1.3, 0, Math.cos(angle) * 1.3]}
              rotation={[0, angle, 0]}
            >
              <Text
                position={[0, 0, 0]}
                fontSize={0.15}
                color={isSelected ? "#ffffff" : "#7c8db5"}
                anchorX="center"
                anchorY="middle"
              >
                {title}
              </Text>
            </group>
          );
        })}
      </group>
    </>
  );
}

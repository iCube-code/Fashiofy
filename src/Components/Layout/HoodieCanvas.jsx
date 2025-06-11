import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stage } from "@react-three/drei";
import Model from "./Model";

function HoodieCanvas() {
  return (
    <Canvas
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <PresentationControls>
          <Stage environment="city">
            <Model />
          </Stage>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}

export default HoodieCanvas;

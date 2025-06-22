import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stage } from "@react-three/drei";
import Model from "./Model";

function HoodieCanvas() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <PresentationControls>
          <Stage>
            <Model rotation={[0, -Math.PI/2, 0]} />
          </Stage>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}

export default HoodieCanvas;

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stage, Html, useTexture } from "@react-three/drei";
import Model from "./Model";

function HoodieCanvas() {
  return (
    <Canvas>
      <Suspense fallback={
        <Html center>
          <div style={{ color: 'white' }}>Loading model...</div>
        </Html>
      }>
        <PresentationControls>
          <Stage>
            <ModelErrorBoundary fallback={<FallbackImage />}>
              <Model rotation={[0, -Math.PI / 2, 0]} />
            </ModelErrorBoundary>
          </Stage>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}

export default HoodieCanvas;



function FallbackImage(props) {
  const texture = useTexture('/model-fallback.png')

  return (
    <mesh {...props}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Model loading error:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
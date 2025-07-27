import { useGLTF } from '@react-three/drei'

function Model(props) {
  const { scene } = useGLTF('/polo_shirt.glb')
  return (
    <primitive object={scene} {...props} />
  )
}

export default Model
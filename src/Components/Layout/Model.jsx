import { useGLTF } from '@react-three/drei'

function Model( props) {
    const {scene} = useGLTF('/hoodie.glb')
  return (
   <primitive object={scene} {...props} />
  )
}

export default Model
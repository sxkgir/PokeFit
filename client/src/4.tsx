import * as THREE from 'three'
import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Charmander_1: THREE.SkinnedMesh
    Charmander_2: THREE.SkinnedMesh
    Charmander_3: THREE.SkinnedMesh
    Charmander_4: THREE.SkinnedMesh
    Hips: THREE.Bone
    Spine1: THREE.Bone
  }
  materials: {
    ['Material #34']: THREE.MeshStandardMaterial
    ['Material #35']: THREE.MeshStandardMaterial
    ['Material #36']: THREE.MeshStandardMaterial
    ['Material #37']: THREE.MeshStandardMaterial
  }
  animations: THREE.AnimationClip[]
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/4.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
const { nodes, materials } = (useGraph(clone) as unknown) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <primitive object={nodes.Spine1} />
      <group rotation={[-Math.PI / 2, 0, 0]} scale={2.54}>
        <skinnedMesh
          geometry={nodes.Charmander_1.geometry}
          material={materials['Material #34']}
          skeleton={nodes.Charmander_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Charmander_2.geometry}
          material={materials['Material #35']}
          skeleton={nodes.Charmander_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Charmander_3.geometry}
          material={materials['Material #36']}
          skeleton={nodes.Charmander_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Charmander_4.geometry}
          material={materials['Material #37']}
          skeleton={nodes.Charmander_4.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/4.glb')
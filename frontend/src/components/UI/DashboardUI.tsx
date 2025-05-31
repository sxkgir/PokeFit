import ProtectedRoute from "../../Auth/ProtectdRoute"
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "../../4";
import { objectPosition } from "three/tsl";
import ProgressBar from "./ProgressBar";
export function DashboardUI() {

    return(
        <ProtectedRoute>
            <main className="bg-[url('/Dashboard_Background.jpg')] bg-cover bg-center h-screen">
                <div className="flex justify-center pt-[25%] h-[100%] ">
                    <div className="w-[15%] absolute bottom-[20%] min-w-[220px]">
                        <ProgressBar progress={10}/>

                    </div>
                    <div className="w-[100%]">
                        <Canvas camera={{fov: 20, position: [0,0,10]}}>
                                    <Suspense fallback={null}>
                                        <ambientLight/>
                                        <directionalLight intensity={20} position={[0,20,-25]} />
                                        <Model />
                                        <OrbitControls enablePan={true} enableZoom={false} enableRotate={true}/>
                                    </Suspense>
                        </Canvas>
                    </div>
                    


                </div>

            </main>


        </ProtectedRoute>

    )

}
"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function GeneralView() {
  // In your useEffect:
  const containerRefNode = useRef<HTMLDivElement>(null);
  const containerRefHub = useRef<HTMLDivElement>(null);
  const containerRefPhone = useRef<HTMLDivElement>(null);

  const objects: {
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    texture: string;
    model: string;
    container: React.RefObject<HTMLDivElement>;
    cameraPosition: [number, number, number];
    objectScale: number;
    pivotPosition?: [number, number, number];
    baseRotation?: [number, number, number];
    basePosition?: [number, number, number];
  }[] = [];

  objects.push({
    texture: "/models/Garden Pin v7.mtl",
    model: "/models/Garden Pin v7.obj",
    container: containerRefNode,
    cameraPosition: [0, 0.9, 1.8],
    objectScale: 0.10,
    baseRotation: [-Math.PI / 2, 0, 0]
  });
  objects.push({
    texture: "/models/Harvest Hub v5.mtl",
    model: "/models/Harvest Hub v5.obj",
    container: containerRefHub,
    cameraPosition: [0, 1, 4.5],
    baseRotation: [-Math.PI / 2, 0, Math.PI / 2],
    basePosition: [1.9, -1.3, 1.2],
    pivotPosition: [0, 0, 0],
    objectScale: 0.10
  });
  objects.push({
    texture: "/models/Garden Pin v7.mtl",
    model: "/models/Garden Pin v7.obj",
    container: containerRefPhone,
    cameraPosition: [0, 0.9, 1.8],
    baseRotation: [-Math.PI / 2, 0, 0],
    objectScale: 0.10
  });

  useEffect(() => {
    for (const object of objects) {
      //setup scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      const lights = createLight();
      scene.add(lights);

      const mtlLoader = new MTLLoader();
      //@ts-ignore
      mtlLoader.load(object.texture, (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load(object.model, (obj: THREE.Group) => {
          obj.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
            }
          });
          
          obj.scale.set(object.objectScale, object.objectScale, object.objectScale);
          obj.rotation.set(object.baseRotation ? object.baseRotation[0] : 0, object.baseRotation ? object.baseRotation[1] : 0, object.baseRotation ? object.baseRotation[2] : 0);
          
          // Create a pivot point
          const pivot = new THREE.Group();
          scene.add(pivot);
          
          // Add pivot helper
          // const pivotHelper = new THREE.AxesHelper(1);
          // pivot.add(pivotHelper);
          
          // Position the pivot first if specified
          if (object.pivotPosition) {
            pivot.position.set(object.pivotPosition[0], object.pivotPosition[1], object.pivotPosition[2]);
          }
        
          // Add the object to the pivot instead of the scene
          pivot.add(obj);
        
          // Set the object's position relative to the pivot if specified
          if (object.basePosition) {
            obj.position.set(object.basePosition[0], object.basePosition[1], object.basePosition[2]);
          }
        });
      });

      camera.position.set(object.cameraPosition[0], object.cameraPosition[1], object.cameraPosition[2]);
      camera.lookAt(0, 0, 0);

      object.scene = scene;
      object.camera = camera;
      object.renderer = renderer;
    }

    function createLight() {
      const directional = new THREE.DirectionalLight(0xffffff, 1.5);
      directional.position.set(0, 8, 5);
      // const ambient = new THREE.AmbientLight(0xe0e0e0, 1.5);
      // ambient.position.set(5, 8, 5);
      return directional;
    }

    // Animation loop
    function animate() {
      const time = Date.now() * 0.001;
      requestAnimationFrame(animate);
      for (const object of objects) {
        if (object.renderer && object.scene && object.camera) {
          const pivot = object.scene.children.find(
            (child) => child instanceof THREE.Group
          );
          if (pivot) {
            // Rotate the pivot instead of the object directly
            pivot.rotation.y += 0.005;
            // Apply the floating animation to the pivot
            pivot.position.y = Math.sin(time * 2 + objects.indexOf(object)) * 0.1;
          }
    
          object.renderer?.render(object.scene, object.camera);
        }
      }
    }

    const updateSize = () => {
      for (const object of objects) {
        const container = object.container.current;
        if (container) {
          const width = container.offsetWidth;
          const height = container.offsetHeight;
          
          // Update renderer size to match container
          object.renderer?.setSize(width, height);
          
          // Update camera aspect ratio and projection matrix
          if (object.camera) {
            object.camera.aspect = width / height;
            object.camera.updateProjectionMatrix();
          }
        }
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    for (const object of objects) {
      if (object.renderer) {
        object.container.current?.appendChild(object.renderer.domElement);
      }
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      for (const object of objects) {
        if (object.renderer) {
          object.container.current?.removeChild(object.renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full w-full flex justify-center items-center relative">
          {/*<div className="w-full h-full top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 absolute">
          <Image src="/images/curved-arrow.svg" alt="Arrow image" width={2000} height={2000} className="top-1/2 left-1/2 translate-x-[-155%] translate-y-[-70%] w-32 h-32 rotate-[-10deg] absolute"/>
          <Image src="/images/curved-arrow.svg" alt="Arrow image" width={2000} height={2000} className="top-1/2 left-1/2 translate-x-[55%] translate-y-[-65%] w-32 h-32 rotate-[100deg] absolute"/>
          <Image src="/images/curved-arrow.svg" alt="Arrow image" width={2000} height={2000} className="top-1/2 left-1/2 translate-x-[-50%] translate-y-[80%] w-32 h-32 rotate-[-135deg] absolute"/>
        </div>*/}
        <div className="w-full h-full top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 absolute">

        </div>
        <div className="relative h-full w-full">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full h-full flex-col justify-center items-center">
                <div
                  className="container-product container-hub min-w-[32px] min-h-[40px] w-[80%] h-[50vw] sm:w-[20vw] sm:h-[25vw] max-w-[220px] max-h-[250px] relative"
                  ref={containerRefHub}
                ></div>
                <div className="uppercase font-bold">Un centre de traitement</div>
              </div>
            </div>
            <div className="flex w-full justify-center items-center">
              <div className="flex w-full justify-center items-center flex-col">
                <div
                  className="container-product container-node min-w-[32px] w-[45%] md:w-[20vw] max-w-[220px] aspect-square relative"
                  ref={containerRefNode}
                ></div>
                <div className="uppercase font-bold">Des capteurs</div>
              </div>
              <div
                className="min-w-[23px]  w-[10%] md:w-[14vw] max-w-[190px] aspect-square relative"
              ></div>
              <div className="flex w-full justify-center items-center flex-col">
                <div
                  className="container-product container-phone min-w-[32px] w-[45%] md:w-[20vw] max-w-[220px] aspect-square relative"
                  ref={containerRefPhone}
                ></div>
                <div className="uppercase font-bold">Une application</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

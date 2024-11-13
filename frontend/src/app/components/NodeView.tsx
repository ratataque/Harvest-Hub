
"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function NodeView({ activePage = false }: { activePage?: boolean }) {
  const containerRefNode = useRef<HTMLDivElement>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout>();
  const [shouldRender, setShouldRender] = useState(false);
  const [sceneInstances, setSceneInstances] = useState<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    animationFrameId?: number;
  }[]>([]);

  const objects: {
    texture: string;
    model: string;
    container: React.RefObject<HTMLDivElement>;
    cameraPosition: [number, number, number];
    objectScale: number;
    pivotPosition?: [number, number, number];
    baseRotation?: [number, number, number];
    basePosition?: [number, number, number];
  }[] = [{
    texture: "/models/Garden Pin v7.mtl",
    model: "/models/Garden Pin v7.obj",
    container: containerRefNode,
    cameraPosition: [0, 0.9, 1.8],
    objectScale: 0.10,
    baseRotation: [-Math.PI / 2, 0, 0]
  }];

  // Handle activePage changes with cooldown
  useEffect(() => {
    if (activePage) {
      // Clear any existing cooldown timer
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
      
      // Set new cooldown timer
      cooldownTimerRef.current = setTimeout(() => {
        setShouldRender(true);
      }, 500);
    } else {
      // Clear timer and immediately stop rendering
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
      setShouldRender(false);
    }

    // Cleanup
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, [activePage]);

  useEffect(() => {
    // Only initialize Three.js if should render
    if (!shouldRender) {
      return;
    }

    const instances: typeof sceneInstances = [];

    function createLight() {
      const directional = new THREE.DirectionalLight(0xffffff, 1.5);
      directional.position.set(0, 8, 5);
      return directional;
    }

    // Initialize scenes
    for (const object of objects) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      const lights = createLight();
      scene.add(lights);

      const mtlLoader = new MTLLoader();
      // @ts-ignore
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
          obj.rotation.set(
            object.baseRotation?.[0] ?? 0,
            object.baseRotation?.[1] ?? 0,
            object.baseRotation?.[2] ?? 0
          );
          
          const pivot = new THREE.Group();
          scene.add(pivot);
          
          if (object.pivotPosition) {
            pivot.position.set(...object.pivotPosition);
          }
        
          pivot.add(obj);
        
          if (object.basePosition) {
            obj.position.set(...object.basePosition);
          }
        });
      });

      camera.position.set(...object.cameraPosition);
      camera.lookAt(0, 0, 0);

      instances.push({ scene, camera, renderer });
    }

    setSceneInstances(instances);

    // Animation loop
    function animate() {
      const time = Date.now() * 0.001;
      const animationFrameId = requestAnimationFrame(animate);

      instances.forEach((instance, index) => {
        if (instance.renderer && instance.scene && instance.camera) {
          const pivot = instance.scene.children.find(
            (child) => child instanceof THREE.Group
          );
          if (pivot) {
            pivot.rotation.y += 0.005;
            pivot.position.y = Math.sin(time * 2 + index) * 0.1;
          }
    
          instance.renderer.render(instance.scene, instance.camera);
        }
      });

      // Store the animation frame ID in the last instance
      if (instances.length > 0) {
        instances[instances.length - 1].animationFrameId = animationFrameId;
      }
    }

    const updateSize = () => {
      instances.forEach((instance, index) => {
        const container = objects[index].container.current;
        if (container && instance.renderer && instance.camera) {
          const width = container.offsetWidth;
          const height = container.offsetHeight;
          
          instance.renderer.setSize(width, height);
          instance.camera.aspect = width / height;
          instance.camera.updateProjectionMatrix();
        }
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Append renderers to containers
    instances.forEach((instance, index) => {
      if (instance.renderer) {
        objects[index].container.current?.appendChild(instance.renderer.domElement);
      }
    });

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateSize);
      
      // Cancel animation frame
      const lastInstance = instances[instances.length - 1];
      if (lastInstance?.animationFrameId) {
        cancelAnimationFrame(lastInstance.animationFrameId);
      }

      // Remove renderers and dispose of resources
      instances.forEach((instance, index) => {
        if (instance.renderer) {
          objects[index].container.current?.removeChild(instance.renderer.domElement);
          instance.renderer.dispose();
        }
      });
    };
  }, [shouldRender]); // Changed dependency to shouldRender

  return (
    <div className="h-full w-full flex-col flex gap-7 justify-center items-center relative">
      <div className="text-6xl font-black font-mono">Une sonde pour la terre</div>
      <div className="h-2/3 w-full flex justify-center items-center relative">
        <div className="w-full h-full flex justify-center items-center absolute">
          <Image src="/images/blob-haikei.svg" alt="Background blob" width={2000} height={2000} className="w-full h-full"/>
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center relative">
          <div
            className="container-product container-node min-w-[32px] w-[45%] md:w-[20vw] max-w-[220px] aspect-square relative"
            ref={containerRefNode}
          ></div>
        </div>
      </div>
    </div>
  )
}

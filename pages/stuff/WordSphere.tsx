import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import Head from "next/head";
import Link from "next/link";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { OrbitControls, Text } from "@react-three/drei";
import * as Utils from "three/examples/jsm/utils/BufferGeometryUtils"
import { useFrame } from "@react-three/fiber";

function Sphere() {

    const sphereRef = useRef(null);

    useFrame((state, delta) => {
        sphereRef.current!.rotation.y += delta;
    })

    console.log(sphereRef)

    // Apparent setting the tolerance to 1 somehow fixes it?
  const stuff = Utils.mergeVertices(new THREE.IcosahedronGeometry(2.1, 0), 1.1);
  const positionArray = stuff.attributes.position.array;
  const textArray = [];
  for (let i = 0; i < positionArray.length / 3; i++) {
    textArray.push(
      <Text
        fontSize={0.5}
        position-x={positionArray[i * 3]}
        position-y={positionArray[i * 3 + 1]}
        position-z={positionArray[i * 3 + 2]}
      >
        {i}
      </Text>
    );
  }

  return <group ref={sphereRef}>{textArray}</group>;
}

export default function WordSphere() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" flex justify-center flex-col px-8">
        <nav className=" flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
          <Link
            href={"/"}
            className="font-semibold text-gray-800 dark:text-gray-200 hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          >
            <span>Three Js Stuff</span>
          </Link>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className=" w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
            onClick={() => {
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-gray-800 dark:text-gray-200"
              >
                {resolvedTheme === "dark" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                )}
              </svg>
            )}
          </button>
        </nav>
      </div>
      <main className=" top-0 right-0 bottom-0 left-0 h-screen w-screen">
        <Canvas>
          <ambientLight />
          <OrbitControls />
          <Sphere />
        </Canvas>
      </main>
    </div>
  );
}
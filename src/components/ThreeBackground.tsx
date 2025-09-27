"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    try {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      sceneRef.current = scene;
      rendererRef.current = renderer;

      // Create different shape geometries
      const createShapeGeometry = (type: string) => {
        try {
          switch (type) {
            case "star":
              // Create star shape using points
              const starPoints = [];
              const outerRadius = 0.5;
              const innerRadius = 0.2;
              for (let i = 0; i < 10; i++) {
                const angle = (i / 10) * Math.PI * 2;
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                starPoints.push(
                  new THREE.Vector3(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    0
                  )
                );
              }
              const starGeometry = new THREE.BufferGeometry().setFromPoints(
                starPoints
              );
              return starGeometry;

            case "circle":
              return new THREE.RingGeometry(0.2, 0.4, 16);

            case "diamond":
              return new THREE.OctahedronGeometry(0.4);

            case "rectangle":
              return new THREE.BoxGeometry(0.8, 0.4, 0.1);

            case "square":
              return new THREE.BoxGeometry(0.5, 0.5, 0.1);

            case "triangle":
              return new THREE.ConeGeometry(0.3, 0.6, 3);

            case "hexagon":
              return new THREE.CylinderGeometry(0.4, 0.4, 0.1, 6);

            default:
              return new THREE.SphereGeometry(0.3, 8, 6);
          }
        } catch (error) {
          console.warn("Error creating geometry:", error);
          return new THREE.SphereGeometry(0.3, 8, 6);
        }
      };

      // Create materials with different colors
      const materials = [
        new THREE.MeshBasicMaterial({
          color: 0x5721b7,
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0xd668cd,
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x8b4cb8,
          transparent: true,
          opacity: 0.5,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x9d4edd,
          transparent: true,
          opacity: 0.5,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x7209b7,
          transparent: true,
          opacity: 0.4,
          wireframe: true,
        }),
      ];

      // Create floating shapes
      const shapes: THREE.Mesh[] = [];
      const shapeTypes = [
        "star",
        "circle",
        "diamond",
        "rectangle",
        "square",
        "triangle",
        "hexagon",
        "sphere",
      ];

      for (let i = 0; i < 30; i++) {
        try {
          const shapeType =
            shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
          const geometry = createShapeGeometry(shapeType);
          const material =
            materials[Math.floor(Math.random() * materials.length)];

          let shape;
          if (shapeType === "star") {
            shape = new THREE.Line(geometry, material);
          } else {
            shape = new THREE.Mesh(geometry, material);
          }

          // Random position
          shape.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 40
          );

          // Random rotation
          shape.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );

          // Store movement properties
          (shape as any).velocity = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01,
          };

          (shape as any).rotationSpeed = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01,
          };

          shapes.push(shape);
          scene.add(shape);
        } catch (error) {
          console.warn("Error creating shape:", error);
        }
      }

      // Create particle system for stars
      const createStarField = () => {
        try {
          const starGeometry = new THREE.BufferGeometry();
          const starCount = 100;
          const positions = new Float32Array(starCount * 3);
          const colors = new Float32Array(starCount * 3);

          for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 80;
            positions[i3 + 1] = (Math.random() - 0.5) * 50;
            positions[i3 + 2] = (Math.random() - 0.5) * 80;

            // Random star colors
            const color = new THREE.Color();
            color.setHSL(
              0.7 + Math.random() * 0.3,
              0.8,
              0.5 + Math.random() * 0.5
            );
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
          }

          starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
          );
          starGeometry.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3)
          );

          const starMaterial = new THREE.PointsMaterial({
            size: 0.08,
            transparent: true,
            opacity: 0.7,
            vertexColors: true,
          });

          return new THREE.Points(starGeometry, starMaterial);
        } catch (error) {
          console.warn("Error creating star field:", error);
          return null;
        }
      };

      const starField = createStarField();
      if (starField) {
        scene.add(starField);
      }

      camera.position.z = 20;
      camera.position.y = 0;

      // Track scroll position for dynamic effects
      let scrollY = 0;
      const handleScroll = () => {
        scrollY = window.pageYOffset;
      };
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Animation loop
      const animate = () => {
        if (!renderer || !scene || !camera) return;

        animationIdRef.current = requestAnimationFrame(animate);

        try {
          const time = Date.now() * 0.001;
          const scrollProgress = Math.min(
            scrollY /
              Math.max(document.body.scrollHeight - window.innerHeight, 1),
            1
          );

          // Animate star field
          if (starField) {
            starField.rotation.y += 0.0003;
            starField.rotation.x += 0.0001;
          }

          // Animate shapes with movement and rotation
          shapes.forEach((shape) => {
            const shapeAny = shape as any;

            // Move shapes
            shape.position.x += shapeAny.velocity.x;
            shape.position.y += shapeAny.velocity.y;
            shape.position.z += shapeAny.velocity.z;

            // Rotate shapes
            shape.rotation.x += shapeAny.rotationSpeed.x;
            shape.rotation.y += shapeAny.rotationSpeed.y;
            shape.rotation.z += shapeAny.rotationSpeed.z;

            // Bounce off boundaries
            if (shape.position.x > 20 || shape.position.x < -20) {
              shapeAny.velocity.x *= -1;
            }
            if (shape.position.y > 12 || shape.position.y < -12) {
              shapeAny.velocity.y *= -1;
            }
            if (shape.position.z > 20 || shape.position.z < -20) {
              shapeAny.velocity.z *= -1;
            }

            // Floating motion based on time
            shape.position.y += Math.sin(time + shape.position.x) * 0.0005;

            // Scale based on scroll
            const scale =
              0.8 +
              Math.sin(time + shape.position.x) * 0.1 +
              scrollProgress * 0.2;
            shape.scale.setScalar(scale);

            // Opacity based on scroll
            const material = shape.material as THREE.MeshBasicMaterial;
            if (material) {
              material.opacity = 0.3 + scrollProgress * 0.3;
            }
          });

          renderer.render(scene, camera);
        } catch (error) {
          console.warn("Animation error:", error);
        }
      };

      animate();

      // Handle resize
      const handleResize = () => {
        if (!camera || !renderer) return;

        try {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        } catch (error) {
          console.warn("Resize error:", error);
        }
      };

      window.addEventListener("resize", handleResize, { passive: true });

      // Cleanup
      return () => {
        try {
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("scroll", handleScroll);

          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }

          const currentMount = mountRef.current;
          if (
            currentMount &&
            renderer.domElement &&
            currentMount.contains(renderer.domElement)
          ) {
            currentMount.removeChild(renderer.domElement);
          }

          // Dispose of Three.js resources
          shapes.forEach((shape) => {
            if (shape.geometry) shape.geometry.dispose();
            if (shape.material) {
              if (Array.isArray(shape.material)) {
                shape.material.forEach((mat) => mat.dispose());
              } else {
                shape.material.dispose();
              }
            }
          });

          if (starField) {
            if (starField.geometry) starField.geometry.dispose();
            if (starField.material) starField.material.dispose();
          }

          renderer.dispose();
        } catch (error) {
          console.warn("Cleanup error:", error);
        }
      };
    } catch (error) {
      console.error("Three.js initialization error:", error);
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default ThreeBackground;

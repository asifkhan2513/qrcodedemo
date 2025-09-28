"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Define interfaces for shape properties
interface ShapeVelocity {
  x: number;
  y: number;
  z: number;
}

interface ShapeRotationSpeed {
  x: number;
  y: number;
  z: number;
}

interface AnimatedShape extends THREE.Mesh {
  velocity: ShapeVelocity;
  rotationSpeed: ShapeRotationSpeed;
}

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

      // Create materials with different colors and styles
      const materials = [
        new THREE.MeshBasicMaterial({
          color: 0x5721b7,
          transparent: true,
          opacity: 0.7,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0xd668cd,
          transparent: true,
          opacity: 0.7,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x8b4cb8,
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x9d4edd,
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x7209b7,
          transparent: true,
          opacity: 0.5,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x4c1d95,
          transparent: true,
          opacity: 0.8,
          wireframe: false,
        }),
        new THREE.MeshBasicMaterial({
          color: 0xe879f9,
          transparent: true,
          opacity: 0.4,
          wireframe: false,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x6366f1,
          transparent: true,
          opacity: 0.5,
          wireframe: true,
        }),
      ];

      // Create floating shapes
      const shapes: AnimatedShape[] = [];
      const shapeTypes = [
        "circle",
        "diamond",
        "rectangle",
        "square",
        "triangle",
        "hexagon",
        "sphere",
        "star",
      ];

      for (let i = 0; i < 50; i++) {
        try {
          const shapeType =
            shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
          const geometry = createShapeGeometry(shapeType);
          const material =
            materials[Math.floor(Math.random() * materials.length)];

          // Create mesh with proper typing
          const baseMesh = new THREE.Mesh(geometry, material);

          // Cast to our extended interface
          const shape = baseMesh as unknown as AnimatedShape;

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

          // Store movement properties with proper typing - slower, smoother movement
          shape.velocity = {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005,
            z: (Math.random() - 0.5) * 0.005,
          };

          shape.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005,
            z: (Math.random() - 0.5) * 0.005,
          };

          shapes.push(shape);
          scene.add(shape);
        } catch (error) {
          console.warn("Error creating shape:", error);
        }
      }

      // Create enhanced particle system for stars
      const createStarField = () => {
        try {
          const starGeometry = new THREE.BufferGeometry();
          const starCount = 200;
          const positions = new Float32Array(starCount * 3);
          const colors = new Float32Array(starCount * 3);
          const sizes = new Float32Array(starCount);

          for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 100;
            positions[i3 + 1] = (Math.random() - 0.5) * 60;
            positions[i3 + 2] = (Math.random() - 0.5) * 100;

            // Random star colors with purple/pink theme
            const color = new THREE.Color();
            const hue = 0.7 + Math.random() * 0.3; // Purple to pink range
            color.setHSL(hue, 0.8, 0.5 + Math.random() * 0.5);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random sizes
            sizes[i] = Math.random() * 0.15 + 0.05;
          }

          starGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
          );
          starGeometry.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3)
          );
          starGeometry.setAttribute(
            "size",
            new THREE.BufferAttribute(sizes, 1)
          );

          const starMaterial = new THREE.PointsMaterial({
            size: 0.1,
            transparent: true,
            opacity: 0.8,
            vertexColors: true,
            sizeAttenuation: true,
          });

          return new THREE.Points(starGeometry, starMaterial);
        } catch (error) {
          console.warn("Error creating star field:", error);
          return null;
        }
      };

      // Create floating orbs for additional ambiance
      const createFloatingOrbs = () => {
        const orbs: AnimatedShape[] = [];
        for (let i = 0; i < 15; i++) {
          try {
            const geometry = new THREE.SphereGeometry(
              0.1 + Math.random() * 0.3,
              16,
              16
            );
            const material = new THREE.MeshBasicMaterial({
              color: new THREE.Color().setHSL(
                0.7 + Math.random() * 0.3,
                0.8,
                0.6
              ),
              transparent: true,
              opacity: 0.3,
            });

            const orb = new THREE.Mesh(
              geometry,
              material
            ) as unknown as AnimatedShape;

            orb.position.set(
              (Math.random() - 0.5) * 60,
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 60
            );

            orb.velocity = {
              x: (Math.random() - 0.5) * 0.002,
              y: (Math.random() - 0.5) * 0.002,
              z: (Math.random() - 0.5) * 0.002,
            };

            orb.rotationSpeed = {
              x: 0,
              y: 0,
              z: 0,
            };

            orbs.push(orb);
            scene.add(orb);
          } catch (error) {
            console.warn("Error creating orb:", error);
          }
        }
        return orbs;
      };

      const starField = createStarField();
      if (starField) {
        scene.add(starField);
      }

      const floatingOrbs = createFloatingOrbs();

      camera.position.z = 25;
      camera.position.y = 2;

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

          // Animate star field with gentle rotation
          if (starField) {
            starField.rotation.y += 0.0002;
            starField.rotation.x += 0.00005;
            starField.position.y = Math.sin(time * 0.1) * 0.5;
          }

          // Animate floating orbs
          floatingOrbs.forEach((orb) => {
            orb.position.x += orb.velocity.x;
            orb.position.y +=
              orb.velocity.y + Math.sin(time * 0.5 + orb.position.x) * 0.001;
            orb.position.z += orb.velocity.z;

            // Gentle pulsing effect
            const scale = 1 + Math.sin(time * 2 + orb.position.x) * 0.2;
            orb.scale.setScalar(scale);

            // Boundary bouncing for orbs
            if (orb.position.x > 30 || orb.position.x < -30) {
              orb.velocity.x *= -1;
            }
            if (orb.position.y > 20 || orb.position.y < -20) {
              orb.velocity.y *= -1;
            }
            if (orb.position.z > 30 || orb.position.z < -30) {
              orb.velocity.z *= -1;
            }
          });

          // Animate shapes with smoother movement and rotation
          shapes.forEach((shape, index) => {
            // Smooth movement
            shape.position.x += shape.velocity.x;
            shape.position.y += shape.velocity.y;
            shape.position.z += shape.velocity.z;

            // Smooth rotation
            shape.rotation.x += shape.rotationSpeed.x;
            shape.rotation.y += shape.rotationSpeed.y;
            shape.rotation.z += shape.rotationSpeed.z;

            // Soft boundary bouncing
            if (shape.position.x > 25 || shape.position.x < -25) {
              shape.velocity.x *= -0.8;
            }
            if (shape.position.y > 15 || shape.position.y < -15) {
              shape.velocity.y *= -0.8;
            }
            if (shape.position.z > 25 || shape.position.z < -25) {
              shape.velocity.z *= -0.8;
            }

            // Gentle floating motion based on time and position
            shape.position.y +=
              Math.sin(time * 0.5 + shape.position.x * 0.1) * 0.002;
            shape.position.x +=
              Math.cos(time * 0.3 + shape.position.z * 0.1) * 0.001;

            // Dynamic scaling with time offset for each shape
            const scale =
              0.7 +
              Math.sin(time * 0.8 + index * 0.5) * 0.15 +
              scrollProgress * 0.3;
            shape.scale.setScalar(scale);

            // Dynamic opacity with breathing effect
            const material = shape.material as THREE.MeshBasicMaterial;
            if (material) {
              const baseOpacity = material.wireframe ? 0.4 : 0.3;
              material.opacity =
                baseOpacity +
                Math.sin(time * 1.2 + index * 0.3) * 0.2 +
                scrollProgress * 0.4;
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

      // Capture current mount ref for cleanup
      const currentMount = mountRef.current;

      // Cleanup
      return () => {
        try {
          window.removeEventListener("resize", handleResize);
          window.removeEventListener("scroll", handleScroll);

          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }
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

          floatingOrbs.forEach((orb) => {
            if (orb.geometry) orb.geometry.dispose();
            if (orb.material) {
              if (Array.isArray(orb.material)) {
                orb.material.forEach((mat) => mat.dispose());
              } else {
                orb.material.dispose();
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

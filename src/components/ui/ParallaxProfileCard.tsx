"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxProfileCardProps {
  className?: string;
  basePath?: string;
}

export function ParallaxProfileCard({
  className,
  basePath = "",
}: ParallaxProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasOrientation, setHasOrientation] = useState(false);

  // Normalized coordinates from -0.5 to 0.5
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Smooth spring physics for organic motion
  const springConfig = { stiffness: 180, damping: 24, mass: 0.8 };
  const smoothX = useSpring(targetX, springConfig);
  const smoothY = useSpring(targetY, springConfig);

  // 3D Tilt transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  // Multi-plane parallax: Background moves opposite, Foreground moves forward
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

  const fgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const fgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  // Dynamic light sheen following cursor or device tilt
  const sheenX = useTransform(smoothX, [-0.5, 0.5], ["10%", "90%"]);
  const sheenY = useTransform(smoothY, [-0.5, 0.5], ["10%", "90%"]);

  // Global mouse movement handler (always follows mouse)
  useEffect(() => {
    // If mobile accelerometer is actively providing orientation data, let it drive tilt
    if (hasOrientation) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Distance from card center normalized by half viewport size
      const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

      const clampedX = Math.max(-1, Math.min(1, deltaX)) * 0.5;
      const clampedY = Math.max(-1, Math.min(1, deltaY)) * 0.5;

      targetX.set(clampedX);
      targetY.set(clampedY);
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [hasOrientation, targetX, targetY]);

  // Mobile Device Orientation (Phone Accelerometer & Gyroscope)
  useEffect(() => {
    let orientationActive = false;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      if (!orientationActive) {
        orientationActive = true;
        setHasOrientation(true);
      }

      // gamma is left-to-right tilt [-90, 90]
      // beta is front-to-back tilt [-180, 180] — typically held at ~40deg to 50deg
      const normX = Math.max(-1, Math.min(1, e.gamma / 25)) * 0.5;
      const normY = Math.max(-1, Math.min(1, (e.beta - 45) / 25)) * 0.5;

      targetX.set(normX);
      targetY.set(normY);
    };

    // Check if permission is required (iOS 13+)
    if (
      typeof window !== "undefined" &&
      window.DeviceOrientationEvent &&
      typeof (window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
        .requestPermission === "function"
    ) {
      const requestOnTouch = () => {
        (window.DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> })
          .requestPermission()
          .then((res) => {
            if (res === "granted") {
              window.addEventListener("deviceorientation", handleOrientation);
            }
          })
          .catch(() => {});
        window.removeEventListener("touchstart", requestOnTouch);
      };
      window.addEventListener("touchstart", requestOnTouch, { once: true });
    } else if (typeof window !== "undefined") {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [targetX, targetY]);

  // Touch move fallback for mobile devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (hasOrientation) return;
    if (!cardRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    targetX.set(Math.max(-0.5, Math.min(0.5, x)));
    targetY.set(Math.max(-0.5, Math.min(0.5, y)));
  };

  const handleTouchEnd = () => {
    if (!hasOrientation) {
      targetX.set(0);
      targetY.set(0);
    }
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className={cn("relative flex items-center justify-center p-2 select-none", className)}
    >
      <motion.div
        ref={cardRef}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative w-64 sm:w-72 md:w-80 aspect-[4/5] rounded-[var(--radius-2xl)] overflow-hidden cursor-pointer
                   border border-[var(--color-border)] shadow-[var(--shadow-xl)] bg-[var(--color-surface)]"
      >
        {/* Layer 1: Background Scenery (Parallax Depth Layer) */}
        <motion.div
          style={{
            x: bgTranslateX,
            y: bgTranslateY,
            scale: 1.18,
          }}
          className="absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)]"
        >
          <Image
            src={`${basePath}/profile/profile-bg.webp`}
            alt="Profile Background"
            fill
            sizes="(max-width: 768px) 288px, 360px"
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Layer 2: Atmospheric Lighting Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(37, 99, 235, 0.25), transparent 70%)",
          }}
        />

        {/* Layer 3: Foreground Subject / Cutout Person (High 3D Parallax Plane) */}
        <motion.div
          style={{
            x: fgTranslateX,
            y: fgTranslateY,
            scale: 1.06,
            translateZ: 38,
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src={`${basePath}/profile/profile-fg.webp`}
            alt="Ryan James V. Capadocia"
            fill
            sizes="(max-width: 768px) 288px, 360px"
            className="object-cover object-top drop-shadow-[0_14px_28px_rgba(0,0,0,0.38)]"
            priority
          />
        </motion.div>

        {/* Layer 4: Interactive Specular Glass Sheen */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.35,
            background: useTransform(
              [sheenX, sheenY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)`
            ),
          }}
        />
      </motion.div>
    </div>
  );
}

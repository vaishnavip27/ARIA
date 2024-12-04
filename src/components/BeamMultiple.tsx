"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// Changed to named export
export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const circle3Ref = useRef<HTMLDivElement>(null);
  const circle4Ref = useRef<HTMLDivElement>(null);
  const circle5Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border bg-black md:shadow-xl mt-14",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-center justify-between px-20">
        {/* Start circle */}
        <div className="flex flex-col justify-center">
          <Circle ref={startRef}>
            <Icons.user />
          </Circle>
        </div>

        {/* Hub circle that connects to all 5 */}
        <div className="flex flex-col justify-center">
          <Circle ref={hubRef} className="size-16">
            <Icons.openai />
          </Circle>
        </div>

        {/* 5 circles in a row */}
        <div className="flex flex-col justify-center gap-4">
          <Circle ref={circle1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={circle2Ref}>
            <Icons.googleDocs />
          </Circle>
          <Circle ref={circle3Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={circle4Ref}>
            <Icons.messenger />
          </Circle>
          <Circle ref={circle5Ref}>
            <Icons.notion />
          </Circle>
        </div>

        {/* End circle */}
        <div className="flex flex-col justify-center">
          <Circle ref={endRef}>
            <Icons.user />
          </Circle>
        </div>
      </div>

      {/* First connection */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={startRef}
        toRef={hubRef}
        duration={3}
      />

      {/* Hub connections to all 5 circles */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={circle1Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={circle2Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={circle3Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={circle4Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={circle5Ref}
        duration={3}
      />

      {/* Final connection from middle circle to end */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={circle3Ref}
        toRef={endRef}
        duration={3}
      />
    </div>
  );
}

const Icons = {
  notion: () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9.2 6.7h5.4l.5 6.8c.1 1.2.4 2.1 1.1 2.7.7.6 1.7.8 3.1.6l.5 1.2h-4.4l-1.4-5H9.7z" />
  </svg>),
  openai: () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9.2 6.7h5.4l.5 6.8c.1 1.2.4 2.1 1.1 2.7.7.6 1.7.8 3.1.6l.5 1.2h-4.4l-1.4-5H9.7z" />
  </svg>),
  googleDrive: () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9.2 6.7h5.4l.5 6.8c.1 1.2.4 2.1 1.1 2.7.7.6 1.7.8 3.1.6l.5 1.2h-4.4l-1.4-5H9.7z" />
  </svg>),
  googleDocs: () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9.2 6.7h5.4l.5 6.8c.1 1.2.4 2.1 1.1 2.7.7.6 1.7.8 3.1.6l.5 1.2h-4.4l-1.4-5H9.7z" />
  </svg>),
  whatsapp: () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9.2 6.7h5.4l.5 6.8c.1 1.2.4 2.1 1.1 2.7.7.6 1.7.8 3.1.6l.5 1.2h-4.4l-1.4-5H9.7z" />
  </svg>),
  messenger: () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9.2 6.7h5.4l.5 6.8c.1 1.2.4 2.1 1.1 2.7.7.6 1.7.8 3.1.6l.5 1.2h-4.4l-1.4-5H9.7z" />
  </svg>),
  user: () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM9.2 6.7h5.4l.5 6.8c.1 1.2.4 2.1 1.1 2.7.7.6 1.7.8 3.1.6l.5 1.2h-4.4l-1.4-5H9.7z" />
  </svg>)
};
import { motion } from 'framer-motion';

const LouvrePyramid = ({ className = '', animate = true, strokeWidth = 2 }) => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 2,
          ease: "easeInOut",
          delay: 0.4
        },
        opacity: {
          duration: 0.5,
          delay: 0.4
        }
      }
    }
  };

  const SVGComponent = animate ? motion.svg : 'svg';
  const PathComponent = animate ? motion.path : 'path';

  return (
    <SVGComponent
      viewBox="0 0 300 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Base */}
      <PathComponent
        d="M 30 200 L 270 200"
        stroke="currentColor"
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Main pyramid outline - Left edge */}
      <PathComponent
        d="M 50 200 L 150 40"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Main pyramid outline - Right edge */}
      <PathComponent
        d="M 250 200 L 150 40"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Main pyramid outline - Base */}
      <PathComponent
        d="M 50 200 L 250 200"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Glass panel grid - Horizontal lines */}
      <PathComponent
        d="M 70 180 L 230 180"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 90 160 L 210 160"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 110 140 L 190 140"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 130 120 L 170 120"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 140 100 L 160 100"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 145 80 L 155 80"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 148 60 L 152 60"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Glass panel grid - Vertical lines (left side) */}
      <PathComponent
        d="M 80 200 L 145 50"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.4"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 110 200 L 148 70"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.4"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 130 200 L 150 100"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.4"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Glass panel grid - Vertical lines (right side) */}
      <PathComponent
        d="M 220 200 L 155 50"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.4"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 190 200 L 152 70"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.4"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 170 200 L 150 100"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.4"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Center vertical line */}
      <PathComponent
        d="M 150 200 L 150 40"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
        opacity="0.6"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Entrance at base */}
      <PathComponent
        d="M 130 200 L 130 180 L 170 180 L 170 200"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Small pyramids at corners (left) */}
      <PathComponent
        d="M 15 205 L 25 190 L 35 205 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Small pyramids at corners (right) */}
      <PathComponent
        d="M 265 205 L 275 190 L 285 205 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Reflection/Shadow effect */}
      <PathComponent
        d="M 50 200 L 60 210 L 240 210 L 250 200"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.5}
        strokeLinecap="round"
        opacity="0.3"
        variants={animate ? pathVariants : undefined}
      />
    </SVGComponent>
  );
};

export default LouvrePyramid;

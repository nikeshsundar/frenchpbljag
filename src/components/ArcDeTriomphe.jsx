import { motion } from 'framer-motion';

const ArcDeTriomphe = ({ className = '', animate = true, strokeWidth = 2 }) => {
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
          delay: 0.2
        },
        opacity: {
          duration: 0.5,
          delay: 0.2
        }
      }
    }
  };

  const SVGComponent = animate ? motion.svg : 'svg';
  const PathComponent = animate ? motion.path : 'path';
  const RectComponent = animate ? motion.rect : 'rect';

  return (
    <SVGComponent
      viewBox="0 0 300 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Base */}
      <PathComponent
        d="M 20 240 L 280 240"
        stroke="currentColor"
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Left pillar outer */}
      <RectComponent
        x="40"
        y="80"
        width="40"
        height="160"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Right pillar outer */}
      <RectComponent
        x="220"
        y="80"
        width="40"
        height="160"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Left pillar inner detail */}
      <RectComponent
        x="48"
        y="90"
        width="24"
        height="150"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        fill="none"
        opacity="0.6"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Right pillar inner detail */}
      <RectComponent
        x="228"
        y="90"
        width="24"
        height="150"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        fill="none"
        opacity="0.6"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Main arch */}
      <PathComponent
        d="M 80 240 Q 80 100 150 100 Q 220 100 220 240"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
        fill="none"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Inner arch */}
      <PathComponent
        d="M 95 240 Q 95 120 150 120 Q 205 120 205 240"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
        fill="none"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Top structure */}
      <RectComponent
        x="40"
        y="50"
        width="220"
        height="30"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.5}
        fill="none"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Top decorative line */}
      <PathComponent
        d="M 50 65 L 250 65"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        opacity="0.7"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Crown/Top detail */}
      <PathComponent
        d="M 40 50 L 30 40 L 40 40 M 260 50 L 270 40 L 260 40"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Sculptural relief panels */}
      <RectComponent
        x="50"
        y="100"
        width="20"
        height="40"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        fill="none"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
      
      <RectComponent
        x="230"
        y="100"
        width="20"
        height="40"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        fill="none"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Horizontal decorative lines on pillars */}
      <PathComponent
        d="M 40 120 L 80 120 M 40 150 L 80 150 M 40 180 L 80 180 M 40 210 L 80 210"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.5}
        strokeLinecap="round"
        opacity="0.4"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 220 120 L 260 120 M 220 150 L 260 150 M 220 180 L 260 180 M 220 210 L 260 210"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.5}
        strokeLinecap="round"
        opacity="0.4"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Central decorative elements in arch */}
      <PathComponent
        d="M 145 150 L 155 150 M 150 145 L 150 155"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        opacity="0.6"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Top crown details */}
      <PathComponent
        d="M 60 55 L 60 45 M 90 55 L 90 45 M 120 55 L 120 45 M 150 55 L 150 45 M 180 55 L 180 45 M 210 55 L 210 45 M 240 55 L 240 45"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.5"
        variants={animate ? pathVariants : undefined}
      />
    </SVGComponent>
  );
};

export default ArcDeTriomphe;

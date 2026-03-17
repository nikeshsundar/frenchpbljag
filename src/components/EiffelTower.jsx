import { motion } from 'framer-motion';

const EiffelTower = ({ className = '', animate = true, strokeWidth = 2 }) => {
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
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.5
        }
      }
    }
  };

  const SVGComponent = animate ? motion.svg : 'svg';
  const PathComponent = animate ? motion.path : 'path';

  return (
    <SVGComponent
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? "hidden" : undefined}
      animate={animate ? "visible" : undefined}
    >
      {/* Base */}
      <PathComponent
        d="M 40 290 L 160 290"
        stroke="currentColor"
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Left leg */}
      <PathComponent
        d="M 50 290 L 70 230 L 80 150 L 85 80 L 90 40 L 95 20 L 100 10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Right leg */}
      <PathComponent
        d="M 150 290 L 130 230 L 120 150 L 115 80 L 110 40 L 105 20 L 100 10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* First platform */}
      <PathComponent
        d="M 70 230 L 130 230"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* First platform detail */}
      <PathComponent
        d="M 75 230 L 75 235 M 85 230 L 85 235 M 95 230 L 95 235 M 105 230 L 105 235 M 115 230 L 115 235 M 125 230 L 125 235"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Second platform */}
      <PathComponent
        d="M 80 150 L 120 150"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Second platform detail */}
      <PathComponent
        d="M 85 150 L 85 155 M 92 150 L 92 155 M 100 150 L 100 155 M 108 150 L 108 155 M 115 150 L 115 155"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Third platform */}
      <PathComponent
        d="M 90 40 L 110 40"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Top spire */}
      <PathComponent
        d="M 100 10 L 100 5 M 98 8 L 102 8 M 97 12 L 103 12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Cross bracing - First section */}
      <PathComponent
        d="M 70 230 L 80 200 M 130 230 L 120 200 M 75 220 L 85 190 M 125 220 L 115 190"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.6"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Cross bracing - Second section */}
      <PathComponent
        d="M 80 150 L 90 120 M 120 150 L 110 120 M 85 140 L 92 115 M 115 140 L 108 115"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.6"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Cross bracing - Top section */}
      <PathComponent
        d="M 90 40 L 95 30 M 110 40 L 105 30 M 92 35 L 96 28 M 108 35 L 104 28"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity="0.6"
        variants={animate ? pathVariants : undefined}
      />
      
      {/* Decorative arches at base */}
      <PathComponent
        d="M 50 290 Q 60 280 70 290"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        fill="none"
        variants={animate ? pathVariants : undefined}
      />
      
      <PathComponent
        d="M 130 290 Q 140 280 150 290"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        fill="none"
        variants={animate ? pathVariants : undefined}
      />
    </SVGComponent>
  );
};

export default EiffelTower;

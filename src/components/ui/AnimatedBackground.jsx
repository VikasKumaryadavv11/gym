'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import AmbientGlow from './AmbientGlow';
import GrainOverlay from './GrainOverlay';
import LightSweep from './LightSweep';

export default function AnimatedBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const driftOne = useTransform(scrollYProgress, [0, 1], [0, -95]);
  const driftTwo = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const driftThree = useTransform(scrollYProgress, [0, 1], [0, -45]);
  return <div className="animated-background" aria-hidden="true"><div className="ambient-base"/><motion.div className="background-depth depth-one" style={reduceMotion ? undefined : { y: driftOne }}><AmbientGlow tone="ivory" speed="slow" className="glow-one"/></motion.div><motion.div className="background-depth depth-two" style={reduceMotion ? undefined : { y: driftTwo }}><AmbientGlow tone="sage" speed="medium" className="glow-two"/></motion.div><motion.div className="background-depth depth-three" style={reduceMotion ? undefined : { y: driftThree }}><AmbientGlow tone="stone" speed="slow" className="glow-three"/></motion.div><LightSweep/><GrainOverlay/></div>;
}

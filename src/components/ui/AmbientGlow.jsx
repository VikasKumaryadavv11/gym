'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ambientFloat, ambientTransition } from '@/animations/backgroundAnimations';

export default function AmbientGlow({ tone = 'sage', speed = 'slow', className = '', style }) {
  const reduceMotion = useReducedMotion();
  return <motion.div aria-hidden="true" className={`ambient-glow ambient-glow--${tone} ${className}`} style={style} animate={reduceMotion ? undefined : ambientFloat[speed]} transition={reduceMotion ? undefined : ambientTransition[speed]} />;
}

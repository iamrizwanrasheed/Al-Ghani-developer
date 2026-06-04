'use client';

import { animate, useInView, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { useReducedMotionPreference } from '@/hooks/use-reduced-motion';

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState('0');
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplay(Math.round(latest).toLocaleString());
    });
    return unsubscribe;
  }, [motionValue]);

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { duration: 1.2, ease: 'easeOut' });
    return () => controls.stop();
  }, [isInView, motionValue, reduced, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

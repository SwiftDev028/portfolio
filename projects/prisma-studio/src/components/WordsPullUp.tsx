import {motion, useInView, useReducedMotion} from 'framer-motion';
import {useRef} from 'react';

type Props = {text: string; className?: string; showAsterisk?: boolean};
const ease = [0.16, 1, 0.3, 1] as const;

export function WordsPullUp({text, className = '', showAsterisk = false}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {once: true, margin: '-8%'});
  const reduced = useReducedMotion();
  return <span ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
    {text.split(' ').map((word, index) => <span key={`${word}-${index}`} className="word-clip">
      <motion.span className="relative inline-block" aria-hidden initial={{y: reduced ? 0 : '105%'}} animate={inView ? {y: 0} : undefined} transition={{duration: .9, delay: reduced ? 0 : index * .08, ease}}>
        {word}{showAsterisk && index === text.split(' ').length - 1 && <sup className="absolute -right-[.3em] top-[.65em] text-[.31em]">*</sup>}
      </motion.span>
    </span>)}
  </span>;
}

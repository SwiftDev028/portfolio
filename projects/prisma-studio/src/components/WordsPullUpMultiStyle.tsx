import {motion, useInView, useReducedMotion} from 'framer-motion';
import {useRef} from 'react';

type Segment = {text: string; className?: string};
const ease = [0.16, 1, 0.3, 1] as const;

export function WordsPullUpMultiStyle({segments, className = ''}: {segments: Segment[]; className?: string}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {once: true, margin: '-10%'});
  const reduced = useReducedMotion();
  let wordIndex = 0;
  return <div ref={ref} className={`flex flex-wrap justify-center ${className}`}>
    {segments.flatMap((segment, segmentIndex) => segment.text.split(' ').map((word) => {
      const index = wordIndex++;
      return <span key={`${segmentIndex}-${word}-${index}`} className="word-clip">
        <motion.span className={`inline-block ${segment.className ?? ''}`} initial={{y: reduced ? 0 : '110%'}} animate={inView ? {y: 0} : undefined} transition={{duration: .85, delay: reduced ? 0 : index * .08, ease}}>{word}</motion.span>
      </span>;
    }))}
  </div>;
}

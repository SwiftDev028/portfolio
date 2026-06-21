import {motion, useScroll, useTransform} from 'framer-motion';
import {useRef} from 'react';

function AnimatedLetter({character, index, total, progress}: {character: string; index: number; total: number; progress: ReturnType<typeof useScroll>['scrollYProgress']}) {
  const point = index / total;
  const opacity = useTransform(progress, [Math.max(0, point - .1), Math.min(1, point + .05)], [.2, 1]);
  return <motion.span style={{opacity}}>{character}</motion.span>;
}

export function ScrollLetters({text}: {text: string}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const {scrollYProgress} = useScroll({target: ref, offset: ['start .8', 'end .2']});
  return <p ref={ref}>{[...text].map((character, index) => <AnimatedLetter key={index} character={character} index={index} total={text.length} progress={scrollYProgress} />)}</p>;
}

import {Canvas} from '@react-three/fiber';
import Lenis from 'lenis';
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring} from 'framer-motion';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {type ReactNode, useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {GlobeScene} from './GlobeScene';
import {cities, routeStops} from './world-data';
import './hero.css';

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

function MagneticLink({href, variant, children}: {href: string; variant: 'primary' | 'ghost'; children: ReactNode}) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, {stiffness: 260, damping: 20, mass: .35});
  const springY = useSpring(y, {stiffness: 260, damping: 20, mass: .35});
  return <motion.a href={href} className={`button ${variant}`} style={{x: springX, y: springY}} onPointerMove={(event) => {const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left - rect.width / 2) * .16); y.set((event.clientY - rect.top - rect.height / 2) * .16);}} onPointerLeave={() => {x.set(0); y.set(0);}}>{children}</motion.a>;
}

function AtlasHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const reducedMotion = useReducedMotion() ?? false;
  const compact = useState(() => matchMedia('(max-width: 620px)').matches)[0];
  const [phase, setPhase] = useState<'world' | 'route' | 'stops'>(reducedMotion ? 'stops' : 'world');
  useEffect(() => {
    const root = heroRef.current?.closest('.hero');
    if (!root) return;
    if (reducedMotion) {progress.current = .78; return;}
    const lenis = new Lenis({duration: 1.05, smoothWheel: true, wheelMultiplier: .86});
    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: .65,
      onUpdate: (self) => {
        progress.current = self.progress;
        const next = self.progress > .62 ? 'stops' : self.progress > .28 ? 'route' : 'world';
        setPhase((current) => current === next ? current : next);
      },
    });
    ScrollTrigger.refresh();
    return () => {trigger.kill(); gsap.ticker.remove(onTick); lenis.destroy();};
  }, [reducedMotion]);
  return <div ref={heroRef} className={`hero-stage atlas-react-stage phase-${phase}`}>
    <div className="hero-noise" /><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" />
    <div className="hero-layout">
      <motion.div className="hero-copy" initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}} transition={{duration: 1.15, ease}}>
        <p className="kicker">Atlas / 3D interactive travel system</p>
        <h1><span><b>Мир ближе,</b></span><span><b>когда видишь</b></span><span><b><em>маршрут</em></b></span></h1>
        <p>Исследуйте города через живую 3D-карту: места, истории и готовый план поездки соединяются в один маршрут.</p>
        <div className="hero-actions"><MagneticLink variant="primary" href="#routes">Запустить маршрут <i>↗</i></MagneticLink><MagneticLink variant="ghost" href="#cities">Исследовать города</MagneticLink></div>
        <div className="hero-index"><span>41.0082° N</span><span>28.9784° E</span><span>IST / LIVE</span></div>
      </motion.div>
      <div className="atlas-scene" id="atlas-scene">
        <Canvas dpr={compact ? 1 : [1, 1.6]} camera={{position: [0, 0, 7.2], fov: 42}} gl={{antialias: !compact, alpha: true, powerPreference: 'high-performance'}}>
          <GlobeScene progress={progress} reducedMotion={reducedMotion} compact={compact} />
        </Canvas>
        <div className="scene-vignette" /><div className="scene-hud"><span>{phase === 'world' ? 'GLOBAL VIEW' : 'ISTANBUL FOCUS'}</span><i /><span>LIVE ROUTES · 06</span></div>
        <AnimatePresence>{phase === 'world' ? cities.map((city, index) => <motion.div key={city.code} className={`city-label label-${city.name.toLowerCase()}`} initial={{opacity: 0, y: 18}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, scale: .86}} transition={{duration: .55, delay: index * .08, ease}}><span>{city.code}</span><b>{city.name}</b><small>{city.detail}</small></motion.div>) : null}</AnimatePresence>
        <AnimatePresence>{phase !== 'world' ? <motion.div className="route-intro" initial={{opacity: 0, y: 38}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: .7, ease}}><span>ISTANBUL ROUTE / 01</span><h2>Между двумя<br />континентами</h2><div><b>8.4 км</b><b>06 остановок</b><b>1 день</b></div></motion.div> : null}</AnimatePresence>
        <div className="route-stops">{routeStops.map((stop, index) => <AnimatePresence key={stop.name}>{phase === 'stops' ? <motion.article initial={{opacity: 0, x: 44, rotateY: -12}} animate={{opacity: 1, x: 0, rotateY: 0}} transition={{duration: .65, delay: index * .11, ease}}><span>{stop.time}</span><b>{stop.name}</b><small>{stop.note}</small></motion.article> : null}</AnimatePresence>)}</div>
        <div className="scene-depth"><span>CAMERA</span><i /><b>{phase === 'world' ? '01.00×' : '01.84×'}</b></div>
      </div>
    </div>
    <div className="scroll-note"><span>Прокрутите, чтобы войти в маршрут</span><i><b /></i></div>
  </div>;
}

const mount = document.getElementById('atlas-hero-root');
if (mount) createRoot(mount).render(<AtlasHero />);

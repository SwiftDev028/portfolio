import {motion, useInView, useReducedMotion} from 'framer-motion';
import {ArrowRight, Check, Image as ImageIcon} from 'lucide-react';
import {useRef} from 'react';
import {ScrollLetters} from './components/ScrollLetters';
import {WordsPullUp} from './components/WordsPullUp';
import {WordsPullUpMultiStyle} from './components/WordsPullUpMultiStyle';

const primary = '#E1E0CC';
const ease = [0.16, 1, 0.3, 1] as const;
const heroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';
const featureVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';

const features = [
  {number: '01', title: 'Project Storyboard.', icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85', items: ['Build visual sequences', 'Arrange every scene', 'Share with collaborators', 'Export creative boards']},
  {number: '02', title: 'Smart Critiques.', icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85', items: ['Frame-by-frame analysis', 'Clear creative notes', 'Connected studio tools']},
  {number: '03', title: 'Immersion Capsule.', icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85', items: ['Silence notifications', 'Ambient soundscapes', 'Sync focused sessions']},
];

function Hero() {
  const reduced = useReducedMotion();
  return <section id="story" className="h-screen p-4 md:p-6">
    <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
      <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover"><source src={heroVideo} type="video/mp4" /></video>
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8" aria-label="Primary navigation">
        <div className="flex whitespace-nowrap text-[10px] sm:gap-6 sm:text-xs md:gap-12 md:text-sm lg:gap-14">
          {['Our story', 'Collective', 'Workshops', 'Programs', 'Inquiries'].map((item, index) => <a key={item} href={index === 0 ? '#about' : index === 4 ? '#features' : '#features'} className="nav-link px-1.5 py-2">{item}</a>)}
        </div>
      </nav>
      <div className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-1 items-end gap-5 p-5 sm:p-8 md:grid-cols-12 md:p-10 lg:p-14">
        <div className="md:col-span-8"><h1 style={{color: primary}} className="text-[26vw] font-medium leading-[.78] tracking-[-.07em] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"><WordsPullUp text="Prisma" showAsterisk /></h1></div>
        <div className="pb-2 md:col-span-4 md:pb-5">
          <motion.p initial={{opacity: reduced ? 1 : 0, y: reduced ? 0 : 20}} animate={{opacity: 1, y: 0}} transition={{duration: .9, delay: reduced ? 0 : .5, ease}} className="max-w-md text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base">Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.</motion.p>
          <motion.a href="#about" initial={{opacity: reduced ? 1 : 0, y: reduced ? 0 : 20}} animate={{opacity: 1, y: 0}} transition={{duration: .9, delay: reduced ? 0 : .7, ease}} className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base">Join the lab<span className="grid h-9 w-9 place-items-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10"><ArrowRight size={17} color={primary} /></span></motion.a>
        </div>
      </div>
    </div>
  </section>;
}

function About() {
  const copy = 'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.';
  return <section id="about" className="bg-black px-4 py-20 sm:px-6 md:py-28">
    <div className="mx-auto max-w-6xl bg-[#101010] px-5 py-20 text-center sm:px-12 md:py-32 lg:px-20">
      <p className="mb-10 text-[10px] uppercase tracking-[.22em] text-primary sm:text-xs">Visual arts</p>
      <WordsPullUpMultiStyle className="mx-auto max-w-3xl text-3xl leading-[.95] sm:text-4xl sm:leading-[.9] md:text-5xl lg:text-6xl xl:text-7xl" segments={[{text: 'I am Marcus Chen,'}, {text: 'a self-taught director.', className: 'font-serif italic'}, {text: 'I have skills in color grading, visual effects, and narrative design.'}]} />
      <div className="mx-auto mt-20 max-w-2xl text-left text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:text-base"><ScrollLetters text={copy} /></div>
    </div>
  </section>;
}

function FeatureCard({feature, index}: {feature: typeof features[number]; index: number}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, {once: true, margin: '-100px'});
  return <motion.article ref={ref} initial={{opacity: 0, scale: .95}} animate={visible ? {opacity: 1, scale: 1} : undefined} transition={{duration: .8, delay: index * .15, ease: [.22, 1, .36, 1]}} className="flex min-h-[410px] flex-col bg-[#212121] p-6 md:min-h-[440px] lg:h-[480px]">
    <img src={feature.icon} alt="" className="h-10 w-10 rounded object-cover sm:h-12 sm:w-12" />
    <div className="mt-auto"><div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5"><h3 className="text-xl text-primary sm:text-2xl">{feature.title}</h3><span className="text-xs text-gray-500">{feature.number}</span></div>
      <ul className="space-y-3 py-6">{feature.items.map(item => <li key={item} className="flex items-center gap-3 text-xs text-gray-400 sm:text-sm"><Check size={14} className="text-primary" />{item}</li>)}</ul>
      <a href="#story" className="inline-flex items-center gap-2 text-xs text-primary">Learn more <ArrowRight size={15} className="-rotate-45" /></a>
    </div>
  </motion.article>;
}

function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, {once: true, margin: '-100px'});
  return <section id="features" className="relative min-h-screen overflow-hidden bg-black px-4 py-24 sm:px-6 md:py-32"><div className="bg-noise pointer-events-none absolute inset-0 opacity-15" />
    <div className="relative mx-auto max-w-[1500px]"><WordsPullUpMultiStyle className="mb-14 max-w-4xl justify-start text-xl font-normal leading-tight sm:text-2xl md:text-3xl lg:text-4xl" segments={[{text: 'Studio-grade workflows for visionary creators.', className: 'text-primary'}, {text: 'Built for pure vision. Powered by art.', className: 'text-gray-500'}]} />
      <div ref={ref} className="grid gap-3 sm:grid-cols-2 sm:gap-2 md:gap-1 lg:grid-cols-4 lg:h-[480px]">
        <motion.article initial={{opacity: 0, scale: .95}} animate={visible ? {opacity: 1, scale: 1} : undefined} transition={{duration: .8, ease: [.22, 1, .36, 1]}} className="relative min-h-[410px] overflow-hidden lg:h-[480px]"><video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover"><source src={featureVideo} type="video/mp4" /></video><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><p className="absolute bottom-6 left-6 text-xl" style={{color: primary}}>Your creative canvas.</p></motion.article>
        {features.map((feature, index) => <FeatureCard key={feature.number} feature={feature} index={index + 1} />)}
      </div>
    </div>
  </section>;
}

export default function App() {return <main><Hero /><About /><Features /></main>;}

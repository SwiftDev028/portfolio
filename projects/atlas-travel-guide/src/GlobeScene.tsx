import {useFrame, useThree} from '@react-three/fiber';
import {MutableRefObject, useMemo, useRef} from 'react';
import * as THREE from 'three';
import {cities} from './world-data';

const ORANGE = '#ff9f0a';
const radius = 2.42;
const localRoutePoints = [
  new THREE.Vector3(-1.55, -.18, 1.45),
  new THREE.Vector3(-.82, .28, 1.72),
  new THREE.Vector3(-.06, -.04, 1.92),
  new THREE.Vector3(.72, .38, 1.74),
  new THREE.Vector3(1.5, .08, 1.46),
];

const toVector = (lat: number, lon: number, r = radius) => {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
};

function Pin({lat, lon, active = false, reducedMotion}: {lat: number; lon: number; active?: boolean; reducedMotion: boolean}) {
  const position = useMemo(() => toVector(lat, lon, radius + .035), [lat, lon]);
  const pulse = useRef<THREE.Mesh>(null);
  useFrame(({clock}) => {
    if (!pulse.current) return;
    const scale = reducedMotion ? 1 : 1 + (Math.sin(clock.elapsedTime * 2.2 + lon) + 1) * .35;
    pulse.current.scale.setScalar(scale);
    const material = pulse.current.material as THREE.MeshBasicMaterial;
    material.opacity = .28 / scale;
  });
  return <group position={position}>
    <mesh><sphereGeometry args={[active ? .065 : .045, 16, 16]} /><meshBasicMaterial color={ORANGE} toneMapped={false} /></mesh>
    <mesh ref={pulse}><sphereGeometry args={[active ? .13 : .09, 16, 16]} /><meshBasicMaterial color={ORANGE} transparent opacity={.2} depthWrite={false} toneMapped={false} /></mesh>
    {active ? <pointLight color={ORANGE} intensity={2.8} distance={1.4} /> : null}
  </group>;
}

function Route({progress, reducedMotion}: {progress: MutableRefObject<number>; reducedMotion: boolean}) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(localRoutePoints, false, 'catmullrom', .6);
    return new THREE.TubeGeometry(curve, 150, .014, 8, false);
  }, []);
  const route = useRef<THREE.Mesh>(null);
  const markers = useRef<Array<THREE.Mesh | null>>([]);
  useFrame(({clock}) => {
    const p = THREE.MathUtils.smoothstep(progress.current, .14, .76);
    geometry.setDrawRange(0, Math.floor(geometry.index!.count * p));
    if (route.current) (route.current.material as THREE.MeshBasicMaterial).opacity = .3 + p * .7;
    markers.current.forEach((marker, index) => {
      if (!marker) return;
      marker.visible = p > .14 + index * .28;
      const scale = reducedMotion ? 1 : .8 + Math.sin(clock.elapsedTime * 2.4 + index) * .12;
      marker.scale.setScalar(scale);
    });
  });
  return <group>
    <mesh ref={route} geometry={geometry} renderOrder={8}><meshBasicMaterial color={ORANGE} transparent opacity={.3} depthWrite={false} depthTest={false} toneMapped={false} /></mesh>
    {[localRoutePoints[0], localRoutePoints[2], localRoutePoints[4]].map((position, index) => <mesh key={index} ref={(node) => {markers.current[index] = node;}} position={position} renderOrder={9} visible={false}><sphereGeometry args={[.045, 14, 14]} /><meshBasicMaterial color="#ffd08a" depthTest={false} toneMapped={false} /></mesh>)}
  </group>;
}

export function GlobeScene({progress, reducedMotion, compact}: {progress: MutableRefObject<number>; reducedMotion: boolean; compact: boolean}) {
  const globe = useRef<THREE.Group>(null);
  const {camera, pointer} = useThree();
  useFrame((_, delta) => {
    if (!globe.current) return;
    const p = reducedMotion ? .72 : progress.current;
    const targetX = p * .42 + (reducedMotion ? 0 : pointer.y * .08 * (1 - p));
    const targetY = -.35 - p * .85 + (reducedMotion ? 0 : pointer.x * .13 * (1 - p));
    globe.current.rotation.x = THREE.MathUtils.damp(globe.current.rotation.x, targetX, 4, delta);
    globe.current.rotation.y = THREE.MathUtils.damp(globe.current.rotation.y, targetY, 3.5, delta);
    globe.current.rotation.z = THREE.MathUtils.damp(globe.current.rotation.z, -.12 + p * .16, 3, delta);
    const scale = 1 + p * .28;
    globe.current.scale.lerp(new THREE.Vector3(scale, scale, scale), Math.min(1, delta * 3));
    camera.position.x = THREE.MathUtils.damp(camera.position.x, p * .7, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, p * -.08, 3, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 7.2 - p * 2.15, 3, delta);
    camera.lookAt(.2 * p, 0, 0);
  });
  return <>
    <ambientLight intensity={.36} />
    <directionalLight position={[-3, 4, 5]} intensity={2.1} color="#dce9df" />
    <pointLight position={[3, -2, 2]} intensity={18} distance={7} color="#3f9a78" />
    <group ref={globe}>
      <mesh><sphereGeometry args={[radius, compact ? 32 : 64, compact ? 32 : 64]} /><meshStandardMaterial color="#0e201a" roughness={.86} metalness={.15} /></mesh>
      <mesh scale={1.006}><sphereGeometry args={[radius, compact ? 18 : 28, compact ? 18 : 28]} /><meshBasicMaterial color="#b9c9bd" wireframe transparent opacity={.12} depthWrite={false} /></mesh>
      {compact ? null : <mesh scale={1.018} rotation={[0, 0, Math.PI / 2]}><sphereGeometry args={[radius, 20, 20]} /><meshBasicMaterial color="#ff9f0a" wireframe transparent opacity={.025} depthWrite={false} /></mesh>}
      {cities.map((city) => <Pin key={city.code} lat={city.lat} lon={city.lon} active={city.code === 'IST'} reducedMotion={reducedMotion} />)}
    </group>
    <Route progress={progress} reducedMotion={reducedMotion} />
  </>;
}

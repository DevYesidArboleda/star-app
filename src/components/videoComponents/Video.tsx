import { useAutoPlay } from '../../hooks/useAutoPlay';

type VideoProps = {
  src: string,
  name: string,
  thumbnail: string,
  price: number
}

export default function Video ({ src, name, price, thumbnail }: VideoProps) {
  const [autoPlayRef] = useAutoPlay();

  return (
    <div className="bg-black snap-start h-video h-screen flex justify-center items-center">
      <div style={{ position: 'relative' }}>
        <video className="h-video h-screen" controls loop ref={autoPlayRef}>
          <source src={src} type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
}
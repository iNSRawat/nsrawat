import { useCallback, useEffect, useRef, useState } from 'react';

import Image from '@/components/ui/Image';
import SpotifyNowPlaying from '@/components/homepage/SpotifyNowPlaying';
import ProfileInfo from '@/components/homepage/ProfileInfo';

const ProfileCard = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current || window.innerWidth < 1280) return;

    const { clientX, clientY } = e;
    const { width, height, x, y } = ref.current.getBoundingClientRect();
    const mouseX = Math.abs(clientX - x);
    const mouseY = Math.abs(clientY - y);
    const rotateMin = -15;
    const rotateMax = 15;
    const rotateRange = rotateMax - rotateMin;

    const rotate = {
      x: rotateMax - (mouseY / height) * rotateRange,
      y: rotateMin + (mouseX / width) * rotateRange,
    };

    setStyle({
      transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });
  }, []);

  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    current.addEventListener('mousemove', onMouseMove);
    current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (!current) return;

      current.removeEventListener('mousemove', onMouseMove);
      current.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseLeave, onMouseMove]);

  return (
    <div
      className="z-10 scale-100 transition-all duration-200 ease-out hover:z-50 hover:scale-[1.11]"
      style={{ perspective: '600px' }}
      ref={ref}
    >
      <div
        style={style}
        className="overflow-hidden rounded shadow-lg shadow-slate-300 transition-all duration-200 ease-out dark:shadow-sky-700/50"
      >
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96">
          <Image
            src="/static/images/avatar.png"
            alt="avatar"
            width={430}
            height={430}
            className="h-full w-full object-cover"
          />
        </div>
        <SpotifyNowPlaying />
        <div className="h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
        <ProfileInfo />
      </div>
    </div>
  );
};

export default ProfileCard;

import { useEffect, useState } from 'react';

export const useMobileMode = () => {
  const [ isMobile, setIsMobile ] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const setVhSize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setIsMobile(window.innerWidth < 1024);
    };
    setVhSize();
    window.addEventListener('resize', setVhSize);

    return () => {
      window.removeEventListener('resize', setVhSize);
    };
  }, []);

  return isMobile;
};

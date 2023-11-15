import React, { useEffect, useState } from 'react'

export const UseWindowSize = () => {

    const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
      });
    
      const updateSize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    
      useEffect(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('resize', updateSize);
    
          return () => {
            window.removeEventListener('resize', updateSize);
          };
        }
      }, []);

  return (
    windowSize
  )
}

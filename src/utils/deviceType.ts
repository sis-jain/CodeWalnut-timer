import { useState, useEffect } from 'react';

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceType(); // Run on initial render
    window.addEventListener('resize', updateDeviceType);

    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return deviceType;
}
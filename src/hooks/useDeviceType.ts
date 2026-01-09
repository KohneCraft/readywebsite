import { useState, useEffect } from 'react';
import type { Breakpoint } from '@/types/pageBuilder';

/**
 * Cihaz tipi tespiti için utility fonksiyon
 */
function getDeviceType(): Breakpoint {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Responsive cihaz tipi hook'u
 * Pencere boyutu değiştiğinde otomatik olarak güncellenir
 */
export function useDeviceType(): Breakpoint {
  const [deviceType, setDeviceType] = useState<Breakpoint>(() => getDeviceType());

  useEffect(() => {
    function handleResize() {
      setDeviceType(getDeviceType());
    }
    
    // İlk değer ataması
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
}





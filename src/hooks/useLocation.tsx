import { useState, useEffect } from 'react';
import type { Location } from '../types';

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  function onSuccess(position: GeolocationPosition) {
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
    setIsLocating(false);
  }

  function onError() {
    setError('Unable to retrieve your location.');
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return { location, error, isLocating };
}

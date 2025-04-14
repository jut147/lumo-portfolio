import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if the component has mounted on the client.
 * Useful for preventing hydration mismatches with components that behave
 * differently on server vs client (e.g., theme providers).
 * @returns {boolean} True if the component has mounted, false otherwise.
 */
export const useMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
import { useState, useCallback } from 'react';

export const useSpellClassFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, toggleDropdown, closeDropdown };
};

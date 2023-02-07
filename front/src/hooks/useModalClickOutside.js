import React, { useEffect } from 'react';

function useModalClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      // console.log(ref.current);
      // console.log(e.target);
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useModalClickOutside;

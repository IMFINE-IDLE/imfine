import React, { useRef, useState } from 'react';
import useModalClickOutside from '../../../hooks/useModalClickOutside';
import { ImageModal } from './style';

function PaperImageModal({ clickedImgSrc, setShowFullImage }) {
  const ref = useRef();
  useModalClickOutside(ref, () => {
    setShowFullImage(false);
  });

  return (
    <ImageModal onClick={() => setShowFullImage(false)}>
      <img src={clickedImgSrc} alt="" ref={ref} />
    </ImageModal>
  );
}

export default PaperImageModal;

import styled from 'styled-components';

const ImageModal = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(248, 250, 249, 0.8);
  padding: 5em;
  img {
    width: 100%;
  }
`;

export { ImageModal };

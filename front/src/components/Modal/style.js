import styled from 'styled-components';

const BoxModal = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(248, 250, 249, 0.8);
  z-index: 998;
`;

const BoxInnerModal = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 999;
  background-color: white;
`;

const ModalClose = styled.span`
  position: absolute;
  top: 1.2em;
  right: 1.5em;
  cursor: pointer;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CloverImg = styled.img.attrs({
  src: '/assets/images/clover.png',
})`
  position: absolute;
  top: 1em;
  left: 0.5em;
  width: 100px;
`;

const SpeechBubble = styled.div`
  width: 80%;
  min-height: 75px;
  padding: 1.2em;
  margin: 1em 0 0 1.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-color);
  border-radius: 25px;
  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    border: 26px solid transparent;
    border-bottom-color: var(--gray-color);
    border-top: 0;
    border-left: 0;
    margin-left: -25%;
    margin-top: -26px;
    border: 1px solid gray;
  }
`;

const BoxBtns = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
`;

const BtnModal = styled.div`
  width: 40%;
  cursor: pointer;
`;

const BtnWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BtnCircle = styled.div`
  position: absolute;
  content: '';
  right: 35%;
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: ${(props) =>
    props.isClose ? 'var(--red-color)' : 'var(--main-color)'};
  opacity: 0.2;
  border-radius: 50%;
`;

export {
  BoxModal,
  BoxInnerModal,
  ModalClose,
  ModalContent,
  CloverImg,
  SpeechBubble,
  BoxBtns,
  BtnModal,
  BtnWrap,
  BtnCircle,
};

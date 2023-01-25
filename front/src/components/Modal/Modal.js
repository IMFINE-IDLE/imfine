import {
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
} from './style';

function Modal({ text }) {
  return (
    <BoxModal>
      <BoxInnerModal>
        <ModalClose>
          <img src="/assets/icons/close.png" alt="닫기" width="20px" />
        </ModalClose>
        <ModalContent>
          <CloverImg />
          <SpeechBubble>{text}</SpeechBubble>
          <BoxBtns>
            <BtnWrap>
              <BtnModal isClose={true}>
                <img
                  src="/assets/icons/close-red-color.png"
                  alt="아니오"
                  width="30px"
                />
                <BtnCircle isClose={true} />
              </BtnModal>
            </BtnWrap>
            <BtnWrap>
              <BtnModal isClose={false}>
                <img
                  src="/assets/icons/check-main-color.png"
                  alt="예"
                  width="30px"
                />
                <BtnCircle isClose={false} />
              </BtnModal>
            </BtnWrap>
          </BoxBtns>
        </ModalContent>
      </BoxInnerModal>
    </BoxModal>
  );
}

export default Modal;

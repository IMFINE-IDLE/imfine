import { useRef } from 'react';
import useModalClickOutside from '../../hooks/useModalClickOutside';
import {
  BoxModal,
  BoxInnerModal,
  // ModalClose,
  ModalContent,
  CloverImg,
  SpeechBubble,
  BoxBtns,
  BtnModal,
  BtnWrap,
  BtnCircle,
  ModalClose,
} from './style';

function Modal({ type, setModalOpen, apiFunc }) {
  /**
   * 상위 컴포넌트에서 세팅해야할 것
   1. * 액션 클릭했을때 Modal 컴포넌트 보여주기
  const [modalOpen, setModalOpen] = useState(false);
  <button onClick={() => setModalOpen(true)}>클릭해야할것</button>

  2. props 넘겨주기
  - type : 모달에 띄울 텍스트
  - apiFunc : 예 선택시 실행할 함수
  {modalOpen && (
    <Modal type={'댓글신고'} setModalOpen={setModalOpen} apiFunc={api 요청 보낼 함수} />
    )}
    */

  const ref = useRef();
  useModalClickOutside(ref, () => {
    setModalOpen(false);
  });

  // api 세팅 완료되면 아래처럼 종류에 따라 다른 텍스트 적용 필요
  let text;
  if (type === '댓글신고') {
    text = '해당 댓글을 신고하시겠습니까?';
  }

  return (
    <BoxModal>
      <BoxInnerModal ref={ref}>
        <ModalClose ref={ref} onClick={() => setModalOpen(false)}>
          <img src="/assets/icons/close.png" alt="닫기" width="20px" />
        </ModalClose>
        <ModalContent>
          <CloverImg />
          <SpeechBubble>{text}</SpeechBubble>
          <BoxBtns>
            <BtnWrap>
              <BtnModal
                ref={ref}
                isClose={true}
                onClick={() => setModalOpen(false)}
              >
                <img
                  src="/assets/icons/close-red-color.png"
                  alt="아니오"
                  width="30px"
                />
                <BtnCircle isClose={true} />
              </BtnModal>
            </BtnWrap>
            <BtnWrap>
              <BtnModal isClose={false} onClick={apiFunc}>
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

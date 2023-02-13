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

function Modal({ type, action, setModalOpen, apiFunc }) {
  /**
   * 상위 컴포넌트에서 세팅해야할 것
   1. * 액션 클릭했을때 Modal 컴포넌트 보여주기
  const [modalOpen, setModalOpen] = useState(false);
  <button onClick={() => setModalOpen(true)}>클릭해야할것</button>

  2. props 넘겨주기
  - type : 종류 (일기장, 일기, 댓글, 대나무, 대나무잎)
  - action : 삭제, 신고
  - apiFunc : 예 선택시 실행할 함수
  {modalOpen && (
    <Modal type={'댓글신고'} setModalOpen={setModalOpen} apiFunc={api 요청 보낼 함수} />
    )}
    */

  const ref = useRef();
  useModalClickOutside(ref, () => {
    setModalOpen(false);
  });

  // 종류에 따라 다른 텍스트 적용
  let text;
  if (type === '일기장') {
    text = `해당 일기장을 ${action}할까요?`;
  } else if (type === '일기') {
    text = `해당 일기를 ${action}할까요?`;
  } else if (type === '댓글') {
    text = `해당 댓글을 ${action}할까요?`;
  } else if (type === '대나무') {
    text = `해당 대나무를 ${action}할까요?`;
  } else if (type === '대나무잎') {
    text = `해당 대나무잎을 ${action}할까요?`;
  } else if (type === '증상기록삭제') {
    text = '해당 증상의 모든 기록이 삭제됩니다. 정말 삭제할까요?';
  } else if (type === '탈퇴') {
    text = '정말로 탈퇴할까요?';
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

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import {
  PickedTitle,
  PickedDivision,
  PickedContentWrapper,
  PickedText,
  PickedIconBtn,
} from './style';

/* 프롭스 설명
 *
 * (String) title: | 앞에 들어가는 제목
 * (String) type: 'text', 'medical', 'symptom' 중 하나.
 *                 type이 'medical' 또는 'symptom' 이면 버튼으로 표시됨
 * (Any) text: type='text' 일 경우 표시될 내용
 * (Array) medicals: [{id: Number, name: String}] 형식의 배열
 * (Array) symptoms: [{id: Number, name: String}] 형식의 배열
 * (String) color: 아이콘 색깔
 * (Boolean) canModify: true일 경우 수정 가능
 *
 */

const PickedItemList = (
  {
    title,
    type,
    text,
    medicals,
    symptoms,
    color,
    canModify,
    // 아래로 필요한 함수나 값 넘겨서 사용
    ToggleSymptom,
    deleteAllRecord,
    handleDeleteAllRecord,
    textPointer,
    onClickUserName,
    paddingPicked,
    checkOverflow,
  },
  ref
) => {
  // 질병/수술 또는 증상 추가시 스크롤 자동이동시키기 위한 ref
  const medicalDivOut = ref?.medicalDivOut;
  const medicalDivIn = ref?.medicalDivIn;
  const symptomDivOut = ref?.symptomDivOut;
  const symptomDivIn = ref?.symptomDivIn;

  // 질병/수술 또는 증상이 추가, 제거될 때마다 가로스크롤 overflow 여부를 체크
  useEffect(() => {
    checkOverflow?.();
  }, [medicals, symptoms]);

  return (
    <>
      <FlexDiv
        justify="start"
        padding={paddingPicked || '0.25em 0'}
        height="2em"
      >
        <PickedTitle>{title}</PickedTitle>
        <PickedDivision> | </PickedDivision>
        {type === 'medical' ? (
          <PickedContentWrapper width="78%" justify="start" ref={medicalDivOut}>
            <FlexDiv
              justify="start"
              width="auto"
              height="auto"
              padding="0 1em 0 0"
              ref={medicalDivIn}
            >
              {!medicals || medicals.length === 0 ? (
                <></>
              ) : (
                medicals.map(({ id, name }) => (
                  <PickedIconBtn
                    color={color}
                    pointer={canModify ? true : false}
                    onClick={() => ToggleSymptom('medical', id, name)}
                    key={id}
                  >
                    {name}
                    {canModify && (
                      <img
                        src="/assets/icons/delete.svg"
                        alt="delete"
                        style={{ marginLeft: '0.3em' }}
                      />
                    )}
                  </PickedIconBtn>
                ))
              )}
            </FlexDiv>
          </PickedContentWrapper>
        ) : type === 'symptom' ? (
          <PickedContentWrapper width="75%" justify="start" ref={symptomDivOut}>
            <FlexDiv
              justify="start"
              width="auto"
              height="auto"
              padding="0 1em 0 0"
              ref={symptomDivIn}
            >
              {!symptoms || symptoms.length === 0 ? (
                <></>
              ) : (
                symptoms.map(({ id, name }) => (
                  <PickedIconBtn
                    color={color}
                    pointer={canModify ? true : false}
                    onClick={(e) => {
                      if (deleteAllRecord) {
                        e.preventDefault();
                        handleDeleteAllRecord(id, name);
                      } else ToggleSymptom('symptom', id, name);
                    }}
                    key={id}
                  >
                    {name}
                    {canModify && (
                      <img
                        src="/assets/icons/delete.svg"
                        alt="delete"
                        style={{ marginLeft: '0.3em' }}
                      />
                    )}
                  </PickedIconBtn>
                ))
              )}
            </FlexDiv>
          </PickedContentWrapper>
        ) : (
          <PickedText onClick={onClickUserName} textPointer={textPointer}>
            {text}
          </PickedText>
        )}
      </FlexDiv>
    </>
  );
};

export default forwardRef(PickedItemList);

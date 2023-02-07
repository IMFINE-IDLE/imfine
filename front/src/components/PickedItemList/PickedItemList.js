import React from 'react';
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
 *                 type이 'medical' 또는 'symptom' 이면 아이콘으로 표시됨
 * (Any) text: type='text' 일 경우 표시될 내용
 * (Array) medicals: [{medicalId: Number, medicalName: String}] 형식의 배열
 * (Array) symptoms: [{symptomId: Number, symptomName: String}] 형식의 배열
 * (String) color: 아이콘 색깔
 * (Boolean) canModify: true일 경우 수정 가능
 *
 */

const PickedItemList = ({
  title,
  type,
  text,
  medicals,
  symptoms,
  color,
  canModify,
}) => {
  return (
    <FlexDiv justify="start" padding="0.3em 0">
      <PickedTitle>{title}</PickedTitle>
      <PickedDivision> | &nbsp; </PickedDivision>
      {type === 'medical' ? (
        <PickedContentWrapper width="75%" justify="start">
          {!medicals || medicals.length === 0 ? (
            <></>
          ) : (
            medicals.map((medical) => (
              <PickedIconBtn
                color={color}
                pointer={canModify ? true : false}
                // onClick={() => ToggleSymptom(medical.id, medical.name)}
                key={medical.medicalId}
              >
                {medical.medicalName}
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
        </PickedContentWrapper>
      ) : type === 'symptom' ? (
        <PickedContentWrapper width="75%" justify="start">
          {!symptoms || symptoms.length === 0 ? (
            <></>
          ) : (
            symptoms.map((symptom) => (
              <PickedIconBtn
                color={color}
                pointer={canModify ? true : false}
                // onClick={() => ToggleSymptom(medical.id, medical.name)}
                key={symptom.symptomId}
              >
                {symptom.symptomName}
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
        </PickedContentWrapper>
      ) : (
        <PickedText>{text}</PickedText>
      )}
    </FlexDiv>
  );
};

export default PickedItemList;

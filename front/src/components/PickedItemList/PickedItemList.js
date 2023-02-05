import React from 'react';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import {
  PickedTitle,
  PickedDivision,
  PickedContentWrapper,
  PickedText,
  PickedIconBtn,
} from './style';

const PickedItemList = ({
  title,
  isIcon,
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
          {medicals.map((medical) => (
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
          ))}
        </PickedContentWrapper>
      ) : type === 'symptom' ? (
        <PickedContentWrapper width="75%" justify="start">
          {symptoms.map((symptom) => (
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
          ))}
        </PickedContentWrapper>
      ) : (
        <PickedText>{text}</PickedText>
      )}
    </FlexDiv>
  );
};

export default PickedItemList;

import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {
  BoxSymptomRating,
  DivSymptom,
  LabelSymptom,
  RateSymptom,
  ContentLabel,
} from './style';
import { Clover } from '../../common/Clover/Clover';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
function BoxSymptom({ symptomList, values, state }) {
  console.log('list', symptomList);
  console.log('value', values);
  if (values.length === 0) {
    return (
      <BoxSymptomRating>
        <FlexDiv>
          <Clover code={'1'} width={'50'} height={'50'} />
          <ContentLabel>
            등록된 증상이 없어요
            <br />
            증상을 수정하게 되면
            <br />
            편집 내용이 사라지니 유의하세요
          </ContentLabel>
        </FlexDiv>
      </BoxSymptomRating>
    );
  } else {
    return (
      <BoxSymptomRating>
        {values?.map((v, index) => {
          console.log('idx', index);
          return (
            <DivSymptom key={index}>
              <LabelSymptom>{symptomList[index].name}</LabelSymptom>
              <RateSymptom>
                <ReactStars
                  count={5}
                  size={25}
                  onChange={(newScore) =>
                    state(
                      values.map((v, i) => (i === index ? newScore * 2 : v))
                    )
                  }
                  value={v}
                  activeColor="#A9D7D0"
                  isHalf={true}
                  edit={true}
                  char={'●'}
                />
              </RateSymptom>
            </DivSymptom>
          );
        })}
      </BoxSymptomRating>
    );
  }
}

export default BoxSymptom;

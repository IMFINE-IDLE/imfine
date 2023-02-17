import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {
  BoxSymptomRating,
  DivSymptom,
  LabelSymptom,
  RateSymptom,
} from './style';

function SymptomRating({ symptomList }) {
  return (
    <BoxSymptomRating>
      {symptomList?.map(({ id, name, score }) => {
        return (
          <DivSymptom key={id}>
            <LabelSymptom>{name}</LabelSymptom>
            <RateSymptom>
              <ReactStars
                count={5}
                size={25}
                value={parseFloat(score / 2)}
                activeColor="#A9D7D0"
                // activeColor="#FDE3E3" light pink
                isHalf={true}
                edit={false}
                char={'●'}
              />
            </RateSymptom>
          </DivSymptom>
        );
      })}
    </BoxSymptomRating>
  );
}

export default SymptomRating;

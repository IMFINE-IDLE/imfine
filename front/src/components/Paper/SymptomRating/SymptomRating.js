import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {
  BoxSymptomRating,
  DivSymptom,
  LabelSymptom,
  RateSymptom,
} from './style';

function SymptomRating({ symptomList, value, state }) {
  return (
    <BoxSymptomRating>
      {symptomList?.map(({ symptomId, symptomName }) => {
        return (
          <DivSymptom key={symptomId}>
            <LabelSymptom>{symptomName}</LabelSymptom>
            <RateSymptom>
              <ReactStars
                count={5}
                size={25}
                onChange={(e) => state([...e])}
                value={value}
                activeColor="#A9D7D0"
                // activeColor="#FDE3E3" light pink
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

export default SymptomRating;

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
      <div>
        {symptomList?.map((symptom) => {
          return (
            <DivSymptom key={symptom.symptomId}>
              <LabelSymptom>{symptom.symptomName}</LabelSymptom>
              <RateSymptom>
                <ReactStars
                  count={5}
                  size={25}
                  value={parseFloat(symptom.score)}
                  activeColor="#A9D7D0"
                  isHalf={true}
                  edit={false}
                  char={'●'}
                />
              </RateSymptom>
            </DivSymptom>
          );
        })}
      </div>
    </BoxSymptomRating>
  );
}

export default SymptomRating;

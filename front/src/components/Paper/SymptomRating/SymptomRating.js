import React from 'react';
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
        {symptomList.map((symptom) => {
          return (
            <DivSymptom key={symptom.symptomId}>
              <LabelSymptom>{symptom.symptomName}</LabelSymptom>
              <RateSymptom>{symptom.score}</RateSymptom>
            </DivSymptom>
          );
        })}
      </div>
    </BoxSymptomRating>
  );
}

export default SymptomRating;

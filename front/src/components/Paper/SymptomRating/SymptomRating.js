import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {
  BoxSymptomRating,
  DivSymptom,
  LabelSymptom,
  RateSymptom,
} from './style';

function SymptomRating({ symptomList, values, state }) {
  console.log('list', symptomList);
  console.log('value', values);
  return (
    <BoxSymptomRating>
      {symptomList?.map((score, item, idx) => {
        console.log('idx', idx);
        return (
          <DivSymptom key={item.id}>
            <LabelSymptom>{item.name}</LabelSymptom>
            <RateSymptom>
              <ReactStars
                count={5}
                size={25}
                onChange={(newScore) =>
                  state(
                    values.map((score, i) => (i === idx ? newScore : score))
                  )
                }
                value={score}
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

export default SymptomRating;

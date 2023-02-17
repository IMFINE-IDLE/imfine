import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {
  BoxSymptomRating,
  DivSymptom,
  LabelSymptom,
  RateSymptom,
} from './style';

function ModifyBoxSymptom({ symptomList, values, state }) {
  console.log('list', symptomList);
  console.log('value', values);
  return (
    <BoxSymptomRating>
      {values?.map((v, index) => {
        console.log('idx', index);
        return (
          <DivSymptom key={index}>
            <LabelSymptom>{symptomList[index].symptomName}</LabelSymptom>
            <RateSymptom>
              <ReactStars
                count={5}
                size={25}
                onChange={(newScore) =>
                  state(values.map((v, i) => (i === index ? newScore * 2 : v)))
                }
                value={parseFloat(v / 2)}
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

export default ModifyBoxSymptom;

import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {
  BoxSymptomRating,
  DivSymptom,
  LabelSymptom,
  RateSymptom,
  titleLabel,
} from './style';

function BoxSymptom({ symptomList }) {
  const [rating, setRating] = React.useState(0);
  return (
    <BoxSymptomRating>
      {symptomList?.map(({ symptomId, symptomName, score }) => {
        return (
          <DivSymptom key={symptomId}>
            <LabelSymptom>{symptomName}</LabelSymptom>
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

export default BoxSymptom;

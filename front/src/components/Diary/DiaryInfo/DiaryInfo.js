import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import PickedItemList from '../../PickedItemList/PickedItemList';
import { DiaryFeedBtn, DiaryFeedFilterSvg } from './style';

const DiaryInfo = ({ filtered, medicals, symptoms }) => {
  const navigate = useNavigate();

  return (
    <>
      <BoxNoShad color="light" radius="0" style={{ paddingBottom: '6.7em' }}>
        <FlexDiv>
          <DiaryFeedFilterSvg onClick={() => navigate('/diary/filter')} />
          {filtered ? (
            <FlexDiv direction="column" padding="0 0 0 1.2em">
              <PickedItemList
                title="질병/수술"
                type="medical"
                medicals={medicals}
              />
              <PickedItemList
                title="증상"
                type="symptom"
                symptoms={symptoms}
                color="light-pink"
              />
            </FlexDiv>
          ) : (
            <DiaryFeedBtn
              onClick={() => navigate('/diary/filter')}
              color="gray"
            >
              질병/수술 혹은 증상 선택
            </DiaryFeedBtn>
          )}
        </FlexDiv>
      </BoxNoShad>
    </>
  );
};

export default DiaryInfo;

import React from 'react';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import IconSymptom from '../common/IconSymptom/IconSymptom';
import { BoxPickMenu, BtnRequest } from './style';

function PickMenu({ type, dataList, setIsOpen, ToggleSymptom }) {
  return (
    <FlexDiv direction={'column'}>
      <BoxPickMenu>
        {dataList?.map(({ id, name, image }) => (
          <IconSymptom
            type={type}
            key={id}
            id={id}
            name={name}
            image={image}
            onClick={() => setIsOpen((prev) => !prev)}
            ToggleSymptom={ToggleSymptom}
          />
        ))}
      </BoxPickMenu>
      <BtnRequest>
        {type === 'medical' ? '질병/수술' : '증상'} 추가 요청하기
      </BtnRequest>
    </FlexDiv>
  );
}

export default PickMenu;

import React, { useState, useEffect } from 'react';
import { BoxPaperDetail, Title, TopDiv, CenterDiv, bottomDiv } from './style';
import NavBarBasic from '../../../components/NavBarBasic/NavBarBasic';
import DropDownR25 from '../../common/DropDownR25/DropDownR25';
function PaperCreateHeader({ items }) {
  console.log('aaaa', items);
  const [active, setActive] = useState(true);
  const [selected, setSelected] = useState(items[0]);

  return (
    <>
      <NavBarBasic
        BackgroundColor={'main'}
        Back={true}
        Text={'일기 작성'}
        TextColor={'icon'}
      />
      <TopDiv>
        <Title>
          기록했던 <br /> 일기장을 꺼내보세요.
        </Title>
      </TopDiv>
      <CenterDiv>
        <DropDownR25
          items={items}
          active={active}
          setActive={setActive}
          selected={selected}
          setSelected={setSelected}
        />
      </CenterDiv>
      <BoxPaperDetail />
    </>
  );
}

export default PaperCreateHeader;

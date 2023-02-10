import React, { useRef, useState } from 'react';
import { BoxRT50LB50 } from '../common/BoxRT50LB50/BoxRT50LB50';
import { FlexDiv } from '../common/FlexDiv/FlexDiv';
import IconSymptom from '../common/IconSymptom/IconSymptom';
import {
  BoxPickMenu,
  PickMenuRowContainer,
  PickMenuSubListContainer,
} from './style';

function PickMenu({ type, dataList, setIsOpen }) {
  // dataList를 4개씩 잘라서 dataListModified에 넣기
  const dataListModified = [];
  const rowCnt = Math.floor(dataList.length / 4);
  for (let i = 0; i < rowCnt; i++) {
    dataListModified.push(dataList.slice(0 + 4 * i, 4 + 4 * i));
  }

  // 메뉴 클릭시 서브메뉴 열기 위한 ref
  const subMenuFirstClicked = useRef(null);

  // 메뉴 하나 클릭했을 때
  const handleMenuClick = (e) => {
    // console.log('clicked');
    // console.log(e);
    // console.log(e.target.closest('section'));
    // setSubMenuOpen((prev) => !prev);

    console.log('aaaaaa', subMenuFirstClicked.current);
    console.log('bbbb', subMenuFirstClicked.current.lastElementChild);
    subMenuFirstClicked.current = e.target.closest('section');
    subMenuFirstClicked.current.lastElementChild.style.display = 'block';
    // subMenuFirstClicked.current.classList.add('subMenuOpen');
    // setIsOpen((prev) => !prev);
  };

  return (
    // <BoxPickMenu>
    //   {dataList?.map(({ id, name, image }) => (
    //     <IconSymptom
    //       type={type}
    //       key={id}
    //       id={id}
    //       name={name}
    //       image={image}
    //       onClick={handleMenuClick}
    //     />
    //   ))}
    //       </BoxPickMenu>
    <FlexDiv wrap="wrap">
      {dataListModified?.map((dataList) => (
        <PickMenuRowContainer ref={subMenuFirstClicked}>
          <FlexDiv justify="space-bewteen" gap="1.25em" padding="0 0 1em 0">
            {dataList.map(({ id, name, image }) => (
              <IconSymptom
                type={type}
                key={id}
                id={id}
                name={name}
                image={image}
                handleMenuClick={handleMenuClick}
              />
            ))}
          </FlexDiv>

          <PickMenuSubListContainer>
            <FlexDiv direction="column">
              <span>질병하나</span>
              <span>질병하나</span>
              <span>질병하나</span>
              <span>질병하나</span>
              <span>질병하나</span>
              <span>질병하나</span>
            </FlexDiv>
          </PickMenuSubListContainer>
        </PickMenuRowContainer>
      ))}
    </FlexDiv>
  );
}

export default PickMenu;

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
  // const rowCnt = Math.floor(dataList.length / 4);
  for (let i = 0; i < Math.ceil(dataList.length / 4); i++) {
    dataListModified.push(dataList.slice(0 + 4 * i, 4 + 4 * i));
  }

  // 메뉴 클릭시 서브메뉴 열기 위한 ref
  const subMenuSection = useRef([]);
  const clickedSubMenuSectionIdx = useRef(null);
  const clickedMenuId = useRef(null);

  // 메뉴 하나 클릭했을 때
  const handleMenuClick = (e, idx, id) => {
    console.log(e);
    console.log('idx, id', idx, id);
    console.log('aaaaaa', subMenuSection.current[idx]);
    // console.log('bbbb', subMenuSection.current[idx].lastElementChild);
    // subMenuSection.current[idx].lastElementChild.style.display = 'block';
    // subMenuFirstClicked.current.classList.add('subMenuOpen');

    // const currentDisplay =
    //   subMenuSection.current[idx].lastElementChild.style.display;
    // console.log('curdis', currentDisplay);

    // subMenuSection.current[idx].lastElementChild.style.display =
    //   currentDisplay === 'block' ? 'none' : 'block';

    // 최초 클릭시 클릭된 메뉴의 id와 행의 idx를 저장하고 subMenu 영역 열기
    if (!clickedMenuId.current) {
      clickedMenuId.current = id;
      clickedSubMenuSectionIdx.current = idx;
      subMenuSection.current[idx].lastElementChild.style.display = 'block';
    }
    // 기존에 클릭된 메뉴와 같은 메뉴를 다시 클릭하면 subMenu 영역을 닫음
    else if (clickedMenuId.current === id) {
      subMenuSection.current[idx].lastElementChild.style.display = 'none';
    }
    // 닫힌 메뉴 다시 클릭시 다시 여는 로직 필요

    // 기존과 다른 메뉴를 클릭하면 기존 subMenu를 닫고
    // 클릭된 메뉴의 id와 행의 idx를 저장하고 새 subMenu를 열기
    else if (clickedMenuId.current !== id) {
      const currentIdx = clickedSubMenuSectionIdx.current;
      console.log('curi', currentIdx);
      subMenuSection.current[currentIdx].lastElementChild.style.display =
        'none';
      clickedMenuId.current = id;
      clickedSubMenuSectionIdx.current = idx;
      subMenuSection.current[idx].lastElementChild.style.display = 'block';
    }
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
      {dataListModified?.map((dataList, idx) => (
        <PickMenuRowContainer ref={(el) => (subMenuSection.current[idx] = el)}>
          <FlexDiv justify="space-bewteen" gap="1.25em" padding="0 0 1em 0">
            {dataList.map(({ id, name, image }) => (
              <IconSymptom
                type={type}
                key={id}
                id={id}
                name={name}
                image={image}
                handleMenuClick={(e) => handleMenuClick(e, idx, id)}
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

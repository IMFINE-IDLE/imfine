import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PickedItemList from '../PickedItemList/PickedItemList';
import PickMenu from '../PickMenu/PickMenu';
import Tabs from '../Tabs/Tabs';
import {
  Title,
  BoxTopArea,
  BoxToggle,
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
  TitleSmall,
  BoxSymptom,
  BoxPickArea,
} from './style';

function PickSymptom({ showMedical, showSymptom, medicals, symptoms }) {
  /**
   * props 설명
   * (Boolean) showMedical : 질병 선택 탭 포함 여부
   * (Boolean) showSymptom : 증상 선택 탭 포함 여부
   * (List) medicals: 기본으로 보여줄 질병 아이콘 목록
   * (List) symptoms : 기본으로 보여줄 증상 아이콘 목록
   */

  const [isOpen, setIsOpen] = useState(true);
  // const [tabArr, setTabArr] = useState([]);
  const [pickedMedicalList, setPickedMedicalList] = useState([]);
  const [pickedSymptomList, setPickedSymptomList] = useState([]);
  const medicalMenuList = useSelector((state) => {
    return state.menu.medicalMenuList;
  });
  const symptomMenuList = useSelector((state) => {
    return state.menu.symptomMenuList;
  });

  const ToggleSymptom = (type, itemId, itemName) => {
    let prevList;
    if (type === 'medical') {
      prevList = [...pickedMedicalList];
    } else {
      prevList = [...pickedSymptomList];
    }
    console.log(prevList);
    let idx = prevList.findIndex((item) => item.id === itemId);
    if (idx === -1) {
      prevList.push({ id: itemId, name: itemName });
    } else {
      prevList.splice(idx, 1);
    }

    if (type === 'medical') {
      setPickedMedicalList(prevList);
    } else {
      setPickedSymptomList(prevList);
    }
  };

  // const tabArr = [
  //   {
  //     idx: 0,
  //     tabName: '질병/수술 선택',
  //     tabContent: (
  //       <PickMenu
  //         type={'medical'}
  //         dataList={medicalMenuList}
  //         setIsOpen={setIsOpen}
  //         ToggleSymptom={ToggleSymptom}
  //       />
  //     ),
  //   },
  //   {
  //     idx: 1,
  //     tabName: '증상 선택',
  //     tabContent: (
  //       <PickMenu
  //         type={'symptom'}
  //         dataList={symptomMenuList}
  //         setIsOpen={setIsOpen}
  //         ToggleSymptom={ToggleSymptom}
  //       />
  //     ),
  //   },
  // ];

  let tabArr = [];
  // 메뉴 버튼 showMedical, showSymptom 여부에 따라 넣기
  if (showMedical) {
    console.log(...tabArr);
    tabArr.push({
      idx: 0,
      tabName: '질병/수술 선택',
      tabContent: (
        <PickMenu
          type={'medical'}
          dataList={medicalMenuList}
          setIsOpen={setIsOpen}
          ToggleSymptom={ToggleSymptom}
        />
      ),
    });
    // setTabArr([
    //   ...tabArr,
    //   {
    //     idx: 0,
    //     tabName: '질병/수술 선택',
    //     tabContent: (
    //       <PickMenu
    //         type={'medical'}
    //         dataList={medicalMenuList}
    //         setIsOpen={setIsOpen}
    //         ToggleSymptom={ToggleSymptom}
    //       />
    //     ),
    //   },
    // ]);
  }
  if (showSymptom) {
    tabArr.push({
      idx: 1,
      tabName: '증상 선택',
      tabContent: (
        <PickMenu
          type={'symptom'}
          dataList={symptomMenuList}
          setIsOpen={setIsOpen}
          ToggleSymptom={ToggleSymptom}
        />
      ),
    });
    // setTabArr([
    //   ...tabArr,
    //   {
    //     idx: 1,
    //     tabName: '증상 선택',
    //     tabContent: (
    //       <PickMenu
    //         type={'symptom'}
    //         dataList={symptomMenuList}
    //         setIsOpen={setIsOpen}
    //         ToggleSymptom={ToggleSymptom}
    //       />
    //     ),
    //   },
    // ]);
  }

  useEffect(() => {}, []);

  return (
    <div>
      <Title>계정 기본 설정</Title>
      <BoxTopArea>
        <BoxToggle>
          <TitleSmall style={{ fontWeight: '600' }}>계정 공개 여부</TitleSmall>
          <ToggleContainer>
            <ToggleText>{isOpen ? '공개' : '비공개'}</ToggleText>
            <ToggleWrapper isOpen={isOpen}>
              <Toggle
                id="toggle"
                type="checkbox"
                onChange={() => {
                  setIsOpen((prev) => !prev);
                }}
                checked={isOpen}
              />
              <ToggleLabel htmlFor="toggle" />
            </ToggleWrapper>
          </ToggleContainer>
        </BoxToggle>
        <BoxSymptom>
          <TitleSmall>관심있는 질병 혹은 수술을 선택해주세요.</TitleSmall>
        </BoxSymptom>

        {/* 선택한 질병, 증상 보여주는 영역 */}
        {showMedical && (
          <PickedItemList
            title="질병/수술"
            isIcon={true}
            type="medical"
            canModify={true}
            medicals={pickedMedicalList}
            ToggleSymptom={ToggleSymptom}
          />
        )}
        {showSymptom && (
          <PickedItemList
            title="증상"
            isIcon={true}
            type="symptom"
            symptoms={pickedSymptomList}
            canModify={true}
            color="light-pink"
            ToggleSymptom={ToggleSymptom}
          />
        )}
      </BoxTopArea>
      <BoxPickArea>{tabArr !== [] && <Tabs tabArr={tabArr} />}</BoxPickArea>
    </div>
  );
}

export default PickSymptom;

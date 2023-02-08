import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import IconSymptom from '../common/IconSymptom/IconSymptom';
import PickedItemList from '../PickedItemList/PickedItemList';
import {
  Title,
  BoxTopArea,
  BoxPickMenu,
  BoxToggle,
  ToggleContainer,
  ToggleText,
  ToggleWrapper,
  Toggle,
  ToggleLabel,
  TitleSmall,
  BoxSymptom,
  BtnSymptom,
  BoxBtnTap,
  BtnTap,
} from './style';

function PickSymptom({ showMedical, showSymptom, symptoms }) {
  /**
   * props 설명
   * (Boolean) showMedical : 질병 선택 탭 포함 여부
   * (Boolean) showSymptom : 증상 선택 탭 포함 여부
   * (List) symptoms : 기본으로 보여줄 증상 아이콘 목록
   */

  const [isOpen, setIsOpen] = useState(true);
  const [pickedMedicalList, setPickedMedicalList] = useState([]);
  const [pickedSymptomList, setPickedSymptomList] = useState([]);
  const medicalList = useSelector((state) => {
    return state.medical.medicalList;
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

      <div>
        <BoxBtnTap>
          {showMedical && <BtnTap>질병/수술 선택</BtnTap>}
          {showSymptom && <BtnTap>증상 선택</BtnTap>}
        </BoxBtnTap>
        <BoxPickMenu>
          {medicalList.map((medical) => (
            <IconSymptom
              type={'medical'}
              key={medical.id}
              id={medical.id}
              name={medical.name}
              imgSrc={medical.imgSrc}
              onClick={() => setIsOpen((prev) => !prev)}
              ToggleSymptom={ToggleSymptom}
            />
          ))}
        </BoxPickMenu>
      </div>
    </div>
  );
}

export default PickSymptom;

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Btn } from '../../components/common/Btn/Btn';
import { BoxLT50 } from '../../components/common/BoxLT50/BoxLT50';
import { BoxShad } from '../../components/common/BoxShad/BoxShad';

const BoxOuter = styled.div`
  padding: ${(props) => props.padding || '0px'};
`;

const BtnOuter = styled.div`
  padding: 0px;
  display: flex;
`;
const BoxHeader = styled.div`
  height: 15em;
  border-radius: 0px 0px 50px 50px;
  background-color: var(--light-color);
  outline: none;
`;

const TitleHeader = styled.h1`
  color: var(--default-font-color);
  font-weight: 700;
  font-size: 1.5em;
  padding-top: 2em;
  padding-left: 2em;
`;

const SubTitleHeader = styled.h1`
  color: var(--icon-color);
  font-weight: 700;
  font-size: 1em;
  padding-top: 2em;
  padding-left: 3em;
  line-height: 1.5em;
`;

// 대나무 게시글 정렬 버튼
const BtnFilter = styled.button`
  ${Btn}
`;

const BoxContainer = styled(BoxLT50)`
  box-shadow: -5px -1px 4px rgba(0, 0, 0, 0.1);
  background-color: var(--gray-color);
`;

const BoxBamboo = styled(BoxShad)`
  border-radius: 25px;
`;

const TextContent = styled.text`
  font-weight: 400;
  font-size: 1em;
`;

const LabelStatus = styled.text`
  font-weight: 400;
  font-size: 1em;
`;

const BoxBtnFloat = styled.div`
  position: fixed;
  width: 30%;
  min-width: 70px;
  max-width: 160px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;

const BoxBtnFilter = styled.div`
  width: 45px;
  background-color: var(--gray-color);
  border-radius: 5px;
  padding: 0.3em;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BtnLink = styled(Link)`
  ${Btn}
`;

export {
  BoxHeader,
  TitleHeader,
  SubTitleHeader,
  BtnFilter,
  BoxContainer,
  BoxBamboo,
  TextContent,
  LabelStatus,
  BoxBtnFloat,
  BoxBtnFilter,
  BtnLink,
  BoxOuter,
  BtnOuter,
};

import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { DropDownR25 } from '../../common/DropDownR25/DropDownR25';
import { InputGray } from '../../common/InputGray/InputGray';

const BoxPaperDetail = styled(BoxNoShad)`
  min-height: 200px;
  border-radius: 0px 0px 50px 50px;
  padding: 1em 1em 1em 1em;
  background-color: var(--main-color);
`;

const Title = styled.h1`
  color: var(--icon-color);
  font-weight: 700;
  font-size: 1.5em;
  background-color: var(--main-color);
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  line-height: 2.5em;
  padding-left: 1.2em;
  background-color: var(--main-color);
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  background-color: var(--main-color);
`;

const bottomDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export { BoxPaperDetail, Title, TopDiv, CenterDiv, bottomDiv };

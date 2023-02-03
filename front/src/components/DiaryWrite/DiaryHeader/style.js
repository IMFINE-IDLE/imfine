import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { DropDownR25 } from '../../common/DropDownR25/DropDownR25';
import { InputGray } from '../../common/InputGray/InputGray';

const BoxPaperDetail = styled(BoxNoShad)`
  min-height: 200px;
`;

const Title = styled.h1`
  color: var(--default-font-color);
  font-weight: 700;
  font-size: 1em;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
`;

const centerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
`;

const bottomDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export { BoxPaperDetail, Title, TopDiv, centerDiv, bottomDiv };

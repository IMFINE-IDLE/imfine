import styled from 'styled-components';
import { BoxNoShad } from '../../components/common/BoxNoShad/BoxNoShad';
import { FlexDiv } from '../../components/common/FlexDiv/FlexDiv';
const BoxPaperDetail = styled(BoxNoShad)`
  min-height: 100px;
  border-radius: 0px 0px 50px 50px;
  padding: 1em 1em 1em 1em;
  background-color: var(--main-color);
`;

const BoxContent = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 1em;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RightDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ContentLabel = styled.label`
  font-weight: ${(props) => props.weight || '700'};
  color: var(--icon-color);
  margin: ${(props) => props.margin || '1.5em 0 1.5em 2em'};
`;

export { BoxPaperDetail, BoxContent, TopDiv, ContentLabel, RightDiv };

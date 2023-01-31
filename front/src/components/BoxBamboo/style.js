import styled from 'styled-components';
import { BoxLT50 } from '../../components/common/BoxLT50/BoxLT50';
import { BoxShad } from '../../components/common/BoxShad/BoxShad';

const BoxBambooOuter = styled.div`
  padding: ${(props) => props.padding || '0px'};
`;

const BoxShadBamboo = styled(BoxShad)`
  height: 9em;
  padding: 1em;
  border-radius: 25px;
  margin: 1em 0;
  display: flex;
  flex-direction: column;
`;

const TextContent = styled.label`
  position: relative;
  font-weight: 400;
  font-size: 1em;
  margin: ${(props) => props.margin || '1em'};
`;

const LabelOuter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const LabelStatus = styled.label`
  font-weight: 400;
  font-size: 1em;
  padding: ${(props) => props.margin || '1em'};
`;

export { BoxBambooOuter, BoxShadBamboo, TextContent, LabelOuter, LabelStatus };

import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';

const ColumnDiv = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`;

const BoxNoShadLeaves = styled(BoxNoShad)`
  min-height: 9em;
  padding: 1em;
  margin: 1em;
  border-radius: 25px;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TitleLabel = styled.label`
  font-weight: 700;
  color: var(--gray800-color);
  margin 0 0.2em 0 0.4em 
`;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Content = styled.div`
  padding: 1em 0 1em 0.4em;
  color: var(--icon-color);
`;

export { ColumnDiv, BoxNoShadLeaves, TopDiv, TitleLabel, BottomDiv, Content };

import styled from 'styled-components';
import { BoxRT25 } from '../../components/common/BoxRT25/BoxRT25';
import { Btn } from '../../components/common/Btn/Btn';

const BoxTopArea = styled.div`
  padding: 2em;
`;

const Title = styled.div`
  margin: 1.5em 0;
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
`;

const TitleSmall = styled.span`
  font-weight: 600;
  color: var(--gray800-color);
  display: inline;
`;

const BoxSymptom = styled.div`
  line-height: 25px;
`;

const BtnSymptom = styled.span`
  ${Btn}
  display: inline-block;
  font-size: 12px;
  color: var(--icon-color);
  padding: 0.5em;
  cursor: pointer;
  width: auto;
  margin: 0 0.3em;
`;

const BoxBtnTap = styled.div`
  display: flex;
`;

const BtnTap = styled(BoxRT25)`
  border-radius: 25px 25px 0 0;
  width: 50%;
  text-align: center;
`;

const BoxPickMenu = styled.div`
  padding: 0 1em 1em;
  background-color: var(--gray-color);
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  /* align-items: center; */
`;

const BoxPickArea = styled.div`
  padding-top: 4em;
`;

export {
  Title,
  BoxTopArea,
  BoxSymptom,
  BtnSymptom,
  BoxPickMenu,
  BoxBtnTap,
  BtnTap,
  TitleSmall,
  BoxPickArea,
};

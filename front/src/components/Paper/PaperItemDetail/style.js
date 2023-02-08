import styled from 'styled-components';
import { BoxNoShad } from '../../common/BoxNoShad/BoxNoShad';
import { BoxBottom } from '../PaperItem/style';

const BoxPaperDetail = styled(BoxNoShad)`
  min-height: 200px;
`;

const BoxTopAudio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1em;
`;

const AudioPlayer = styled.audio`
  width: 15em;
  height: 2em;
  color: var(--icon-color);
  ::-webkit-media-controls-panel {
    background-color: var(--light-color);
  }
  ::-webkit-media-controls-timeline {
    display: none;
  }
`;

const BoxBottomDetail = styled(BoxBottom)`
  color: var(--icon-color);
  justify-content: space-between;
  /* justify-content: ${(props) =>
    props.userStatus ? 'space-between' : 'flex-end'}; */
`;

const BoxBottemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.3em;
`;

export {
  BoxPaperDetail,
  BoxTopAudio,
  AudioPlayer,
  BoxBottomDetail,
  BoxBottemLeft,
};

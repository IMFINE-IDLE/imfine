import styled, { css } from 'styled-components';
import { Btn } from '../../common/Btn/Btn';

const ProfileInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  margin-left: 1em;
`;

const ProfileNickNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5em;
  padding-bottom: 1em;
`;

const ProfileFollowBtn = styled.button`
  ${Btn}
  width: 6.25em;
  height: 2.5em;
  padding: 0;
  color: var(--default-font-color);
  font-weight: 700;
`;

const ProfileItemSpan = styled.span`
  ${({ pointer }) => css`
    padding-right: 0.5em;
    font-weight: 700;
    display: inline-block;
    cursor: ${pointer ? 'pointer' : 'default'};
  `}
`;

const ProfileInfoModifyBtn = styled.button`
  ${Btn}
  ${({ top }) => css`
    position: absolute;
    top: ${top || '30px'};
    right: 0;
    width: 8.5rem;
    padding: 0em;
    height: 2.5rem;
    background-color: var(--gray-color);
    color: var(--icon-color);
    z-index: 2;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
  `}
`;

export {
  ProfileInfoContainer,
  ProfileInfoWrapper,
  ProfileNickNameWrapper,
  ProfileFollowBtn,
  ProfileItemSpan,
  ProfileInfoModifyBtn,
};

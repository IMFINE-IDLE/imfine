import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import axios from 'axios';

import {
  ColumnDiv,
  BoxNoShadLeaves,
  TopDiv,
  TitleLabel,
  BottomDiv,
  Content,
  BtnUpdate,
} from './style';
import { FlexDiv } from '../../common/FlexDiv/FlexDiv';

// showButton true -> 팔로우 버튼 설정?
function NotificationItem({
  notificationId,
  title,
  msg,
  showButton,
  senderUid,
  navigateId,
  check,
}) {
  const navigate = useNavigate();
  const [followerID, setFollowerId] = useState('');
  // 읽음처리
  const readPost = async () => {
    try {
      await axios.post(api.notifications.readNotification(), {
        notificationId: notificationId,
      });
      console.log('test');
    } catch (error) {
      console.log('err, error');
    }
  };
  // POST 6번 & 비공개일때 팔로우 수락
  const allowFollower = async () => {
    try {
      await axios.post(api.follow.allowFollow(), {
        uid: senderUid,
      });
    } catch (error) {
      console.log('err', error);
    }
  };
  // DEL 6번 & 비공개일때 팔로우 거절
  const declineFollower = async () => {
    try {
      await axios.delete(api.follow.declineFollow(senderUid));
    } catch (error) {
      console.log('err', error);
    }
  };
  if (check) {
    return <></>;
  } else {
    // 일기장알림
    if (title === 1) {
      return (
        <>
          <div>
            <ColumnDiv>
              <BoxNoShadLeaves>
                <TopDiv>
                  <TitleLabel> 일기장 </TitleLabel>
                </TopDiv>
                <BottomDiv
                  onClick={() => {
                    readPost();
                    navigate(`/diary/${navigateId}`);
                  }}
                >
                  <Content>{msg}</Content>
                </BottomDiv>
              </BoxNoShadLeaves>
            </ColumnDiv>
          </div>
        </>
      );
    }
    // 일기 알림
    if (title === 2) {
      return (
        <>
          <div>
            <ColumnDiv>
              <BoxNoShadLeaves>
                <TopDiv>
                  <TitleLabel> 일기 </TitleLabel>
                </TopDiv>
                <BottomDiv
                  onClick={() => {
                    readPost();
                    navigate(`/diary/${navigateId}`);
                  }}
                >
                  <Content>{msg}</Content>
                </BottomDiv>
              </BoxNoShadLeaves>
            </ColumnDiv>
          </div>
        </>
      );
    }
    // 팔로우알림
    // 현재 로그인한 사용자가 공개유저일때
    if (title === 6 && !showButton) {
      return (
        <>
          <div>
            <ColumnDiv>
              <BoxNoShadLeaves>
                <TopDiv>
                  <TitleLabel> 팔로우신청 </TitleLabel>
                </TopDiv>
                <BottomDiv
                  onClick={() => {
                    readPost();
                    navigate(`/profile/${senderUid}`);
                  }}
                >
                  <Content>{msg}</Content>
                </BottomDiv>
              </BoxNoShadLeaves>
            </ColumnDiv>
          </div>
        </>
      );
    }
    // 현재 로그인한 사용자가 비공개유저일때
    if (title === 6 && showButton) {
      return (
        <>
          <div>
            <ColumnDiv>
              <BoxNoShadLeaves>
                <TopDiv>
                  <TitleLabel> 팔로우신청 </TitleLabel>
                </TopDiv>
                <BottomDiv>
                  <Content>{msg}</Content>
                </BottomDiv>
                <FlexDiv direction={'row'}>
                  <BtnUpdate
                    onClick={() => {
                      allowFollower();
                      readPost();
                      navigate(`/profile/${senderUid}`);
                    }}
                  >
                    {' '}
                    수락하기
                  </BtnUpdate>
                </FlexDiv>
              </BoxNoShadLeaves>
            </ColumnDiv>
          </div>
        </>
      );
    }
    // 대나무알림
    if (title === 4) {
      return (
        <>
          <div>
            <ColumnDiv>
              <BoxNoShadLeaves>
                <TopDiv>
                  <TitleLabel> 대나무 </TitleLabel>
                </TopDiv>
                <BottomDiv
                  onClick={() => {
                    readPost();
                    navigate(`/bamboo/${navigateId}`);
                  }}
                >
                  <Content>{msg}</Content>
                </BottomDiv>
              </BoxNoShadLeaves>
            </ColumnDiv>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <ColumnDiv>
              <BoxNoShadLeaves>
                <TopDiv>
                  <TitleLabel></TitleLabel>
                </TopDiv>
                <BottomDiv>
                  <Content>{msg}</Content>
                </BottomDiv>
              </BoxNoShadLeaves>
            </ColumnDiv>
          </div>
        </>
      );
    }
  }
}

export default NotificationItem;

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
} from './style';

// showButton true -> 팔로우 버튼 설정?
function NotificationItem({
  notificationId,
  title,
  msg,
  showButton,
  senderUid,
  navigateId,
}) {
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
  const navigate = useNavigate();

  console.log('아이디', navigateId);
  // 팔로우알림
  if (title == 6) {
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
  // 대나무알림
  if (title == 4) {
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

export default NotificationItem;

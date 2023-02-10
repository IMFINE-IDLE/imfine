import React, { useEffect, useState } from 'react';
import {
  ColumnDiv,
  BoxNoShadLeaves,
  TopDiv,
  TitleLabel,
  BottomDiv,
  Content,
} from './style';

// showButton true -> 팔로우 버튼 설정?
function NotificationItem({ title, msg, showButton }) {
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
              <BottomDiv>
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

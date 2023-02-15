/**
 * 게시글 시간 표시 함수
 */
export function getTimeDifference(createdAt) {
  let currentTime = new Date();
  let providedTime = new Date(createdAt);
  let milli = currentTime.getTime() - providedTime.getTime();
  let timeGap = parseInt(milli / 60000);
  // console.log(paperId, timeGap);
  if (timeGap < 1) {
    return '방금전';
  } else if (timeGap < 60) {
    return `${timeGap}분전`;
  } else if (timeGap >= 60 && timeGap < 60 * 24) {
    return `${parseInt(timeGap / 60)}시간전`;
  } else if (timeGap >= 60 * 24) {
    if (currentTime.getFullYear() - providedTime.getFullYear()) {
      return `${providedTime.getFullYear()}년 ${
        providedTime.getMonth() + 1
      }월 ${providedTime.getDate()}일`;
    } else {
      return `${providedTime.getMonth() + 1}월 ${providedTime.getDate()}일`;
    }
  }
}

/**
 * 일기 날짜 표시 함수
 */
export function getPaperDate(date) {
  let diaryTime = new Date(date);
  return `${diaryTime.getFullYear()}년 ${
    diaryTime.getMonth() + 1
  }월 ${diaryTime.getDate()}일`;
}

import { FlexDiv } from '../../common/FlexDiv/FlexDiv';
import DiaryItem from '../DiaryItem/DiaryItem';

const DiaryListGrid = ({ diaryList }) => {
  return (
    <FlexDiv wrap="wrap" gap="1.25em 5%" justify="space-between">
      {diaryList?.map((diary) => {
        const {
          diaryId,
          image,
          medicalName,
          name,
          paperCount,
          subscribeCount,
          title,
        } = diary;
        // 공개여부 추후 서버에서 받아오는 걸로 변경
        const open = false;

        return (
          <DiaryItem
            key={diaryId}
            diaryId={diaryId}
            image={image}
            medicalName={medicalName}
            name={name}
            paperCount={paperCount}
            subscribeCount={subscribeCount}
            title={title}
            open={open}
          />
        );
      })}
    </FlexDiv>
  );
};

export default DiaryListGrid;

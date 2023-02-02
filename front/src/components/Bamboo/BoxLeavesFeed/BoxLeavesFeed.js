import { BsHeartFill } from 'react-icons/bs';
import { RiChat3Line } from 'react-icons/ri';
import { BoxNoShadLeaves, ImgLeaves } from './style';

function BoxLeavesFeed({ leaves }) {
  const { content } = leaves;

  return (
    <div>
      <BoxNoShadLeaves>
        <ImgLeaves />
      </BoxNoShadLeaves>
    </div>
  );
}

export default BoxLeavesFeed;

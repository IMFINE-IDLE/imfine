import { BsHeartFill } from 'react-icons/bs';
import { RiChat3Line } from 'react-icons/ri';
import { BoxNoShadLeaves } from './style';

function BoxLeavesFeed({ Leaves }) {
  const { content } = Leaves;
  return (
    <div>
      <BoxNoShadLeaves></BoxNoShadLeaves>
    </div>
  );
}

export default BoxLeavesFeed;

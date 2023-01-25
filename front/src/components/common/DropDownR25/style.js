import styled from 'styled-components';

const StyledOptionItem = styled.li`
  box-sizing: border-box;
  padding: 0.8rem 1rem 0.8rem 1rem;
  transition: 0.3s;
  &:hover {
    background: ${darken(0.1, '#ffffff')};
  }
`;

const activeExist = ({ active = true }) => {
  return `max-height: ${active ? '300px' : '0'}`;
};

const StyledOptionList = styled.ul`
  box-sizing: border-box;
  position: absolute;
  top: 2.6rem;
  list-style-type: none;
  width: 100%;
  border-radius: 25px;
  background: #f8faf9;
  ${activeExist};
  transition: 0.2s ease-in-out;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background: ${darken(0.1, 'transparent')};
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const StyledSelectedLabel = styled.button`
  display: flex;
  align-items: center;
  border: none;
  box-sizing: border-box;
  width: inherit;
  height: inherit;
  justify-content: right;
  padding-right: 2.5rem;
  font-size: 1rem;
  background: url('assets/icons/chevron-down.png') calc(100% - 0.5rem) center
    no-repeat;
  background-size: 2rem;
  cursor: pointer;
`;

const StyledSelectbox = styled.div`
  position: relative;
  width: 8rem;
  height: 2.6rem;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
`;

export {
  StyledOptionItem,
  activeExist,
  StyledOptionList,
  StyledSelectedLabel,
  StyledSelectbox,
};

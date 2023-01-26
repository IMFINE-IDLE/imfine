import styled from 'styled-components';

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
    background: #ffffff};
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
`;

const StyledOptionItem = styled.li`
  border-radius: 25px;
  box-sizing: border-box;
  padding: 20px 20px 20px 0;
  transition: 0.3s;
  background-color: #f8faf9;
  &:hover {
    background: #f8faf9;
  }
`;

const StyledSelectedLabel = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 25px;
  box-sizing: border-box;
  width: inherit;
  height: inherit;
  justify-content: left;
  padding-left: 2.5rem;
  font-size: 16px;
  background-color: #f8faf9;
  background-size: 2rem;
  cursor: pointer;
`;

const Dropdown = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 1.5em;
`;

const StyledSelectbox = styled.div`
  position: relative;
  width: ${(props) => props.width || '1em'};
  height: 3rem;
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
  Dropdown,
};

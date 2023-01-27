import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

/* 사용법
- 부모 컴포넌트에서 useState 사용, props로 넘겨주기
const [value, setValue] = useState('');

- 여백margin값과 width 사이즈 아래와 같이 지정가능
- 예시
<TextareaGray
  width={'300px'}
  margin={'20px'}
  value={value}
  setValue={setValue}
></TextareaGray>
*/
const Textarea = styled.textarea`
  border: 0;
  background-color: #f8faf9;
  border-radius: 25px;
  outline: none;
  padding: 20px;
  width: ${(props) => props.width || '100%'};
  min-height: 100px;
  margin: ${(props) => props.margin || '0'};
  overflow: hidden;
  resize: none;
`;

function TextareaGray({ value, setValue, width, margin }) {
  const ref = useRef();
  const onChange = (event) => {
    const v = event.target.value;
    setValue(v);
  };

  useEffect(() => {
    ref.current.style.height = '0px';
    const scrollHeight = ref.current.scrollHeight;
    ref.current.style.height = scrollHeight + 'px';
  }, [value]);

  return (
    <Textarea
      width={width}
      margin={margin}
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextareaGray;

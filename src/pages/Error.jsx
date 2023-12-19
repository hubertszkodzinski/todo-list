import { useRouteError, Link } from 'react-router-dom';
import styled from 'styled-components';

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <Wrapper>
      <h5>Something went wrong...</h5>
    </Wrapper>
  );
}
export default Error;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h5 {
    font-size: 3rem;
  }
`;

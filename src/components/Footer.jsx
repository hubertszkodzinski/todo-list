import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  return (
    <Wrapper>
      <ul>
        <Link to='/about'>About</Link>
      </ul>
    </Wrapper>
  );
}
export default Footer;

const Wrapper = styled.footer`
  width: 100%;
  padding: 3rem 6rem;
  background: var(--bg-about-border);
  background: var(--bg-about-border-gradient);
  color: var(--font-color-light);

  ul {
    display: flex;
    justify-content: end;

    @media (min-width: 768px) {
      margin: 0 auto;
      max-width: var(--width-max-lg);
    }

    a {
      font-size: 1.6rem;
      letter-spacing: 0.2rem;
      text-transform: uppercase;
      text-shadow: 0.2rem 0.2rem 0.4rem black;
    }
  }
`;

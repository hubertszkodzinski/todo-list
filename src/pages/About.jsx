import { Link } from 'react-router-dom';
import styled from 'styled-components';

function About() {
  return (
    <>
      <Wrapper>
        <div className='about-container-border'>
          <div className='about-container'>
            <h2>About</h2>
            <p>
              This is the page where the user can create their todo list.
              Nothing more, nothing less.
            </p>
          </div>
        </div>
        <Link to='/'>
          <span>Back Home</span>
        </Link>
      </Wrapper>
    </>
  );
}
export default About;

const Wrapper = styled.div`
  min-height: var(--height-min-full);
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .about-container-border {
    background: var(--bg-about-border);
    background: var(--bg-about-border-gradient);
    padding: 0.7rem;
    border-radius: 6rem;
    margin-bottom: 5rem;

    .about-container {
      padding: 1.5rem 1rem;
      border-radius: 5rem;
      background: var(--bg-about-container);
      color: var(--font-color);

      h2 {
        padding: 1rem;
        font-size: 3rem;
        text-align: center;
      }

      p {
        margin: 2rem;
        font-size: 2rem;
        text-align: justify;
        font-weight: lighter;
        letter-spacing: 0.1rem;
      }
    }
  }

  a {
    background: var(--bg-about-border);
    background: var(--bg-about-border-gradient);
    padding: 0.5rem;
    border-radius: 1rem;
    color: var(--font-color);
    font-size: 2rem;
    text-align: center;
    line-height: 4rem;
    border-radius: 3rem;
    transition: 0.3s;

    span {
      background-color: var(--bg-about-container);
      padding: 1rem 2rem;
      border-radius: 3rem;
      transition: 0.3s;
    }
  }

  a:hover {
    transform: scale(1.1);
    box-shadow: 0 1rem 4rem #4d4d4d;

    span:hover {
      background: transparent;
      color: var(--font-color-light);
    }
  }
`;

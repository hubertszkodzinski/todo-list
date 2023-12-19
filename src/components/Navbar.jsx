import styled from 'styled-components';
import { FaListCheck, FaMoon } from 'react-icons/fa6';
import { MdOutlineWbSunny } from 'react-icons/md';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../features/context';
import { ACTIONS } from '../features/actions';

function Navbar() {
  const { dispatch, todoState } = useContext(AppContext);
  // const [theme, setTheme] = useState(themeFromLocalStorage);
  const htmlElement = document.querySelector('html');

  return (
    <Wrapper>
      <div className='navbar-container'>
        <Link to='/'>
          <div className='logo'>
            <FaListCheck className='logo-icon' />
            <h1 className='logo-text'>Todo List</h1>
          </div>
        </Link>
        <div className='theme-container'>
          <button
            type='button'
            className='themeIcon'
            onClick={() => {
              if (todoState.theme === 'dark') {
                if (htmlElement.classList.contains('dark-mode')) {
                  // setTheme('light');
                  dispatch({ type: ACTIONS.SET_LIGHT_THEME });
                  htmlElement.classList.remove('dark-mode');
                  localStorage.removeItem('theme-my-lists');
                }
              } else {
                // setTheme('dark');
                dispatch({ type: ACTIONS.SET_DARK_THEME });
                htmlElement.classList.add('dark-mode');
                localStorage.setItem('theme-my-lists', 'dark');
              }
            }}
          >
            {todoState.theme === 'dark' ? <MdOutlineWbSunny /> : <FaMoon />}
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
export default Navbar;

const Wrapper = styled.nav`
  width: 100%;
  padding: 2.5rem 5rem;
  background: var(--bg-about-border);
  background: var(--bg-about-border-gradient);
  color: var(--font-color-light);

  .navbar-container {
    display: flex;
    justify-content: space-between;

    @media (min-width: 768px) {
      margin: 0 auto;
      max-width: var(--width-max-lg);
    }

    @media (min-width: 1200px) {
      margin: 0 auto;
      max-width: var(--width-max-lg);
    }

    .logo {
      display: flex;

      .logo-icon {
        font-size: 4rem;
        margin-right: 2rem;
      }

      .logo-text {
        user-select: none;
        font-size: 2rem;
        line-height: 4rem;
        letter-spacing: 0.4rem;
        text-shadow: 0.2rem 0.2rem 0.4rem black;
      }
    }

    .theme-container {
      display: flex;
      align-items: center;
      justify-content: end;

      .themeIcon {
        font-size: 2rem;
        background: none;
        border: none;
        color: var(--font-color-light);
        cursor: pointer;
      }
    }
  }
`;

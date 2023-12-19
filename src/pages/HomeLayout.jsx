import styled from 'styled-components';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import { AppContext } from '../features/context';
import { ACTIONS } from '../features/actions';

const url = 'http://localhost:3000/todo-list';

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme-my-lists') || 'light';
  const htmlElement = document.querySelector('html');

  if (theme === 'dark') {
    if (!htmlElement.classList.contains('dark-mode')) {
      htmlElement.classList.add('dark-mode');
    }
  } else {
    if (htmlElement.classList.contains('dark-mode')) {
      htmlElement.classList.remove('dark-mode');
    }
  }
  return theme;
};

const fetchTodoList = () => {
  return {
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
  };
};

export const loader = queryClient => {
  return async loaderObj => {
    const theme = getThemeFromLocalStorage();

    const dataFromDB = await queryClient.ensureQueryData(fetchTodoList());
    const data = dataFromDB.length > 0 ? dataFromDB : [];

    return { themeFromLocalStorage: theme, data };
  };
};

function HomeLayout() {
  const { themeFromLocalStorage, data } = useLoaderData();
  const { dispatch, todoState } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_THEME_FROM_LOCALSTORAGE,
      payload: themeFromLocalStorage,
    });
    dispatch({ type: ACTIONS.SET_TODO_LIST_FROM_DB, payload: data });
  }, []);

  const navigation = useNavigation();
  let isLoading = navigation.state === 'loading';
  // isLoading = true;
  // console.log(isLoading);

  return (
    <Wrapper>
      <Navbar />
      {isLoading ? (
        <div className='spinner-container'>
          <div className='spinner'>
            <div className='spinner2'></div>
          </div>
        </div>
      ) : (
        <div className='page'>{<Outlet />}</div>
      )}
      <Footer />
    </Wrapper>
  );
}
export default HomeLayout;

const Wrapper = styled.div`
  .page {
    width: var(--width-default);
    min-height: var(--height-min-full);
    margin: 0 auto;
    padding: 4rem 1rem;

    @media (min-width: 768px) {
      max-width: var(--width-max-sm);
    }

    @media (min-width: 1200px) {
      max-width: var(--width-max-lg);
    }
  }
`;

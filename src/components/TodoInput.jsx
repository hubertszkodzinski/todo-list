import { useState, useContext } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { AppContext } from '../features/context';
import { ACTIONS } from '../features/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { nanoid } from 'nanoid';

function TodoInput() {
  const [inputState, setInputState] = useState('');
  const { todoState, dispatch } = useContext(AppContext);

  const url = 'http://localhost:3000/todo-list';

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async text => {
      const newTodo = {
        id: nanoid(),
        text: text,
        createdAt: new Date(),
        isDone: false,
      };
      const data = JSON.stringify(newTodo);
      await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: ACTIONS.ADD, payload: newTodo });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleClick = e => {
    if (!inputState.trim()) {
      toast.error('You need to add text!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${todoState.theme === 'light' ? 'light' : 'dark'}`,
        bodyStyle: {
          fontSize: '1.5rem',
        },
      });
      return;
    }

    // adding todo to todoState.todoList
    // sending data to db and refetch
    mutate(inputState);

    toast.success('Todo added!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${todoState.theme === 'light' ? 'light' : 'dark'}`,
      bodyStyle: {
        fontSize: '1.5rem',
      },
    });

    setInputState('');
  };

  return (
    <Wrapper>
      <h4>Add a todo</h4>
      <div className='input-container'>
        <input
          type='search'
          value={inputState}
          onChange={e => setInputState(e.target.value)}
        />
        <button type='button' onClick={handleClick}>
          add me
        </button>
      </div>
    </Wrapper>
  );
}
export default TodoInput;

const Wrapper = styled.div`
  min-height: 10rem;
  width: 100%;
  padding: 2rem;
  padding-bottom: 3rem;
  margin: 0 auto 2rem;
  border-radius: 8px;
  background: var(--bg-about-border);
  background: var(--bg-about-border-gradient);
  color: var(--font-color-light);
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    max-width: var(--width-max-sm);
  }

  h4 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .input-container {
    display: flex;

    input {
      flex-grow: 1;
      border-color: transparent;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      padding: 0.5rem 1rem;
      outline: none;
    }

    input:focus {
      border: 2px solid black;
    }

    button {
      height: 3rem;
      padding: 0 1rem;
      border-color: transparent;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      cursor: pointer;
      text-transform: capitalize;
      font-weight: bold;
    }

    button:active {
      background: var(--font-gradient);
      color: var(--font-color);
    }
  }
`;

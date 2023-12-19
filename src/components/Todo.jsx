import { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { IoTrashBin, IoTime } from 'react-icons/io5';
import { FaEdit, FaCalendarAlt } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import { AppContext } from '../features/context';
import { ACTIONS } from '../features/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function Todo({ id, text, createdAt, isDone, index, modalRef }) {
  const url = 'http://localhost:3000/todo-list';
  const { dispatch, todoState } = useContext(AppContext);
  const queryClient = useQueryClient();

  const date = new Date(createdAt);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const bodyElement = document.querySelector('body');

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async id => {
      await axios.delete(`${url}/${id}`);
      dispatch({ type: ACTIONS.REMOVE, payload: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const { mutate: mutateDone } = useMutation({
    mutationFn: async ({ id, text, createdAt, isDone }) => {
      const editedTodo = {
        text,
        createdAt,
        isDone: !isDone,
      };
      await axios.patch(`${url}/${id}`, editedTodo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleRemove = () => {
    try {
      mutateDelete(id);

      // toast success
      toast.success('Todo has been deleted!', {
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

      // log result
      console.log(`todo: ${text}, has been deleted, id: ${id}`);
    } catch (error) {
      // toast error
      toast.error('Todo cannot be deleted!', {
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
      // log error
      console.log(`todo: ${text}, has cannot be deleted, id: ${id}`);
    }
  };

  const handleEdit = () => {
    modalRef.editedTodo = { id, text, createdAt, isDone };
    modalRef.current.classList.add('modal-show');
    bodyElement.classList.add('hide-scroll');
  };

  const handleDone = () => {
    try {
      if (isDone) {
        dispatch({ type: ACTIONS.NOT_DONE, payload: id });
        // toast success
        toast.success('Todo has been uncompleted!', {
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
      } else {
        dispatch({ type: ACTIONS.DONE, payload: id });
        // toast success
        toast.success('Todo has been completed!', {
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
      }

      mutateDone({ id, text, createdAt, isDone });

      // log result
      console.log(`todo: ${text}, done property is changed, id: ${id}`);
    } catch (error) {
      // toast error
      toast.error('Todo cannot be changed!', {
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
      // log error
      console.log(`todo: ${text}, cannot change done property, id: ${id}`);
    }
  };

  return (
    <Wrapper className={`todo-container ${isDone ? 'todo-done' : ''}`}>
      <div className={`todo-container ${isDone ? 'todo-done' : ''}`}>
        <div className='todo-info'>
          <span>
            {index + 1} <IoTime className='todo-info-icon' />
            {hour.toString().length > 1 ? `${hour}` : `0${hour}`}:
            {minute.toString().length > 1 ? `${minute}` : `0${minute}`}
            <FaCalendarAlt className='todo-info-icon' />
            {day}.{month + 1}.{year}
          </span>
          <p>{text}</p>
        </div>
        <div className='todo-icons'>
          <div className='button-container'>
            <button
              type='button'
              onClick={() => {
                handleRemove();
              }}
            >
              <IoTrashBin />
            </button>
            <button
              type='button'
              onClick={() => {
                handleEdit();
              }}
            >
              <FaEdit />
            </button>
            <button
              type='button'
              onClick={() => {
                handleDone();
              }}
            >
              <MdDone />
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default Todo;

const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem 0.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  background: var(--bg-todo-border);
  background: var(--bg-todo-border-gradient);
  font-size: 1.4rem;
  box-shadow: 0 0 1rem black;

  .todo-container {
    border-radius: 8px;
    background: var(--bg-todo);
    display: grid;
    grid-template-columns: 80% 20%;

    .todo-info {
      margin-right: 2rem;
      padding: 1rem;

      span {
        display: block;
        margin-bottom: 1rem;
        font-size: 1.5rem;
        font-weight: bold;

        .todo-info-icon {
          margin-left: 0.5rem;
          margin-right: 0.2rem;
          font-size: 1.2rem;

          @media (min-width: 360px) {
            margin-left: 1.3rem;
            margin-right: 0.2rem;
            font-size: 1.5rem;
          }

          @media (min-width: 400px) {
            margin-left: 2rem;
            margin-right: 0.3rem;
            font-size: 1.7rem;
          }
        }
      }
    }

    .todo-icons {
      .button-container {
        height: 100%;
        display: grid;
        row-gap: 0.4rem;

        button {
          width: 100%;
          min-height: 4rem;
          background: var(--bg-todo-border);
          background: var(--bg-todo-border-gradient);
          border: transparent;
          cursor: pointer;
          color: var(--font-color-light);
          font-size: 2rem;
        }

        button:nth-child(1) {
          border-bottom-left-radius: 10px;
        }
        button:nth-child(2) {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        button:nth-child(3) {
          border-top-left-radius: 10px;
        }

        button:active {
          background: var(--bg-todo-gradient);
          /* color: var(--font-gradient); */
          color: var(--font-color);
        }
      }
    }
  }
`;

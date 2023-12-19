import styled from 'styled-components';
import Todo from './Todo';
import { useContext, useState, useRef } from 'react';
import { AppContext } from '../features/context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ACTIONS } from '../features/actions';

function TodoList() {
  const url = 'http://localhost:3000/todo-list';
  const { todoState, dispatch } = useContext(AppContext);
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const [editInput, setEditInput] = useState('');

  const bodyElement = document.querySelector('body');

  const { mutate: mutateEdit } = useMutation({
    mutationFn: async ({ id, text, createdAt, isDone }) => {
      const editedTodo = JSON.stringify({
        text,
        createdAt,
        isDone,
      });
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

  return (
    <Wrapper>
      <ModalContainer ref={modalRef}>
        <div className='modal-container'>
          <form>
            <label htmlFor='editInput'>Edit your Todo</label>
            <input
              type='text'
              id='editInput'
              value={editInput}
              onChange={e => setEditInput(e.target.value)}
            />
            <div className='modal__button-container'>
              <button
                onClick={e => {
                  e.preventDefault();
                  const { id, text, isDone } = modalRef.editedTodo;

                  const newCreatedAt = new Date();

                  dispatch({
                    type: ACTIONS.EDIT,
                    payload: {
                      id,
                      text: editInput,
                      createdAt: newCreatedAt,
                      isDone,
                    },
                  });

                  mutateEdit({
                    id,
                    text: editInput,
                    createdAt: newCreatedAt,
                    isDone,
                  });

                  console.log(
                    `todo: ${text}, has been edited, new text: ${editInput}, id: ${id}`
                  );

                  setEditInput('');

                  if (modalRef.current.classList.contains('modal-show')) {
                    modalRef.current.classList.remove('modal-show');
                  }
                  if (bodyElement.classList.contains('hide-scroll')) {
                    bodyElement.classList.remove('hide-scroll');
                  }
                }}
              >
                Edit
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  console.log('cancel');
                  setEditInput('');
                  if (modalRef.current.classList.contains('modal-show')) {
                    modalRef.current.classList.remove('modal-show');
                  }
                  if (bodyElement.classList.contains('hide-scroll')) {
                    bodyElement.classList.remove('hide-scroll');
                  }
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </ModalContainer>
      {todoState.todoList.length < 1 ? (
        <h2>There is no todos...</h2>
      ) : (
        todoState.todoList.map((item, index) => {
          return (
            <Todo key={item.id} {...item} index={index} modalRef={modalRef} />
          );
        })
      )}
    </Wrapper>
  );
}
export default TodoList;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalContainer = styled.div`
  display: none;
  width: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  backdrop-filter: blur(3rem);

  .modal-container {
    padding: 1rem;
    width: var(--width-default);
    border-radius: 2rem;
    background: var(--bg-about-border);
    background: var(--bg-about-border-gradient);

    @media (min-width: 768px) {
      width: var(--width-max-sm);
    }

    form {
      margin: 0 auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      background: var(--bg-color-main);
      border-radius: 2rem;

      label {
        padding: 1rem 2rem;
        font-size: 2rem;
        letter-spacing: 0.1rem;
        text-align: center;
        line-height: 3rem;
      }

      input {
        padding: 0.5rem 1rem;
        margin: 0.5rem 0;
        line-height: 2rem;
        border-radius: 2rem;
        border: none;
        box-shadow: 0 0 0.4rem black;
      }

      input:focus {
        outline: 0.1rem black solid;
      }

      .modal__button-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: 0.5rem;

        button {
          padding: 0.5rem 0;
          margin: 0.5rem 0;
          min-width: 5rem;
          font-size: 2rem;
          border: none;
          border-radius: 2rem;
          background: var(--bg-about-border);
          background: var(--bg-about-border-gradient);
          color: var(--font-color-light);
          transition: 0.3s;
        }

        button:active {
          background: var(--bg-color-main);
          color: var(--bg-about-border);
          color: var(--bg-about-border-gradient);
          box-shadow: 0 0 0.4rem black;
        }
      }
    }
  }
`;

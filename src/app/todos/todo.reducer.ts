import { createReducer, on, Action, State } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Salvar el Universo'),
  new Todo('Salvar a Venus'),
  new Todo('Salvar a Marte'),
  new Todo('Salvar a Pluton'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(actions.crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(actions.borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(actions.limpiarCompletados, (state) =>
    state.filter((todo) => !todo.completado)
  ),
  on(actions.toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(actions.editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(actions.toggleAll, (state, { completado }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado,
      };
    });
  })
);

export function todoReducer(state, action: Action) {
  return _todoReducer(state, action);
}

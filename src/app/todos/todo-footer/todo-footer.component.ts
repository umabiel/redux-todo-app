import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reduces';
import { filtrosValidos, setFiltro } from 'src/app/filtro/filtro.actions';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit {
  pendientes = 0;

  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('filtro').subscribe((filtro) => {
    //   this.filtroActual = filtro;
    // });

    this.store.subscribe((state) => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter((todo) => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: filtrosValidos) {
    this.store.dispatch(setFiltro({ filtro }));
  }

  limpiarTodos() {
    this.store.dispatch(limpiarCompletados());
  }
}

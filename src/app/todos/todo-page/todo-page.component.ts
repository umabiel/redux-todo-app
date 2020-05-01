import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reduces';
import { Store } from '@ngrx/store';
import { toggleAll } from '../todo.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  completado = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  toggleAll() {
    this.completado = !this.completado;
    this.store.dispatch(toggleAll({ completado: this.completado }));
  }
}

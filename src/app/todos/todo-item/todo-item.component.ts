import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reduces';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('inputFisico') inputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, [Validators.required]);

    this.chkCompletado.valueChanges.subscribe((valor) => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });
  }

  editar() {
    this.editando = true;

    this.txtInput.setValue(this.todo.texto);

    setTimeout(() => {
      this.inputFisico.nativeElement.select();
    }, 1);
  }

  borrar() {
    if (confirm('Borrar?')) {
      this.store.dispatch(actions.borrar({ id: this.todo.id }));
    }
    return;
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }
    if (this.txtInput.value === this.todo.texto) {
      return;
    }

    this.store.dispatch(
      actions.editar({ id: this.todo.id, texto: this.txtInput.value })
    );
  }
}

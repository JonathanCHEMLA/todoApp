import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {Task} from "../../models/task";

/*
  Generated class for the TasksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksProvider {

  constructor(public storage: Storage) {
    console.log('Hello TasksProvider Provider');
  }

  /* si Task[] apparait en rouge et ne disparait pas en faisant alt+entrée, alors recommencer a tapper Task en le choisis-
    sant dans la liste proposée par WebStorm*/
  saveTasks(tasks:Task[]) {
    this.storage.set('tasks',tasks);
  }

  getTasks() {
    return this.storage.get('tasks');
  }


}

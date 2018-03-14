import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {Task} from "../../models/task";
import {TasksProvider} from "../../providers/tasks/tasks";
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  ngOnInit(): void {

    this.taskProvider.getTasks().then(
      tasks => {
        if(tasks !== null) {
          this.taches = tasks;
        }

      }
    )
  }

  constructor(public navCtrl: NavController, private taskProvider: TasksProvider) {}

task:Task = new Task();
  // on a créé cette ligne de tache (qui est vide) afin de pouvoir transporter notre tache du input
active: boolean = true;

  taches: Task[] = [];    /*j ai fais l'erreur de le mettre dans le constructeur.*/

  // 13 c 'est la touche "enter"
  enterSave(keyCode) {
    if(keyCode === 13) {
      this.saveTask();
      // l'user ne peut pas ajouter sa tache en cliquant sur le +
    }
  }


  saveDoneTasks() {
    this.taskProvider.saveTasks(this.taches); //Toutes mes taches sont sauvegardees dans mon provider, c a d mon storage
  }

  saveTask() {
    console.log(this.task);
    if(this.task.titre !== undefined) { // si le champ n'est pas rempli
      this.taches.push(this.task);  //sauvegarde
      this.taskProvider.saveTasks(this.taches); // taches qui est declare dans notre page
    }
    this.task= new Task();    //creation d une nlle tache
    this.active= false;
    setTimeout(()=> this.active= true, 0) ; // reinitialisation du formulaire
  }



  deleteTask(task) {
    _.pullAllWith(this.taches, [task], _.isEqual);
    this.taskProvider.saveTasks(this.taches);
  }
}

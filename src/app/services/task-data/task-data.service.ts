import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Task from '../../models/task';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};
// httpOptions.headers =  httpOptions.headers.set('Authorization', 'my-new-auth-token');

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  taskList: Task[];

  constructor(private http: HttpClient, private modalService: NgbModal) {   }
  // URL = "http://localhost:52389/api/task"
 
  async fetchTaskListByDate(date: string) {
    const TaskModel: any = Task;
    try {
      return await TaskModel.fetchOwnList({ dateCreated : date});
    } catch(e) {
      this.showErrorModal(e, 'Failed to get tasks.')
    }
  }
  async fetchAllTasks() {
    const TaskModel: any = Task;
    try {
      return await TaskModel.fetchOwnList();
    } catch(e) {
      this.showErrorModal(e, 'Failed to get tasks.')
    }
  }
  async fetchTaskListUnDone(date: string) {
    try {
      const taskList = await this.fetchTaskListByDate(date);
      return await this.countUndone(taskList);
    } catch(e) {
      this.showErrorModal(e, 'Failed to get tasks.')
    }
  }
  countUndone(taskList) {
    let taskUndone = 0;
    if (taskList !== undefined) {
      for (const task of taskList) {
        if (!task.attrs.isDone) {
          taskUndone += 1;
        }
      }
    }
    return taskUndone;
  }

  async addNewTask(task) {
    const TaskModel: any = Task;
    const newTask = new TaskModel({
      dateCreated : task.PostedDate,
      doneBy: task.DoneBy,
      isDone : false,
      name: task.TaskName,
      description: ''
    });
    try {
      await newTask.save();      
    } catch(e) {
      this.showErrorModal(e,'Failed to add new task.')
    }
  }

  async deleteTask(task) {
    try {
      await task.destroy();
    } catch (e) {
      this.showErrorModal(e,'Failed to delete task.')
    }
  }
  async checkTaskDone(task) {
    task.update({
      isDone : !task.attrs.isDone
    });
    try {
      await task.save();
    } catch (e) {
      this.showErrorModal(e,'Failed to check task.')
    }
  }

  async editTask(task)  {
    task.update({
      name : task.attrs.name
    });
    try {
      await task.save();
    } catch (e) {
      this.showErrorModal(e,'Failed to update task name.')
    }
  }
  showErrorModal(e, message){
    if (document.getElementsByClassName('modal').length === 1 ) {
      let modal = this.modalService.open(ErrorModalComponent, {windowClass : 'error-modal'});
      modal.componentInstance.error = message;
    }
    // console.log("modal length "+document.getElementsByClassName('modal').length)
    console.error(`${message} : ${e.message}`);

  }
}

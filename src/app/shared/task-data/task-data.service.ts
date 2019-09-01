import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Task from '../../models/task';
import { HttpHeaders } from '@angular/common/http';
import { getConfig } from 'radiks';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from 'src/app/errormodal/errormodal.component';

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
      console.log('fetching task list');
      return await TaskModel.fetchOwnList({ dateCreated : date});
    } catch(e) {
      let modal = this.modalService.open(ErrorModalComponent);
      modal.componentInstance.error = e.message;
      console.error("Failed to fetch task list "+e.message)
    }
  }

  async fetchTaskListUnDone(date: string) {
    try {
      const taskList = await this.fetchTaskListByDate(date);
      return await this.countUndone(taskList);
    } catch(e) {
      console.error("Failed to fetch task list "+e.message)
    }
  }
  countUndone(taskList) {
    let taskUndone = 0;
    for (const task of taskList) {
      if (!task.attrs.isDone) {
        taskUndone += 1;
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
    await newTask.save();
  }

  async deleteTask(task) {
    try {
      await task.destroy();
    } catch (e) {
      console.error('cannot delete task ' + e.message);
    }
  }
  async checkTaskDone(task) {
    task.update({
      isDone : !task.attrs.isDone
    });
    try {
      await task.save();
    } catch (e) {
      console.error('cannot update task ' + e.message);
    }
  }

  async editTask(task)  {
    task.update({
      name : task.attrs.name
    });
    try {
      await task.save();
    } catch (e) {
      console.error('cannot update task name ' + e.message);
    }
  }
}

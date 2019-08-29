import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  Task  from '../../models/task';
import { HttpHeaders } from '@angular/common/http';
import { getConfig } from 'radiks';

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
  taskList : Task[]
  constructor(private http: HttpClient) {   }
  // URL = "http://localhost:52389/api/task"

  async fetchTaskListByDate(date : String) {
    let TaskModel : any = Task
    console.log("fetching task list")

    return await TaskModel.fetchOwnList({ dateCreated : date})
  }

  async fetchTaskListUnDone(date : String) {
    let taskList = await this.fetchTaskListByDate(date);
    return await this.countUndone(taskList);
  }
  countUndone(taskList) {
    let taskUndone = 0
    for (let task of taskList) {
      if (!task.attrs.isDone) {
        taskUndone+=1
      }
    }
    return taskUndone;
  }

  async addNewTask(task) {
    let TaskModel : any = Task
    const newTask = new TaskModel({
      dateCreated : task.PostedDate,
      doneBy: task.DoneBy,
      isDone :false,
      name: task.TaskName,
      description: ""
    })
    await newTask.save()
  }

  async deleteTask(task) {
    try {
      await task.destroy();
    } catch (e) {
      console.error("cannot delete task "+e.message)
    }
  }
  async checkTaskDone(task) {
    task.update({
      isDone : !task.attrs.isDone
    })
    try {
      await task.save()
    } catch(e) {
      console.error("cannot update task "+e.message)
    }
  }
  
  async editTask(task)  {
    task.update({
      name : task.attrs.name
    })
    try {
      await task.save()
    } catch(e) {
      console.error("cannot update task name "+e.message)
    }
  }
}

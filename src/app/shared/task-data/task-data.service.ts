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
    let TaskModel : any = Task
    return await TaskModel.fetchOwnList({ dateCreated : date, isDone: false})
  }

  async addNewTask(task) {
    let TaskModel : any = Task
    // console.log(`${task.TaskName} ${task.TaskID} ${task.DoneBy} ${task.IsDone} ${task.PostedDate}`);

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
    // return this.http.put(this.URL+'/'+id+'?postedDate='+posteddate, task, httpOptions)
    task.update({
      isDone : !task.attrs.isDone
    })
    try {
      await task.save()
    } catch(e) {
      console.error("cannot update task "+e.message)
    }

  }
  
  
}

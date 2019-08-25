import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../task';
import { Observable } from 'rxjs'
// import 'rxjs/add/operator/map'
// import { ThrowStmt } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';

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
  URL = "http://localhost:52389/api/task"
  getTasks() {
    return this.taskList;

  }
  addTask(task : Task) {
    this.taskList.push(task);
  }
  getTaskList() {
    return this.http.get(this.URL, httpOptions)
  }
  getTaskListByDate(date : String) {
    return this.http.get(this.URL+'?posteddate='+date, httpOptions)
  }
  postNewTask(newTask : Task) {
    console.log(`${newTask.TaskName} ${newTask.TaskID} ${newTask.DoneBy} ${newTask.IsDone} ${newTask.PostedDate}`);
    
    return this.http.post(this.URL, newTask, httpOptions)
  } 
  deleteTask(id : number, posteddate : String) {
    return this.http.delete(this.URL+'/'+id+'?postedDate='+posteddate, httpOptions)
  }
  checkTaskDone(id : number, posteddate : String, task : Task) {
    return this.http.put(this.URL+'/'+id+'?postedDate='+posteddate, task, httpOptions)

  }
}

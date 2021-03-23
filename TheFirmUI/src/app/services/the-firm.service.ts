import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, catchError, tap } from 'rxjs/operators';
import { EmployeeModel } from 'src/models/employeeModel';

const endpoint = 'https://localhost:44388/api/';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class TheFirmService {

  constructor(private httpClient: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getJobTitles(): Observable<any> {
    return this.httpClient.get(endpoint + "JobTitle").pipe(map(this.extractData));
  }
 
  getEmployees(): Observable<EmployeeModel[]>{
    return this.httpClient.get(endpoint + "Employee").pipe(
      map((data:any[]) => data.map((item:any)=> {
        const model = new EmployeeModel();
        Object.assign(model,item);
        return model;
      })));
  }

  updateEmployees(employees: EmployeeModel[]){
    return this.httpClient.put(endpoint + "Employee", employees).subscribe((result)=>{
      var tempResult = result;
    })
  }

  getActiveEmployees(): Observable<EmployeeModel[]> {
    return this.httpClient.get(endpoint + "Employee").pipe(
      map((data:any[]) => data.map((item:any)=> {
        const model = new EmployeeModel();
        Object.assign(model,item);
        return model;
      }).filter(item=>item.isActive===true)))
  };

  getInactiveEmployees(): Observable<EmployeeModel[]> {
    return this.httpClient.get(endpoint + "Employee").pipe(
      map((data:any[]) => data.map((item:any)=> {
        const model = new EmployeeModel();
        Object.assign(model,item);
        return model;
      }).filter(item=>item.isActive===false)))
  };

  createEmployee(newEmp: EmployeeModel) {
    return this.httpClient.post(endpoint+ "Employee", newEmp).subscribe((result)=>{
      var tempResult = result;
    });
  }
}

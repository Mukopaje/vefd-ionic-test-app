import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  base_url = 'https://server.zpos.co.zm:3043/';
  base_nest_url = 'https://server.zpos.co.zm:7000/';
  base_migrations_url = 'https://server.zpos.co.zm:7001/';
  // base_url_mail = 'http://server.zpos.co.zm:3060/';
  database = "on_zpos$mukopajesingogo(40)gmail(2e)com";

  constructor(public http: HttpClient) { }

  /**
   * 
   * @param type 
   * @param taxDetails 
   * @returns 
   */
  async getTaxDetails(type: string, taxDetails: any) {
    try {
     // const myDb = await this.storage.get('conn_obj');
     // const userDb = myDb.split('/').slice(3).join('/')


      if (type === "tax0") {
        const body = JSON.stringify({
          email: this.database,
          type: 'tax0',
          taxDetails: taxDetails
        });
        return this.http.post(this.base_nest_url + 'migration', body, httpOptions).pipe(
          //return this.http.post('http://localhost:7000/migration', body, httpOptions).pipe(
        ).toPromise()
          .then(res => {
            console.log(res);
            return res;
          })
          .catch(err => {
            return Promise.reject(err.error || 'Server error');
          });
      } else if (type === "tax1") {
        const body = JSON.stringify({
          email: this.database,
          type: 'tax1',
          taxDetails: taxDetails
        });
        return this.http.post(this.base_nest_url + 'migration', body, httpOptions).pipe(
          // return this.http.post('http://localhost:7000/migration', body, httpOptions).pipe(

        ).toPromise()
          .then(res => {
            console.log('Success 1422');
            console.log(res);
            return res;
          })
          .catch(err => {
            console.log('There was an error 772');
            return Promise.reject(err.error || 'Server error');
          });
      }
    } catch (error) {
      console.log('There was an error 773');
      console.log(error);
    }

  }

  async saveTaxDetails(type: string, taxDetails: any) {
    try {
     // const myDb = await this.storage.get('conn_obj');
     // const userDb = myDb.split('/').slice(3).join('/')


      if (type === "tax2") {
        const body = JSON.stringify({
          email: this.database,
          type: 'tax2',
          taxDetails: taxDetails
        });
        return this.http.post(this.base_nest_url + 'migration', body, httpOptions).pipe(
          //return this.http.post('http://localhost:7000/migration', body, httpOptions).pipe(

        ).toPromise()
          .then(res => {
            console.log(res);
            return res;
          })
          .catch(err => {
            return Promise.reject(err.error || 'Server error');
          });
      } else if (type === "tax3") {
        const body = JSON.stringify({
          email: this.database,
          type: 'tax3',
          taxDetails: taxDetails
        });
        return this.http.post(this.base_nest_url + 'migration', body, httpOptions).pipe(
          // return this.http.post('http://localhost:7000/migration', body, httpOptions).pipe(

        ).toPromise()
          .then(res => {
            console.log(res);
            return res;
          })
          .catch(err => {
            return Promise.reject(err.error || 'Server error');
          });
      }
    } catch (error) {
      console.log(error);
    }

  }

}

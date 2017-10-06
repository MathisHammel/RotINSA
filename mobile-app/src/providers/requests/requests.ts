import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ToastController }    from "ionic-angular";

/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestsProvider {

  private onlineRootEndpoint: string = "http://kara71.github.io/RotINSA/";

  constructor(public http: Http,
    private toastCtrl: ToastController) {
  }

  getLocal(route: string, params: any = {}) : any {
    return this.http.get("assets/"+route, params)
      .map((res: Response) => {	return this.extractData(res); })
      .catch((error: any) => {	return this.handleError(error); });
  }

  getOnline(route: string, params: any = {}) : any {
    return this.http.get(this.onlineRootEndpoint + route)
      .map((res: Response) => {	return this.extractData(res); })
      .catch((error: any) => {	return this.handleError(error); });
  }

  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      if(error.status == 500) {
        let at = this.toastCtrl.create({
          message: "Service innaccessible :/",
          duration: 2500,
          position: "top"
        });
        at.present();
      } else {
        const body = error.json() || {};
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        let at = this.toastCtrl.create({
          message: "Pas trouvé :/ " + errMsg,
          duration: 4000,
          position: "top"
        });
        at.present();
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
      let at = this.toastCtrl.create({
        message: "Pas trouvé :/ (not error instance)" + errMsg,
        duration: 4000,
        position: "top"
      });
      at.present();
    }
    console.error(errMsg);


    return Observable.throw(error);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/demo/default/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Get Data
  private GetChangeOrderDetails = 'http://localhost/xampp/GetChangeOrderDetails.php'
  private clientsUrl = 'http://localhost/xampp/getClients.php'; 
  private employeesUrl = 'http://localhost/xampp/getEmployees.php';  
  private changeorderurl = 'http://localhost/xampp/getChangeOrder.php';
  private getStatusProgressUrl = 'http://localhost/xampp/GetStatusProgress.php';
  private getClientChangeOrders = 'http://localhost/xampp/GetChangeOrderByClientId.php';
  private getChangeLogDataByChangeOrder = 'http://localhost/xampp/GetChangeLogDataByChangeOrder.php';
  private GetChanageLogById = 'http://localhost/xampp/GetChangeLogById.php';
  private getClientbyClientID = "http://localhost/xampp/GetClientByClientID.php";
  private getUsers = "http://localhost/xampp/GetUser.php";
  private getUsersByUserId = "http://localhost/xampp/GetUserByUserId.php";
  private recentchangeorderlog = "http://localhost/xampp/GetRecentChangeOrderLog.php";

  //Adresses
  private GetProvince = 'http://localhost/xampp/GetProvince.php';
  private GetCountry = 'http://localhost/xampp/GetCountry.php';
  private GetCity = 'http://localhost/xampp/GetCity.php';
  private GetDistrict = 'http://localhost/xampp/GetDistrict.php';
  private GetSubDistrict = 'http://localhost/xampp/GetSubDistrict.php';

  //insert Data
  private insertchangeorder = 'http://localhost/xampp/InsertChangeOrder.php';
  private InsertChangeLog = 'http://localhost/xampp/InsertChangeLog.php';
  private insertClient = 'http://localhost/xampp/InsertClient.php';
  private InsertUser = 'http://localhost/xampp/InsertUser.php';


  //Update Data
  private updatechangeorder = 'http://localhost/xampp/UpdateChangeOrder.php';
  private updatepassword = 'http://localhost/xampp/ChangePassword.php';
  private forgotpassword = 'http://localhost/xampp/ForgotPassword.php';
  private UpdateUser = 'http://localhost/xampp/UpdateUser.php';
  private updatechangelog = 'http://localhost/xampp/UpdateChangeLogByID.php';
  private updateclient = 'http://localhost/xampp/updateClient.php';

  //Upload File
  private FileUpload = 'http://localhost/xampp/upload.php';
  private FileUploadtoDatabase = 'http://localhost/xampp/uploadfiletodatabase.php';

  private sendotp = 'http://localhost/xampp/otp/SendOtp.php';

  private logincred = "http://localhost/xampp/LoginCred.php";

  //set inactive date user
  private setInactive = "http://localhost/xampp/SetInactiveDateUser.php";
  
  //Delete Data
  private deleteChangeOrder = "http://localhost/xampp/DeleteChangeOrder.php";
  private deleteChangeLog = "http://localhost/xampp/DeleteChangeLog.php";

  constructor(private http: HttpClient) { }

  //Change ORder
  getRecentChangeOrderLog() {
    return this.http.get<any>(this.recentchangeorderlog);
  }  
  getChangeOrder():Observable<any> {
    return this.http.get<any>(this.changeorderurl); 
  }
  getChangeOrderDetails(ChangeOrder: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.GetChangeOrderDetails, { ChangeOrder }, { headers});
  }

  //user
  GetUsers(): Observable<any> {
    return this.http.get<any>(this.getUsers);
  }
  insertUser(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.InsertUser, formData, { headers });
  }
  Updatepassword(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.updatepassword, formData, { headers });
  }
  forgotPassword(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.forgotpassword, formData, { headers });
  }
  updateUser(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.UpdateUser, formData, { headers });
  }
  GetUserByUserId(UserID: String): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.getUsersByUserId, { UserID }, { headers });
  }
  SetInactive(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.setInactive, formData, { headers });
  }
  
  //Client
  getClients(): Observable<any> {
    return this.http.get<any>(this.clientsUrl);
  }
  getChangeClient(clientId: String): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.getClientChangeOrders, { clientId }, { headers });
  }
  getclientByClientID(clientId: String): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.getClientbyClientID, { clientId }, { headers });
  }

  // Addresses
  getProvince():Observable<any> {
    return this.http.get<any>(this.GetProvince);
  }
  getCountry():Observable<any> {
    return this.http.get<any>(this.GetCountry);
  }
  getCity():Observable<any> {
    return this.http.get<any>(this.GetCity);
  }
  getDistrict():Observable<any> {
    return this.http.get<any>(this.GetDistrict);
  }
  getSubDistrict():Observable<any> {
    return this.http.get<any>(this.GetSubDistrict);
  }


  getEmployees(): Observable<any> {
    return this.http.get<any>(this.employeesUrl); 
  }

  getStatusProgress():Observable<any> {
    return this.http.get<any>(this.getStatusProgressUrl);
  }

  GetChangeLogDataByChangeOrder(ChangeOrder: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.getChangeLogDataByChangeOrder, { ChangeOrder }, { headers});
  }

  getchangelogbyId(ChangeLogId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.GetChanageLogById, { ChangeLogId }, { headers});
  }


  uploadFile(formData: FormData) {
    return this.http.post<{
      fileId: any; status: string, filePath: string 
    }>(this.FileUpload, formData);
  }

  insertChangeLog(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.InsertChangeLog, formData, { headers });
  }
  
  insertChangeRequest(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.insertchangeorder, formData, { headers });
  }

  InsertClient(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.insertClient, formData, { headers });
  }

  
  UpdateChangeOrder(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.updatechangeorder, formData, { headers });
  }

  UpdateChangeLog(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.updatechangelog, formData, { headers });
  }

  UpdateClient(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.updateclient, formData, { headers });
  }

  DeleteChangeOrder(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.deleteChangeOrder, formData, { headers });
  }

  DeleteChangeLog(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.deleteChangeLog, formData, { headers });
  }

  LoginCred(formData: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.logincred, formData, { headers });
  }

  sendOtpToEmail(email: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.sendotp, email, { headers });
  }
  
  uploadFiletodatabase(formData: FormData) {
    return this.http.post<{
      fileId: any; status: string, filePath: string 
    }>(this.FileUploadtoDatabase, formData);
  }

  
  private user: User;
  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
  }
}

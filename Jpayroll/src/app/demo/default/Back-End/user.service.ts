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
  private GetChangeOrderDetails = 'backend/GetChangeOrderDetails.php'
  private clientsUrl = 'backend/getClients.php'; 
  private employeesUrl = 'backend/getEmployees.php';  
  private changeorderurl = 'backend/getChangeOrder.php';
  private getStatusProgressUrl = 'backend/GetStatusProgress.php';
  private getClientChangeOrders = 'backend/GetChangeOrderByClientId.php';
  private getChangeLogDataByChangeOrder = 'backend/GetChangeLogDataByChangeOrder.php';
  private GetChanageLogById = 'backend/GetChangeLogById.php';
  private getClientbyClientID = "backend/GetClientByClientID.php";
  private getUsers = "backend/GetUser.php";
  private getUsersByUserId = "backend/GetUserByUserId.php";
  private recentchangeorderlog = "backend/GetRecentChangeOrderLog.php";

  //Adresses
  private GetProvince = 'backend/GetProvince.php';
  private GetCountry = 'backend/GetCountry.php';
  private GetCity = 'backend/GetCity.php';
  private GetDistrict = 'backend/GetDistrict.php';
  private GetSubDistrict = 'backend/GetSubDistrict.php';

  //insert Data
  private insertchangeorder = 'backend/InsertChangeOrder.php';
  private InsertChangeLog = 'backend/InsertChangeLog.php';
  private insertClient = 'backend/InsertClient.php';
  private InsertUser = 'backend/InsertUser.php';


  //Update Data
  private updatechangeorder = 'backend/UpdateChangeOrder.php';
  private updatepassword = 'backend/ChangePassword.php';
  private forgotpassword = 'backend/ForgotPassword.php';
  private UpdateUser = 'backend/UpdateUser.php';
  private updatechangelog = 'backend/UpdateChangeLogByID.php';
  private updateclient = 'backend/updateClient.php';

  //Upload File
  private FileUpload = 'backend/upload.php';
  private FileUploadtoDatabase = 'backend/uploadfiletodatabase.php';

  private sendotp = 'backend/otp/SendOtp.php';

  private logincred = "backend/LoginCred.php";

  //set inactive date user
  private setInactive = "backend/SetInactiveDateUser.php";
  
  //Delete Data
  private deleteChangeOrder = "backend/DeleteChangeOrder.php";
  private deleteChangeLog = "backend/DeleteChangeLog.php";

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

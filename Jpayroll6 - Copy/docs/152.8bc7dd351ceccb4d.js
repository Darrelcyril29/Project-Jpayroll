"use strict";(self.webpackChunkmantis_free_version=self.webpackChunkmantis_free_version||[]).push([[152],{8064:(_,g,l)=>{l.d(g,{D:()=>u});var a=l(1626),t=l(4438);let u=(()=>{class d{constructor(e){this.http=e,this.GetChangeOrderDetails="backend/GetChangeOrderDetails.php",this.clientsUrl="backend/getClients.php",this.employeesUrl="backend/getEmployees.php",this.changeorderurl="backend/getChangeOrder.php",this.getStatusProgressUrl="backend/GetStatusProgress.php",this.getClientChangeOrders="backend/GetChangeOrderByClientId.php",this.getChangeLogDataByChangeOrder="backend/GetChangeLogDataByChangeOrder.php",this.GetChanageLogById="backend/GetChangeLogById.php",this.getClientbyClientID="backend/GetClientByClientID.php",this.getUsers="backend/GetUser.php",this.getUsersByUserId="backend/GetUserByUserId.php",this.recentchangeorderlog="backend/GetRecentChangeOrderLog.php",this.GetProvince="backend/GetProvince.php",this.GetCountry="backend/GetCountry.php",this.GetCity="backend/GetCity.php",this.GetDistrict="backend/GetDistrict.php",this.GetSubDistrict="backend/GetSubDistrict.php",this.insertchangeorder="backend/InsertChangeOrder.php",this.InsertChangeLog="backend/InsertChangeLog.php",this.insertClient="backend/InsertClient.php",this.InsertUser="backend/InsertUser.php",this.updatechangeorder="backend/UpdateChangeOrder.php",this.updatepassword="backend/ChangePassword.php",this.forgotpassword="backend/ForgotPassword.php",this.UpdateUser="backend/UpdateUser.php",this.updatechangelog="backend/UpdateChangeLogByID.php",this.updateclient="backend/updateClient.php",this.FileUpload="backend/upload.php",this.FileUploadtoDatabase="backend/uploadfiletodatabase.php",this.sendotp="backend/otp/SendOtp.php",this.logincred="backend/LoginCred.php",this.setInactive="backend/SetInactiveDateUser.php",this.deleteChangeOrder="backend/DeleteChangeOrder.php",this.deleteChangeLog="backend/DeleteChangeLog.php"}getRecentChangeOrderLog(){return this.http.get(this.recentchangeorderlog)}getChangeOrder(){return this.http.get(this.changeorderurl)}getChangeOrderDetails(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.GetChangeOrderDetails,{ChangeOrder:e},{headers:s})}GetUsers(){return this.http.get(this.getUsers)}insertUser(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.InsertUser,e,{headers:s})}Updatepassword(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.updatepassword,e,{headers:s})}forgotPassword(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.forgotpassword,e,{headers:s})}updateUser(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.UpdateUser,e,{headers:s})}GetUserByUserId(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.getUsersByUserId,{UserID:e},{headers:s})}SetInactive(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.setInactive,e,{headers:s})}getClients(){return this.http.get(this.clientsUrl)}getChangeClient(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.getClientChangeOrders,{clientId:e},{headers:s})}getclientByClientID(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.getClientbyClientID,{clientId:e},{headers:s})}getProvince(){return this.http.get(this.GetProvince)}getCountry(){return this.http.get(this.GetCountry)}getCity(){return this.http.get(this.GetCity)}getDistrict(){return this.http.get(this.GetDistrict)}getSubDistrict(){return this.http.get(this.GetSubDistrict)}getEmployees(){return this.http.get(this.employeesUrl)}getStatusProgress(){return this.http.get(this.getStatusProgressUrl)}GetChangeLogDataByChangeOrder(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.getChangeLogDataByChangeOrder,{ChangeOrder:e},{headers:s})}getchangelogbyId(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.GetChanageLogById,{ChangeLogId:e},{headers:s})}uploadFile(e){return this.http.post(this.FileUpload,e)}insertChangeLog(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.InsertChangeLog,e,{headers:s})}insertChangeRequest(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.insertchangeorder,e,{headers:s})}InsertClient(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.insertClient,e,{headers:s})}UpdateChangeOrder(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.updatechangeorder,e,{headers:s})}UpdateChangeLog(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.updatechangelog,e,{headers:s})}UpdateClient(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.updateclient,e,{headers:s})}DeleteChangeOrder(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.deleteChangeOrder,e,{headers:s})}DeleteChangeLog(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.deleteChangeLog,e,{headers:s})}LoginCred(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.logincred,e,{headers:s})}sendOtpToEmail(e){const s=new a.Lr({"Content-Type":"application/json"});return this.http.post(this.sendotp,e,{headers:s})}uploadFiletodatabase(e){return this.http.post(this.FileUploadtoDatabase,e)}getUser(){return this.user}setUser(e){this.user=e}static{this.\u0275fac=function(s){return new(s||d)(t.KVO(a.Qq))}}static{this.\u0275prov=t.jDH({token:d,factory:d.\u0275fac,providedIn:"root"})}}return d})()},5152:(_,g,l)=>{l.r(g),l.d(g,{default:()=>D});var a=l(2389),t=l(4438),u=l(8064),d=l(6256),C=l(177),e=l(4341),s=l(3380);const m=(o,c)=>({top:o,left:c});function f(o,c){if(1&o){const n=t.RV6();t.j41(0,"a",21),t.bIt("click",function(){t.eBV(n);const i=t.XpG();return t.Njj(i.onAdd())}),t.j41(1,"button",22),t.EFF(2,"Add"),t.k0s()()}}function b(o,c){if(1&o){const n=t.RV6();t.j41(0,"div",23),t.bIt("contextmenu",function(i){const h=t.eBV(n).row,p=t.XpG();return t.Njj(p.onContextMenu(i,h))}),t.EFF(1),t.k0s()}if(2&o){const n=c.row;t.R7$(),t.SpI(" ",n.ClientName," ")}}function w(o,c){if(1&o){const n=t.RV6();t.j41(0,"div",23),t.bIt("contextmenu",function(i){const h=t.eBV(n).row,p=t.XpG();return t.Njj(p.onContextMenu(i,h))}),t.EFF(1),t.k0s()}if(2&o){const n=c.row;t.R7$(),t.SpI(" ",n.CloudName," ")}}function y(o,c){if(1&o){const n=t.RV6();t.j41(0,"div",23),t.bIt("contextmenu",function(i){const h=t.eBV(n).row,p=t.XpG();return t.Njj(p.onContextMenu(i,h))}),t.EFF(1),t.k0s()}if(2&o){const n=c.row;t.R7$(),t.SpI(" ",n.OnPremise," ")}}function S(o,c){if(1&o){const n=t.RV6();t.j41(0,"div",23),t.bIt("contextmenu",function(i){const h=t.eBV(n).row,p=t.XpG();return t.Njj(p.onContextMenu(i,h))}),t.EFF(1),t.k0s()}if(2&o){const n=c.row;t.R7$(),t.SpI(" ",n.HybridStatus," ")}}function k(o,c){if(1&o){const n=t.RV6();t.j41(0,"div",24)(1,"ul",25)(2,"li",21),t.bIt("click",function(){t.eBV(n);const i=t.XpG();return t.Njj(i.openClientChangeOrder(i.selectedRow.ClientId))}),t.EFF(3,"Change Order"),t.k0s(),t.j41(4,"li",21),t.bIt("click",function(){t.eBV(n);const i=t.XpG();return t.Njj(i.openClientDetail(i.selectedRow.ClientId))}),t.EFF(5,"Open Client"),t.k0s()()()}if(2&o){const n=t.XpG();t.Y8G("ngStyle",t.l_i(1,m,n.contextMenuPosition.y+"px",n.contextMenuPosition.x+"px"))}}function I(o,c){if(1&o&&(t.j41(0,"option",26),t.EFF(1),t.k0s()),2&o){const n=c.$implicit;t.Y8G("value",n),t.R7$(),t.JRh(n)}}let D=(()=>{class o{constructor(n,r){this.dataService=n,this.router=r,this.rows=[],this.pageSize=5,this.pageSizes=[5,10,15,20,25,30,35],this.page={offset:0},this.paginatedRows=[],this.filteredRows=[],this.searchTerm="",this.contextMenuVisible=!1,this.contextMenuPosition={x:0,y:0}}ngOnInit(){this.fetchData();const n=JSON.parse(localStorage.getItem("crud")||"{}");this.currentUserType=n}fetchData(){this.dataService.getClients().subscribe(n=>{this.rows=n,this.filteredRows=[...this.rows],this.paginatedRows=this.getPaginatedRows()},n=>{console.error("Error fetching data",n)})}onPage(n){this.page.offset=n.offset,this.paginatedRows=this.getPaginatedRows()}onPreviousPage(){this.page.offset>0&&(this.page.offset--,this.paginatedRows=this.getPaginatedRows())}onNextPage(){this.page.offset<Math.ceil(this.filteredRows.length/this.pageSize)-1&&(this.page.offset++,this.paginatedRows=this.getPaginatedRows())}onPageSizeChange(n){this.page.offset=0,this.pageSize=Number(n.target.value),this.paginatedRows=this.getPaginatedRows()}getPaginatedRows(){const n=this.page.offset*this.pageSize;return this.filteredRows.slice(n,n+this.pageSize)}isLastPage(){return this.page.offset>=Math.ceil(this.filteredRows.length/this.pageSize)-1}onSearch(){const n=this.searchTerm.toLowerCase();this.filteredRows=this.rows.filter(r=>r.CloudName.toLowerCase().includes(n)||r.ClientName.toLowerCase().includes(n)||r.OnPremise.toLowerCase().includes(n)||r.HybridStatus.toLowerCase().includes(n)),this.page.offset=0,this.paginatedRows=this.getPaginatedRows()}onContextMenu(n,r){n.preventDefault(),this.contextMenuVisible=!0,this.contextMenuPosition={x:n.clientX,y:n.clientY},this.selectedRow=r}openClientChangeOrder(n){this.router.navigate(["/ChangeClient"],{state:{ClientId:n}})}openClientDetail(n){this.router.navigate(["/ClientDetails"],{state:{ClientId:n}})}onAdd(){this.router.navigate(["/InsertClient"],{})}closeContextMenu(){this.contextMenuVisible=!1}static{this.\u0275fac=function(r){return new(r||o)(t.rXU(u.D),t.rXU(d.Ix))}}static{this.\u0275cmp=t.VBU({type:o,selectors:[["app-client-status"]],hostBindings:function(r,i){1&r&&t.bIt("click",function(){return i.closeContextMenu()},!1,t.EBC)},standalone:!0,features:[t.aNF],decls:30,vars:15,consts:[[1,"p-5"],[1,"mb-5","text-left"],[1,"text-l","font-bold","text-gray-800"],[1,"mb-3","d-flex","justify-content-between"],["type","text","placeholder","Search...",1,"form-control",3,"ngModelChange","input","ngModel"],[3,"click",4,"ngIf"],[1,"material","rounded-lg","border","border-gray-300",3,"page","rows","columnMode","headerHeight","rowHeight","limit","count","offset"],["name","Company","prop","ClientName"],["ngx-datatable-cell-template",""],["name","Cloud","prop","CloudName"],["name","Cloud Type","prop","OnPremise"],["name","Status","prop","HybridStatus"],["class","context-menu bg-white shadow-lg rounded-lg p-2 absolute z-10",3,"ngStyle",4,"ngIf"],[1,"d-flex","justify-content-between","mt-3"],[1,"mb-2"],[1,"text-sm","text-black"],[1,"border","border-gray-300","rounded-lg","p-1",3,"ngModelChange","change","ngModel"],[3,"value",4,"ngFor","ngForOf"],[1,"text-sm","text-black","mt-3"],[1,"btn","btn-secondary","me-3",3,"click","disabled"],[1,"btn","btn-primary",3,"click","disabled"],[3,"click"],[1,"btn","btn-primary","ms-2"],[3,"contextmenu"],[1,"context-menu","bg-white","shadow-lg","rounded-lg","p-2","absolute","z-10",3,"ngStyle"],[1,"list-none","p-0","m-0"],[3,"value"]],template:function(r,i){1&r&&(t.j41(0,"div",0)(1,"div",1)(2,"h1",2),t.EFF(3,"Client Status"),t.k0s()(),t.j41(4,"div",3)(5,"input",4),t.mxI("ngModelChange",function(p){return t.DH7(i.searchTerm,p)||(i.searchTerm=p),p}),t.bIt("input",function(){return i.onSearch()}),t.k0s(),t.DNE(6,f,3,0,"a",5),t.k0s(),t.j41(7,"ngx-datatable",6),t.bIt("page",function(p){return i.onPage(p)}),t.j41(8,"ngx-datatable-column",7),t.DNE(9,b,2,1,"ng-template",8),t.k0s(),t.j41(10,"ngx-datatable-column",9),t.DNE(11,w,2,1,"ng-template",8),t.k0s(),t.j41(12,"ngx-datatable-column",10),t.DNE(13,y,2,1,"ng-template",8),t.k0s(),t.j41(14,"ngx-datatable-column",11),t.DNE(15,S,2,1,"ng-template",8),t.k0s()(),t.DNE(16,k,6,4,"div",12),t.j41(17,"div",13)(18,"div",14)(19,"p",15),t.EFF(20,"Showing"),t.k0s(),t.j41(21,"select",16),t.mxI("ngModelChange",function(p){return t.DH7(i.pageSize,p)||(i.pageSize=p),p}),t.bIt("change",function(p){return i.onPageSizeChange(p)}),t.DNE(22,I,2,2,"option",17),t.k0s(),t.j41(23,"p",18),t.EFF(24),t.k0s()(),t.j41(25,"div")(26,"button",19),t.bIt("click",function(){return i.onPreviousPage()}),t.EFF(27," Previous "),t.k0s(),t.j41(28,"button",20),t.bIt("click",function(){return i.onNextPage()}),t.EFF(29," Next "),t.k0s()()()()),2&r&&(t.R7$(5),t.R50("ngModel",i.searchTerm),t.R7$(),t.Y8G("ngIf",1==i.currentUserType),t.R7$(),t.Y8G("rows",i.paginatedRows)("columnMode","force")("headerHeight",50)("rowHeight","auto")("limit",i.pageSize)("count",i.filteredRows.length)("offset",i.page.offset),t.R7$(9),t.Y8G("ngIf",i.contextMenuVisible),t.R7$(5),t.R50("ngModel",i.pageSize),t.R7$(),t.Y8G("ngForOf",i.pageSizes),t.R7$(2),t.SpI("of ",i.filteredRows.length," records"),t.R7$(2),t.Y8G("disabled",0===i.page.offset),t.R7$(2),t.Y8G("disabled",i.isLastPage()))},dependencies:[a.G,C.Sq,C.bT,C.B3,e.xH,e.y7,e.me,e.wz,e.BC,e.vS,s.ge,s.ed,s.QI],styles:[".context-menu{position:fixed;width:150px;border:1px solid #ddd;background:#fff;z-index:1000}.context-menu ul{list-style:none;margin:0;padding:0}.context-menu li{padding:8px 12px;cursor:pointer}.context-menu li:hover{background-color:#f0f0f0}\n"],encapsulation:2})}}return o})()}}]);
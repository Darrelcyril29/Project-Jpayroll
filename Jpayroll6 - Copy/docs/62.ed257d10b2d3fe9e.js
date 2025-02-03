"use strict";(self.webpackChunkmantis_free_version=self.webpackChunkmantis_free_version||[]).push([[62],{1062:(I,d,i)=>{i.r(d),i.d(d,{default:()=>g});var r=i(4341),U=i(5490),D=i(5974),_=i(2389),e=i(4438),v=i(6256),p=i(8064),c=i(177);function f(a,m){1&a&&(e.j41(0,"div",19),e.EFF(1," Please provide Name "),e.k0s())}function E(a,m){1&a&&(e.j41(0,"div",19),e.EFF(1," Please provide Email "),e.k0s())}function b(a,m){if(1&a&&(e.j41(0,"option",20),e.EFF(1),e.k0s()),2&a){const s=m.$implicit;e.Y8G("value",s.value),e.R7$(),e.JRh(s.label)}}function h(a,m){1&a&&(e.j41(0,"div",19),e.EFF(1," Please select a User Type "),e.k0s())}let g=(()=>{class a{encryptToBase64(s){return btoa(s)}constructor(s,l,t,n,u){this.fb=s,this.route=l,this.userService=t,this.location=n,this.router=u,this.UserTypeOptions=[{value:0,label:"Admin"},{value:1,label:"Client Level 1"},{value:2,label:"Client Level 2"},{value:11,label:"Agent Level 1"},{value:12,label:"Agent Level 2"},{value:21,label:"R&D Level 1"},{value:22,label:"R&D Level 2"},{value:98,label:"Accounting Admin"},{value:99,label:"SuperUser"}],this.currentUser=this.userService.getUser();const o=new Date;o.setDate(o.getDate()+1),this.today=(new Date).toISOString().split("T")[0],this.UserDetails=this.fb.group({Name:["",r.k0.required],Email:["",[r.k0.required],[r.Dg]],UserType:["",r.k0.required],InactiveDate:["",r.k0.required]})}ngOnInit(){const s=this.location.getState();s&&s.UserId&&(this.UserId=s.UserId,console.log(this.UserId),this.fetchUserDetails(this.UserId))}fetchUserDetails(s){this.userService.GetUserByUserId(s).subscribe(l=>{if(l&&"success"===l.status&&l.data.length>0){const t=l.data[0];console.log(t),this.UserDetails.patchValue({Name:t.Name,Email:t.Email,UserType:t.Usertype,InactiveDate:t.InactiveDate})}else console.error("No data found or error in response:",l)})}onSubmit(){const s=this.UserDetails.get("Email");if(!this.UserDetails.valid)return void(s?.errors?alert("Email is incorrect"):alert("Form is invalid"));const l={userId:this.UserId,Name:this.UserDetails.get("Name")?.value,Email:s?.value,UserType:this.UserDetails.get("UserType")?.value,InactiveDate:this.UserDetails.get("InactiveDate")?.value};this.userService.updateUser(l).subscribe(t=>{alert("User has been Updated"),this.router.navigate(["/UserDataTable"])},t=>{console.error("Error:",t),alert(t)})}onDelete(){confirm("Are you sure you want to delete this User?")&&this.userService.SetInactive({userId:this.UserId}).subscribe(t=>{alert("User Has been diactivated"),this.router.navigate(["/UserDataTable"],{})},t=>{console.error("Error:",t),alert(t)})}static{this.\u0275fac=function(l){return new(l||a)(e.rXU(r.ok),e.rXU(v.nX),e.rXU(p.D),e.rXU(c.aZ),e.rXU(v.Ix))}}static{this.\u0275cmp=e.VBU({type:a,selectors:[["app-user-details"]],standalone:!0,features:[e.aNF],decls:32,vars:6,consts:[[1,"container","my-5"],[1,"text-center","mb-4"],[3,"ngSubmit","formGroup"],[1,"row","mb-3"],[1,"col-sm-6"],["for","Name",1,"form-label"],["id","Name","formControlName","Name",1,"form-control"],["class","text-danger small",4,"ngIf"],["for","Email",1,"form-label"],["id","Email","formControlName","Email",1,"form-control"],[1,"mb-3"],["for","UserType",1,"form-label"],["id","UserType","formControlName","UserType",1,"form-select"],[3,"value",4,"ngFor","ngForOf"],["for","InactiveDate",1,"form-label"],["id","InactiveDate","type","date","formControlName","InactiveDate",1,"form-control",3,"min"],[1,"col"],["type","button",1,"btn","btn-success","w-100",3,"click"],["type","button",1,"btn","btn-primary","w-100",3,"click"],[1,"text-danger","small"],[3,"value"]],template:function(l,t){if(1&l&&(e.j41(0,"div",0)(1,"h1",1),e.EFF(2,"User Details"),e.k0s(),e.j41(3,"form",2),e.bIt("ngSubmit",function(){return t.onSubmit()}),e.j41(4,"div",3)(5,"div",4)(6,"label",5),e.EFF(7,"Employee Name"),e.k0s(),e.nrm(8,"input",6),e.DNE(9,f,2,0,"div",7),e.k0s(),e.j41(10,"div",4)(11,"label",8),e.EFF(12,"Email"),e.k0s(),e.nrm(13,"input",9),e.DNE(14,E,2,0,"div",7),e.k0s()(),e.j41(15,"div",10)(16,"label",11),e.EFF(17,"User Type"),e.k0s(),e.j41(18,"select",12),e.DNE(19,b,2,2,"option",13),e.k0s(),e.DNE(20,h,2,0,"div",7),e.k0s(),e.j41(21,"div",10)(22,"label",14),e.EFF(23,"Inactive Date"),e.k0s(),e.nrm(24,"input",15),e.k0s(),e.j41(25,"div",3)(26,"div",16)(27,"button",17),e.bIt("click",function(){return t.onSubmit()}),e.EFF(28,"Update"),e.k0s()(),e.j41(29,"div",16)(30,"button",18),e.bIt("click",function(){return t.onDelete()}),e.EFF(31,"Delete User"),e.k0s()()()()()),2&l){let n,u,o;e.R7$(3),e.Y8G("formGroup",t.UserDetails),e.R7$(6),e.Y8G("ngIf",(null==(n=t.UserDetails.get("Name"))?null:n.invalid)&&(null==(n=t.UserDetails.get("Name"))?null:n.touched)),e.R7$(5),e.Y8G("ngIf",(null==(u=t.UserDetails.get("Email"))?null:u.invalid)&&(null==(u=t.UserDetails.get("Email"))?null:u.touched)),e.R7$(5),e.Y8G("ngForOf",t.UserTypeOptions),e.R7$(),e.Y8G("ngIf",(null==(o=t.UserDetails.get("UserType"))?null:o.invalid)&&(null==(o=t.UserDetails.get("UserType"))?null:o.touched)),e.R7$(4),e.Y8G("min",t.today)}},dependencies:[U.w8,D.ae,r.YN,r.qT,r.xH,r.y7,r.me,r.wz,r.BC,r.cb,_.G,c.Sq,c.bT,r.j4,r.JD]})}}return a})()}}]);
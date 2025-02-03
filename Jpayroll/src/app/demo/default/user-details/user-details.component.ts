import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, AbstractControl, EmailValidator} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Back-End/user.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { User } from 'src/app/demo/default/models/user';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CKEditorModule, SelectDropDownModule, FormsModule, SharedModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export default class UserDetailsComponent implements OnInit {
  UserDetails: FormGroup;
  currentUser: User;
  today: string;
  UserId: string;
  UserTypeOptions = [
    { value: 0, label: 'Admin' },
    { value: 1, label: 'Client Level 1' },
    { value: 2, label: 'Client Level 2' },
    { value: 11, label: 'Agent Level 1' },
    { value: 12, label: 'Agent Level 2' },
    { value: 21, label: 'R&D Level 1' },
    { value: 22, label: 'R&D Level 2' },
    { value: 98, label: 'Accounting Admin' },
    { value: 99, label: 'SuperUser' }
  ];

  encryptToBase64(data: string): string {
    return btoa(data); 
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private router: Router
  ) {
    this.currentUser = this.userService.getUser();
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 1);
    this.today = new Date().toISOString().split('T')[0];

    this.UserDetails = this.fb.group(
      {
        Name: ['', Validators.required],
        Email: ['', [Validators.required]],
        UserType: ['', Validators.required],
        InactiveDate: ['', Validators.required]
      },
    );
  }

  ngOnInit(): void {
    const state = this.location.getState();
    if (state && state['UserId']) {
      this.UserId = state['UserId'];
      this.fetchUserDetails(this.UserId);
    }
  }

  fetchUserDetails(UserID: string) {
    this.userService.GetUserByUserId(UserID).subscribe(
      (data) => {
        if (data && data.status === 'success' && data.data.length > 0) {
          const UserDetails = data.data[0]; 
          this.UserDetails.patchValue({
            Name: UserDetails.Name,
            Email: UserDetails.Email,
            UserType: UserDetails.Usertype,
            InactiveDate: UserDetails.InactiveDate
            });
        } else {
          console.error('No data found or error in response:', data);
        }
      }
    );
  }

  onSubmit() {
    const emailControl = this.UserDetails.get('Email');
  
    if (!this.UserDetails.valid) {
      if (emailControl?.errors) {
        alert('Email is incorrect');
      } else {
        alert('Form is invalid');
      }
      return; // Exit if the form is invalid
    }
  
    const formData = {
      userId: this.UserId,
      Name: this.UserDetails.get('Name')?.value,
      Email: emailControl?.value,
      UserType: this.UserDetails.get('UserType')?.value,
      InactiveDate: this.UserDetails.get('InactiveDate')?.value,
    };
  
    this.userService.updateUser(formData).subscribe(
      (response) => {
        alert('User has been Updated');
        this.router.navigate(['/UserDataTable']);
      },
      (error) => {
        console.error('Error:', error);
        alert(error);
      }
    );
  }
  

  onDelete(){
    const confirmation = confirm('Are you sure you want to delete this User?');
    
    if (!confirmation) {
      return; // Exit if the user cancels
    }
    const formData = {
      userId: this.UserId, 
    };
    this.userService.SetInactive(formData).subscribe(
      (response) => {
        alert('User Has been diactivated');
        this.router.navigate(['/UserDataTable'], {
        });
      },
      (error) => {
        console.error('Error:', error);
        alert(error)
      }
    )
  }
}
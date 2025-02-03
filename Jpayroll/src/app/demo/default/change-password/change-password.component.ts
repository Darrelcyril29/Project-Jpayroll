import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, AbstractControl} from '@angular/forms';
import { UserService } from '../Back-End/user.service';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SelectDropDownModule, FormsModule, SharedModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export default class ChangePasswordComponent implements OnInit {
  ChangePassword: FormGroup;
  UserId: string;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  Oldpassword : string;
  Newpassword : string;
  Confirmpassword : string;

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }
  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  encryptToBase64(data: string): string {
    return btoa(data); 
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.ChangePassword = this.fb.group(
      {
        OldPassword: ['', Validators.required],
        Password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordsMatchValidator // Attach custom validator here
      }
    );
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.UserId = currentUser.UserId
  }

  passwordsMatchValidator(control: AbstractControl) {
    const password = control.get('Password');
    const confirmPassword = control.get('ConfirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.ChangePassword.valid) {
      const formData = {
        userId: this.UserId,
        OldPassword: this.ChangePassword.get('OldPassword')?.value,
        Newpassword: this.ChangePassword.get('Password')?.value,
      };
      console.log(formData)
      this.userService.Updatepassword(formData).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert(response.message);
          } else if (response.status === 'error') {
            alert(response.message); 
          }
        },
        (error) => {
          console.error('Error:', error);
          alert('An error occurred while processing your request.');
        }
      );
    } else {
      alert('Form is invalid');
    }
  }
  
}

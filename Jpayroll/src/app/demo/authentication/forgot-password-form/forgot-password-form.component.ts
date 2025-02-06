import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, AbstractControl} from '@angular/forms';
import { UserService } from '../../default/Back-End/user.service';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { StandardEditingMode } from 'ckeditor5';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [SelectDropDownModule, FormsModule, SharedModule, HttpClientModule],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss'
})
export default class ForgotPasswordFormComponent implements OnInit {
  ChangePassword: FormGroup;
  UserId: string;
  otp: number;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  Password: string;
  ConfirmPassword: String;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  encryptToBase64(data: string): string {
    return btoa(data); 
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {
    this.ChangePassword = this.fb.group(
      {
        Email: ['', [Validators.required, Validators.email]],
        OTP: ['', Validators.required],
        Password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );    
  }

  sendOTP() {
    const email = this.ChangePassword.get('Email')?.value;
    console.log('Sending email:', email);  // Log the email value to check
    if (email) {
      // Creating the form data (urlencoded format)
      const body = new URLSearchParams();
      body.set('email', email);
  
      // Add headers to tell the server it's form data
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      });

      const payload = { email };
  
      this.http.post('http://localhost:3000/send-otp', payload).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert(`OTP sent to ${email}`);
            this.otp = response.otp;
            console.log(this.otp);
          } else {
            alert(response.message);
          }
        },
        (error) => {
          console.error('Error sending OTP:', error);
          alert('Failed to send OTP. Please try again.');
        }
      );
    } else {
      alert('Please enter a valid email address.');
    }
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
      const enteredOtp = this.ChangePassword.get('OTP')?.value;
      if (enteredOtp != this.otp) {
        alert('Invalid OTP. Please enter the correct OTP.');
        return;
      }
  
      const formData = {
        email: this.ChangePassword.get('Email')?.value,
        newPassword: this.ChangePassword.get('Password')?.value,
      };
      console.log(formData)
      this.userService.forgotPassword(formData).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.router.navigate(['/Login']);
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

  onLogin() {
    this.router.navigate(['/login'], {
    });
  }
}

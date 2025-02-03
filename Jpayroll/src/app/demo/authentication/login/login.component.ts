import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from '../../default/Back-End/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  errorMessage: string | null = null;
  email: string = '';
  password = '';
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    // Check for error message in query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['error']) {
        this.errorMessage = params['error'];
      }
    });
  }

  encryptToBase64(data: string): string {
    return btoa(data); 
  }

  login(): void {
    // const encryptedEmail = this.encryptToBase64(this.email);
    // const encryptedPassword = this.encryptToBase64(this.password);

    // Prepare the data to send
    const formData = {
      email: this.email,
      password: this.password
    };
    interface LoginResponse {
      status: string;
      data: {
        Name: string;
        UserId: string;
        Usertype: string;
      };
    }
    this.userService.LoginCred(formData).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        if(response.data != null){
        // Redirect to the dashboard
        this.router.navigate(['/dashboard/default']);
        }else
        {
          alert('Invalid Credentials')
        }

      },
      error: (error) => {
        console.error('Login error:', error);
      },
    });
  }

  onForgotPassword() {
    this.router.navigate(['/ForgotPassword'], {
    });
  }
  

}
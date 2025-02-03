import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, AbstractControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Back-End/user.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { User } from 'src/app/demo/default/models/user';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-user',
  standalone: true,
  imports: [CKEditorModule, SelectDropDownModule, FormsModule, SharedModule],
  templateUrl: './insert-user.component.html',
  styleUrl: './insert-user.component.scss'
})
export default class InsertUserComponent implements OnInit {
  InsertUser: FormGroup;
  currentUser: User;
  today: string;
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
    private router: Router
  ) {
    this.currentUser = this.userService.getUser();
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 1);
    this.today = new Date().toISOString().split('T')[0];

    this.InsertUser = this.fb.group(
      {
        Name: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', Validators.required],
        ConfirmPassword: ['', Validators.required],
        UserType: ['', Validators.required],
        InactiveDate: ['', Validators.required]
      },
      {
        validators: this.passwordsMatchValidator // Attach custom validator here
      }
    );
  }

  ngOnInit(): void {

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
    if (this.InsertUser.valid) {
      const formData = {
        userId: crypto.randomUUID(), 
        Name: this.InsertUser.get('Name')?.value,
        Email: this.InsertUser.get('Email')?.value,
        UserType: this.InsertUser.get('UserType')?.value,
        InactiveDate: this.InsertUser.get('InactiveDate')?.value,
        Password: this.encryptToBase64(this.InsertUser.get('Password')?.value),
      };
      this.userService.insertUser(formData).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert(response.message);
            this.router.navigateByUrl('/UserDataTable', {
              state: {}
            }); 
          } else if (response.status === 'error') {
            alert(response.message); 
          }
        },
        (error) => {
          console.error('Error:', error);
          alert(error)
        }
      )
      
    } else {
      alert('Form is invalid');
    }
  }
}
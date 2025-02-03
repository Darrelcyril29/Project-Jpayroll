// angular import
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// icon
import { IconService } from '@ant-design/icons-angular';
import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline
} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  @Input() styleSelectorToggle!: boolean;
  @Output() Customize = new EventEmitter();
  windowWidth: number;
  screenFull: boolean = true;
  Username : string = '';
  UserType: string = '';

  private userTypeMapping: { [key: number]: string } = {
    0: 'Admin',
    11: 'Agent Level 1',
    12: 'Agent Level 2',
    21: 'R&D Level 1',
    22: 'R&D Level 2',
    98: 'Accounting Admin',
    99: 'Super User'
  };


  constructor(
    private iconService: IconService, 
    private router: Router ) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        CheckCircleOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        LogoutOutline,
        UserOutline,
        EditOutline,
        ProfileOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline,
        BellOutline,
        GithubOutline,
        WalletOutline
      ]
    );
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.Username = currentUser?.Name
    const userTypeCode = currentUser?.Usertype;
    this.UserType = this.userTypeMapping[userTypeCode];
  }

  // profile = [
  //   {
  //     icon: 'edit',
  //     title: 'Edit Profile'
  //   },
  //   {
  //     icon: 'user',
  //     title: 'View Profile'
  //   },
  // ];

  setting = [
    // {
    //   icon: 'user',
    //   title: 'Account Settings'
    // },
    {
      icon: 'lock',
      title: 'Change Password',
    },
  ];

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  onclickChange() {
    this.router.navigate(['/ChangePassword'], {
    });
  }
}

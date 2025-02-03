import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Back-End/user.service';
import { Location } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, 
  Essentials, Alignment, FontSize, FontFamily, Highlight, Autoformat,
  Bold, Italic, Strikethrough, Underline, BlockQuote, CKFinder, EasyImage, Heading,
  Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResize,
  Link, List, MediaEmbed, Paragraph, PasteFromOffice, Table, TableToolbar, CKFinderUploadAdapter
} from 'ckeditor5';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-log-details',
  standalone: true,
  imports: [SharedModule, CKEditorModule, SelectDropDownModule],
  templateUrl: './change-log-details.component.html',
  styleUrl: './change-log-details.component.scss'
})
export default class ChangeLogDetailsComponent implements OnInit {
  changeLogId: number | undefined;
  employees: any[] = [];
  ChangeLog: FormGroup;
  files: File[] = [];
  companyname: string;
  changeorder: string;
  fileId: number;

  selectEmployeeConfig = {
    displayKey: 'label',  
    search: true,       
    placeholder: 'Select Employee',
    moreText: 'More...',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search...'
  };

  public Editor = ClassicEditor;
  public config = {
    toolbar: [
      'heading', '|', 'bold', 'italic', 'strikethrough', 'underline', '|',
      'alignment', '|', 'fontSize', 'fontFamily', 'highlight', '|',
      'bulletedList', 'numberedList', '|', 'link', '|', 'undo', 'redo'
    ],
    plugins: [
      Essentials, Alignment, FontSize, FontFamily, Highlight, Autoformat, CKFinderUploadAdapter,
      Bold, Italic, Strikethrough, Underline, BlockQuote, Heading, CKFinder,
      Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResize,
      Link, List, MediaEmbed, Paragraph, PasteFromOffice, Table, TableToolbar,
    ],
    height: '400px'
  };
  

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.ChangeLog = this.fb.group({
      changeOrder: ['', Validators.required],
      title: ['', Validators.required],
      comment: ['', Validators.required],
      jpayrollEmployee: ['', Validators.required],
      userId: ['', Validators.required],
      files: [null],
    });
  }

  ngOnInit(): void {
    this.fetchEmployees();
    const state: any = this.location.getState(); 
    this.changeLogId = state.ChangeLogId; 
    this.companyname = state.CompanyName
    this.getchangelogbyId(this.changeLogId)
  }

  getchangelogbyId(changeLogId: number) {
    this.userService.getchangelogbyId(changeLogId).subscribe(
      (data) => {
        if (data && data.length > 0) {
          const log = data[0]; 
          this.fileId = log.FileId
          this.changeorder = log.ChangeOrder
          this.ChangeLog.patchValue({
            changeOrder: log.ChangeOrder,
            title: log.Title,
            comment: log.Comment,
            userId: log.UserId,
          });
        } else {
          console.error('No data found for the provided ChangeOrder!');
        }
      },
      (error) => {
        console.error('Error fetching ChangeLog data', error);
      }
    );
  }
  
  onFileChange(event: any) {
    const selectedFiles = event.target.files;

    this.files = [];
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      let fileName = file.name.replace(/\s+/g, '_');
      const modifiedFile = new File([file], fileName, { type: file.type });
      this.files = [modifiedFile];
    }
  }

  onEmployeeChange(event: any) {
    const selectedEmployee = event; 
    if (selectedEmployee) {
      this.ChangeLog.patchValue({
        jpayrollEmployee: selectedEmployee.value,
        userId: selectedEmployee.value.value
      });
    } else {
      console.error('No employee selected!');
    }
  }

  onEditorReady(event: any): void {
    console.log('Editor is ready:', event);
  }

  fetchEmployees() {
    this.userService.getEmployees().subscribe(
      (data) => {
        this.employees = data.map(employee => ({
          value: employee.UserId,  
          label: employee.Name   
        }));
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  onSubmit() {
    if (this.files.length > 0) {
      const formData = new FormData();
      formData.append('file', this.files[0]);
      this.userService.uploadFiletodatabase(formData).subscribe(
        (response) => {
          const payload = {
            changeOrder: this.ChangeLog.get('changeOrder')?.value,
            title: this.ChangeLog.get('title')?.value,
            comment: this.ChangeLog.get('comment')?.value,
            userId: this.ChangeLog.get('userId')?.value,
            fileId: response.fileId,
            changeLogId : this.changeLogId
          };
          this.userService.UpdateChangeLog(payload).subscribe(
            (res) => {
              alert('Update has been submitted');
              this.router.navigateByUrl('/ChangeLog', {
                state: { changeOrder: this.changeorder, company: this.companyname }
              }); 
            },
            (error) => {
              console.error('Error:', error);
            }
          );
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      const payload = {
        changeOrder: this.ChangeLog.get('changeOrder')?.value,
        title: this.ChangeLog.get('title')?.value,
        comment: this.ChangeLog.get('comment')?.value,
        userId: this.ChangeLog.get('userId')?.value,
        fileId: this.fileId,
        changeLogId : this.changeLogId
      };
      this.userService.UpdateChangeLog(payload).subscribe(
        (res) => {
          alert('Update has been submitted');
          this.router.navigateByUrl('/ChangeLog', {
            state: { changeOrder: this.changeorder, company: this.companyname }
          }); 
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
  OnDelete() {
    const confirmation = confirm('Are you sure you want to delete this change order?');
    
    if (!confirmation) {
      return; // Exit if the user cancels
    }
  
    const formData = {
      ChangeLog: this.changeLogId,
    };
  
    this.userService.DeleteChangeLog(formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          alert('Request submitted successfully!');        
        } else if (response.status === 'error') {
          alert('Error: ' + response.message); 
        }
        this.router.navigateByUrl('/ChangeLog', {
          state: { changeOrder: this.changeorder, company: this.companyname }
        });  
      },
      (error) => {
        alert('An unexpected error occurred. Please try again later.');
        console.error(error);
      }
    );
  }
}

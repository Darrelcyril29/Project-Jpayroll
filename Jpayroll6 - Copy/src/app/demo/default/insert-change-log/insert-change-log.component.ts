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
import { stat } from 'fs';


@Component({
  selector: 'app-insert-change-log',
  standalone: true,
  imports: [SharedModule, CKEditorModule, SelectDropDownModule],
  templateUrl: './insert-change-log.component.html',
  styleUrls: ['./insert-change-log.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export default class InsertChangeLogComponent implements OnInit {
  changeOrder1: string | undefined;
  employees: any[] = [];
  InsertChangeLog: FormGroup;
  files: File[] = [];
  changeorder: string
  companyname: string;
  changetype: string;

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
    this.InsertChangeLog = this.fb.group({
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
    const state = this.location.getState();
    console.log(state)
    this.changetype = state['changetype'];
    if (state && state['changeOrder'] && state['companyname']) {
      this.changeorder = state['changeOrder'];
      this.companyname = state['companyname'];

    }
    if (state && state['changeOrder']) {
      this.changeOrder1 = state['changeOrder'];
      this.InsertChangeLog.patchValue({ changeOrder: this.changeOrder1 });
    }
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
      this.InsertChangeLog.patchValue({
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
    if (this.InsertChangeLog.valid) {
      const formData = new FormData();
      formData.append('file', this.files[0]);

      this.userService.uploadFile(formData).subscribe(
        (response) => {
          const payload = {
            changeOrder: this.InsertChangeLog.get('changeOrder')?.value,
            title: this.InsertChangeLog.get('title')?.value,
            comment: this.InsertChangeLog.get('comment')?.value,
            userId: this.InsertChangeLog.get('userId')?.value,
            filePath: response.filePath,
          };
          this.userService.insertChangeLog(payload).subscribe(
            (res) => {
              alert('Form Has been submitted');
              const changeOrderValue = this.InsertChangeLog.get('changeOrder')?.value;
              this.InsertChangeLog.reset({ changeOrder: changeOrderValue });
              const fileInput: HTMLInputElement = document.getElementById(
                'files'
              ) as HTMLInputElement;
              fileInput.value = '';
              this.router.navigateByUrl('/ChangeLog', {
                state: { changeOrder: this.changeorder, company: this.companyname, changetype: this.changetype }
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
      this.InsertChangeLog.markAllAsTouched();
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../Back-End/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ExcelService } from '../Excel/excel.service';
import { Location } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, 
  Essentials, Alignment, FontSize, FontFamily, Highlight, Autoformat,
  Bold, Italic, Strikethrough, Underline, BlockQuote, CKFinder, EasyImage, Heading,
  Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResize,
  Link, List, MediaEmbed, Paragraph, PasteFromOffice, Table, TableToolbar, CKFinderUploadAdapter, UploadAdapter
} from 'ckeditor5';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-order-details',
  standalone: true,
  imports: [SharedModule,CKEditorModule, SelectDropDownModule],
  templateUrl: './change-order-details.component.html',
  styleUrls: ['./change-order-details.component.scss']
})
export default class ChangeOrderDetailsComponent implements OnInit {
  changeRequestForm: FormGroup;
  changeOrder: string | undefined;
  employees: any[] = [];
  files: File[] = [];
  filePath: string;
  today: string;
  minDeliveryDate: string;
  currentUserType: boolean;
  isReadonly = true;
  changeUser: string;
  employeeID : string;
  fileid: number;

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
      Link, List, MediaEmbed, Paragraph, PasteFromOffice, Table, TableToolbar
    ],
    height: '400px',
  };

  selectEmployeeConfig = {
    displayKey: 'label',  
    search: true,       
    placeholder: 'Select Employee',
    moreText: 'More...',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search...',
    valueKey: 'value'
  };

  priorities = [
    { label: 'High', value: 1 },
    { label: 'Moderate', value: 2 },
    { label: 'Low', value: 3 }
  ];

  statusprogresses= [
    { label: 'On Pending', value: 1 },
    { label: 'On Progress', value: 2 },
    { label: 'Completed', value: 3 }
  ]

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private excelService: ExcelService,
    private location: Location,
    private router: Router
  ) {
    this.changeRequestForm = this.fb.group({
      clientId:[''],
      clientName: [''],
      customerAddress: [''],
      changeOrder: [''],
      refNo: [''],
      changeType: [''],
      changeDetails: [''],
      priority: [''],
      mandays: [''],
      deliveryDate: [''],
      comment: [''],
      jpayrollEmployee: [''],
      statusprogress:[''],
      Attachment:['']
    });
  }
  

  ngOnInit(): void {
    this.fetchEmployees();
    const state = this.location.getState();
    if (state && state['changeOrder']) {
      this.changeOrder = state['changeOrder'];
      this.fetchChangeOrderData(this.changeOrder);
    }
    const currentUser = JSON.parse(localStorage.getItem('crud') || '{}');
    this.currentUserType = currentUser;
    const UserId = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.changeUser = UserId.UserId
  }
  
  makeInputsEditable(): void {
    this.isReadonly = !this.isReadonly;
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
  
  fetchChangeOrderData(changeOrder: string) {
    this.userService.getChangeOrderDetails(changeOrder).subscribe(
      (data) => {
        if (data && data.status === 'success' && data.data.length > 0) {
          const orderDetails = data.data[0]; 
          this.employeeID = orderDetails.UserId
          this.fileid = orderDetails.FileId
          this.changeRequestForm.patchValue({
            clientId: orderDetails.ClientId,
            clientName: orderDetails.ClientName,
            customerAddress: orderDetails.FullAddress,
            changeOrder: orderDetails.ChangeOrder,
            refNo: orderDetails.RefNumber,
            changeType: orderDetails.ChangeType,
            changeDetails: orderDetails.ChangeDetails,
            priority: orderDetails.Priority,
            mandays: orderDetails.Mandays,
            deliveryDate: orderDetails.DeliveryDate,
            comment: orderDetails.Comment,
            jpayrollEmployee: orderDetails.UserName,
            statusprogress: orderDetails.StatusProgress,
          });
          this.filePath = `backend/${orderDetails.FilePath}`
        } else {
          console.error('No data found or error in response:', data);
        }
      },
      (error) => {
        console.error('Error fetching change order data:', error);
      }
    );
  }

  updateData() {
    const confirmation = confirm('Are you sure you want to Update this change order?');
    
    if (!confirmation) {
      this.isReadonly = !this.isReadonly;
      return; // Exit if the user cancels
    }
    if (this.changeRequestForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }
  
    if (this.changeRequestForm.valid) {
      const formData: any = {
        clientId: this.changeRequestForm.get('clientId')?.value,
        changeOrder: this.changeRequestForm.get('changeOrder')?.value,
        refNo: this.changeRequestForm.get('refNo')?.value,
        changeType: this.changeRequestForm.get('changeType')?.value,
        changeDetails: this.changeRequestForm.get('changeDetails')?.value,
        priority: this.changeRequestForm.get('priority')?.value,
        mandays: this.changeRequestForm.get('mandays')?.value,
        deliveryDate: this.changeRequestForm.get('deliveryDate')?.value,
        comment: this.changeRequestForm.get('comment')?.value,
        userId: this.changeRequestForm.get('jpayrollEmployee')?.value?.value || this.employeeID,
        statusProgress: this.changeRequestForm.get('statusprogress')?.value,
        fileId: this.fileid, // Default fileId
        UserChange: this.changeUser,
      };
  
      if (this.files.length > 0) {
        const fileUpload = new FormData();
        fileUpload.append('file', this.files[0]);

        this.userService.uploadFiletodatabase(fileUpload).subscribe(
          (response) => {
            formData.fileId = response.fileId; 
            this.callUpdateChangeOrder(formData); 
            this.isReadonly = !this.isReadonly;
          },
          (error) => {
            alert('File upload failed. Please try again.');
            console.error(error);
          }
        );
      } else {
        this.isReadonly = !this.isReadonly;
        this.callUpdateChangeOrder(formData);
      }
    }
  }
  
  callUpdateChangeOrder(formData: any) {
    this.userService.UpdateChangeOrder(formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          alert('Request submitted successfully!');
          this.router.navigate(['/ChangeOrder'], {
          });
        } else if (response.status === 'error') {
          alert('Error: ' + response.message);
        }
      },
      (error) => {
        alert('An unexpected error occurred. Please try again later.');
        console.error(error);
      }
    );
  }
  
  OnDelete() {
    const confirmation = confirm('Are you sure you want to delete this change order?');
    
    if (!confirmation) {
      return; // Exit if the user cancels
    }
  
    const formData = {
      changeOrder: this.changeRequestForm.get('changeOrder')?.value,
      UserChange: this.changeUser
    };
  
    this.userService.DeleteChangeOrder(formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          alert('Request submitted successfully!');
          this.router.navigate(['/ChangeOrder'], {
          });
        } else if (response.status === 'error') {
          alert('Error: ' + response.message); 
          
        }
      },
      (error) => {
        alert('An unexpected error occurred. Please try again later.');
        console.error(error);
      }
    );
  }
  
  
  DownloadReport(){
    if (this.changeRequestForm.valid) {
      const formData = this.changeRequestForm.value;
      console.log(formData)
      this.excelService.generateExcel(formData);
    } else {
      this.changeRequestForm.markAllAsTouched();
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
      this.changeRequestForm.get('Attachment')?.setValue(true); 
    }
  }
  
}

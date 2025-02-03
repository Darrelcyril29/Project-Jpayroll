import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../Back-End/user.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, 
  Essentials, Alignment, FontSize, FontFamily, Highlight, Autoformat,
  Bold, Italic, Strikethrough, Underline, BlockQuote, CKFinder, EasyImage, Heading,
  Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResize,
  Link, List, MediaEmbed, Paragraph, PasteFromOffice, Table, TableToolbar, CKFinderUploadAdapter
} from 'ckeditor5';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-form',
  standalone: true,
  imports: [CKEditorModule, SelectDropDownModule, FormsModule, SharedModule ],
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export default class ChangeFormComponent implements OnInit {
  changeRequestForm: FormGroup;
  clients: any[] = []; 
  employees: any[] = [];
  files: File[] = [];
  filepath: string;
  currentUserType: [];

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
  // 'heading', '|', 'bold', 'italic', 'strikethrough', 'underline', '|',
  // 'alignment', '|', 'fontSize', 'fontFamily', 'highlight', '|',
  // 'bulletedList', 'numberedList', '|', 'link', 'blockQuote', '|',
  // 'imageUpload', 'mediaEmbed', '|', 'insertTable', '|', 'undo', 'redo'

  selectConfig = {
    displayKey: 'ClientName',  
    search: true,            
    placeholder: 'Select Company',
    moreText: 'More...',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search...',
    height:'200px',
  };

  selectEmployeeConfig = {
    displayKey: 'label',  
    search: true,       
    placeholder: 'Select Employee',
    moreText: 'More...',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search...',
    height:'200px',
  };
  

  priorities = [
    { label: 'High', value: 1 },
    { label: 'Moderate', value: 2 },
    { label: 'Low', value: 3 }
  ]

  changeTypeOptions: string[] = ['Formula Assessment', 'Custom Program', 'Other'];
  today: string;
  minDeliveryDate: string;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 1);
    this.minDeliveryDate = todayDate.toISOString().split('T')[0];
    this.today = new Date().toISOString().split('T')[0];

    this.changeRequestForm = this.fb.group({
      clientId: ['', Validators.required],
      clientName: ['', Validators.required],
      customeraddress: [{ value: '', disabled: true }],
      files: [null],
      changeOrder: ['', Validators.required],
      refNo: ['', Validators.required],
      changeType: ['', Validators.required],
      changeDetails: ['', Validators.required],
      priority: ['', Validators.required],
      mandays: ['', [Validators.required, Validators.min(1)]],
      Attachment: [{ value: false, disabled: true }],
      deliveryDate: [this.minDeliveryDate, [Validators.required]],
      comment: ['', Validators.required],
      jpayrollEmployee: ['', Validators.required],
      userId: ['', Validators.required],
      otherChangeDetails: ['']
    });
  }

  ngOnInit(): void {
    const changeOrderId = this.route.snapshot.queryParams['changeOrder'];
    this.fetchClients();
    this.fetchEmployees();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserType = currentUser.UserId;
  }

  fetchClients() {
    this.userService.getClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching clients', error);
      }
    );
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
  
  onCompanyChange(event: any) {
    const selectedClient = event.value;
    if (selectedClient) {
      const selectedClientId = selectedClient.ClientId;
      this.changeRequestForm.patchValue({
        customeraddress: selectedClient.FullAddress 
      });
      const client = this.clients.find(c => c.ClientId === selectedClientId);
      if (client) {
        this.changeRequestForm.get('customeraddress')?.enable();
        this.changeRequestForm.patchValue({
          clientId: selectedClientId,
          customeraddress: client.FullAddress 
        })}
    }else{
      console.error('No client selected!');
    }
  }
  
  onEmployeeChange(event: any) {
    const selectedEmployee = event; 
    if (selectedEmployee) {
      this.changeRequestForm.patchValue({
        jpayrollEmployee: selectedEmployee.value,
        userId: selectedEmployee.value.value
      });
    } else {
      console.error('No employee selected!');
    }
  }

  onSubmit() {
    if(this.changeRequestForm.get('Attachment')?.value == false ){
      alert('Please Upload File');
      return
    }else{
    if (this.changeRequestForm.valid) {
      const formData = new FormData();
      formData.append('file', this.files[0]);

      this.userService.uploadFiletodatabase(formData).subscribe(
        (response: any) => {
          const payload = {
            clientId: this.changeRequestForm.get('clientId')?.value,
            changeOrder: this.changeRequestForm.get('changeOrder')?.value,
            refNo: this.changeRequestForm.get('refNo')?.value,
            changeType: this.changeRequestForm.get('changeType')?.value,
            changeDetails: this.changeRequestForm.get('changeDetails')?.value,
            priority: this.changeRequestForm.get('priority')?.value,
            mandays: this.changeRequestForm.get('mandays')?.value,
            deliveryDate: this.changeRequestForm.get('deliveryDate')?.value,
            comment: this.changeRequestForm.get('comment')?.value,
            userId: this.changeRequestForm.get('userId')?.value,
            otherChangeDetails: this.changeRequestForm.get('otherChangeDetails')?.value || null,
            UserChange: this.currentUserType,
            fileId: response.fileId
          };
          this.userService.insertChangeRequest(payload).subscribe(
            (response: any) => {
              if (response.status === 'success') {
                alert('Form Has been submitted');
                this.router.navigate(['/ChangeOrder'], {
                });
                const fileInput: HTMLInputElement = document.getElementById(
                  'files'
                ) as HTMLInputElement;
                fileInput.value = '';
              } else if (response.status === 'error') {
                alert(response.message); 
              }
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
      this.changeRequestForm.markAllAsTouched();
    }}
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

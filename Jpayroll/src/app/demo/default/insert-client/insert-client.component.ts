import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { CommonModule } from '@angular/common';
import { UserService } from '../Back-End/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-insert-client',
  standalone: true,
  imports: [SelectDropDownModule, CommonModule, ReactiveFormsModule],
  templateUrl: './insert-client.component.html',
  styleUrl: './insert-client.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export default class InsertClientComponent implements OnInit{
  province: any[] = [];
  countries : any[] = [];
  City : any[] = [];
  District : any[] = [];
  SubDistrict : any[] = [];
  clients: any[] = []; 
  clientForm: FormGroup;

  OnCLouds = [
    { label: 'Cloud', value: 1 },
    { label: 'OnPremises', value: 0 },
  ];

  Hybrids = [
    { label: 'Hybrid', value: 1 },
    { label: 'No', value: 0 },
  ];

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.clientForm = this.fb.group({
      CustomerName: ['', Validators.required],
      Address: ['', Validators.required],
      Provinces: ['', Validators.required],
      Country: ['', Validators.required],
      City: ['', Validators.required],
      District: ['', Validators.required],
      SubDistrict: ['', Validators.required],
      PostalCode: ['', Validators.required],
      OnCloud: ['', Validators.required],
      Hybrid: ['', Validators.required],
      CloudName: [''], 
    });
    this.clientForm.get('OnCloud')?.valueChanges.subscribe((value) => {
      if (value === 1) {
        this.clientForm.get('CloudName')?.setValidators(Validators.required);
      } else {
        this.clientForm.get('CloudName')?.clearValidators();
      }
      this.clientForm.get('CloudName')?.updateValueAndValidity();
    });
  }
  

  ngOnInit(): void {
  }



  onSubmit() {
    const confirmation = confirm('Are you sure you want to add client');
    
    if (!confirmation) {
      return; // Exit if the user cancels
    }
    if (this.clientForm.valid) {
      const formData = {
        clientId: crypto.randomUUID(), 
        clientName: this.clientForm.get('CustomerName')?.value,
        countryId: this.clientForm.get('Country')?.value,
        provinceId: this.clientForm.get('Provinces')?.value,
        cityId: this.clientForm.get('City')?.value,
        districtId: this.clientForm.get('District')?.value,
        subDistrictId: this.clientForm.get('SubDistrict')?.value,
        postalCode: this.clientForm.get('PostalCode')?.value,
        address: this.clientForm.get('Address')?.value,
        onCloud: this.clientForm.get('OnCloud')?.value,
        hybrid: this.clientForm.get('Hybrid')?.value,
        cloudName: this.clientForm.get('OnCloud')?.value === 1 ? this.clientForm.get('CloudName')?.value : 'OnPremises',
      };
      this.userService.InsertClient(formData).subscribe(
        (res) => {
          alert('Form has been submmited');
          this.router.navigateByUrl('/ClientStatus', {
            state: {}
          }); 
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

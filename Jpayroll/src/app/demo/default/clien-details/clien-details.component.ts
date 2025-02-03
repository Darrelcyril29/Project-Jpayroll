import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { CommonModule } from '@angular/common';
import { UserService } from '../Back-End/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clien-details',
  standalone: true,
  imports: [SelectDropDownModule, CommonModule, ReactiveFormsModule],
  templateUrl: './clien-details.component.html',
  styleUrl: './clien-details.component.scss'
})
export default class ClienDetailsComponent implements OnInit{
  clientId : string;
  province: any[] = [];
  countries : any[] = [];
  City : any[] = [];
  District : any[] = [];
  SubDistrict : any[] = [];
  clientData: any[] = []; 
  clientDetails: FormGroup;
  currentUserType: boolean;
  isReadonly = false;

  OnCLouds = [
    { label: 'Cloud', value: 1 },
    { label: 'OnPremises', value: 0 },
  ];

  Hybrids = [
    { label: 'Hybrid', value: 1 },
    { label: 'No', value: 0 },
  ];

  constructor(private userService: UserService, private fb: FormBuilder, private location: Location, private router: Router) {
    this.clientDetails = this.fb.group({
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
      CloudName: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    const state = this.location.getState();
    if (state && state['ClientId']) {
      this.clientId = state['ClientId'];
      this.fetchClient(this.clientId);
    }
    const currentUser = JSON.parse(localStorage.getItem('crud') || '{}');
    this.currentUserType = currentUser;
    if(this.currentUserType == false){
      this.isReadonly = true;
    }
  }
  fetchClient(clientID: string): void {
    this.userService.getclientByClientID(clientID).subscribe({
      next: (data: any) => {
        const orderDetails = data.data[0];
        this.clientDetails.patchValue({
          CustomerName: orderDetails.ClientName,
          Address: orderDetails.Address,
          Provinces: orderDetails.ProvinceId,
          Country: orderDetails.CountryId, 
          City: orderDetails.CityId,
          District: orderDetails.DistrictId,
          SubDistrict: orderDetails.SubDistrictId,
          PostalCode: orderDetails.PostalCode,
          OnCloud: orderDetails.OnCloud,
          Hybrid: orderDetails.Hybrid,
          CloudName: orderDetails.CloudName,
        });
      },
      error: (err: any) => {
        console.error('Error in subscription:', err);
      },
    });
  }
  
  onUpdate() {
    if (this.clientDetails.valid) {
      const formData = {
        clientId: this.clientId, 
        clientName: this.clientDetails.get('CustomerName')?.value,
        countryId: this.clientDetails.get('Country')?.value,
        provinceId: this.clientDetails.get('Provinces')?.value,
        cityId: this.clientDetails.get('City')?.value,
        districtId: this.clientDetails.get('District')?.value,
        subDistrictId: this.clientDetails.get('SubDistrict')?.value,
        postalCode: this.clientDetails.get('PostalCode')?.value,
        address: this.clientDetails.get('Address')?.value,
        onCloud: this.clientDetails.get('OnCloud')?.value,
        hybrid: this.clientDetails.get('Hybrid')?.value,
        cloudName: this.clientDetails.get('OnCloud')?.value === 1 ? this.clientDetails.get('CloudName')?.value : 'OnPremises',
      };
      this.userService.UpdateClient(formData).subscribe(
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

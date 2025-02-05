import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { CommonModule } from '@angular/common';
import { UserService } from '../Back-End/user.service';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-insert-client',
  standalone: true,
  imports: [SelectDropDownModule, CommonModule, ReactiveFormsModule],
  templateUrl: './insert-client.component.html',
  styleUrl: './insert-client.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export default class InsertClientComponent implements OnInit{
  clients: any[] = []; 
  clientForm: FormGroup;

  countries = [
    { id: 'ID', name: 'Indonesia' }
  ];

  private allProvinces = [
    { id: 'DKI Jakarta', name: 'DKI Jakarta', countryId: 'ID' },
    { id: 'Jawa Barat', name: 'Jawa Barat', countryId: 'ID' },
    { id: 'Jawa Tengah', name: 'Jawa Tengah', countryId: 'ID' }
  ];

  private allCities = [
    { id: 'Jakarta Selatan', name: 'Jakarta Selatan', provinceId: 'DKI Jakarta' },
    { id: 'Jakarta Pusat', name: 'Jakarta Pusat', provinceId: 'DKI Jakarta' },
    { id: 'Bandung', name: 'Bandung', provinceId: 'Jawa Barat' },
    { id: 'Pulau', name: 'Pulau', provinceId: 'Jawa Barat' },
    { id: 'Semarang', name: 'Semarang', provinceId: 'Jawa Tengah' }
  ];

  private allDistricts = [
    { id: 'Kebayoran Baru', name: 'Kebayoran Baru', cityId: 'Jakarta Selatan' },
    { id: 'Mampang Prapatan', name: 'Mampang Prapatan', cityId: 'Jakarta Selatan' },
    { id: 'Babatan Pantai', name: 'Babatan Pantai', cityId: 'Jakarta Pusat' },
    { id: 'Coblong', name: 'Coblong', cityId: 'Bandung' },
    { id: 'Tembalang', name: 'Tembalang', cityId: 'Semarang' }
  ];

  private allSubDistricts = [
    { id: 'Selong', name: 'Selong', districtId: 'Kebayoran Baru' },
    { id: 'Gandaria', name: 'Gandaria', districtId: 'Kebayoran Baru' },
    { id: 'Dago', name: 'Dago', districtId: 'Coblong' },
    { id: 'Bonggo', name: 'Bonggo', districtId: 'Tembalang' }
  ];

  // Filtered display data
  provinces = this.allProvinces;
  cities = this.allCities;
  districts = this.allDistricts;
  subDistricts = this.allSubDistricts;
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
    this.setupDropdownListeners();
    // Set default country to Indonesia
    this.clientForm.get('Country')?.setValue('ID');
  }

  private setupDropdownListeners() {
    // Country -> Provinces
    this.clientForm.get('Country')?.valueChanges.subscribe(countryId => {
      this.provinces = this.allProvinces.filter(p => p.countryId === countryId);
      this.resetDependentControls(['Provinces', 'City', 'District', 'SubDistrict']);
    });

    // Province -> Cities
    this.clientForm.get('Provinces')?.valueChanges.subscribe(provinceId => {
      this.cities = this.allCities.filter(c => c.provinceId === provinceId);
      this.resetDependentControls(['City', 'District', 'SubDistrict']);
    });

    // City -> Districts
    this.clientForm.get('City')?.valueChanges.subscribe(cityId => {
      this.districts = this.allDistricts.filter(d => d.cityId === cityId);
      this.resetDependentControls(['District', 'SubDistrict']);
    });

    // District -> SubDistricts
    this.clientForm.get('District')?.valueChanges.subscribe(districtId => {
      this.subDistricts = this.allSubDistricts.filter(sd => sd.districtId === districtId);
      this.clientForm.get('SubDistrict')?.reset();
    });
  }

  private resetDependentControls(controls: string[]) {
    controls.forEach(control => {
      this.clientForm.get(control)?.reset();
    });
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
      this.clientForm.markAllAsTouched();
    }
  }
}

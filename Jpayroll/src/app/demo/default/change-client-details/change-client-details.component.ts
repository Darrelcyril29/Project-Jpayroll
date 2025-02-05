import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from '../Back-End/user.service'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-client-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './change-client-details.component.html',
  styleUrls: ['./change-client-details.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export default class ChangeClientDetailsComponent {

  rows: any[] = []; 
  pageSize = 5;
  pageSizes = [5, 10, 15, 20, 25, 30, 35];
  page = { offset: 0 };
  paginatedRows: any[] = [];
  filteredRows: any[] = [];
  clientId: string | undefined;
  currentUserType: boolean;

  searchTerm = ''; 
  clientName: string | undefined;

  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedRow: any;

  getStatusClass(status: string): string {
    switch (status) {
      case 'On Pending':
        return 'status-pending';
      case 'On Progress':
        return 'status-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  }  

  constructor(
    private dataService: UserService,  
    private router: Router,
    private location: Location) {}

  ngOnInit() {
    const state = this.location.getState();
    if (state && state['ClientId']) {
      this.clientId = state['ClientId'];
      this.fetchData(this.clientId);
    }
    const currentUser = JSON.parse(localStorage.getItem('crud') || '{}');
    this.currentUserType = currentUser;
  }

  fetchData(ClientId: string) {
    this.dataService.getChangeClient(ClientId).subscribe(
      (response) => {
        if (response && Array.isArray(response.data)) {
          this.rows = response.data;
          this.filteredRows = [...this.rows];
          this.paginatedRows = this.getPaginatedRows();
          if (this.rows.length > 0) {
            this.clientName = this.rows[0].ClientName;
          }
        } else {
          console.error('Invalid data format:', response);
        }
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }


  onPage(event: any) {
    this.page.offset = event.offset;
    this.paginatedRows = this.getPaginatedRows();
  }

  onPreviousPage() {
    if (this.page.offset > 0) {
      this.page.offset--;
      this.paginatedRows = this.getPaginatedRows();
    }
  }

  onNextPage() {
    if (this.page.offset < Math.ceil(this.filteredRows.length / this.pageSize) - 1) {
      this.page.offset++;
      this.paginatedRows = this.getPaginatedRows();
    }
  }

  onPageSizeChange(event: any) {
    this.page.offset = 0;
    this.pageSize = Number(event.target.value);
    this.paginatedRows = this.getPaginatedRows();
  }

  getPaginatedRows() {
    const start = this.page.offset * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredRows.slice(start, end);
  }

  isLastPage() {
    return this.page.offset >= Math.ceil(this.filteredRows.length / this.pageSize) - 1;
  }

  onRowClick(event: any) {
    if (event.type === 'click') {
      const row = event.row;
      alert(`You clicked on ${row.ChangeOrder}`);
    }
  }

  onSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredRows = this.rows.filter(row => 
      row.ChangeType.toLowerCase().includes(searchTermLower) ||
      row.ChangeOrder.toLowerCase().includes(searchTermLower) ||
      row.RefNumber.toLowerCase().includes(searchTermLower) ||
      row.StatusProgress.toLowerCase().includes(searchTermLower)
    );
    this.page.offset = 0; 
    this.paginatedRows = this.getPaginatedRows(); 
  }

  onContextMenu(event: MouseEvent, row: any) {
    event.preventDefault(); // Prevent the default right-click menu
    this.contextMenuVisible = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.selectedRow = row;
  }
  
  openChangeDetail(changeOrder: string) {
    this.router.navigate(['/ChangeDetails'], {
      state: { changeOrder }
    });
  }

  onChangeLogClick(changeOrder: string, company: string, refno: string, changeType: string) {
    this.router.navigate(['/ChangeLog'], {
      state: { changeOrder, company, refno, changeType }
    });
  }
  

  // Close the context menu on any other click
  @HostListener('document:click')
  closeContextMenu() {
    this.contextMenuVisible = false;
  }
}

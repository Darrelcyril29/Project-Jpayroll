import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from '../Back-End/user.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-order',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './change-order.component.html',
  styleUrl: './change-order.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export default class ChangeOrderComponent {
  rows = []; 
  pageSize = 5;
  pageSizes = [5, 10, 15, 20, 25, 30, 35];
  page = { offset: 0 };
  paginatedRows = [];
  filteredRows = [];

  searchTerm = ''; 

  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedRow: any;

  currentUserType: boolean;

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
  constructor(private dataService: UserService , private router: Router) {}

  ngOnInit() {
    this.fetchData();
    const currentUser = JSON.parse(localStorage.getItem('crud') || '{}');
    this.currentUserType = currentUser;
  }

  fetchData() {
    this.dataService.getChangeOrder().subscribe(
      (data) => {
        this.rows = data;
        this.filteredRows = [...this.rows];
        this.paginatedRows = this.getPaginatedRows();
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

  // Method to handle row click
  onRowClick(event: any) {
    if (event.type === 'click') {
      const row = event.row;
      console.log('Row clicked:', row);
      alert(`You clicked on ${row.ChangeOrder}`);
    }
  }

  // Search function to filter rows
  onSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredRows = this.rows.filter(row => 
      row.ClientName.toLowerCase().includes(searchTermLower) || 
      row.StatusProgress.toLowerCase().includes(searchTermLower) ||
      row.ChangeType.toLowerCase().includes(searchTermLower) ||
      row.ChangeOrder.toLowerCase().includes(searchTermLower) ||
      row.RefNumber.toLowerCase().includes(searchTermLower) 
    );
    this.page.offset = 0; 
    this.paginatedRows = this.getPaginatedRows(); 
  }



  onContextMenu(event: MouseEvent, row: any) {
    event.preventDefault(); 
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
  
  onAdd() {
    this.router.navigate(['/ChangeForm'], {
    });
  }
  

  @HostListener('document:click')
  closeContextMenu() {
    this.contextMenuVisible = false;
  }

}
import { Component, ViewEncapsulation, OnInit, HostListener  } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserService } from '../Back-End/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-status',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './client-status.component.html',
  styleUrl: './client-status.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export default class ClientStatusComponent implements OnInit{
  rows = []; 
  pageSize = 5;
  pageSizes = [5, 10, 15, 20, 25, 30, 35];
  page = { offset: 0 };
  paginatedRows = [];
  filteredRows = [];
  currentUserType: boolean;

  searchTerm = '';

  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedRow: any;

  constructor(private dataService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchData();
    const currentUser = JSON.parse(localStorage.getItem('crud') || '{}');
    this.currentUserType = currentUser;
  }

  fetchData() {
    this.dataService.getClients().subscribe(
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
    // Reset to the first page when page size changes
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


  // Search function to filter rows
  onSearch() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredRows = this.rows.filter(row => 
      row.CloudName.toLowerCase().includes(searchTermLower) ||
      row.ClientName.toLowerCase().includes(searchTermLower) ||
      row.OnPremise.toLowerCase().includes(searchTermLower) ||
      row.HybridStatus.toLowerCase().includes(searchTermLower)
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
  
  openClientChangeOrder(ClientId: string) {
    this.router.navigate(['/ChangeClient'], {
      state: { ClientId }
    });
  }

  openClientDetail(ClientId: string) {
    this.router.navigate(['/ClientDetails'], {
      state: { ClientId }
    });
  }

  onAdd() {
    this.router.navigate(['/InsertClient'], {
    });
  }
  // Close the context menu on any other click
  @HostListener('document:click')
  closeContextMenu() {
    this.contextMenuVisible = false;
  }
}

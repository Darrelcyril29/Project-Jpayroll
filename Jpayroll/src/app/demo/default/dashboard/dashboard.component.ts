// angular import
import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../Back-End/user.service';  // Import the service
import { Router } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlyBarChartComponent } from './monthly-bar-chart/monthly-bar-chart.component';
import { IncomeOverviewChartComponent } from './income-overview-chart/income-overview-chart.component';
import { AnalyticsChartComponent } from './analytics-chart/analytics-chart.component';
import { SalesReportChartComponent } from './sales-report-chart/sales-report-chart.component';

// icons
import { IconService } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class DefaultComponent {
  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedRow: any;
  currentUserType: boolean;

  constructor(private iconService: IconService, 
    private dataService: UserService,
    private router: Router) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }
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
  
  Progress = [
  ];

  transaction = [

  ];

  columns = [
    { prop: 'ChangeOrder', name: 'Change Order' },
    { prop: 'ClientName', name: 'Company Name' },
    { prop: 'StatusProgress', name: 'Status' }
  ];

  rows = [];  // Data will come from the API
  pageSize = 5;
  pageSizes = [5, 10, 15, 20, 25, 30, 35];
  page = { offset: 0 };
  paginatedRows = [];
  filteredRows = [];

  searchTerm = ''; // Search term for filtering

  ngOnInit() {
    this.fetchData();
    this.fetchProgress();
    this.fetchRecentChangeOrder();
    const currentUser = JSON.parse(localStorage.getItem('crud') || '{}');
    this.currentUserType = currentUser;
  }

  fetchProgress() {
    this.dataService.getStatusProgress().subscribe(
      (data) => {
        this.Progress = data;
      },
      (error) => {
        console.error('Error fetching clients', error);
      }
    );
  }

  fetchRecentChangeOrder(){
    this.dataService.getRecentChangeOrderLog().subscribe(
      (data) => {
        this.transaction = data;
      },
      (error) => {
        console.error('Error fetching recent transactions:', error);
      }
    );
    
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
      row.ClientName.toLowerCase().includes(searchTermLower) || 
      row.StatusProgress.toLowerCase().includes(searchTermLower) ||
      row.ChangeOrder.toLowerCase().includes(searchTermLower)
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

  onChangeLogClick(changeOrder: string, company: string) {
    this.router.navigate(['/ChangeLog'], {
      state: { changeOrder, company }
    });
  }
  @HostListener('document:click')
  closeContextMenu() {
    this.contextMenuVisible = false;
  }
}
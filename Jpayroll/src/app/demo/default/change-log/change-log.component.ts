import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../Back-End/user.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Location } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {ClassicEditor} from 'ckeditor5';
import { ReportChangeLogService } from '../services/report-change-log.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import html2pdf from 'html2pdf.js';



@Component({
  selector: 'app-change-log',
  standalone: true,
  imports: [SharedModule, CKEditorModule],
  templateUrl: './change-log.component.html',
  styleUrls: ['./change-log.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export default class ChangeLogComponent implements OnInit {
  changeOrderId: string | undefined;
  companyname: string | undefined;
  changeOrderData: any[] = [];
  changetype: string;

  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: [], 
    isReadOnly: true, 
  };

  constructor(
    private userService: UserService,
    private reportChangeLogService: ReportChangeLogService,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  ngOnInit(): void {
    const state = this.location.getState();
    console.log(state)
    this.changetype = state['changeType']
    console.log(this.changetype)
    if (state && state['changeOrder'] && state['company']) {
      this.changeOrderId = state['changeOrder'];
      this.companyname = state['company'];
  
      // Fetch data using the retrieved values
      this.fetchChangeOrderData(this.changeOrderId);
    }
  }
  
  // Fetch data from the backend API that calls the stored procedure
  fetchChangeOrderData(changeOrder: string): void {
    this.userService.GetChangeLogDataByChangeOrder(changeOrder).subscribe(
      (data) => {
        if (data && data.status === 'success' && data.data.length > 0) {
          this.changeOrderData = data.data;
          console.log(this.changeOrderData)
        } else {
          console.error('No data found or error in response:', data);
        }
      },
      (error) => {
        console.error('Error fetching change order data:', error);
      }
    );
  }

  navigateToAddChangeLog(): void {
    this.router.navigate(['/InsertChangeLog'], {
      state: { changeOrder: this.changeOrderId, companyname: this.companyname, changetype: this.changetype }
    });
  }

  navigateToChangeLogDetails(ChangeLogId: number, CompanyName: string): void {
    this.router.navigate(['/ChangeLogDetails'], {
      state: { ChangeLogId, CompanyName }
    });
  }

  downloadExcel(): void {
    if (this.changeOrderId) {
      this.reportChangeLogService.downloadExcel(this.changeOrderId, this.changeOrderData, this.companyname, this.changetype);
    }
  }
  parseHtmlToText(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;


  // Convert to plain text for the table
  const plainText = tempDiv.textContent || '';
  html2pdf()
    .from(tempDiv)
    .outputPdf('dataurlnewwindow');

  return plainText;
}

downloadPdf(): void {
  const doc = new jsPDF('landscape'); 
  const img = new Image();
  img.src = '../../../assets/images/JpayrollLogo.png';

  // Define margins and logo dimensions
  const margin = 10;
  const logoWidth = 50;
  const logoHeight = 15;

  // Add the logo at the top left
  doc.addImage(img, 'PNG', margin, margin, logoWidth, logoHeight);

  doc.setFontSize(16);
  const textX = margin + logoWidth + 10;
  const textY = margin + logoHeight / 2 + 5;
  doc.text(`Change Log List - ${this.companyname}`, textX, textY);

  // Add a subtitle below the header
  const subtitleY = margin + logoHeight + 15;
  doc.setFontSize(12);
  doc.text(
    `Change Order: ${this.changeOrderId}   Change Type: ${this.changetype}`,
    margin,
    subtitleY
  );

  // Prepare table data
  const tableData = this.changeOrderData.map(item => [
    item.Title || '',
    item.UploadDate || '',
    item.Comment || '',
    item.UserName || '',
  ]);

  // Render table starting below the header and subtitle
  const startY = subtitleY + 5;
  (doc as any).autoTable({
    startY,
    head: [['Title', 'Timestamp', 'Comment', 'Employee']],
    body: tableData.map(row => [
      row[0],
      row[1],
      { content: this.convertHtmlToRichText(row[2]), styles: { halign: 'left' } },
      row[3],
    ]),
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [22, 160, 133],
      textColor: [255, 255, 255],
    },
  });

  // Save the PDF
  doc.save(`Change_Log_${this.changeOrderId}.pdf`);
}
  
  // Helper function to parse HTML into rich-text-compatible content for jsPDF
  convertHtmlToRichText(html: string): string {
    // Use html2pdf.js to convert HTML to plain text with formatting
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
  
    // Convert HTML elements into readable text
    const boldTags = tempDiv.querySelectorAll('b, strong');
    boldTags.forEach(el => {
      el.textContent = `**${el.textContent}**`; // Wrap bold text in **
    });
  
    const italicTags = tempDiv.querySelectorAll('i, em');
    italicTags.forEach(el => {
      el.textContent = `*${el.textContent}*`; // Wrap italic text in *
    });
  
    const listTags = tempDiv.querySelectorAll('ul, ol');
    listTags.forEach(el => {
      el.querySelectorAll('li').forEach((li, index = 0) => {
        const prefix = el.tagName === 'OL' ? `.\n${index + 1}. ` : '- ';
        li.innerHTML = `${prefix}${li.textContent}`;
      });
    });
    
  
    // Use html2pdf.js to further process the HTML if needed
    const plainText = tempDiv.textContent || '';
    return plainText; // Return the parsed and styled plain text
  }
  
  
}

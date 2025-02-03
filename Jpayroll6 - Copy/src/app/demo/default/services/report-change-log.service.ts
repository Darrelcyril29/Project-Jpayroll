import { Injectable } from '@angular/core';
import { AlignLeftOutline } from '@ant-design/icons-angular/icons';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as HtmlParser from 'htmlparser2'; 

@Injectable({
  providedIn: 'root',
})
export class ReportChangeLogService {
  constructor() {}

  /**
   * Generates and downloads an Excel file from the provided data.
   * @param changeOrderId - The ID of the change order (used for filename).
   * @param data - The array of data to be included in the Excel file.
   */
  async downloadExcel(changeOrderId: string, data: any[], companyName: string, changeType: string): Promise<void> {
    if (data && data.length > 0) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Change Log');
  
      // Add Company Name Header
      const companyHeaderRow = worksheet.addRow([`Change Log List - ${companyName}`]);
      companyHeaderRow.font = { bold: true, size: 14 };
      companyHeaderRow.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.mergeCells(`A1:D1`); // Merge cells for the header
  
      const detailsrow = worksheet.addRow([`Change Order: ${changeOrderId}  Change Type: ${changeType}`]);
      detailsrow.font = { bold: true, size: 12 };
      detailsrow.alignment = { horizontal: 'center', vertical: 'middle' };
      worksheet.mergeCells(`A2:D2`);
      // Leave a blank row
      worksheet.addRow([]);

      const headerRow = worksheet.addRow(['Title', 'Timestamp', 'Comment', 'Employee']);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });


      data.forEach((entry) => {
        const row = worksheet.addRow([]);
        row.getCell(1).value = entry.Title;
        row.getCell(2).value = entry.UploadDate;
        row.getCell(3).value = {
          richText: this.parseRichText(entry.Comment),
        };
        row.getCell(4).value = entry.UserName;
        row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        row.getCell(2).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        row.getCell(3).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        row.getCell(4).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      });
      

      worksheet.columns = [
        { width: 30 }, // Title
        { width: 20 }, // Timestamp
        { width: 50 }, // Comment
        { width: 20 }, // Employee
      ];

      // Generate Excel file buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Save the file using FileSaver
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `ChangeLog_${changeOrderId}.xlsx`);
    } else {
      alert('No data available to export.');
    }
  }

  /**
   * Parses an HTML string into ExcelJS rich text format.
   * @param html - The HTML string to parse.
   * @returns An array of rich text objects.
   */
  private parseRichText(html: string): ExcelJS.RichText[] {
    const richTextArray: ExcelJS.RichText[] = [];
    const currentFont: Partial<ExcelJS.Font> = {};
    let isInsideList = false;
  
    // Parse the HTML string
    const parser = new HtmlParser.Parser({
      ontext(text) {
        if (text.trim()) {
          // Add bullet point if inside a list
          const prefix = isInsideList ? '• ' : '';
          richTextArray.push({
            text: `${prefix}${text}`,
            font: { ...currentFont },
          });
        }
      },
      onclosetag(name) {
        if (name === 'li' && isInsideList) {
          // Add a line break after each <li>
          richTextArray.push({ text: '\n' });
        }
  
        // Reset styles or flags when tags are closed
        if (name === 'b' || name === 'strong') currentFont.bold = false;
        if (name === 'i' || name === 'em') currentFont.italic = false;
        if (name === 'u') currentFont.underline = false;
  
        if (name === 'ul' || name === 'ol') isInsideList = false;
      },
      onopentag(name) {
        // Handle opening tags and update font styles or flags
        if (name === 'b' || name === 'strong') currentFont.bold = true;
        if (name === 'i' || name === 'em') currentFont.italic = true;
        if (name === 'u') currentFont.underline = true;
  
        if (name === 'ul' || name === 'ol') isInsideList = true;
      },
    });
  
    parser.write(html);
    parser.end();
  
    return richTextArray;
  }  
}

import { Injectable } from '@angular/core';
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
   * @param companyName - Name of the company.
   * @param changeType - Type of the change (e.g., "Enhancement", "Bug Fix", etc.).
   */
  async downloadExcel(
    changeOrderId: string,
    data: any[],
    companyName: string,
    changeType: string
  ): Promise<void> {
    if (!data || data.length === 0) {
      alert('No data available to export.');
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Change Log');

    // 1) Insert the Jpayroll image at the top-left
    try {
      const filePath = '../../../assets/images/JpayrollLogo.png'; // Adjust path if needed
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();

      const imageId = workbook.addImage({
        buffer: arrayBuffer,
        extension: 'png',
      });

      // Place the image in the top-left corner (row: 0, col: 0),
      // sized roughly to fit in a single cell. Adjust as you like.
      worksheet.addImage(imageId, {
        tl: { col: 0, row: 0 },
        ext: { width: 120, height: 40 },
        
      });
    } catch (error) {
      console.error('Error loading image:', error);
    }
    worksheet.mergeCells('A1:B2');
    

    worksheet.mergeCells('C1:D1');
    worksheet.getCell('C1').value = 'Change Order';
    worksheet.getCell('C1').font = { bold: true, size: 14 };
    worksheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('C2:D2');
    worksheet.getCell('C2').value = changeOrderId;
    worksheet.getCell('C2').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getCell('A3').value = 'Company Name';
    worksheet.getCell('A3').font = { bold: true, size: 14 };
    worksheet.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getCell('B3').value = companyName;
    worksheet.getCell('B3').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getCell('C3').value = 'Change Type';
    worksheet.getCell('C3').font = { bold: true, size: 14 };
    worksheet.getCell('C3').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.getCell('D3').value = changeType;
    worksheet.getCell('D3').alignment = { vertical: 'middle', horizontal: 'center' };
   

    // 4) Blank row (Row 3)
    worksheet.addRow([]);

    // 5) "Project Information" block (Row 4 as a merged black header)
    worksheet.mergeCells('A4:D4');
    const projectInfoCell = worksheet.getCell('A4');
    projectInfoCell.value = 'Project Information';
    projectInfoCell.alignment = { horizontal: 'center' };
    projectInfoCell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    projectInfoCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF000000' }, // black fill
    };

    // 8) Table header row (Row 9) => Title | Timestamp | Comment | Employee
    const headerRow = worksheet.addRow(['Title', 'Timestamp', 'Comment', 'Employee']);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // 9) Populate table rows with data
    data.forEach((entry) => {
      const row = worksheet.addRow([]);
      row.getCell(1).value = entry.Title;
      row.getCell(2).value = entry.UploadDate;
      row.getCell(3).value = {
        richText: this.parseRichText(entry.Comment),
      };
      row.getCell(4).value = entry.UserName;

      // Alignment
      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      row.getCell(2).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      row.getCell(3).alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
      row.getCell(4).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    });

    // 10) Adjust column widths
    worksheet.columns = [
      { width: 30 }, // Title
      { width: 20 }, // Timestamp
      { width: 50 }, // Comment
      { width: 20 }, // Employee
    ];

    // 11) Generate Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // 12) Save the file
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `ChangeLog_${changeOrderId}.xlsx`);
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
        const trimmed = text.trim();
        if (trimmed) {
          // Add bullet point if inside a list
          const prefix = isInsideList ? '• ' : '';
          richTextArray.push({
            text: `${prefix}${trimmed}`,
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

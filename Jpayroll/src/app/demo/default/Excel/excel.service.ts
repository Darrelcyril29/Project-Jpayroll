import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import * as HtmlParser from 'htmlparser2'; 

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  async generateExcel(formData: any) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.columns = [
      { key: 'A', width: 2 },  
      { key: 'B', width: 20 }, 
      { key: 'C', width: 20 }, 
      { key: 'D', width: 10 }, 
      { key: 'E', width: 20 }, 
      { key: 'F', width: 25 }, 
    ];

    const filePath = '../../../assets/images/JpayrollLogo.png'
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
  
      // Add the image to the workbook
      const imageId = workbook.addImage({
        buffer: arrayBuffer, 
        extension: 'png',
      });
  

      worksheet.addImage(imageId, {
        tl: { col: 1, row: 0 },
        ext: { width: 150, height: 40 }, 
      });
    } catch (error) {
      console.error('Error loading image:', error);
    }
    worksheet.mergeCells('B1:D2');
    // "Change Order" title
    worksheet.mergeCells('E1:F1');
    worksheet.getCell('E1').value = 'Change Order';
    worksheet.getCell('E1').font = { bold: true, size: 14 };
    worksheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'right' };

    // Ref No.
    worksheet.mergeCells('E2:F2');
    worksheet.getCell('E2').value = formData.changeOrder;
    worksheet.getCell('E2').alignment = { vertical: 'middle', horizontal: 'right' };

    // Fill for Project Information
    worksheet.mergeCells('B3:F3');
    worksheet.getCell('B3').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } };

    // Project Information
    worksheet.getCell('B3').value = 'Project Information';
    worksheet.getCell('B3').alignment = { horizontal: 'center' };
    worksheet.getCell('B3').font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Customer Name
    worksheet.getCell('B4').value = 'Customer Name';
    worksheet.getCell('C4').value = formData.clientName || '';
    worksheet.mergeCells('C4:D4');

    // Customer Address
    worksheet.getCell('B5').value = 'Customer Address';
    worksheet.getCell('C5').value = formData.customerAddress || '';
    worksheet.mergeCells('C5:F5');
    // Ref No
    worksheet.getCell('E4').value = 'Ref No';
    worksheet.getCell('E4').alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.mergeCells('F4:F4');

    worksheet.getCell('F4').value = formData.refNo || '';

    // Fill for Change Order Information
    worksheet.mergeCells('B7:F7');
    worksheet.getCell('B7').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } };

    // Change Order Information
    worksheet.getCell('B7').value = 'Change Order Information';
    worksheet.getCell('B7').alignment = { horizontal: 'center' };
    worksheet.getCell('B7').font = { bold: true, color: { argb: 'FFFFFFFF' } };

    // Additional details and layout
    worksheet.getCell('B8').value = 'Change Type';
    worksheet.getCell('B9').value = 'Change Details';
    worksheet.getCell('B10').value = 'Priority';
    worksheet.getCell('B11').value = 'Mandays';
    worksheet.getCell('B12').value = 'Delivery Date';
    worksheet.getCell('B13').value = 'Comments';

    worksheet.getCell('C8').value = formData.changeType; 
    worksheet.getCell('C9').value = {
      richText: this.parseRichText(formData.changeDetails),
    };
    const richText = this.parseRichText(formData.changeDetails);
    const richTextLines = richText
      .map((rt) => rt.text)
      .join('') 
      .split('\n').length; 
    
    const approxWidth = richText.reduce((total, rt) => total + rt.text.length, 0) / 40; 
    const totalLines = Math.ceil(richTextLines + approxWidth);
    
    worksheet.getRow(9).height = Math.max(20, totalLines * 15);
    worksheet.getCell('C9').alignment = { wrapText: true };
    if(formData.priority = 1){
      formData.priority = 'High'
    }
    else if(formData.priority = 2){
      formData.priority = 'Medium'
    }
    else{
      formData.priority = 'Low'
    }
    worksheet.getCell('C10').value = formData.priority || '';
    worksheet.getCell('C11').value = formData.mandays || '';
    worksheet.getCell('C12').value = formData.deliveryDate || '';
    worksheet.getCell('C13').value = {
      richText: this.parseRichText(formData.comment),
    };
    const richTextcomment = this.parseRichText(formData.comment);
    const richTextLinescomment = richTextcomment
      .map((rt) => rt.text)
      .join('') 
      .split('\n').length; 
    
    const approxWidthcomment = richTextcomment.reduce((total, rt) => total + rt.text.length, 0) / 40; 
    const totalLinescomment = Math.ceil(richTextLinescomment + approxWidthcomment);
    
    worksheet.getRow(13).height = Math.max(20, totalLinescomment * 15);
    worksheet.getCell('C13').alignment = { wrapText: true };
    
    worksheet.mergeCells('C8:F8');
    worksheet.mergeCells('C9:F9');
    worksheet.mergeCells('C10:F10');
    worksheet.mergeCells('C11:F11');
    worksheet.mergeCells('C12:F12');
    worksheet.mergeCells('C13:F13');

    // Fill for Sign Offs
    worksheet.mergeCells('B15:F15');
    worksheet.getCell('B15').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } };

    // Sign Offs
    worksheet.getCell('B15').value = 'Sign Offs';
    worksheet.getCell('B15').alignment = { horizontal: 'center' };
    worksheet.getCell('B15').font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.mergeCells('B16:F19');
    worksheet.getCell('B16:F19').border = {left: { style: 'thin' }, right: { style: 'thin' }}

    // Jpayroll
    worksheet.getCell('C20').value = formData.jpayrollEmployee || '';
    worksheet.getCell('C20').alignment = { horizontal: 'center' };
    worksheet.getCell('C20').border = {top: { style: 'thin' }, bottom: { style: 'thin' }}

    // Customer
    worksheet.getCell('E20').value = formData.clientName || '';
    worksheet.getCell('E20').alignment = { horizontal: 'center' };
    worksheet.getCell('E20').border = {top: { style: 'thin' }, bottom: { style: 'thin' }}

    worksheet.getCell('B20').border = {bottom: { style: 'thin' }, left: { style: 'thin' }}
    worksheet.getCell('D20').border = {bottom: { style: 'thin' }}
    worksheet.getCell('F20').border = {bottom: { style: 'thin' }, right: { style: 'thin' }}

    // Apply borders to all cells except those in column A
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        if (colNumber > 1 && rowNumber < 14) {  // Skip column A
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        }
      });
    });

    // Save the workbook
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'ChangeOrderTemplate.xlsx');
  }


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
          
          // Split text by newline characters and handle each line separately
          const lines = text.split('\n');
          lines.forEach((line, index) => {
            if (line.trim()) {
              richTextArray.push({
                text: `${prefix}${line}`,
                font: { ...currentFont },
              });
            }
  
            // Add a line break between lines, except after the last one
            if (index < lines.length - 1) {
              richTextArray.push({ text: '\n' });
            }
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

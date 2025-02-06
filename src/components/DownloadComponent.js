import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { parse } from 'json2csv';

const DownloadComponent = ({ data }) => {
  
  // Function to download CSV
  const downloadCSV = () => {
    try {
      const csv = parse(data); // Convert JSON to CSV format
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.csv';
      a.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Error generating CSV:', error);
    }
  };

  // Function to download XLSX
  const downloadXLSX = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(data); // Convert JSON data to sheet
      const wb = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Orders'); // Append sheet to workbook
      const fileName = 'orders.xlsx';
      XLSX.writeFile(wb, fileName); // Export XLSX file
    } catch (error) {
      console.error('Error generating XLSX:', error);
    }
  };

  // Function to download XLS
  const downloadXLS = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Orders');
      const fileName = 'orders.xls';
      XLSX.writeFile(wb, fileName, { bookType: 'xls' }); // Export XLS file
    } catch (error) {
      console.error('Error generating XLS:', error);
    }
  };

  // Handle Download Based on Selected Format
  const handleDownload = (format) => {
    if (format === 'csv') {
      downloadCSV();
    } else if (format === 'xlsx') {
      downloadXLSX();
    } else if (format === 'xls') {
      downloadXLS();
    }
  };

  return (
    <div className="d-flex justify-content-end gap-3" >
      {/* Dropdown to select file type */}
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" id="download-dropdown" >
          Download Report
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as="button" onClick={() => handleDownload('csv')} >
            Download as CSV
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => handleDownload('xlsx')} >
            Download as XLSX
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={() => handleDownload('xls')} >
            Download as XLS
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DownloadComponent;

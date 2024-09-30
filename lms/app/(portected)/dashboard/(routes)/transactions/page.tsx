"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { DatePicker } from "@/components/ui/date-picker";
//@ts-ignore
import { saveAs } from "file-saver";
//@ts-ignore
import Papa from "papaparse";
import { PDFDocument, rgb } from 'pdf-lib';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

const TransactionsPage = () => {
  const [startDate, setStartDate] =  useState<Date | null>(null)
  const [endDate, setEndDate] =  useState<Date | null>(null)
  const [purchaseData, setPurchaseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
  
      // Add optional query parameters if they exist
      if (startDate && endDate) {
        params.append('startDate', startDate.toISOString());
        params.append('endDate', endDate.toISOString());
      }
      if (name) {
        params.append('name', name);
      }
  
      // Construct the API URL with query parameters
      const url = `/api/purchases?${params.toString()}`;
      
      // Fetch data from API
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching purchases: ${response.statusText}`);
      }
  
      const data = await response.json();
      setPurchaseData(data);
    } catch (error) {
      console.error("Error fetching purchase data:", error);
    } finally {
      setLoading(false);  // Always stop loading, even if there's an error
    }
  };

  const downloadCSV = () => {
    if (!Array.isArray(purchaseData)) {
      console.error("purchaseData should be an array of objects.");
      return;
    }
  
    // Prepare CSV data with headers (No., User, Course, Price)
    const csvData = purchaseData.map((purchase:any, index) => ({
      No: index + 1,                     // No.
      Student: purchase.user.name,           // User
      Course: purchase.course.title,      // Course
      Teacher: purchase.course.user.name ,      // Price
      price: purchase.course.price  + " $"  ,    // Price
      Fee: purchase.platformFee  + " $"   ,   // Price
      teacherRevenue: purchase?.teacherRevenue  + " $"      // Price
    }));
  
    // Convert the prepared data to CSV format
    const csv = Papa.unparse(csvData);
  
    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  
    // Save the CSV file
    saveAs(blob, "purchase_report.csv");
  };
  

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]);  // Standard A4 size (width, height in points)
  
    // Header
    page.drawText('Purchase Report', {
      x: 50,
      y: 800,  // Start higher on the page
      size: 20,
      color: rgb(0, 0, 0),
    });
  
    // Table column headers
    const headers = ['No.', 'Student', 'Course', 'Teacher', 'Price', 'Fee', 'Teacher R.'];
    const margin = 50;      // Left and right margin
    const availableWidth = 595 - 2 * margin;  // Available width for table
    const colXPositions = [margin, 100, 200, 300, 400, 450, 500];  // Adjusted column x positions
    const rowHeight = 25;   // Adjusted row height for better spacing
    const tableStartY = 750; // Set a starting position below headers
  
    // Draw table headers
    headers.forEach((header, index) => {
      page.drawText(header, {
        x: colXPositions[index],
        y: tableStartY,
        size: 12,
        color: rgb(0, 0, 0),
      });
    });
  
    // Draw rows of purchase data
    purchaseData.forEach((purchase:any, rowIndex) => {
      const rowY = tableStartY - (rowIndex + 1) * rowHeight;
  
      // Check if we need to add a new page
      if (rowY < 50) { // If the Y position is too low, create a new page
        page = pdfDoc.addPage([595, 842]);
        page.drawText('Purchase Report', {
          x: 50,
          y: 800,
          size: 20,
          color: rgb(0, 0, 0),
        });
        // Re-draw headers on the new page
        headers.forEach((header, index) => {
          page.drawText(header, {
            x: colXPositions[index],
            y: tableStartY,
            size: 12,
            color: rgb(0, 0, 0),
          });
        });
      }
  
      // Draw each cell of the row
      page.drawText(`${rowIndex + 1}`, {
        x: colXPositions[0],
        y: rowY,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(purchase.user.name, {
        x: colXPositions[1],
        y: rowY,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(purchase.course.title, {
        x: colXPositions[2],
        y: rowY,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(purchase.course.user.name, {
        x: colXPositions[3],
        y: rowY,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(`$${purchase.course.price.toFixed(2)}`, {
        x: colXPositions[4],
        y: rowY,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(`$${purchase.platformFee.toFixed(2)}`, {
        x: colXPositions[5],
        y: rowY,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(`$${purchase.teacherRevenue.toFixed(2)}`, {
        x: colXPositions[6],
        y: rowY,
        size: 12,
        color: rgb(0, 0, 0),
      });
  
      // Draw horizontal line for each row
      page.drawLine({
        start: { x: margin, y: rowY - 2 },
        end: { x: 595 - margin, y: rowY - 2 },
        thickness: 0.5,
        color: rgb(0.8, 0.8, 0.8),
      });
    });
  
    // Save PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'purchase_report.pdf');
  };
  
  
  // Fetch data when date range is selected
  useEffect(() => {
  
    fetchData();
  }, [startDate, endDate, name]);

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center ">
      <div className="mb-4 flex space-x-4">
        <DatePicker selected={startDate} onChange={setStartDate} placeholderText="Start Date" />
        <DatePicker selected={endDate} onChange={setEndDate} placeholderText="End Date" />
        <Input placeholder="Filter name..." onChange={(e) => setName( e.target.value  )}  className="w-1/2"  />
      </div>
      <div className="mb-4 flex space-x-4">
        <Button onClick={downloadCSV} className="btn btn-secondary">
          Download CSV
        </Button>
        <Button onClick={generatePDF} className="btn btn-secondary">
          Download PDF
        </Button>
      </div>
 
      </div>


      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={purchaseData} />
      )}
    </div>
  );
};

export default TransactionsPage;

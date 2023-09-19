import { useState } from "react";
import { data as defaultData } from './data.tsx'
import { OrderEntry } from "../TypeDefinition"
import "./table.css";
import { Button, message, ConfigProvider  } from 'antd';
import * as XLSX from 'xlsx';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns.tsx";
import { FooterCell } from "./FooterCell.tsx";

export const OrderAdmin = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [editedRows, setEditedRows] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      addRow: () => {
        const newRow: OrderEntry = {
          key: '',
          S_No: 0,
          customerPO: '',
          onfCO: '',
          date: '',
          customerName: '',
          basecode: '',
          width: 0,
          length: 0,
          bundleNo: 0,
          rollNo: 0,
          area: 0,
          netWeight: 0,
          remarks: ''
        };
        const setFunc = (old: OrderEntry[]) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: OrderEntry[]) =>
          old.filter((_row: OrderEntry, index: number) => index !== rowIndex);
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        const setFilterFunc = (old: OrderEntry[]) =>
          old.filter((_row, index) => !selectedRows.includes(index));
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
    },
  });

  const dataMap = {
    S_No : 'S/No.',
    customerPO: 'Customer P. O.',
    onfCO: 'ONF C.O.',
    date: 'Date',
    customerName: 'Customer Name',
    basecode: 'Basecode',
    width: 'Width (mm)',
    length: 'Length (m)',
    bundleNo: 'Bundle Number',
    rollNo: 'Number of Rolls',
    area: 'Area (sqm)',
    netWeight: 'Net Weight (kgs)',
    remarks: 'Remarks'
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>){
    if(!event.target.files) return;
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (event) => {
      if(!event.target) return;
      const data = event.target.result;
      const workbook = XLSX.read(data, {type: "binary"});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      let mappedData:any[] = []
      parsedData.map((order:any) =>{
        let newOrder:any={}
        for(const key in dataMap){
          if(key == 'date'){
            let serial = order['Date'];
            let utc_days  = Math.floor(serial - 25569);
            let utc_value = utc_days * 86400;                                        
            let info = new Date(utc_value * 1000);
            let dateInfo = info.getFullYear().toString() + "-" + info.getMonth().toString() + "-" + info.getDate().toString();
            newOrder[key] = dateInfo;
          }else{
            newOrder[key] = order[dataMap[key]];
          }
        }
        mappedData.push(newOrder)
      })
      setData(mappedData)
    }
  }

async function handleSubmit(){
  let url = "http://8.222.181.202:8888/oz/order/submitMultiple?" 
  // let url = "https://wenjunblog.xyz:8080/oz/order/submitMultiple?" 
    // let url = "http://localhost:8888/oz/order/submitMultiple?" 
    await fetch(url,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
          if(data['success'] == true){
            messageApi.success('Submit Successful!');
          }
        })
 }


  return (
    <article className="table-container">
      <label className="importBtn"> Import from Excel
        <input type="file" accept=".xlsx, .xls" onChange= {handleFileUpload}/>
      </label>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>
      </table>
      {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
      <ConfigProvider
        theme={{
          token: {
            colorSuccess: "green",
            colorError: "red",
            colorInfo: "blue",
            colorWarning: "yellow",
          },
        }}
      ></ConfigProvider>

      {contextHolder}
      <Button className='submitBtn' type="primary" onClick={handleSubmit}>Submit</Button>
    </article>
    
  );
};

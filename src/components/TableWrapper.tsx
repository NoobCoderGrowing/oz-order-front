import { Table } from 'antd';
import classes from './TableWrapper.module.css'
import { TableEntries } from './TypeDefinition'
import { CSVLink } from "react-csv";

type Props = {
  tableEntries: TableEntries[]
}


function TableWrapper({tableEntries}:Props) {
    const dataSource = tableEntries
    
    const columns = [
      {
        title: 'S/No.',
        dataIndex: 'orderID',
        key: 'orderID',
      },
      {
        title: 'Customer P.O.',
        dataIndex: 'customerPO',
        key: 'customerPO',
      },
      {
        title: 'ONF C.O.',
        dataIndex: 'onfCO',
        key: 'onfCO',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
      },
      {
        title: 'Basecode',
        dataIndex: 'basecode',
        key: 'basecode',
      },
      {
        title: 'Width(mm)',
        dataIndex: 'width',
        key: 'width',
      },
      {
        title: 'Length(m)',
        dataIndex: 'length',
        key: 'length',
      },
      {
        title: 'Bundle Number',
        dataIndex: 'bundleNo',
        key: 'bundleNo',
      },
      {
        title: 'Roll Number',
        dataIndex: 'rollNo',
        key: 'rollNo',
      },
      {
        title: 'Area (sqm)',
        dataIndex: 'area',
        key: 'area',
      },
      {
        title: 'Net Weight(kgs)',
        dataIndex: 'netWeight',
        key: 'netWeight',
      },
      {
        title: 'Remarks',
        dataIndex: 'remarks',
        key: 'remarks',
      }
    ];

  return (
    <div className={classes.tableContainer}>
        <CSVLink 
            filename={"TableContent.csv"}
            data={tableEntries}
            className={classes.downloadBtn} 
            >
            Download Table as CSV
        </CSVLink>
        <Table pagination={{position: ['topCenter'], size:"default"}} className={classes.table} dataSource={dataSource} columns={columns} size='large'
        >
        </Table>
    
    </div>
  )
}

export default TableWrapper

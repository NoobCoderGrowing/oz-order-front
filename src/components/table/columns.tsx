import { createColumnHelper } from '@tanstack/react-table'
import { TableCell } from './TableCell.tsx'
import { EditCell } from './EditCell.tsx'
import {OrderEntry} from '../TypeDefinition.tsx'

const columnHelper = createColumnHelper<OrderEntry>()

export const columns = [
  columnHelper.accessor('S_No', {
    header: 'S/No.',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('customerPO', {
    header: 'Customer P.O.',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('onfCO', {
    header: 'ONF C.O.',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: TableCell,
    meta: {
      type: 'date',
    },
  }),
  columnHelper.accessor('customerName', {
    header: 'Customer Name',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('basecode', {
    header: 'Basecode',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('width', {
    header: 'Width (mm)',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('length', {
    header: 'Length (mm)',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('bundleNo', {
    header: 'Bundle Number',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('rollNo', {
    header: 'Roll Number',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('area', {
    header: 'Area (sqm)',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('netWeight', {
    header: 'Net Weight(kgs)',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.accessor('remarks', {
    header: 'Remarks',
    cell: TableCell,
    meta: {
      type: 'text',
    },
  }),
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
]

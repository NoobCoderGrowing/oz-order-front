export type TableEntries = {
    key: string,
    S_No: number,
    basecode: string,
    width: number,
    length: number,
    bundleNo: number,
    rollNo: number,
    area: number,
    netWeight: number,
    remarks: string
}

export type OrderEntry = {
    key: string,
    S_No: number,
    customerPO: string,
    onfCO: string,
    date: string,
    customerName: string,
    basecode: string,
    width: number,
    length: number,
    bundleNo: number,
    rollNo: number,
    area: number,
    netWeight: number,
    remarks: string
}

export type DisplayOrderEntry = {
    'S/No': string,
    'Customer P. O.': string,
    'ONF C.O.':string,
    'Date':string,
    'Customer Name':string,
    'Basecode':string,
    'Width (mm)':number,
    'Length (m)':number,
    'Bundle Number':number,
    'Number of Rolls':number,
    'Area (sqm)':number,
    'Net Weight (kgs)':number,
    'Remarks':string,
}
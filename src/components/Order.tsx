import { useState } from 'react'
import TableWrapper from './TableWrapper'
import FormWrapper from './FormWrapper'
import { TableEntries } from './TypeDefinition';


function Order() {


const [tableEntries, setTableEntries] = useState<TableEntries[]>([]);
  return (
    <>  
        <FormWrapper setTableEntries={setTableEntries}></FormWrapper>
        <TableWrapper tableEntries={tableEntries}></TableWrapper>
    </>
  )
}
export default Order

import classes from './OrderManagement.module.css'
import { OrderAdmin } from './table/OrderAdmin'


function OrderManagement() {
    
  return (
    <div className={classes.layout}>
        <OrderAdmin/>
    </div>
  )
}

export default OrderManagement

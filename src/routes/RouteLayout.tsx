
import classes from './RouteLayout.module.css'
import Header from '../components/layout/Header';
import { Outlet } from 'react-router-dom';


function RouteLayout(){
    return(
        <main id="mainContainer" className={classes.mainContainer}>
            <Header/>
            <Outlet/>    
        </main>
        
    );
}

export default RouteLayout;
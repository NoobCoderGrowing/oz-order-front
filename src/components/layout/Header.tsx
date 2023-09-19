import classes from "./Header.module.css"
import logo from '../../assets/logo.png'
function Header(){

    return(
        <header className={classes.header}>
            <img src={logo} className={classes.logo}/>
            <h1 className={classes.welcome}>Welcome to OZ Nonwoven Fabrics Limited</h1>
        </header>
    )
}
export default Header
import impactLogo from "../../assets/images/impact_logo.png";
import "./navbar.css"

const Navbar = () => {
    return (
        <div className="idc-navbar">
            <div className="idc-navbar-header">
                <img src={impactLogo}></img>
            </div>
        </div>
    )
}
export default Navbar;
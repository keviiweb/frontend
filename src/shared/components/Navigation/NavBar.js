import React, { Component } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";

class Navbar extends Component {
    state = {clicked: false};
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className= "NavbarItems">
                <div className="navbar-name">
                    <div className = "KEWEB">ke<strong>Web</strong></div>
                    <div className = "menu-icon" onClick = {this.handleClick}>
                        <i class="fas fa-bars" ></i>
                    </div>
                </div>
                
                <div className={this.state.clicked ? 'nav-menu-active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className = {item.cName} href = {item.url}>
                                {item.title} </a> 
                            </li>
                        )
                    })}
                </div>
            </nav>
        )
    }
}

export default Navbar;

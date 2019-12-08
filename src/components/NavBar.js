import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/playersearch'>
                        <li>Player Search</li>
                    </Link>
                </ul>
            </nav>
        );
    }
}

export default NavBar;
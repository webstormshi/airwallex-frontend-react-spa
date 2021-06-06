import React from 'react';
import { PageHeader } from "antd";
import "./index.css";

function Header(props) {
    return (
        <PageHeader className="header">
            <h1>{props.title}</h1>
        </PageHeader>
    );
}

export default Header;
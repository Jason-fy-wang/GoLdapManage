import React from "react";
import { Layout } from "antd";

const {Header} = Layout

const headerStyle:React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 100,
    lineHeight: "64px",
    backgroundColor: "#4096ff"
}

function LHeader() {

    return (
        <>
        <Header style={headerStyle}>Haeder</Header>
        </>
    )
}

export {LHeader}
import React from 'react'

class Filter extends React.Component {

    render() {
        const {width, fill, style, viewBox, onClick, className} = this.props
        return (
            <svg
                width={width}
                fill={fill}
                style={style}
                height={width}
                viewBox={viewBox}
                onClick={() => onClick()}
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon ${className || ""}`}
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <path d="M384.2,478c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.6,32.1,40.1,51.1,21.4l123.3-141.3c16.5-19.8,
                25.6-29.6,25.6-49.2V518.7c0-15,5.7-29.5,15.8-40.6L969.6,94.2c26.5-28.8,6.1-75.5-33.1-75.5h-873c-39.2,
                0-59.7,46.6-33.1,75.5L384.2,478z"/>
            </svg>
        )
    }
}

Filter.defaultProps = {
    style: {},
    fill: "#000",
    width: "100%",
    className: "",
    viewBox: "0 0 1000 1000",
    onClick: () => {
    }
}

export default Filter
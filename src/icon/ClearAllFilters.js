import React from 'react'

class ClearAllFilters extends React.Component {

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
                <path d="M23,124h82c11,0,20-9,20-20V22c0-11-9-20-20-20H23C12,2,3,11,3,22v82C3,115,12,124,23,124z M17,
                22c0-3.3,2.7-6,6-6h82c3.3,0,6,2.7,6,6v82c0,3.3-2.7,6-6,6H23c-3.3,0-6-2.7-6-6V22z"/>
                <path d="M42.6,74h42.9c4.7,0,8.6-3.8,8.6-8.6v-2.9c0-4.7-3.8-8.6-8.6-8.6H42.6c-4.7,
                0-8.6,3.8-8.6,8.6v2.9C34,70.2,37.8,74,42.6,74z"/>
            </svg>
        )
    }
}

ClearAllFilters.defaultProps = {
    style: {},
    fill: "#000",
    width: "100%",
    className: "",
    viewBox: "0 0 128 128",
    onClick: () => {
    }
}

export default ClearAllFilters
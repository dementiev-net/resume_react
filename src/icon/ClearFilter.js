import React from 'react'

class ClearFilter extends React.Component {

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
                <path d="M246.744,13.984c-1.238-2.626-3.881-4.301-6.784-4.301H7.5c-2.903,0-5.545,1.675-6.784,
                4.301c-1.238,2.626-0.85,5.73,0.997,7.97l89.361,108.384v99.94c0,2.595,1.341,5.005,3.545,6.373c1.208,
                0.749,2.579,1.127,3.955,1.127c1.137,0,2.278-0.259,3.33-0.78l50.208-24.885c2.551-1.264,4.165-3.863,
                4.169-6.71l0.098-75.062l89.366-108.388C247.593,19.714,247.982,16.609,246.744,13.984z M143.097,
                122.873c-1.105,1.34-1.711,3.023-1.713,4.761l-0.096,73.103l-35.213,
                17.453v-90.546c0-1.741-0.605-3.428-1.713-4.771L23.404,24.682h200.651L143.097,122.873z"/>
            </svg>
        )
    }
}

ClearFilter.defaultProps = {
    style: {},
    fill: "#000",
    width: "100%",
    className: "",
    viewBox: "0 0 247.46 247.46",
    onClick: () => {
    }
}

export default ClearFilter
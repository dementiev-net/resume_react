import React from 'react'

class Remove extends React.Component {

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
                <path d="M798.4,578.2c-30.9,0-60.2,6.9-86.5,19.2L604.5,490.1l358.4-358.4c27.3-27.3,27.3-71.7,
                0-99c-27.3-27.3-71.7-27.3-99,0L505.5,391.1L147.1,32.8c-27.3-27.3-71.7-27.3-99,0c-27.3,27.3-27.3,71.7,0,
                99l358.4,358.4L299.2,597.4c-26.3-12.3-55.6-19.2-86.5-19.2C99.7,578.2,7.9,670.1,7.9,783s91.9,204.8,
                204.8,204.8S417.4,895.9,417.4,783c0-30.9-6.9-60.2-19.2-86.5l107.3-107.3l107.3,107.3c-12.3,26.3-19.2,
                55.6-19.2,86.5c0,112.9,91.9,204.8,204.8,204.8s204.8-91.9,204.8-204.8S911.3,578.2,798.4,578.2z M277.4,
                783c0,35.7-29.1,64.8-64.8,64.8s-64.8-29.1-64.8-64.8s29.1-64.8,64.8-64.8S277.4,747.3,277.4,783z M863.1,
                783c0,35.7-29.1,64.8-64.8,64.8s-64.8-29.1-64.8-64.8s29.1-64.8,64.8-64.8S863.1,747.3,863.1,783z"/>
            </svg>
        )
    }
}

Remove.defaultProps = {
    style: {},
    fill: "#000",
    width: "100%",
    className: "",
    viewBox: "0 0 1000 1000",
    onClick: () => {
    }
}

export default Remove
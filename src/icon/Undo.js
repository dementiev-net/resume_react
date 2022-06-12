import React from 'react'

class Undo extends React.Component {

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
                <path d="M125.2,90.7V37.3c0-4.6-5-7.5-9-5.2L70,58.8c-4,2.3-4,8.1,0,10.4l46.2,26.7C120.2,98.2,125.2,
                95.3,125.2,90.7z"/>
                <path d="M52,32.1L5.8,58.8c-4,2.3-4,8.1,0,10.4L52,95.9c4,2.3,9-0.6,9-5.2V37.3C61,32.7,56,29.8,52,
                32.1z"/>
            </svg>
        )
    }
}

Undo.defaultProps = {
    style: {},
    fill: "#000",
    width: "100%",
    className: "",
    viewBox: "0 0 128 128",
    onClick: () => {
    }
}

export default Undo
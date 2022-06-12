import React from 'react'

class Redo extends React.Component {

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
                <path d="M11.8,32.1c-4-2.3-9,0.6-9,5.2v53.3c0,4.6,5,7.5,9,5.2L58,69.2c4-2.3,4-8.1,0-10.4L11.8,32.1z"/>
                <path d="M122.2,58.8L76,32.1c-4-2.3-9,0.6-9,5.2v53.3c0,4.6,5,7.5,9,5.2l46.2-26.7C126.2,66.9,126.2,
                61.1,122.2,58.8z"/>
            </svg>
        )
    }
}

Redo.defaultProps = {
    style: {},
    fill: "#000",
    width: "100%",
    className: "",
    viewBox: "0 0 128 128",
    onClick: () => {
    }
}

export default Redo
import React from 'react'

class Hide extends React.Component {

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
                <path d="M8,26.7h112c3.3,0,6-2.7,6-6v-12c0-3.3-2.7-6-6-6H8c-3.3,0-6,2.7-6,6v12C2,24,4.7,26.7,8,26.7z"/>
                <path d="M69.4,37.4c-2.5-3.2-7.4-3.2-9.9,0l-32,40c-3.2,4.1-0.3,10.1,5,10.1h10.7c3.4,0,6.2,2.8,6.2,
                6.2v25c0,3.4,2.8,6.2,6.2,6.2h16.8c3.4,0,6.2-2.8,6.2-6.2v-25c0-3.4,2.8-6.2,6.2-6.2h10.7c5.2,
                0,8.1-6,4.9-10.1L69.4,37.4z"/>
            </svg>
        )
    }
}

Hide.defaultProps = {
    style: {},
    fill: "#000",
    width: "100%",
    className: "",
    viewBox: "0 0 128 128",
    onClick: () => {
    }
}

export default Hide
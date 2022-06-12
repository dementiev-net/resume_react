import React from 'react'

class Graph extends React.Component {

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
                <path d="M45,65H33c-3.3,0-6,2.7-6,6V95c0,3.3,2.7,6,6,6H45c3.3,0,6-2.7,6-6V71C51,67.7,48.3,65,45,65z"/>
                <path d="M66,48c-3.3,0-6,2.7-6,6V95c0,3.3,2.7,6,6,6H78c3.3,0,6-2.7,6-6V54c0-3.3-2.7-6-6-6H66z"/>
                <path d="M111,48H99c-3.3,0-6,2.7-6,6V95c0,3.3,2.7,6,6,6H111c3.3,0,6-2.7,6-6V54C117,50.7,114.3,48,111,
                    48z"/>
                <path d="M8.5,126h111.9c3.3,0,5.5-3.2,5.5-6.5v-2c0-3.3-2.2-6.4-5.5-6.4H22.7c-3.3,0-5.7-2.3-5.7-5.7V7.5C17,
                4.2,13.9,2,10.6,2h-2C5.2,2,2,4.2,2,7.5v111.9C2,122.8,5.2,126,8.5,126z"/>
            </svg>
        )
    }
}

Graph.defaultProps = {
    style: {},
    fill: "#000",
    width: "100%",
    className: "",
    viewBox: "0 0 128 128",
    onClick: () => {
    }
}

export default Graph
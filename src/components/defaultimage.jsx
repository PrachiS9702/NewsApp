import React, { Component } from 'react'
import defaultimage from './defaultimage.jpg'

class DefaultImage extends Component {
    render() {
        return (
            <img src={defaultimage} alt="Default" className="card-img-top" style={{width: "auto", height: "auto"}} />
        )
    }
}

export default DefaultImage
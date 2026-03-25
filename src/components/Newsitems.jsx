import React, { Component } from 'react'
import DefaultImage from './defaultimage.jsx';

class Newsitems extends Component {

    render() {
        let {
    title,
    description,
    imageUrl,
    url,
    author,
    date,
    source
} = this.props;
        return (
            <div className="card" >
                <span class="badge text-bg-info" style={{position: "absolute", top: "0", right: "0"}}>{source}</span>
                {!imageUrl?<DefaultImage />:<img src={imageUrl} className="card-img-top" style={{width: "auto", height: "auto"}} alt="..."/>}
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                         <p class="card-text"><small class="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={url} target= "_blank" className="btn btn-dark btn-sm">Read more</a>

                    </div>
  
            </div>
        )
    }
}

export default Newsitems
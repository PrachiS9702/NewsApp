import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './loading'
import PropTypes from 'prop-types'

class News extends Component {
   static defaultProps = {
    pageSize: 8,
    country: 'us',
    category: 'general'
   }

   static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
   }

    constructor() {
        super();
        this.state = {
            article: [],
            loading: false,
            page:1
            
        }
    }

    async componentDidMount (){
        console.log("componentDidMount");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8fe795f5a8f44032b3d5c4a5c9553def&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();

        console.log(parsedData);
        this.setState({article: parsedData.articles, totalResults: parsedData.totalResults, loading: false});

    }

    handlePrevious = async() => {
        
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8fe795f5a8f44032b3d5c4a5c9553def&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            article: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        });
         
    }

    handleNext = async() => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
        console.log("Next");
    } else {
         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8fe795f5a8f44032b3d5c4a5c9553def&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
         this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        
        this.setState(
            {
                page: this.state.page + 1,
                article: parsedData.articles,
                loading: false
            });
    }
    }




  render() {
    return (
      <div className="container my-3" >
        <h1 className="text-center my-3">News heading </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
            {!this.state.loading && this.state.article.map((element) => {
                return (
                    <div className="col-md-4" key={element.url}>
                        <Newsitems 
                        title={element.title?element.title.slice(0,45):""} 
                        description={element.description?element.description.slice(0,90):""} 
                        imageUrl={element.urlToImage?element.urlToImage:""} 
                        url={element.url?element.url:""} 
                        author={element.author} 
                        date={element.publishedAt} 
                        source={element.source.name} />
                    </div>
                )
            })}
        </div>
        <br />

        <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevious} className="btn btn-dark">&larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNext} className="btn btn-dark">Next &rarr;</button>
        </div>

      </div>
    )
  }
}

export default News
import React, { useState, useEffect } from 'react'
import Newsitems from './Newsitems'
import Spinner from './loading'
import PropTypes from 'prop-types'

const News = (props) => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);



  const capitalize = (str) => {
   
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);

  }



  useEffect(() => {

    document.title = `${capitalize(props.category)}- News`;
    updateNews();
  }, []);

  const handlePrevious = async () => {
    setPage(page - 1);
    updateNews();
  }

  const handleNext = async () => {
    setPage(page + 1);
    updateNews();
  }

  return (
    <div className="container my-3" style={{paddingTop: '30px'}}>
      <h1 className="text-center my-3">News on {capitalize(props.category)} Heading </h1>
      {loading && <Spinner />}
      <div className="row">
        {!loading && article.map((element) => {
          return (
            <div className="col-md-4" key={element.url}>
              <Newsitems
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 90) : ""}
                imageUrl={element.urlToImage ? element.urlToImage : ""}
                url={element.url ? element.url : ""}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name} />
            </div>
          )
        })}
      </div>
      <br />

      <div className="container d-flex justify-content-between">
        <button type="button" disabled={page <= 1} onClick={handlePrevious} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={handleNext} className="btn btn-dark">Next &rarr;</button>
      </div>

    </div>
  )
}

News.defaultProps = {
  pageSize: 8,
  country: 'us',
  category: 'general'
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}

export default News
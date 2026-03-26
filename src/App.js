
import './App.css';

import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter, Route , Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function App() {
  const pageSize = 7;
  
  const apiKey= process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0);

  return (
      <>
      <BrowserRouter>  
        <LoadingBar
        height={4}
        color="#f11946"
        progress={progress}
      
      />
        <Navbar />
       <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="health" country="us" category="health" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="business" country="us" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="entertainment" country="us" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress}apiKey={apiKey}  pageSize={pageSize} key="general" country="us" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="health" country="us" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="science" country="us" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="sports" country="us" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} key="technology" country="us" category="technology" />} />
       </Routes>
      </BrowserRouter> 
      </>
    );
}

export default App;
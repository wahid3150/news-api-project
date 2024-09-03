import React, { useEffect, useState } from "react";
import Card from "./Card";

const NewsApp = () => {
  const [search, setSearch] = useState("Pakistan");
  const [newsData, setNewsData] = useState(null);
  const API_KEY = "ADD YOUR OWN API KEY HERE";

  const getData = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
    );
    const jsonData = await response.json();
    console.log(jsonData.articles);

    const filteredArticles = jsonData.articles.filter(
      (article) => article.urlToImage
    );

    let dt = filteredArticles.slice(0, 50);
    setNewsData(dt);
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleInput = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const userInput = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
  };

  return (
    <div>
      <nav>
        <div>
          <h1>Widely News</h1>
        </div>

        <ul>
          <a>All News</a>
          <a>Trending </a>
        </ul>

        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
          />
          <button onClick={getData}>Search</button>
        </div>
      </nav>
      <div>
        <p className="para">Stay Update with TrendyNews</p>
      </div>

      <div className="categoryBtn">
        <button onClick={userInput} value="sports">
          Sports
        </button>
        <button onClick={userInput} value="politics">
          Politics
        </button>
        <button onClick={userInput} value="entertainment">
          Entertainment
        </button>
        <button onClick={userInput} value="health">
          Health
        </button>
        <button onClick={userInput} value="fitness">
          Fitness
        </button>
      </div>
      <div>{newsData ? <Card data={newsData} /> : null}</div>
    </div>
  );
};

export default NewsApp;

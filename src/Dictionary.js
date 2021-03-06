import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handleDictionaryResponse(response) {
    setResults(response.data[0]);
  }

  function handlePixabayResponse(response) {
    setPhotos(response.data.hits);
  }

  function search() {
    // API documentation https://dictionaryapi.dev/
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios.get(apiUrl).then(handleDictionaryResponse);

    /*API documentation https://www.pexels.com/api/documentation/
    const apiKeyPixels ="563492ad6f91700001000001221a985b21734072995e516618111481";
    let apiUrlPexels = `https://api.pexels.com/v1/search?query=${keyword}&per_page=12`;
    axios.get(apiUrlPexels, { headers: { Authorization: `Bearer ${apiKeyPixels}` }, }).then(handlePixelsResponse);*/

    // API Documentation https://pixabay.com/api/docs/
    const apiKeyPixabay = "21483946-5b64b419f6eb3fc5f8ee9c57a";
    let apiUrlPixabay = `https://pixabay.com/api/?key=${apiKeyPixabay}&q=${keyword}&image_type=photo&per_page=16`;
    axios.get(apiUrlPixabay).then(handlePixabayResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (keyword) {
      search();
    } else {
      alert(`Enter any word to submit the search.`);
    }
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h3>What word do you want to look up?</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="search"
              placeholder="Enter a word..."
              autoComplete="off"
              autoFocus="on"
              onChange={handleKeywordChange}
              defaultValue={props.defaultKeyword}
            />
          </form>
          <div className="Hint">
            i.g. music, science, travel, establish ,harmony...
          </div>
        </section>
        <Results results={results} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return "Loading..";
  }
}

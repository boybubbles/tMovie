import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import { category, movieType, tvType } from "../../api/tmdbApi";
import tmdbApi from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
const MovieGrid = (props) => {
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();
  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(movieType.upcoming, {
              params,
            });
            break;

          default:
            response = await tmdbApi.getTvList(tvType.popular, {
              params,
            });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItem(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);
  const loadMore = async () => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {
          page: page + 1,
        };
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMovieList(movieType.upcoming, {
              params,
            });
            break;

          default:
            response = await tmdbApi.getTvList(tvType.popular, {
              params,
            });
        }
      } else {
        const params = {
          query: keyword,
          page: page + 1,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItem([...item, ...response.results]);
      setPage(page + 1);
    };
    getList();
  };
  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {item.map((item, index) => {
          return (
            <MovieCard key={index} category={props.category} item={item} />
          );
        })}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load More
          </OutlineButton>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => document.removeEventListener("keyup", enterEvent);
  }, [keyword, goToSearch]);
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Moive and more"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button>Search</Button>
    </div>
  );
};

export default MovieGrid;

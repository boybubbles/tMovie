import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const CastList = (props) => {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credit(category, props.id);
      setCasts(res.cast.slice(0, 5));
      console.log(res);
    };
    getCredits();
  }, [category, props.id]);

  return (
    <div className="casts">
      {casts.map((item, index) => {
        return (
          <div key={index} className="casts__item">
            <div
              className="casts__item__img"
              style={{
                backgroundImage: `url(${apiConfig.w500Image(
                  item.profile_path
                )})`,
              }}
            ></div>
            <p className="casts__item__name">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CastList;

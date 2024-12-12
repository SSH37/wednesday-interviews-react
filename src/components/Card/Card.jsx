import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Card.css";
const emailShowDelay = 250;

const Card = ({ data }) => {
  const [imageUrl, setImageUrl] = useState("");
  // const [imageUrl, setImageUrl] = useState(data.avatar);
  //db gets 403 for avatar urls so fetch random pictures for now
  const nav = useNavigate();
  const [emailShow, setEmailShow] = useState(false);
  const [emailShowTimestamp, setEmailShowTimestamp] = useState(null);
  const [emailShowId, setEmailShowId] = useState(null);
  const [emailPos, setEmailPos] = useState([0, 0]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://randomuser.me/api/?inc=picture&noinfo"
        );

        if (response.ok) {
          const result = await response.json();
          setImageUrl(result.results[0].picture.large);
        } else {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  const handleCardHover = useCallback(
    (e) => {
      if (!emailShowTimestamp) {
        setEmailShowTimestamp(Date.now());
        setEmailPos([e.clientX, e.clientY]);
        setEmailShowId(
          setTimeout(() => {
            setEmailShow(true);
          }, emailShowDelay)
        );
      } else if (emailShowTimestamp + emailShowDelay > Date.now()) {
        setEmailShowTimestamp(Date.now());
        setEmailPos([e.pageX, e.pageY]);
        clearTimeout(emailShowId);
        setEmailShowId(
          setTimeout(() => {
            setEmailShow(true);
          }, emailShowDelay)
        );
      }
    },
    [emailShowTimestamp,emailShowId]
  );

  const handleCardLeave = useCallback(() => {
    clearTimeout(emailShowId);
    setEmailShowTimestamp(null);
    setEmailShow(false);
  }, [emailShowId]);

  useEffect(() => {
    if (!emailShow) {
      setEmailPos([0, 0]);
    }
  }, [emailShow]);

  return (
    <div>
      <div
        className="card"
        onClick={() => {
          if (!window.getSelection().toString()) {
            nav(`/candidate/${data.id}`);
          }
        }}
        onMouseMove={handleCardHover}
        onMouseLeave={handleCardLeave}
      >
        {/* <img src={data.avatar} alt={data.name} /> */}
        <img src={imageUrl ? imageUrl : ""} alt={data.name} />
        <div className="cardInfo">
          <p>{data.name}</p>
          <p>{data.education}</p>
        </div>
      </div>
      <p
        style={{
          left: `${emailPos[0]}px`,
          top: `${emailPos[1]}px`,
        }}
        className={`${emailShow ? "cardEmailHovered" : "cardEmailHidden"}`}
        onMouseOver={() => {
          setEmailShow(true);
        }}
        onMouseLeave={() => {
          setEmailShow(false);
        }}
        onClick={() => {
          if (!window.getSelection().toString()) {
            setEmailShow(false);
          }
        }}
      >
        {data.email}
      </p>
    </div>
  );
};

export default Card;

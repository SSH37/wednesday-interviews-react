import React, { useEffect, useState } from "react";
import "./Card.css";
import { fetchUrl } from "../../library";
import { useNavigate } from "react-router";
const emailShowDelay = 300;

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
    fetchUrl("https://randomuser.me/api/?inc=picture&noinfo", (res) => {
      setImageUrl(res.results[0].picture.large);
    });
  }, []);

  useEffect(() => {
    if (!emailShow) {
      console.log(emailShow, emailPos);
      setEmailPos([0, 0]);
    } else {
      console.log(emailShow, emailPos);
      // setEmailPos([mouseEv.clientX, mouseEv.clientY])
    }
  }, [emailShow]);

  return (
    <div>
      <div
        className="card"
        onClick={() => {
          nav(`/candidate/${data.id}`);
        }}
        onMouseMove={(e) => {
          if (!emailShowTimestamp) {
            console.log("fired email show");
            setEmailShowTimestamp(Date.now());
            setEmailShowId(
              setTimeout(() => {
                setEmailShow(true);
              }, emailShowDelay)
            );
          } else if (emailShowTimestamp + emailShowDelay < Date.now()) {
          } else {
            console.log("Setting email position");
            console.log(e.clientX, e.clientY);
            setEmailPos([e.clientX, e.clientY]);
          }
        }}
        onMouseLeave={() => {
          clearTimeout(emailShowId);
          setEmailShowTimestamp(null);
          setEmailShow(false);
        }}
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
        onMouseOver={(e) => {
            setEmailShow(true);
        }}
        onMouseLeave={() => {
          setEmailShow(false);
        }}
      >
        {data.email}
      </p>
    </div>
  );
};

export default Card;

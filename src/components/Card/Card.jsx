import React, { useEffect, useState } from "react";
import "./Card.css";
import { fetchUrl } from "../../library";
import { useNavigate } from "react-router";

const Card = ({ data }) => {
  const [imageUrl, setImageUrl] = useState("");
  // const [imageUrl, setImageUrl] = useState(data.avatar);
  //db gets 403 for avatar urls so fetch random picturess
  const nav = useNavigate();
  const [emailShow, setEmailShow] = useState(false);

  useEffect(() => {
    fetchUrl("https://randomuser.me/api/?inc=picture&noinfo", (res) => {
      setImageUrl(res.results[0].picture.large);
    });
  }, []);

  return (
    <div
      className="card"
      onClick={() => {
        nav(`/candidate/${data.id}`);
      }}
    >
      {/* <img src={data.avatar} alt={data.name} /> */}
      <img src={imageUrl ? imageUrl : ""} alt={data.name} />

      <div style={{ position: "relative" }}>
        <p>{data.name}</p>
        <p
          onMouseOver={() => {
            if (data.email.length > 15) {
              setEmailShow(true);
            }
          }}
          onMouseLeave={() => {
            setEmailShow(false);
          }}
        >
          {data.email.length > 20
            ? `${[
                ...data.email.slice(0, 4),
                "...",
                ...data.email.slice(data.email.indexOf("@")),
              ].join("")}`
            : data.email}
        </p>
        <p className={`${emailShow ? "cardEmailHovered" : "cardEmailHidden"}`}>
          {data.email}
        </p>
      </div>
    </div>
  );
};

export default Card;

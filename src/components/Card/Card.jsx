import React, { useEffect, useState } from "react";
import "./Card.css";
import { fetchUrl } from "../../library";

const Card = ({ data }) => {
  const [imageUrl, setImageUrl] = useState("");
  // const [imageUrl, setImageUrl] = useState(data.avatar);
  //db gets 403 for avatar urls so fetch random picturess

  useEffect(() => {
    fetchUrl("https://randomuser.me/api/?inc=picture&noinfo", (res) => {
      setImageUrl(res.results[0].picture.large);
    });
  }, []);

  return (
    <div className="card">
      {/* <img src={data.avatar} alt={data.name} /> */}
      <img src={imageUrl ? imageUrl : ""} alt={data.name} />

      <div>
        <p>{data.name}</p>
        <p>
          {data.email.length > 15
            ? `${[
                ...data.email.slice(0, 4),
                "...",
                ...data.email.slice(data.email.indexOf("@")),
              ].join("")}`
            : data.email}
        </p>
      </div>
    </div>
  );
};

export default Card;

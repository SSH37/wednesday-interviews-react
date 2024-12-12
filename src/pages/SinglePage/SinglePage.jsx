import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router";
import { urlCandidates } from "../../constants/constants";
import "./SinglePage.css";
import Report from "../../components/Report/Report";

const SinglePage = () => {
  const [candData, setCandData] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [date, setDate] = useState();
  const [reportModalData, setReportModalData] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${urlCandidates}/${id}?_embed=reports`);
        if (response.ok) {
          const result = await response.json();
          setDate(new Date(result.birthday).toLocaleDateString());
          setCandData(result);
        } else {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(e.message);
      }
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
  }, [id]);

  const getListBorderColor = (rep) => {
    if (rep.status === "passed") {
      return "green";
    } else {
      return "red";
    }
  };

  return (
    <>
      {reportModalData ? (
        <Report data={reportModalData} setData={setReportModalData} />
      ) : null}
      <Header />
      <div id="singlePage">
        <div id="candidateSummary">
          {/* <img src={`${candData.avatar}`} alt={`${candData.name}`} /> */}
          <img src={imageUrl ? imageUrl : ""} alt={candData.name} />
          <div className="candidateInfo">
            <p>{candData.name}</p>
            <p>Email: {candData.email}</p>
            <p>Born: {date}</p>
            <p>Education: {candData.education}</p>
          </div>
        </div>
        <div id="candidateReportsList">
          {candData?.reports?.map((rep) => {
            const reportDate = new Date(rep.interviewDate).toLocaleDateString();
            return (
              <div
                key={rep.id}
                className="reportSummary"
                onClick={() => {
                  setReportModalData(rep);
                }}
                style={{ border: `3px solid ${getListBorderColor(rep)}` }}
              >
                <div>
                  <h3>{rep.companyName}</h3>
                  <h3>{reportDate}</h3>
                  <div>
                    <h3>{rep.phase}</h3>
                    <h3>{rep.status}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SinglePage;

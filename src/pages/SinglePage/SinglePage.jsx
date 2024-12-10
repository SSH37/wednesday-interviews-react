import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router";
import { fetchUrl } from "../../library";
import { urlCandidates, urlReports } from "../../constants/constants";
import "./SinglePage.css";
import Report from "../../components/Report/Report";

const SinglePage = () => {
  const [candData, setCandData] = useState("");
  const [reports, setReports] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [date, setDate] = useState();
  const [reportModalData, setReportModalData] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchUrl(`${urlCandidates}/${id}`, (res) => {
      setDate(new Date(res.birthday).toLocaleDateString());
      setCandData(res);
    });
    fetchUrl(`${urlReports}?candidateId=${id}`, (res) => {
      setReports(res);
    });
    fetchUrl("https://randomuser.me/api/?inc=picture&noinfo", (res) => {
      setImageUrl(res.results[0].picture.large);
    });
  }, []);

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
            {date ? (
              <>
                {console.log(date)}
                <p>{date}</p>
              </>
            ) : null}
            <p>{candData.email}</p>
            <p>{candData.education}</p>
          </div>
        </div>
        <div id="candidateReportsList">
          {reports.map((rep) => {
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
                <p>{`${rep.note.slice(0, 150)}...`}</p>
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

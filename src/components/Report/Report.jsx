import "./Report.css"

const Report = ({data, setData}) => {
  // setData(null) in onClick

  console.log(data);
  return (
    <div className="reportModal">
      <div className="reportContent">{data.note}</div>
    </div>
  )
}

export default Report
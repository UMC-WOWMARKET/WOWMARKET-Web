const GoodsCard = ({
  projectName,
  sellerName,
  goal,
  achieved,
  endDate,
  startDate,
  imgUrl,
  univ,
}) => {
  const achievedPer = ((achieved / goal) * 100).toFixed(2);

  const startDateParsed = new Date(startDate);
  const endDateParsed = new Date(endDate);
  const timeDifference = endDateParsed - startDateParsed; // Difference in milliseconds
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  console.log(univ);
  return (
    <div className="GoodsCard" style={{ width: "368px" }}>
      <img
        src={imgUrl}
        style={{ width: "368px", height: "207px", borderRadius: "10px" }}
      />
      <div className="info">
        <div>
          <div>{projectName}</div>
          <div>{achievedPer}%</div>
        </div>

        <div>
          <div>제작 {sellerName}</div>
        </div>
        <div>D - {remainingDays}</div>
      </div>
    </div>
  );
};

export default GoodsCard;

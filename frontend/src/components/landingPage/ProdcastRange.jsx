const ProdcastRange = ({ value }) => {
  return (
    <div className="prodcast-range">
      <input type="range" value={value} min="0" max="100" id="step" step="1" />
    </div>
  );
};

export default ProdcastRange;

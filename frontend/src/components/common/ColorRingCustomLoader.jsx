const ColorRingCustomLoader = ({ isLoader = true }) => {
  const colors = ["#0085CA", "#BFC0BF", "#0085CA", "#BFC0BF", "#0085CA"];

  return (
    <div
      style={{
        display: isLoader ? "flex" : "none",
        gap: "8px",
        alignItems: "center",
        height: "120px",
        justifyContent: "center",
      }}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: color,
            animation: `pulse ${1.4}s ease-in-out ${index * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default ColorRingCustomLoader;

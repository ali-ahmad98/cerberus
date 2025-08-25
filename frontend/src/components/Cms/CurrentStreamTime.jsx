export const CurrentStreamTime = (props) => {
  const { src, type = "audio", setCurrentTime, id, idIndex } = props;

  const timeUpdate = (event) => {
    const minutes = Math.floor(event.target.currentTime / 60);
    const seconds = Math.floor(event.target.currentTime - minutes * 60);
    const currentTime = str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    setCurrentTime(currentTime);
    idIndex(id);
  };

  const str_pad_left = (string, pad, length) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  };

  let htmlTag = "";

  if (type === "audio") {
    htmlTag = (
      <audio
        src={src}
        type="audio/mpeg"
        controlsList="nodownload noplaybackrate"
        controls
        onTimeUpdate={timeUpdate}
        value="0"
        min="0"
        max="100"
        step="1"
        className="progresss"
        id={id}
      />
    );
  }
  if (type === "video") {
    htmlTag = (
      <video
        src={src}
        autoPlay
        muted
        controls
        loop
        onTimeUpdate={(event) => {
          timeUpdate(event);
        }}
      />
    );
  }
  return <>{htmlTag}</>;
};

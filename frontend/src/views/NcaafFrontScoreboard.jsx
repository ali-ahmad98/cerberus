import NcaafFrontScoreBoardBody from "../NcaafFrontComponents/NcaafFrontScoreBoard/NcaafFrontScoreBoardBody";

const NcaafFrontScoreboard = () => {
  return (
    <section className="pb-193 ncaaf_schdule_table">
      <NcaafFrontScoreBoardBody
        NcaafFrontHeadingBarh1="Saturday, 7th November"
        NcaafFrontHeadingBarh2="Sunday, 1st November"
      />
    </section>
  );
};

export default NcaafFrontScoreboard;

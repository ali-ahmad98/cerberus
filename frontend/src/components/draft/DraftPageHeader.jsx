import ScroreBoard from "../homepage/ScroreBoard";
import ScoreBoardHero from "../nfl-scoreboard/ScoreBoardHero";

const DraftPageHeader = () => {
  return (
    <>
      <div className="scoreboard-page-bg d-flex flex-column">
        <ScroreBoard />
        <div className="py-5">
          <ScoreBoardHero value="DRAFT" />
        </div>
      </div>
    </>
  );
};

export default DraftPageHeader;

import ScroreBoard from "../components/homepage/ScroreBoard";
import ScoreBoardCard from "../components/nfl-scoreboard/ScoreBoardCard";
import ScoreBoardHero from "../components/nfl-scoreboard/ScoreBoardHero";

const ScoreBoardPage = () => {
  return (
    <>
      <div className="scoreboard-page-bg d-flex flex-column">
        <ScroreBoard page="NFL" />
        <ScoreBoardHero value="SCOREBOARD" />
      </div>
      <ScoreBoardCard />
    </>
  );
};

export default ScoreBoardPage;

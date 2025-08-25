import ScroreBoard from "../components/homepage/ScroreBoard";
import Ranking from "../NcaafFrontComponents/NCAAFRankings/Ranking";
import RankingTable from "../NcaafFrontComponents/NCAAFRankings/RankingTable";

const NcaafRanking = () => {
  return (
    <section className="ranking_bg">
      <ScroreBoard page="NCAAF" />
      <Ranking />
      <RankingTable />
    </section>
  );
};

export default NcaafRanking;

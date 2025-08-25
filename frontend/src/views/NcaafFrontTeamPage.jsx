import ScroreBoard from "../components/homepage/ScroreBoard";
import NcaafTeamTable from "../NcaafFrontComponents/NcaafFrontTeamPage/NcaafTeamTable";
import TeamScoreBoardHero from "../NcaafFrontComponents/NcaafFrontTeamPage/TeamScoreBoardHero";

const NcaafFrontTeamPage = () => {
  return (
    <>
      <section className="schedulehome position-relative">
        <ScroreBoard />
        <TeamScoreBoardHero NcaafTeamHeading="Teams" />
      </section>
      <NcaafTeamTable />
    </>
  );
};

export default NcaafFrontTeamPage;

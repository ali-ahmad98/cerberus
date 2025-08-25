import DraftPageHeader from "../components/draft/DraftPageHeader";
import DraftTableNewsAndVideoElements from "../components/draft/DraftTableNewsAndVideoElements";

const NflDraftPage = () => {
  return (
    <div className="bg-black pb-5 px-lg-4">
      <DraftPageHeader />
      <DraftTableNewsAndVideoElements />
    </div>
  );
};

export default NflDraftPage;

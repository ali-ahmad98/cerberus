import Comments from "../components/ArticlesWR/Comments";
import Headerarticles from "../components/ArticlesWR/Headerarticles";
import ScroreBoard from "../components/homepage/ScroreBoard";
import Videos from "../components/homepage/Videos";

const ArticlesWR = () => {
  return (
    <>
      <div className="bg_color_black_1a1a1a articles_wr overflow-x-hidden">
        <ScroreBoard />
        <Headerarticles />
        <Videos videoTitle="You May Also Interested" />
        <Comments />
      </div>
    </>
  );
};

export default ArticlesWR;

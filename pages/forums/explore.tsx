import React from "react";
import {ForumList} from "../../src/components/forums/ForumList/ForumList";

const ExploreForums: React.FC = () => {

  return (
    <div>
      <header>
        <h1>Explore the Forums</h1>
      </header>
      <section>
        <ForumList />
      </section>
    </div>
  );
};

export default ExploreForums;
import React from "react";
import { ForumList } from "../../src/components/forums/ForumList/ForumList";
import {UserConditional} from "~/components/common/UserConditional/UserConditional";

const ExploreForums: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Explore the Forums</h1>
      </header>
      <section>
        <UserConditional>
          <ForumList />
        </UserConditional>
      </section>
    </div>
  );
};

export default ExploreForums;

import React from "react";
import { ForumList } from "../../src/components/forums/ForumList/ForumList";
import {UserConditional} from "~/components/common/UserConditional/UserConditional";
import { Page } from "../Page";

const ExploreForums: React.FC = () => {
  return (
    <Page>
      <header>
        <h1>Explore the Forums</h1>
      </header>
      <section>
        <UserConditional>
          <ForumList />
        </UserConditional>
      </section>
    </Page>
  );
};

export default ExploreForums;

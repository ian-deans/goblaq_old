import React from "react";
import {ForumList} from "../../src/components/forums/ForumList/ForumList";

const ForumListPage: React.FC = () => {

  return (
    <div>
      <header>
        <h1>Forum List</h1>
      </header>
      <section>
        <ForumList />
      </section>
    </div>
  );
};

export default ForumListPage;
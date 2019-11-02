import React from "react";
import { shallow } from "enzyme";

import { Layout } from "../Layout";

describe("Layout", () => {

  it("should render without throwing an error", () => {
    const wrap = shallow(<Layout />);
    expect(wrap).toBeTruthy();
  });

});

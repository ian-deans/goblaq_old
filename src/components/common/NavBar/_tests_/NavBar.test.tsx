import React from "react";
import { shallow } from "enzyme";

import { NavBar } from "../NavBar";

describe("NavBar", () => {
  it("should render without throwing an error", () => {
    const wrap = shallow(<NavBar />);
    expect(wrap).toBeTruthy();
  });
});

import React from "react";
import { shallow } from "enzyme";

import { GoogleButton } from "../GoogleButton";

describe("Auth Buttons", () => {
  describe("GoogleButton", () => {
    it("should render without throwing an error", () => {
      const wrap = shallow(<GoogleButton />);
      expect(wrap).toBeTruthy();
    });
  });
});

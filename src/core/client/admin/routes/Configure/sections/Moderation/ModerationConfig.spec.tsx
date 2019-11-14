import React from "react";
import { createRenderer } from "react-test-renderer/shallow";

import { removeFragmentRefs } from "coral-framework/testHelpers";
import { PropTypesOf } from "coral-framework/types";

import { ModerationConfigContainer } from "./ModerationConfigContainer";

const ModerationConfigContainerN = removeFragmentRefs(
  ModerationConfigContainer
);

it("renders correctly", () => {
  const props: PropTypesOf<typeof ModerationConfigContainerN> = {
    submitting: false,
    settings: {} as any,
  };
  const renderer = createRenderer();
  renderer.render(<ModerationConfigContainerN {...props} />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

import * as React from "react";

import { css } from "@emotion/react";

const STYLES_PAGE = css`
  margin: 0;
  padding: 0;
`;

export default class TestPage extends React.Component {
  render() {
    return <div css={STYLES_PAGE}>Hey everyone!</div>;
  }
}

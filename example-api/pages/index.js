import * as React from "react";
import * as System from "slate-react-system";

import { css } from "@emotion/react";

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

export default class SlateIndexPage extends React.Component {
  _handleUpload = async (e) => {
    e.persist();

    const url = "https://slate.host/api/v1/upload-data/--";
    let file = e.target.files[0];
    let data = new FormData();

    data.append("image", file);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic --",
      },
      body: data,
    });

    const json = await response.json();
  };

  render() {
    return (
      <div>
        <System.H1>You will need your own API keys for this to work.</System.H1>
        <br />
        <br />
        <System.P>
          <br />
          <br />
          <div style={{ marginTop: 24 }}>
            <input
              css={STYLES_FILE_HIDDEN}
              type="file"
              id="file"
              onChange={this._handleUpload}
            />
            <System.ButtonPrimary
              style={{ margin: "0 16px 16px 0" }}
              type="label"
              htmlFor="file"
            >
              Upload File
            </System.ButtonPrimary>
          </div>
        </System.P>
      </div>
    );
  }
}

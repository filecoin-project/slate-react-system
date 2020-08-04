import * as React from "react";

export default class SlateIndexPage extends React.Component {
  _handleUpload = async (e) => {
    e.persist();

    const url =
      "https://slate.host/api/v1/upload-data/YOUR-SLATE-ID-FROM-SLATE";
    let file = e.target.files[0];
    let data = new FormData();

    data.append("data", file);

    console.log("Making a storage request");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic YOUR-DEVELOPER-API_KEY",
      },
      body: data,
    });

    const json = await response.json();
    console.log({ json });
  };

  render() {
    return (
      <div>
        <h1>You will need your own API keys for this to work.</h1>

        <input type="file" onChange={this._handleUpload} />
      </div>
    );
  }
}

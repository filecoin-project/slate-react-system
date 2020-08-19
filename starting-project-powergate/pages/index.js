import * as React from "react";
import * as System from "slate-react-system";

import { createPow } from "@textile/powergate-client";

export default class TestPage extends React.Component {
  state = { token: null };

  _pg = null;

  componentDidMount() {
    this._pg = createPow({ host: "https://grpcweb.slate.textile.io" });
  }

  _handleCreateToken = async () => {
    const FFS = await this._pg.ffs.create();
    const token = FFS.token ? FFS.token : null;
    this._pg.setToken(token);
    this.setState({ token });
  };

  render() {
    return (
      <div>
        <System.CreateToken token={this.state.token} onClick={this._handleCreateToken} />
      </div>
    );
  }
}

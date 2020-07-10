import * as React from "react";
import * as System from "slate-react-system";

import {
  CreateToken,
  CreateFilecoinAddress,
  CreateFilecoinStorageDeal,
} from "slate-react-system";
import { createPow } from "@textile/powergate-client";

export default class TestPage extends React.Component {
  PG = null;
  state = { token: null, info: null, addrsList: [] };

  componentDidMount() {}

  _handleCreateToken = async () => {
    this.PG = createPow({ host: "http://0.0.0.0:6002" });
    const FFS = await this.PG.ffs.create();
    this.setState({ token: FFS.token ? FFS.token : null });

    this.PG.setToken(FFS.token);

    const { addrsList } = await this.PG.ffs.addrs();
    const { info } = await this.PG.ffs.info();
    this.setState({ addrsList, info });
  };

  _handleCreateAddress = async ({ name, type, makeDefault }) => {
    const response = await this.PG.ffs.newAddr(name, type, makeDefault);

    const { addrsList } = await this.PG.ffs.addrs();
    const { info } = await this.PG.ffs.info();
    this.setState({ addrsList, info });
  };

  _handleSubmitFile = async ({ file }) => {
    let data = new FormData();
    data.append("image", file);

    console.log(data);
  };

  render() {
    console.log(this.state);
    const { token } = this.state;

    return (
      <div>
        <System.H1>Filecoin Application</System.H1>

        <CreateToken
          token={this.state.token}
          onClick={this._handleCreateToken}
        />

        <CreateFilecoinAddress onSubmit={this._handleCreateAddress} />

        <CreateFilecoinStorageDeal onSubmit={this._handleSubmitFile} />
      </div>
    );
  }
}

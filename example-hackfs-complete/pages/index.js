import * as React from "react";
import * as System from "slate-react-system";

import {
  CreateToken,
  CreateFilecoinAddress,
  CreateFilecoinStorageDeal,
  FilecoinBalancesList,
  SendAddressFilecoin,
} from "slate-react-system";
import { createPow } from "@textile/powergate-client";

export default class TestPage extends React.Component {
  PG = null;
  state = { token: null, info: null, addrsList: [] };

  componentDidMount() {}

  _handleRefresh = async () => {
    const { addrsList } = await this.PG.ffs.addrs();
    const { info } = await this.PG.ffs.info();
    this.setState({ addrsList, info });
  };

  _handleCreateToken = async () => {
    this.PG = createPow({ host: "http://pow.slate.textile.io:6002" });
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

  _handleSubmitFile = async (data) => {
    const file = data.file.files[0];

    var buffer = [];

    // NOTE(jim): A little hacky...
    const getByteArray = async () =>
      new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = function(e) {
          if (e.target.readyState == FileReader.DONE) {
            buffer = new Uint8Array(e.target.result);
          }

          resolve();
        };

        reader.readAsArrayBuffer(file);
      });

    await getByteArray();

    const { cid } = await this.PG.ffs.addToHot(buffer);
    const { jobId } = await this.PG.ffs.pushConfig(cid);
    const cancel = this.PG.ffs.watchJobs((job) => {
      console.log(job);
    }, jobId);
  };

  _handleSendFilecoin = async ({ source, target, amount }) => {
    const response = await this.PG.ffs.sendFil(source, target, amount);

    const { addrsList } = await this.PG.ffs.addrs();
    const { info } = await this.PG.ffs.info();
    this.setState({ addrsList, info });
  };

  render() {
    console.log(this.state);
    const { token, info } = this.state;

    return (
      <div>
        <System.H1 onClick={this._handleRefresh}>
          Filecoin Application (Click to update)
        </System.H1>

        <CreateToken
          token={this.state.token}
          onClick={this._handleCreateToken}
        />

        {info ? (
          <FilecoinBalancesList data={this.state.info.balancesList} />
        ) : null}

        <SendAddressFilecoin onSubmit={this._handleSendFilecoin} />

        <CreateFilecoinAddress onSubmit={this._handleCreateAddress} />

        <CreateFilecoinStorageDeal onSubmit={this._handleSubmitFile} />
      </div>
    );
  }
}

import React from "react";
import { VrButton, Text } from "react-360";

export default class File extends React.Component {
  _click = (file) => {
    // input handling
    this.props.onClick && this.props.onClick(file);
  };
  render() {
    return (
      <VrButton onClick={this._click}>
        <Text>{this.props.name}</Text>
      </VrButton>
    );
  }
}

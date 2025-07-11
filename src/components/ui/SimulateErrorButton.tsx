import { Component } from 'react';

interface Props {
  onClick: () => void;
}

class SimulateErrorButton extends Component<Props> {
  render() {
    return (
      <button className="btn btn-rose" onClick={this.props.onClick}>
        Throw Simulated Error
      </button>
    );
  }
}

export default SimulateErrorButton;

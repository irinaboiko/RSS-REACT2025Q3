import { Component } from 'react';

export class BrokenComponent extends Component {
  render() {
    throw new Error('Simulated crash');

    return <p>Brocken Component</p>;
  }
}

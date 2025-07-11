import { Component } from 'react';

interface Props {
  errorMessage: string;
}

class ApiErrorMessage extends Component<Props> {
  render() {
    const { errorMessage } = this.props;
    return (
      <div>
        <h2 className="mb-2 text-xl font-bold text-red-600">
          Oops! An Error Occurred
        </h2>
        <p className="mb-2 font-thin">{errorMessage}</p>
        <p className="mb-2 font-thin">Please, try later</p>
      </div>
    );
  }
}

export default ApiErrorMessage;

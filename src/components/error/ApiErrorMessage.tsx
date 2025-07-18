import { Component } from 'react';

interface Props {
  errorMessage?: string;
}

class ApiErrorMessage extends Component<Props> {
  render() {
    const { errorMessage = 'Unknown error occurred' } = this.props;
    return (
      <div
        className="flex h-full flex-col items-center justify-center gap-4"
        data-testid="api-error-message"
      >
        <img src="/images/error.png" alt="Error" className="h-20" />
        <h2 className="text-xl font-bold text-rose-600">
          Oops! An Error Occurred.
        </h2>
        <p className="font-thin">{errorMessage}</p>
        <p className="font-thin">Please, try later.</p>
      </div>
    );
  }
}

export default ApiErrorMessage;

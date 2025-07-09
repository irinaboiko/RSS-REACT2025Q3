import { Component } from 'react';

interface Props {}

interface State {}

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="search-bar">SEARCH BAR</div>;
  }
}

export default SearchBar;

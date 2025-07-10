import { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="px-3 py-1">
        <h1 className="text-center text-3xl italic">
          People from the Star Wars Universe
        </h1>
      </header>
    );
  }
}

export default Header;

'use strict'

const root = document.getElementById('root');

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <img src="./tmdb_logo.svg" style={{width: 100, height: 100, margin: "0 auto", display: 'block'}} alt=""/>
        <h1 className="title">React Movie Search</h1>
        <SearchMovies/>
      </div>
    )
  };
};


ReactDOM.render(<App/>, root)


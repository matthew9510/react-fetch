import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getDataFromApi();
  }

  getDataFromApi = () => {
    fetch("https://e37h0xjzll.execute-api.us-west-2.amazonaws.com/dev/events")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ data: data.response.body.Items });
        console.log("data:", this.state.data);
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  render() {
    const list = this.state.data.map((item, index) => (
      <div key={index}>{item.title} </div>
    ));

    return (
      <div className="App">
        {list}
        <button onClick={this.getDataFromApi}> Click me to fetch </button>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

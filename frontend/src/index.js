import React, { Component } from "react";
import ReactDOM from "react-dom";
import { API_URL, WEB_URL } from "./utilities/URL";
import { Provider } from "mobx-react";
import { store } from "./store/store";
import axios from "axios";

import HomeContainer from "./components/container/HomeContainer.jsx";
import CalendarContainer from "./components/container/CalendarContainer.jsx";

class App extends Component {
  state = { loggedIn: null };
  componentDidMount() {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    const scope = localStorage.getItem("scope");
    const token_type = localStorage.getItem("token_type");
    const expiry_date = localStorage.getItem("expiry_date");
    if (access_token && refresh_token && scope && token_type && expiry_date) {
      this.setState({ loggedIn: true });
    } else {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let code = params.get("code");
      if (code) {
        axios
          .post(`${API_URL}/rest/auth/token`, { code })
          .then(
            ({
              data: {
                access_token,
                refresh_token,
                scope,
                token_type,
                expiry_date
              }
            }) => {
              localStorage.setItem("access_token", access_token);
              localStorage.setItem("refresh_token", refresh_token);
              localStorage.setItem("scope", scope);
              localStorage.setItem("token_type", token_type);
              localStorage.setItem("expiry_date", expiry_date);
              this.setState({ loggedIn: true }, () => {
                window.location = WEB_URL;
              });
            }
          )
          .catch(error => {
            console.error(error);
            this.logOut();
          });
      } else {
        this.setState({ loggedIn: false });
      }
    }
  }
  logIn = () => {
    axios
      .get(`${API_URL}/rest/auth/url`)
      .then(({ data }) => {
        window.location = data;
      })
      .catch(error => {
        console.error(error);
      });
  };
  logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("scope");
    localStorage.removeItem("token_type");
    localStorage.removeItem("expiry_date");
    this.setState({ loggedIn: false });
  };
  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return <CalendarContainer logOut={this.logOut} />;
    } else if (loggedIn === false) {
      return <HomeContainer logIn={this.logIn} />;
    } else {
      return <div>Loading</div>;
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

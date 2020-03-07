import React, { Component } from "react";
import { View } from "react-native";
import firebase from "firebase";
import {
  Header,
  Button,
  Card,
  CardSection,
  Spinner
} from "./components/common";
import { LoginForm } from "./components/LoginForm";

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBHitp_zjPebAaLvVTRMAuklhfE0WJlFw0",
      authDomain: "authentication0000.firebaseapp.com",
      databaseURL: "https://authentication0000.firebaseio.com",
      projectId: "authentication0000",
      storageBucket: "",
      messagingSenderId: "963377215985",
      appId: "1:963377215985:web:800f82169e5b035"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
            </CardSection>
          </Card>
        );

      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.viewStyle}>
            <Spinner size="large" />
          </View>
        );
    }

    if (this.state.loggedIn) {
      return <Button>Log out</Button>;
    }
    return <LoginForm />;
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
const styles = {
  viewStyle: {
    justifyContent: "center"
  }
};

export default App;

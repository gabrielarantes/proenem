import React, { Component } from "react";

import { View, StyleSheet, Platform, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Text, Button } from "react-native-elements";

import { isEmpty } from "lodash";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };
  }

  login() {
    let login = this.state.login;
    let password = this.state.password;

    let error = 0;
    let messageError = "";

    if (isEmpty(password)) {
      error = 1;
      messageError = "Campo senha deve ser preenchido";
    }

    if (isEmpty(login)) {
      error = 1;
      messageError = "Campo login deve ser preenchido";
    }

    if (error === 1) {
      Alert.alert(
        "Opa",
        messageError,
        [
          {
            text: "OK",
            onPress: () => {}
          }
        ],
        { cancelable: false }
      );
      return false;
    } else {
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <Input
          onChangeText={text => {
            this.setState({ login: text });
          }}
          placeholder="Login"
          leftIcon={
            <Icon
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 5 }}
            />
          }
        />

        <Input
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={text => {
            this.setState({ password: text });
          }}
          leftIcon={
            <Icon
              name="lock"
              size={24}
              color="black"
              style={{ marginRight: 5 }}
            />
          }
        />

        <Button
          onPress={() => this.login()}
          title="ACESSAR"
          style={{ marginTop: 25 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
    paddingTop: Platform.OS === "ios" ? 40 : 25,
    justifyContent: "center",
    alignItems: "center"
  }
});

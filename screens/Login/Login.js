import React, { Component } from "react";

import {
  View,
  StyleSheet,
  Platform,
  Alert,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Text, Button, Image } from "react-native-elements";

import { isEmpty } from "lodash";

import axios from "axios";

const logo = require("../../assets/proenem.png");

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "jose.couves@proenem.com.br",
      password: "12347",
      loading: true
    };
  }

  async componentDidMount() {
    //verifying if user is logged
    let token = await AsyncStorage.getItem("token");
    if (!isEmpty(token)) {
      this.props.navigation.replace("Home");
    }
    this.setState({ loading: false });
  }

  async login() {
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
      let currentUser = {
        email: this.state.login,
        password: this.state.password
      };

      await axios
        .post("https://dev.api.prodigioeducacao.com/v1/token", currentUser)
        .then(response => {
          if (!isEmpty(response.data.token)) {
            let token = response.data.token.toString();
            AsyncStorage.setItem("token", token);

            this.props.navigation.navigate("Home");
          }
        })
        .catch(error => {
          Alert.alert(
            "Opa",
            "Login ou senha inválidos",
            [
              {
                text: "OK",
                onPress: () => {}
              }
            ],
            { cancelable: false }
          );
          return false;
        });
    }
  }

  render() {
    return (
      <View style={styles.root}>
        {/* <Image
          source={{ source: logo }}
          style={{ width: 400, height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
        /> */}
        <Input
          onChangeText={text => {
            this.setState({ login: text });
          }}
          value={this.state.login}
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
          value={this.state.password}
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

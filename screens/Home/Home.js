import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Alert,
  AsyncStorage,
  ScrollView
} from "react-native";
import { Text, Avatar, Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { isEmpty } from "lodash";

import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      loading: true,
      courses: [
        {
          name: "React Native"
        },
        {
          name: "ReactJS"
        },
        {
          name: "Dialog Flow"
        },
        {
          name: "NodeJS"
        },
        {
          name: "Flutter"
        }
      ]
    };
  }

  logout() {
    //clearning the token
    AsyncStorage.setItem("token", "");
    this.props.navigation.navigate("Login");
  }

  async componentDidMount() {
    //getting data from user

    let token = await AsyncStorage.getItem("token");

    let headers = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    await axios
      .get("https://dev.api.prodigioeducacao.com/v1/person/me", headers)
      .then(response => {
        console.warn(response);
        this.setState({
          user: response.data
        });
      })
      .catch(error => {
        Alert.alert(
          "Opa",
          "Erro ao obter dados do usuário!",
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

  render() {
    return (
      <View style={styles.root}>
        <View style={{ flexDirection: "row" }}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: this.state.user.imageProfile
            }}
          />
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text h4>{this.state.user.name}</Text>
            <Text h5>{this.state.user.email}</Text>
          </View>
        </View>

        <View style={{ flex: 1, marginTop: 25 }}>
          <Text h5>Cursos assinados</Text>
          <ScrollView>
            {this.state.courses.map((course, index) => {
              return <ListItem key={index} title={course.name} />;
            })}
          </ScrollView>
        </View>

        <View>
          <Button
            icon={
              <Icon
                name="close"
                size={15}
                color="white"
                style={{ marginRight: 10 }}
              />
            }
            title="Sair"
            onPress={() => this.logout()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 15,
    paddingTop: Platform.OS === "ios" ? 40 : 10
  }
});

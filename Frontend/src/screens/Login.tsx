import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScaledSize,
} from "react-native";
import Button from "../components/Button";
import Form from "../components/LoginForm";
import login from "../scripts/login";

/**
 * This is the login component for the application, this component is responsible for
 * rendering the login components and loading login data.
 */

const Login: React.FC<any> = ({ navigation }) => {
  let [error, setError] = React.useState(false);
  const windowDimensions: ScaledSize = Dimensions.get("window");
  let username: string;
  let password: string;

  const style: any = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    },
    text: {
      fontFamily: "poppinsExtraBold",
      fontSize: 35,
      marginBottom: 30,
      alignSelf: "flex-start",
      paddingLeft: "09%",
    },
    formContainer: {
      marginBottom: 40,
    },
    signup: {
      margin: 15,
      fontFamily: "poppinsExtraBold",
    },
    error: {
      color: "red",
      marginTop: -20,
      marginBottom: 20,
      fontFamily: "poppinsLight",
    },
    link: {
      textDecorationLine: "underline",
      fontFamily: "poppinsExtraBold",
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.text}>Login</Text>
      <View style={style.formContainer}>
        <Form
          title="Username"
          safeEntry={false}
          type="username"
          onTextChange={(text: string): void => {
            username = text;
          }}
        />
        <Form
          title="Username"
          safeEntry={true}
          type="password"
          onTextChange={(text: string): void => {
            password = text;
          }}
        />
        <Text style={style.signup}>
          No account?{" "}
          {
            <TouchableOpacity onPress={() => navigation.navigate("sign-up")}>
              <Text style={style.link}>Signup</Text>
            </TouchableOpacity>
          }
          !
        </Text>
      </View>
      {error ? (
        <Text style={style.error}>Invalid username or password.</Text>
      ) : null}
      <Button
        onPress={(): void => {
          if (username !== undefined || password !== undefined) {
            login(username, password)
              .then((): void => {
                navigation.navigate("menu");
              })
              .catch((err: any): void => {
                setError(true);
                setTimeout(() => {
                  setError(false);
                }, 3000);
                console.error(err);
              });
          } else {
            return;
          }
          //! REMOVE IN PRODUCTION CODE!
          console.log(username, password);
        }}
        color={"#00AD98"}
        textColor={"#ffff"}
        text={"login"}
      />
    </View>
  );
};

export default Login;

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { RootState } from "../redux/index.d";
import Button from "../components/Button";
import reportRoom from "../scripts/reportRoom";

/**
 * This is the room information screen, this screen will display the room information.
 */

namespace RoomInformation {
  export const component: React.FC<any> = ({ navigation }) => {
    const { sessionStatus } = useSelector((state: RootState): RootState => {
      return state;
    });

    const style: any = StyleSheet.create({
      container: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
      },
      text: {
        fontFamily: "poppins",
        fontSize: 15,
      },
      back: {
        justifyContent: "flex-start",
        position: "absolute",
        top: "7%",
        left: "7%",
      },
      boldText: {
        fontFamily: "poppinsBold",
        fontSize: 15,
      },
      reportButton: {
        position: "absolute",
        bottom: "7%",
      },
    });

    return (
      <View style={style.container}>
        <TouchableOpacity
          style={style.back}
          onPress={async (): Promise<void> => {
            navigation.navigate("chat");
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[style.boldText, { fontSize: 20 }]}>
          Room information:
        </Text>
        <View style={{ height: 10 }} />
        <View style={{ flexDirection: "row" }}>
          <Text style={style.boldText}>ID:{"    "}</Text>
          <Text style={style.text}>{sessionStatus.id}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={style.boldText}>Members:{"    "}</Text>
          <Text style={style.text}>{sessionStatus.users.length.toString()}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={style.boldText}>Name:{"    "}</Text>
          <Text style={style.text}>{sessionStatus.name}</Text>
        </View>
        <View style={style.reportButton}>
          <Button
            color={"red"}
            textColor={"#fff"}
            onPress={(): void => {
              Alert.alert(
                "",
                "Are you sure you want to report this room? The Chill&chat team will be notified once reported.",
                [
                  {
                    text: "Report",
                    style: "destructive",
                    onPress: (): void => {
                      console.log("pressed");
                      reportRoom(sessionStatus.id)
                        .then((): void => {
                          Alert.alert(
                            "Room reported",
                            "This room has been reported, thank you for your feedback! We will take action as soon as possible."
                          );
                        })
                        .catch((err: unknown): void => {
                          console.error(err);
                        });
                    },
                  },
                  { text: "Cancel" },
                ]
              );
            }}
            text={"report room"}
          />
        </View>
      </View>
    );
  };
}

export default RoomInformation.component;

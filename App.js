import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Main from "./screen/Main";
import Product from "./screen/Product";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function App() {
  const Stack = createNativeStackNavigator();

  console.log("stack", Stack);
  return (
    <SafeAreaView style={styles.safeView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} options={{ title: "홈화면" }} />
          <Stack.Screen name="Product" component={Product} options={{ title: "상품상세화면" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

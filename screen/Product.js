import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { API_URL } from "../config/constans";
import axios from "axios";
import dayjs from "dayjs";

const Product = (props) => {
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);
  console.log("props", id);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        console.log("result👓", result);
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (!product) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image style={styles.productImage} source={{ uri: `${API_URL}/${product.imageUrl}` }} resizeMode="contain" />
          <Text>상품상세화면</Text>
          <Text>{product.name}</Text>
        </View>
        <View style={styles.productSection}>
          <View style={styles.productSeller}>
            <Text style={styles.sellerText}>{product.seller}</Text>
            <Image style={styles.avatarImage} source={{ uri: "https://fastly.picsum.photos/id/866/100/100.jpg?hmac=ci1nxrYzr9SaVQenyuqBybKgVslILw_KRPf-cZjq4yg" }} />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}원</Text>
          <Text style={styles.productDate}>{dayjs(product.createdAt).format("YYYY년 MM월 DD일")}</Text>
          <Text style={styles.productDesc}>{product.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 300,
  },

  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    height: 50,
    width: 50,
  },
  sellerText: {
    color: "#333",
  },
  productSection: {
    padding: 16,
  },
  divider: {
    backgroundColor: "#ddd",
    height: 1,
    marginVertical: 16,
  },
  sellerText: {
    color: "#333",
  },
  productName: {
    fontSize: 20,
    fontWeight: "400",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  productDate: {
    fontSize: 14,
    marginTop: 4,
    color: "#ddd",
  },
  productDesc: {
    fontSize: 16,
    marginTop: 4,
    color: "#666",
  },
});

export default Product;

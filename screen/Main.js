import { StatusBar } from "expo-status-bar";
import { API_URL } from "../config/constans";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Alert } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.locale("ko");

dayjs.extend(relativeTime);

export default function Main(props) {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const PAGE_WIDTH = Dimensions.get("window").width;
  const baseOptions = {
    width: PAGE_WIDTH / 4,
    height: 200,
    style: {
      width: PAGE_WIDTH,
    },
  };
  useEffect(() => {
    axios
      .get(`${API_URL}/products/`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/banners/`)
      .then((result) => {
        console.log(result);
        setBanners(result.data.banners);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("배너클릭");
            }}
          >
            <Carousel
              {...baseOptions}
              autoPlay={true}
              data={banners}
              renderItem={(banner) => {
                return <Image source={{ uri: `${API_URL}/${banner.item.imageUrl}` }} style={{ width: "100%", height: "100%" }} />;
              }}
            />
          </TouchableOpacity>

          <Text>Products</Text>
          {products &&
            products.map((product, index) => {
              return (
                /* 클릭시 불투명도 적용 */
                <TouchableOpacity
                  key={product.id}
                  onPress={() => {
                    props.navigation.navigate("Product", { id: product.id });
                  }}
                >
                  <View style={styles.productCard} key={product.id}>
                    {product.soldout === 1 && <View style={styles.productBlur} />}
                    <View>
                      <Image source={{ uri: `${API_URL}/${product.imageUrl}` }} style={styles.productImage} resizeMode={"contain"} />
                    </View>
                    <View style={styles.productContent}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productPrice}>{product.price}원</Text>
                    </View>
                    <View style={styles.productFooter}>
                      <View style={styles.productSeller}>
                        <Image source={{ uri: `https://cdn-icons-png.flaticon.com/512/10277/10277946.png` }} style={styles.productAvatar} />
                        <Text style={styles.productSellerName}>{product.seller}</Text>
                      </View>
                      <Text style={styles.productDate}>{dayjs(product.createdAt).fromNow()}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    position: "relative",
  },
  productCard: {
    width: 320,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 210,
  },
  productContent: {
    padding: 8,
  },
  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  productAvatar: {
    width: 24,
    height: 24,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    padding: 8,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
  },
  productBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffffaa",
    zIndex: 999,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
});

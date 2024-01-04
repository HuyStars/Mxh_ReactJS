import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  ActivityIndicator,
  FlatList,
  Alert,
  userImageURL
} from "react-native";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import Posts from "./Posts";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./Profile";
import { Linking } from "react-native";


const HomePage = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [dsbv, setdsbv] = useState([]);
  
  const navigation = useNavigation();
  const [userz, setUser] = useState("");
  const [show, setShow] = useState(false);
  const openFacebookLink = () => {
    Linking.openURL("https://www.facebook.com/");
  };
  
  const getListPro = async () => {
    let url_api = "http://192.168.1.4:3000/baiviet";

    try {
      const response = await fetch(url_api); // load dữ liệu

      const json = await response.json(); // chuyển dữ liệu thành json

      setdsbv(json); // đổ dữ liệu vào state
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleIMA = async () =>{
    try{
      const userJson = await AsyncStorage.getItem("user");
      setUser(JSON.parse(userJson));

      
        if(userJson == null){
          setShow(false)
        }else{
          setShow(true);
        }
    }catch (error) {
      console.error(error);
    }
  }

  const handlePost = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      setUser(JSON.parse(userJson));

  
      if (userz === null) {
        Alert.alert(
          "Thông báo",
          "Bạn phải đăng nhập để đăng bài viết",
          [
            {
              text: "Đăng nhập",
              onPress: () => props.navigation.navigate("Login"),
            },
            {
              text: "Huỷ",
              style: "cancel",
            },
          ]
        );
      } else if (userz.loaitk !== "1") {
        Alert.alert("Thông báo", "Bạn không có quyền đăng bài viết.");
      } else {
        // Lấy giá trị URL hình ảnh người dùng và cập nhật userImageURL
        
        setshowDialogModal(true);
        
      }
    } catch (error) {
      console.error(error);
    }
  };





  const renderProduct = ({ item }) => {
    // Viết chức năng xóa ở đây
    const xoaSP = () => {
      Alert.alert("Xác nhận xóa", "Bạn có chắc chắn muốn xóa bài viết này?", [
        {
          text: "Hủy bỏ",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => {
            // Thực hiện xóa bài viết khi người dùng xác nhận
            let url_api_del = "http://192.168.1.4:3000/baiviet/" + item.id;

            fetch(url_api_del, {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                if (res.status == 200) {
                  alert("Đã xóa");
                  getListPro();
                }
              })
              .catch((ex) => {
                console.log(ex);
              });
          },
        },
      ]);
    };
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: item.avatar }}
            style={{ width: 50, height: 50 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.postAuthor}>{item.tentk}</Text>
            <Text style={styles.postContent}>{item.thoigian}</Text>
          </View>
          <Image
            source={{ uri: "https://i.imgur.com/s3b7sK2.png" }}
            style={{ width: 85, height: 35, marginLeft: 130 }}
          />
        </View>

        <Text style={styles.postStatus}>{item.noidung}</Text>

        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.buttonContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: "https://i.imgur.com/ujyzYxX.png" }}
              style={styles.icon}
            />
            <Text style={styles.iconText}>Like</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: "https://i.imgur.com/bz4aXfI.jpg" }}
              style={styles.icon}
            />
            <Text style={styles.iconText}>Comment</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: "https://i.imgur.com/mtC5xbK.png" }}
              style={styles.icon}
            />
            <Text style={styles.iconText} onPress={openFacebookLink}>Share</Text>
          </View>
        </View>
      </View>
    );
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // cập nhật giao diện ở đây
      handleIMA();
      getListPro();
    });

    return unsubscribe;
  }, [props.navigation]);

  // Cập nhật danh sách sau khi đăng bài viết thành công
  const handlePostSuccess = () => {
    getListPro();
  };


  const [showDialogModal, setshowDialogModal] = useState(false);
  // Lấy thông tin người dùng từ dữ liệu "user" dựa trên tài khoản đã đăng nhập

  return (
    <ScrollView>
      <Modal
        visible={showDialogModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setshowDialogModal(false);
        }}
      >
        <View style={styles.modal}>
          <Posts
            value={showDialogModal}
            setshowDialogModal={setshowDialogModal}
            onSaveComplete={handlePostSuccess}
            navigation={props.navigation}
            data={userz}
             // Truyền hàm setshowDialogModal vào Posts
          />
        </View>
      </Modal>

      {/* Phần "Bạn đang nghĩ gì?" và biểu tượng "Thêm ảnh" */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        {show && <Image
          source={{ uri: userz.anhdd  }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
            marginLeft: 5,
          }}
        />}
        <TouchableOpacity
          style={{ width: 320 }}
          onPress={handlePost}
        >
          <TextInput
            placeholder="Bạn đang nghĩ gì?"
            editable={false}
            style={{ flex: 1, fontSize: 16 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://i.imgur.com/0sWw66o.png" }}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={dsbv}
          keyExtractor={(item_bv) => {
            return item_bv.id;
          }}
          renderItem={renderProduct}
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "white",
  },
  khung_dialog: {
    backgroundColor: "white",
    width: "100%",
    padding: 16,
    borderRadius: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 18,
  },
  createPostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createPostText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "yellow",
    height: 300,
    marginTop: 10,
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  cancelIconContainer: {
    alignItems: "flex-end",
    marginTop: 16,
  },
  cancelIcon: {
    marginBottom: 20,
    fontSize: 20,
    color: "black",
  },
  placeholderText: {
    fontSize: 18,
    color: "#ccc",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postAuthor: {
    fontSize: 16,
    color: "black",
    marginLeft: 20,
    marginTop: 2,
  },
  postContent: {
    fontSize: 10,
    marginLeft: 20,
  },
  postImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
    borderRadius: 5,
  },
  postStatus: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default HomePage;

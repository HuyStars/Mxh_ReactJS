import React, { useState, useEffect } from "react";
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { format } from "date-fns";

const UpdateBV = (props) => {
    // console.log("props: "+props.data.id)
    // console.log("props+ route "+props.route)
    // console.log("props.route.params "+props.route.params)
    console.log("noidung: " + props.data.noidung)
  const [avatar, setAvatar] = useState(props.data.avatar);
  const [tentk, setTentk] = useState(props.data.tentk);
  const [noidung, setNoidung] = useState(props.data.noidung);
  const [imagez, setImage] = useState(props.data.image);
  const currentDateTime = new Date();
  const day = currentDateTime.getDate();
  const month = currentDateTime.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0, nên cộng thêm 1.
  const year = currentDateTime.getFullYear();
  const formattedDateTime = `${day}/${month}/${year}`;
  const [thoigian, setTime] = useState(currentDateTime);
  const [userImageURL, setUserImageURL] = useState(null); 
  const [showDialogModal, setshowDialogModal] = useState(props.value); 

  const SaveProduct = () => {
    // tạo đối tượng dữ liệu
    setTime(formattedDateTime)
    console.log(currentDateTime)
    let _id = props.data.id;
    let objSP = {
        avatar: avatar,
        tentk: tentk,
        noidung: noidung,
        image: imagez,
        thoigian: formattedDateTime
    };
    let url_api = "http://192.168.1.4:3000/baiviet/" + _id;

    fetch(url_api, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSP),
    })
      .then((res) => {
        if (res.status == 200) alert("Sửa thành công");
        props.onSaveComplete(); 
        hendal();
        
      })
      .catch((ex) => {
        console.log(ex);
      });
  };
  const handleIMAGE = async () =>{
    try{
      const userJson = await AsyncStorage.getItem("user");
      const user = JSON.parse(userJson);

      const anhDDD = user.anhdd;
        setUserImageURL(anhDDD);
    }catch (error) {
      console.error(error);
    }
  }

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

  const pickImage = async () => {
    // Không cần yêu cầu quyền truy cập thư viện ảnh
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // Kiểm tra xem việc chọn hình ảnh đã thành công hay chưa
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    } else {
      // Xử lý khi người dùng không chọn ảnh
      alert("Thiếu ảnh");
    }
  };

  const hendal =()=>{
    props.setshowDialogModal(false);
  }


  
  return (
    <View style={styles.khung_dialog}>
      <View style={styles.createPostContainer}>
        <TouchableOpacity
          style={styles.cancelIconContainer}
          onPress={hendal}
        >
          <Text style={styles.cancelIcon}>X</Text>
        </TouchableOpacity>
        <Text style={styles.createPostText}>Tạo bài viết</Text>
        <Button
          title="Update"
          onPress={() => {
            SaveProduct(() => {
              // Sau khi lưu dữ liệu xong, ẩn dialog
              props.setshowDialogModal(false);
            });
          }}
        />
      </View>
      <View style={styles.userContainer}>
        <Image
          source={{ uri: avatar }}
          style={styles.userAvatar}
        />
        <Text style={styles.userName}>Lê Văn Huy</Text>
      </View>

      <TextInput
        placeholder="Bạn đang nghĩ gì?"
        style={styles.textInput}
        onChangeText={(txt) => setNoidung(txt)}
        textAlignVertical="top"
        multiline={true}
        value={noidung}
        numberOfLines={5}
      />
      <View style={styles.iconContainer}>
        {
          <Image
            source={{ uri: imagez }}
            style={{ width: 100, height: 100, marginLeft: 150 }}
          />
        }
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: "https://i.imgur.com/296Y0FN.png" }}
              style={styles.iconImage}
            />

            <Text style={{ marginLeft: 20, marginTop: 3 }}>Ảnh/Video</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: "https://i.imgur.com/0yT3Bk8.png" }}
              style={styles.iconImage}
            />
            <Text style={{ marginLeft: 20, marginTop: 3 }}>
              Cảm xúc/hoạt động
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    color: "gray",
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

export default UpdateBV;

import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { el } from "date-fns/locale";
import { useNavigation } from '@react-navigation/native';

const Profile = (props) => {
  const [userz, setUser] = useState("");
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const handleIMA = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      setUser(JSON.parse(userJson));
      if(userJson === null){
        setShow(false)
      }else{
        setShow(true)
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(show)

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // cập nhật giao diện ở đây
      handleIMA();
    });

    return unsubscribe;
  }, [props.navigation]);
  // Dữ liệu hồ sơ cá nhân
  const profileData = {
    name: "Huy",
    age: 21,
    email: "huylvph30524@fpt.edu.vn",
    phone: "0904.789.710",
    // Đường dẫn đến ảnh hồ sơ cá nhân
    profileImageUrl: "",
  };

  const handleLogout = async () => {
    // Xóa dữ liệu từ AsyncStorage
    try {
      await AsyncStorage.removeItem("user");
      // Sau khi xóa dữ liệu, bạn có thể thực hiện các hành động khác ở đây (ví dụ: đưa người dùng đến màn hình đăng nhập).
      // Reset navigation route
      navigation.reset({
        index: 0,
        routes: [{ name: 'TabButton' }],
      });
    } catch (error) {
      console.error('Lỗi khi xóa dữ liệu từ AsyncStorage:', error);
    }
  };

    // Gọi hàm từ màn hình khác
const QuanLyBV = () => {
  if(userz.loaitk == 1){
    // Hoặc điều hướng đến màn hình khác
  props.navigation.navigate('Quanlybaiviet');
  }else{
    alert("Bạn không phải admin");
  }
};

  if (show) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profile}>
          <Image
            source={{ uri: userz.anhdd }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.name}>Name: {userz.taikhoan}</Text>
            <Text style={styles.detail}>Age: {profileData.age}</Text>
            <Text style={styles.detail}>Email: {profileData.email}</Text>
            <Text style={styles.detail}>Phone: {profileData.phone}</Text>
          </View>
        </View>
        <Pressable style={{ marginTop: 20 }}>
          <Button
            title="Logout"
            onPress={handleLogout}
          />
          
        </Pressable>
        <Pressable style={{ marginTop: 20 }}>
        <Button title="Quản lý bài viết" onPress={QuanLyBV}/>
        </Pressable>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.notLoggedInText}>Bạn chưa đăng nhập</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  profileDetails: {
    marginTop: 20,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  logoutText: {
    color: "white",
    fontSize: 18,
  },
});

export default Profile;

import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from 'expo-vector-icons';
import Button from '../components/Button';


const Signup = ({navigation}) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [taikhoan, setTaikhoan] = useState("");
    const [matkhau, setMatkhau] = useState("");
    const [anhdd, setanhdd] = useState("https://i.imgur.com/fFjJg70.png");
    const [tentk, setTentk] = useState("Khách hàng");
    const [loaitk, setLoaitk] = useState("0");

    console.log(loaitk)


    const SavePerson = () => {
        // Tạo đối tượng dữ liệu
        let objSP = {
            taikhoan: taikhoan,
            matkhau: matkhau,
            anhdd: anhdd,
            tentk: tentk,
            loaitk: loaitk,
        };
        let url_api = "http://192.168.1.4:3000/user";
    
        fetch(url_api, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(objSP),
        })
          .then((res) => {
            if (res.status == 201) alert("Thêm thành công");
          })
          .catch((ex) => {
            console.log(ex);
          });
      };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView
    style={{flex: 1, backgroundColor: COLORS.white}}>
        <View style={{flex: 1, marginHorizontal: 22}}>
            <View style={{marginVertical: 22}}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginVertical: 12,
                    color: COLORS.black
                }}>
                    Create Account
                </Text>

                <Text style={{
                    fontSize: 16,
                    color: COLORS.black
                }}>Connect with your friend today!</Text>
            </View>
            <View style={{marginBottom: 12}}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>Email address</Text>
                
                <View style={{
                    width: "100%",
                    height : 48,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22
                }}>
                        <TextInput
                        placeholder='Enter your email address'
                        placeholderTextColor={COLORS.black}
                        keyboardType="email-address"
                        onChangeText={(txt) => setTaikhoan(txt)}
                        style={{
                            width: "100%"
                        }}
                        />
                </View>
                
            </View>
            
            <View style={{marginBottom: 12}}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>Mobile Number</Text>
                
                <View style={{
                    width: "100%",
                    height: 48,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: 22
                }}>
                        <TextInput
                        placeholder='+84'
                        placeholderTextColor={COLORS.black}
                        keyboardType='numeric'
                        style={{
                            width: "12%",
                            borderRightWidth: 1,
                            borderLeftColor: COLORS.grey,
                            height: "100%"
                        }}
                        />
                        <TextInput
                        placeholder='Enter your phone number'
                        placeholderTextColor={COLORS.black}
                        keyboardType='numeric'
                        style={{
                            width: "80%"
                        }}
                        />
                </View>
                
            </View>

            <View style={{marginBottom: 12}}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>Password</Text>
                
                <View style={{
                    width: "100%",
                    height : 48,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22
                }}>
                        <TextInput
                        placeholder='Enter your password'
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={!isPasswordShown}
                        onChangeText={(txt) => setMatkhau(txt)}
                        style={{
                            width: "100%"
                        }}
                        />
                </View>
                
            </View>
            
                <Button
                title="Sign Up"
                filled
                onPress={SavePerson}
                style={{
                    marginTop: 28,
                    marginBottom: 4
                }}
                />
            
            <View style={{flexDirection:'row', alignItems:'center', marginVertical: 20}}>
                <View
                    style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: COLORS.grey,
                        marginHorizontal: 10
                    }}
                />
                <Text style={{fontSize: 14}}>Or Sign up with</Text>
                <View
                    style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: COLORS.grey,
                        marginHorizontal: 10
                    }}
                />
            </View>
            <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <View style={{
                            flex: 1,
                            paddingTop: 7,
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text 
                        >Facebook</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{
                            flex: 1,
                            paddingTop: 7,
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}
                        
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
        </View>

    </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Signup
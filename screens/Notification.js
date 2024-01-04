import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng FontAwesome icon pack

const Notification = () => {
  // Giả lập dữ liệu thông báo
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'Like', text: 'John đã thích bài viết của bạn.' },
    { id: '2', type: 'Comment', text: 'Alice đã bình luận trên bài viết của bạn.' },
    { id: '3', type: 'Share', text: 'Bob đã chia sẻ bài viết của bạn.' },
    // Thêm các thông báo khác tương tự ở đây
  ]);

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>Thông báo</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                padding: 16,
                margin: 16,
                flexDirection: 'row', // Đặt dạng dọc
                alignItems: 'center', // Căn giữa dọc
              }}
            >
              {/* Hiển thị biểu tượng tùy thuộc vào loại thông báo */}
              {item.type === 'Like' && <Icon name="thumbs-up" size={24} color="blue" />}
              {item.type === 'Comment' && <Icon name="comment" size={24} color="green" />}
              {item.type === 'Share' && <Icon name="share" size={24} color="orange" />}
              {/* Hiển thị nội dung văn bản */}
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Notification;

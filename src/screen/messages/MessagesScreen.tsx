import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import { strings } from '../../constants/strings';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
}

export const MessagesScreen = ({ navigation }: any) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    // Generate mock messages
    const mockMessages: Message[] = [
      {
        id: '1',
        sender: 'Dr. Sarah Johnson',
        message: `Hi ${user?.name || 'there'}, I wanted to confirm your appointment for tomorrow at 2:00 PM. Please let me know if that still works for you.`,
        timestamp: '10:30 AM',
        isRead: false,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        id: '2',
        sender: 'Appointly Support',
        message: 'Welcome to Appointly! If you need any help getting started, please don\'t hesitate to reach out.',
        timestamp: 'Yesterday',
        isRead: true,
      },
      {
        id: '3',
        sender: 'Dr. Michael Chen',
        message: 'Your test results have been uploaded to your patient portal. Everything looks good!',
        timestamp: '2 days ago',
        isRead: true,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    ];
    
    setMessages(mockMessages);
  }, [user]);
  
  const handleMessagePress = (messageId: string) => {
    // Mark as read and navigate to conversation
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
    
    navigation.navigate('MessageDetail', { messageId });
  };
  
  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity 
      style={[styles.messageItem, !item.isRead && styles.unreadMessage]} 
      onPress={() => handleMessagePress(item.id)}
    >
      <View style={styles.messageHeader}>
        <View style={styles.avatarContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{item.sender.charAt(0)}</Text>
            </View>
          )}
        </View>
        <View style={styles.messageInfo}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.messageText} numberOfLines={2}>{item.message}</Text>
      {!item.isRead && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      
      {messages.length > 0 ? (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{strings.noMessages || 'No messages yet'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: Color.primary,
  },
  listContainer: {
    flexGrow: 1,
    padding: 16,
  },
  messageItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#E0E0E0',
    position: 'relative',
  },
  unreadMessage: {
    backgroundColor: Color.primary + '10', // Light version of primary color
    borderLeftColor: Color.primary,
  },
  messageHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Color.white,
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  messageInfo: {
    flex: 1,
  },
  sender: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: Color.black,
  },
  messageText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: '#333',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Color.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Color.placeholder,
    textAlign: 'center',
  },
}); 
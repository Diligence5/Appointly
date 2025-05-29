import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import images from '../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export const MessageDetailScreen = ({ route, navigation }: any) => {
  const { messageId } = route.params;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  // Mock data for the selected message thread
  const mockContacts: Record<string, { name: string, avatar?: string, profession: string }> = {
    '1': {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      profession: 'Dentist'
    },
    '2': {
      name: 'Appointly Support',
      profession: 'Customer Support'
    },
    '3': {
      name: 'Dr. Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      profession: 'Cardiologist'
    },
  };

  const contact = mockContacts[messageId];

  useEffect(() => {
    // Load mock conversation based on messageId
    const mockConversation: ChatMessage[] = [
      {
        id: '1',
        text: `Hello ${user?.name || 'there'}, how are you feeling today?`,
        isUser: false,
        timestamp: '10:30 AM'
      },
      {
        id: '2',
        text: 'I\'m doing well, thank you for asking.',
        isUser: true,
        timestamp: '10:32 AM'
      },
      {
        id: '3',
        text: messageId === '1'
          ? 'Great! I wanted to confirm your appointment for tomorrow at 2:00 PM. Does that still work for you?'
          : messageId === '2'
            ? 'Welcome to Appointly! If you need any help getting started, please don\'t hesitate to reach out.'
            : 'Your test results have been uploaded to your patient portal. Everything looks good!',
        isUser: false,
        timestamp: '10:33 AM'
      },
    ];

    setMessages(mockConversation);
  }, [messageId, user]);

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages]);

  // Add keyboard listeners to scroll to bottom when keyboard appears
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      scrollToBottom
    );
    
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');

      // Simulate response after a short delay
      setTimeout(() => {
        const responseMsg: ChatMessage = {
          id: Date.now().toString(),
          text: "Thanks for your message. I'll get back to you soon!",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, responseMsg]);
      }, 1000);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Image
            source={images.icon_back_press_arrow}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact?.name || 'Contact'}</Text>
          <Text style={styles.contactProfession}>{contact?.profession || ''}</Text>
        </View>

        {contact?.avatar ? (
          <Image source={{ uri: contact.avatar }} style={styles.contactAvatar} />
        ) : (
          <View style={styles.contactAvatarPlaceholder}>
            <Text style={styles.contactAvatarText}>
              {(contact?.name || 'C').charAt(0)}
            </Text>
          </View>
        )}
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(message => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.contactMessage
              ]}
            >
              <Text style={[
                styles.messageText,
                message.isUser && { color: Color.white }
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.messageTimestamp,
                message.isUser && { color: Color.white + '80' }
              ]}>
                {message.timestamp}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <TouchableOpacity
            style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <Image 
              source={images.icon_send_message}
              style={styles.sendIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {

  },
  backIcon: {

  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: Color.black,
  },
  contactProfession: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contactAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactAvatarText: {
    color: Color.white,
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: Color.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  contactMessage: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    fontFamily: FontFamily.regular,
    color: Color.black,
    lineHeight: 22,
  },
  messageTimestamp: {
    fontSize: 11,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 4,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: FontFamily.regular,
    maxHeight: 100,
    minHeight: 40,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: Color.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Color.primary + '80',
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: Color.white,
  },
}); 
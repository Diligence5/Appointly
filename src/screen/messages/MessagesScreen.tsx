import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';  
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../assets/images/images';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  name: string;
  preview: string;
  timestamp: string;
  avatar: any;
  hasEmoji?: boolean;
}

export const MessagesScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  // Mock message data based on the image
  const messages: Message[] = [
    {
      id: '1',
      name: 'Haisley Junior',
      preview: 'How are you?',
      timestamp: `2 ${t('mins_ago')}`,
      avatar: require('../../../assets/images/icon_profile_place_holder.png')
    },
    {
      id: '2',
      name: 'Javier Stongry',
      preview: 'Omg, this is amazing',
      timestamp: '8/2/2023',
      avatar: require('../../../assets/images/icon_profile_place_holder.png')
    },
    {
      id: '3',
      name: 'Natalie Edwards',
      preview: 'Haha that\'s terrifying 😂',
      timestamp: '12/4/2023',
      avatar: require('../../../assets/images/icon_profile_place_holder.png'),
      hasEmoji: true
    },
    {
      id: '4',
      name: 'Dracia Vesta',
      preview: 'Wow, this is really epic',
      timestamp: '1/15/2023',
      avatar: require('../../../assets/images/icon_profile_place_holder.png')
    },
    {
      id: '5',
      name: 'Annie Stacia',
      preview: 'Haha oh man',
      timestamp: '12/10/2023',
      avatar: require('../../../assets/images/icon_profile_place_holder.png')
    }
  ];

  const handleMessagePress = (messageId: string) => {
    navigation.navigate('MessageDetail', { messageId });
  };

  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => handleMessagePress(item.id)}
    >
      {/* User Avatar */}
      <Image source={item.avatar} style={styles.avatar} />

      {/* Message Content */}
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.preview}>{item.preview}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top ,paddingBottom:insets.bottom}]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('messages')}</Text>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FontFamily.bold,
    color: Color.black,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Color.black,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
  preview: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  }
}); 
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Pressable,
  ImageStyle,
} from 'react-native';
import { COLORS, FONT_SIZE, LINE_HEIGHT } from '../../../themes';
import images from '../../../../assets/images/images';

// Define font weights as strings to match React Native requirements
const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

const AgentProfileScreen = () => {
  const agentAvatars = [
    { id: '1', name: 'Spika', amount: '$509,32K', image: images.icon_profile_place_holder },
    { id: '2', name: 'James', amount: '$509,32K', image: images.icon_profile_place_holder, selected: true },
    { id: '3', name: 'Bart', amount: '$509,32K', image: images.icon_profile_place_holder },
    { id: '4', name: 'Jarvis', amount: '$509,32K', image: images.icon_profile_place_holder },
    { id: '5', name: 'James', amount: '$509,32K', image: images.icon_profile_place_holder },
  ];

  const chatMessages = [
    {
      id: '1',
      sender: 'SOIKA AI',
      message: "Hi! I'm SOIKA, your ultimate web3 assistant! Help to make product offerings as NFT, navigate it to relevant token holders, I can activate your token community page on",
      timestamp: '17:07:39',
      isBot: true,
      link: 'Metalayerone Social Network'
    },
    {
      id: '2',
      sender: 'USER',
      message: "Hi",
      timestamp: '17:07:39',
      isBot: false,
      additionalText: 'Took 1 Step'
    },
    {
      id: '3',
      sender: 'SOIKA AI',
      message: "You can read it in the post",
      timestamp: '17:07:39',
      isBot: true,
      embeddedPost: {
        author: '@jamesbond',
        timeAgo: '3 minutes ago',
        content: "I've just create a brand new my JamesSpace sunset view background, so you can enjoy your each day with happiness. #Sunset #Background #JamesSpace #NFT",
        image: images.icon_profile_place_holder,
        stats: {
          views: '130k',
          likes: '3',
          comments: '1'
        }
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={images.icon_logo} 
          style={styles.logo as ImageStyle} 
          resizeMode="contain"
        />
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Image 
              source={images.icon_notification_black} 
              style={styles.icon as ImageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={images.icon_profile_place_holder} 
              style={styles.profileIcon as ImageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Image 
              source={images.icon_add_black} 
              style={styles.icon as ImageStyle}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Avatar Carousel */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.avatarScrollView}
          contentContainerStyle={styles.avatarContainer}
        >
          {agentAvatars.map((agent) => (
            <View 
              key={agent.id} 
              style={[
                styles.avatarCard, 
                agent.selected && styles.selectedAvatarCard
              ]}
            >
              <View style={styles.avatarCircle}>
                <Image source={agent.image} style={styles.avatarImage as ImageStyle} />
              </View>
              <Text style={styles.avatarName}>{agent.name}</Text>
              <Text style={styles.avatarAmount}>{agent.amount}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image 
            source={images.icon_logo} 
            style={styles.searchIcon as ImageStyle} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={COLORS.text.placeholder}
          />
        </View>

        {/* Agent Details */}
        <View style={styles.agentDetailsContainer}>
          <View style={styles.agentButton}>
            <Text style={styles.agentButtonText}>Agent</Text>
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>0X1234567...7654</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Image 
                source={images.icon_logo} 
                style={styles.copyIcon as ImageStyle} 
              />
            </TouchableOpacity>
          </View>
          <View style={styles.balanceContainer}>
            <Image 
              source={images.icon_logo} 
              style={styles.coinIcon as ImageStyle} 
            />
            <Text style={styles.balanceText}>509,32K</Text>
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCardContainer}>
          <View style={styles.profileCardOuterCircle}>
            <View style={styles.profileCardInnerCircle}>
              <Image 
                source={images.icon_profile_place_holder} 
                style={styles.profileCardImage as ImageStyle} 
              />
              <View style={styles.playButton}>
                <Image 
                  source={images.icon_logo} 
                  style={styles.playIcon as ImageStyle} 
                />
              </View>
            </View>
          </View>
          
          {/* Name and Share */}
          <View style={styles.nameShareContainer}>
            <Text style={styles.profileName}>James</Text>
            <TouchableOpacity style={styles.shareButton}>
              <Image 
                source={images.icon_logo} 
                style={styles.shareIcon as ImageStyle} 
              />
            </TouchableOpacity>
          </View>

          {/* Mission Statement */}
          <Text style={styles.missionText}>
            Mission to make the world a better and more comfortable place. Connect good AI agents to make the world a better place
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Image 
                source={images.icon_logo} 
                style={styles.actionIcon as ImageStyle} 
              />
              <Text style={styles.actionText}>Edit AI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Image 
                source={images.icon_logo} 
                style={styles.actionIcon as ImageStyle} 
              />
              <Text style={styles.actionText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Image 
                source={images.icon_logo} 
                style={styles.actionIcon as ImageStyle} 
              />
              <Text style={styles.actionText}>Affiliate</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Chat Messages Section */}
        <View style={styles.chatMessagesContainer}>
          {chatMessages.map((message) => (
            <View 
              key={message.id} 
              style={[
                styles.messageContainer,
                message.isBot ? styles.botMessageContainer : styles.userMessageContainer
              ]}
            >
              {message.isBot && (
                <View style={styles.avatarContainer}>
                  <Image 
                    source={images.icon_profile_place_holder} 
                    style={styles.messageAvatar as ImageStyle} 
                  />
                </View>
              )}
              
              <View style={styles.messageContentContainer}>
                <View style={styles.messageHeader}>
                  <Text style={[
                    styles.messageSender,
                    message.isBot ? styles.botMessageSender : styles.userMessageSender
                  ]}>
                    {message.sender}
                  </Text>
                  <Text style={styles.messageTime}>{message.timestamp}</Text>
                </View>
                
                <View style={[
                  styles.messageBubble,
                  message.isBot ? styles.botMessageBubble : styles.userMessageBubble
                ]}>
                  <Text style={styles.messageText}>{message.message}</Text>
                  {message.link && (
                    <Text style={styles.messageLink}>{message.link}</Text>
                  )}
                </View>
                
                {message.additionalText && (
                  <Text style={styles.additionalText}>{message.additionalText}</Text>
                )}
                
                {message.embeddedPost && (
                  <View style={styles.embeddedPostContainer}>
                    <View style={styles.embeddedPostHeader}>
                      <View style={styles.embeddedPostAuthorContainer}>
                        <Image 
                          source={images.icon_profile_place_holder} 
                          style={styles.embeddedPostAvatar as ImageStyle} 
                        />
                        <Text style={styles.embeddedPostAuthor}>{message.embeddedPost.author}</Text>
                      </View>
                      <Text style={styles.embeddedPostTime}>{message.embeddedPost.timeAgo}</Text>
                      <TouchableOpacity style={styles.embeddedPostMoreButton}>
                        <Text style={styles.embeddedPostMoreButtonText}>...</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.embeddedPostContent}>
                      {message.embeddedPost.content}
                    </Text>
                    
                    <View style={styles.embeddedPostImageContainer}>
                      <Image 
                        source={message.embeddedPost.image} 
                        style={styles.embeddedPostImage as ImageStyle} 
                        resizeMode="cover"
                      />
                    </View>
                    
                    <View style={styles.embeddedPostStatsContainer}>
                      <View style={styles.embeddedPostStat}>
                        <Image 
                          source={images.icon_logo} 
                          style={styles.embeddedPostStatIcon as ImageStyle} 
                        />
                        <Text style={styles.embeddedPostStatText}>{message.embeddedPost.stats.views}</Text>
                      </View>
                      
                      <View style={styles.embeddedPostStat}>
                        <Image 
                          source={images.icon_logo} 
                          style={styles.embeddedPostStatIcon as ImageStyle} 
                        />
                        <Text style={styles.embeddedPostStatText}>{message.embeddedPost.stats.likes}</Text>
                      </View>
                      
                      <View style={styles.embeddedPostStat}>
                        <Image 
                          source={images.icon_logo} 
                          style={styles.embeddedPostStatIcon as ImageStyle} 
                        />
                        <Text style={styles.embeddedPostStatText}>{message.embeddedPost.stats.comments}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ))}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* Bottom Tab Bar - Now as a fixed element */}
      <View style={styles.bottomContainer}>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Image 
              source={images.icon_logo} 
              style={styles.tabIcon as ImageStyle} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Image 
              source={images.icon_logo} 
              style={styles.tabIcon as ImageStyle} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Image 
              source={images.icon_logo} 
              style={styles.tabIcon as ImageStyle} 
            />
          </TouchableOpacity>
        </View>

        {/* Chat Input */}
        <View style={styles.chatInputContainer}>
          <TouchableOpacity style={styles.micButton}>
            <Image 
              source={images.icon_logo} 
              style={styles.micIcon as ImageStyle} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.plusButton}>
            <Image 
              source={images.icon_logo} 
              style={styles.plusIcon as ImageStyle} 
            />
          </TouchableOpacity>
          <TextInput
            style={styles.chatInput}
            placeholder="Type your message here"
            placeholderTextColor={COLORS.text.placeholder}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Image 
              source={images.icon_logo} 
              style={styles.sendIcon as ImageStyle} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  logo: {
    width: 120,
    height: 30,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  notificationButton: {
    marginRight: 16,
  },
  profileButton: {
    marginRight: 16,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  menuButton: {},
  scrollView: {
    flex: 1,
    marginBottom: 100, // Add space for the fixed bottom bar
  },
  avatarScrollView: {
    marginTop: 16,
  },
  avatarContainer: {
    paddingHorizontal: 16,
  },
  avatarCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  selectedAvatarCard: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    padding: 4,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  avatarName: {
    marginTop: 8,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  avatarAmount: {
    marginTop: 2,
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: COLORS.button.secondary,
    borderRadius: 22,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: COLORS.icon.secondary,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  agentDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  agentButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  agentButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 20,
  },
  addressText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  copyButton: {
    marginLeft: 8,
  },
  copyIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.card,
    borderRadius: 20,
  },
  coinIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  balanceText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
  profileCardContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  profileCardOuterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileCardInnerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  profileCardImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  playButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 14,
    height: 14,
    tintColor: 'white',
  },
  nameShareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '600',
    marginRight: 12,
  },
  shareButton: {},
  shareIcon: {
    width: 24,
    height: 24,
  },
  missionText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: LINE_HEIGHT.md,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginBottom: 4,
  },
  actionText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
  // Chat Messages Section
  chatMessagesContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageContentContainer: {
    flex: 1,
    maxWidth: '85%',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageSender: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  botMessageSender: {
    color: COLORS.primary,
  },
  userMessageSender: {
    color: '#3D6DCC', // Blue color for user
  },
  messageTime: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  botMessageBubble: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 4,
  },
  userMessageBubble: {
    backgroundColor: '#F5F7FF', // Light blue for user messages
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    color: COLORS.text.primary,
  },
  messageLink: {
    color: COLORS.primary,
    fontWeight: '500',
    marginTop: 4,
  },
  additionalText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  // Embedded Post
  embeddedPostContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
  },
  embeddedPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  embeddedPostAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  embeddedPostAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  embeddedPostAuthor: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  embeddedPostTime: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
    marginRight: 8,
  },
  embeddedPostMoreButton: {
    padding: 4,
  },
  embeddedPostMoreButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
  },
  embeddedPostContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    color: COLORS.text.primary,
  },
  embeddedPostImageContainer: {
    width: '100%',
    height: 200,
  },
  embeddedPostImage: {
    width: '100%',
    height: '100%',
  },
  embeddedPostStatsContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  embeddedPostStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  embeddedPostStatIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  embeddedPostStatText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
  bottomSpacing: {
    height: 20,
  },
  // Bottom Fixed Container
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  // Tab Bar Styles - Modified for fixed position
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.background,
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  // Chat Input Styles - Modified for fixed position
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    backgroundColor: COLORS.background,
  },
  micButton: {
    marginRight: 12,
  },
  micIcon: {
    width: 24,
    height: 24,
  },
  plusButton: {
    marginRight: 12,
  },
  plusIcon: {
    width: 24,
    height: 24,
  },
  chatInput: {
    flex: 1,
    height: 40,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  sendButton: {
    marginLeft: 12,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },
});

export default AgentProfileScreen; 
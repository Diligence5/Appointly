import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Dimensions, 
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Color, FontSizes } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import images from '../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';

const { width, height } = Dimensions.get('window');

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  
  const onboardingData: OnboardingItem[] = [
    {
      id: '1',
      title: 'Browse a wide range of services and treatments',
      description: 'Lorem ipsum dolor sit amet consectetur. Sagittis massa faucibus volutpat viverra ut. Pharetra iaculis amet faucibus praesent eros faucibus.',
      image: images.icon_onboarding_image_one,
    },
    {
      id: '2',
      title: 'Book with Ease',
      description: 'Search, select, and book appointments with just a few taps,Search, select, and book appointments with just a few taps',
      image: images.icon_onboarding_image_two,
    },
    {
      id: '3',
      title: 'Stay Connected',
      description: 'Get reminders and updates about your upcoming appointments',
      image: images.icon_onboarding_image_three,
    },
  ];
  
  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.slide}>
      {/* Background Image */}
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      
      {/* Content overlay at bottom */}
      <View style={styles.contentOverlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        
        <View style={styles.indicatorContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.activeIndicator
              ]}
            />
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Continue"
            onPress={handleNext}
            loading={false}
            buttonStyle={styles.continueButton}
          />
          
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login to Your Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true
      });
    } else {
      navigation.replace('Login');
    }
  };
  
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    marginBottom: 20,
  },
  slide: {
    width,
    height: '100%',
  },
  imageContainer: {
    position: 'absolute',
    width: width,
    marginTop: 20,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {

    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.black,
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    elevation: 10,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor:Color.white,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,

  },
  contentContainer: {
    paddingTop: 24,
    width: '100%',
  },
  title: {
    fontSize: FontSizes.size24,
    fontFamily: FontFamily.bold,
    color: Color.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: FontSizes.size14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: Color.primary,
    width: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  continueButton: {
    backgroundColor: Color.primary,
    height: 56,
    borderRadius: 40,
  },
  loginButton: {
    height: 56,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Color.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: FontSizes.size16,
    fontFamily: FontFamily.bold,
    color: Color.black,
  },
});

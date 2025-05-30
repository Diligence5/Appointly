import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
} from 'react-native';
import { Color } from '../../../themes/theme';
import { FontFamily } from '../../../constants/FontFamily';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '../../../redux/slices/authSlice';
import { User } from '../../../interface/UserInterface';
import images from '../../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const PLAN_CARD_WIDTH = width * 0.7;
const PLAN_CARD_MARGIN = 10;

// Define the membership plan interface
interface MembershipPlan {
    id: string;
    title: string;
    price: string;
    isPopular: boolean;
    features: string[];
}

export const PremiumPlanScreen = ({ navigation, route }: any) => {
    const { userData, token } = route.params || {};
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const [selectedPlanId, setSelectedPlanId] = useState('2'); // Default to middle (premium) plan
    
    // Sample membership plans data
    const membershipPlans: MembershipPlan[] = [
        {
            id: '1',
            title: 'Basic',
            price: '£4.99',
            isPopular: false,
            features: [
                'Basic bookings (3/month)',
                'Standard profile visibility',
                'With ads'
            ]
        },
        {
            id: '2',
            title: 'Premium',
            price: '£9.99',
            isPopular: true,
            features: [
                'Unlimited bookings',
                'Enhanced profile visibility',
                'Free from ads'
            ]
        },
        {
            id: '3',
            title: 'Pro',
            price: '£19.99',
            isPopular: false,
            features: [
                'Unlimited bookings',
                'Priority profile visibility',
                'Free from ads',
                'Premium support',
                'Analytics dashboard'
            ]
        }
    ];

    const handleSkip = () => {
        // If we're in the authenticated flow, just go back
        if (!token) {
            navigation.goBack();
            return;
        }
        
        // Otherwise, set user as authenticated and navigate to main app
        if (userData && token) {
            dispatch(setUser(userData as User));
            dispatch(setAccessToken(token));
        }
        navigation.replace('MainApp');
    };

    const handleStartFreeTrial = () => {
        // If we're in the authenticated flow, just go back
        if (!token) {
            navigation.goBack();
            return;
        }
        
        // Otherwise, navigate to StoreDetailsScreen
        navigation.navigate('StoreDetails', { userData, token });
    };

    const goBack = () => {
        navigation.goBack();
    };

    const renderPlanItem = ({ item }: { item: MembershipPlan }) => {
        const isSelected = selectedPlanId === item.id;
        
        return (
            <TouchableOpacity 
                style={[
                    styles.planCard,
                    isSelected && styles.selectedPlanCard
                ]}
                onPress={() => setSelectedPlanId(item.id)}
                activeOpacity={0.8}
            >
                {item.isPopular && (
                    <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>Most Popular</Text>
                    </View>
                )}
                
                <View style={styles.planHeader}>
                    <Image source={images.icon_membership_star_green} />
                    <Text style={[styles.planPrice, { paddingTop: 10 }]}>{item.price}</Text>
                    <Text style={styles.planTitle}>{item.title}</Text>
                </View>
                
                <View style={styles.planFeatures}>
                    {item.features.map((feature, index) => (
                        <View key={index} style={styles.featureRow}>
                            <Image
                                source={images.icon_check_green}
                                style={styles.checkIcon}
                            />
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Image
                        source={images.icon_back_press_arrow}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Upgrade and Get 50% off</Text>
                    <Text style={styles.subtitle}>Premium for New Users</Text>
                    <Text style={styles.description}>A better frame-work of commercial focus.</Text>
                </View>

                {/* Horizontal Plan Selector */}
                <View style={styles.plansContainer}>
                    <FlatList
                        data={membershipPlans}
                        renderItem={renderPlanItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.planListContainer}
                        snapToInterval={PLAN_CARD_WIDTH + (PLAN_CARD_MARGIN * 2)}
                        snapToAlignment="center"
                        decelerationRate="fast"
                        initialScrollIndex={1} // Start with middle (premium) plan
                        getItemLayout={(data, index) => ({
                            length: PLAN_CARD_WIDTH + (PLAN_CARD_MARGIN * 2),
                            offset: (PLAN_CARD_WIDTH + (PLAN_CARD_MARGIN * 2)) * index,
                            index,
                        })}
                        onMomentumScrollEnd={(event) => {
                            const contentOffset = event.nativeEvent.contentOffset.x;
                            const index = Math.round(contentOffset / (PLAN_CARD_WIDTH + (PLAN_CARD_MARGIN * 2)));
                            if (membershipPlans[index]) {
                                setSelectedPlanId(membershipPlans[index].id);
                            }
                        }}
                    />
                </View>
                
                {/* Plan Selection Indicator */}
                <View style={styles.indicatorContainer}>
                    {membershipPlans.map((plan) => (
                        <View 
                            key={plan.id} 
                            style={[
                                styles.indicator, 
                                plan.id === selectedPlanId && styles.indicatorActive
                            ]}
                        />
                    ))}
                </View>

                {/* Start Free Trial Button */}
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={handleStartFreeTrial}
                >
                    <Text style={styles.startButtonText}>Start Free Trial</Text>
                </TouchableOpacity>

                {/* No commitments text */}
                <Text style={styles.noCommitmentText}>No commitments. Cancel anytime</Text>

                {/* Skip Option */}
                <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                    <Text style={styles.skipText}>Skip for now</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    backButton: {
        marginTop: 16,
        width: 44,
        height: 44,
        justifyContent: 'center',
    },
    backIcon: {

    },
    headerContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontFamily: FontFamily.bold,
        color: Color.black,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 24,
        fontFamily: FontFamily.bold,
        color: Color.black,
        marginBottom: 12,
    },
    description: {
        fontSize: 14,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
    },
    plansContainer: {
        marginBottom: 20,
    },
    planListContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    planCard: {
        width: PLAN_CARD_WIDTH,
        marginHorizontal: PLAN_CARD_MARGIN,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#F9F9F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    selectedPlanCard: {
        borderColor: Color.primary,
        borderWidth: 2,
        backgroundColor: '#F5F9F5',
    },
    popularBadge: {
        position: 'absolute',
        top: -10,
        right: 10,
        backgroundColor: Color.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 1,
    },
    popularText: {
        color: Color.white,
        fontSize: 10,
        fontFamily: FontFamily.bold,
    },
    planHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    planCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    premiumCircle: {
        backgroundColor: '#FFD700', // Gold color for premium
    },
    planIcon: {
        color: Color.white,
        fontSize: 18,
        fontFamily: FontFamily.bold,
    },
    planPrice: {
        fontSize: 24,
        fontFamily: FontFamily.bold,
        color: Color.black,
    },
    planTitle: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: Color.black,
        marginTop: 4,
    },
    planFeatures: {
        flex: 1,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    featureText: {
        fontSize: 12,
        fontFamily: FontFamily.regular,
        color: Color.black,
        flex: 1,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    indicator: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#D8D8D8',
        marginHorizontal: 4,
    },
    indicatorActive: {
        backgroundColor: Color.primary,
        width: 20,
    },
    startButton: {
        backgroundColor: Color.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    startButtonText: {
        fontSize: 16,
        fontFamily: FontFamily.bold,
        color: Color.white,
    },
    noCommitmentText: {
        fontSize: 14,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
        textAlign: 'center',
        marginBottom: 24,
    },
    skipButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    skipText: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.primary,
    },
}); 
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import { strings } from '../../constants/strings';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearAccessToken } from '../../redux/slices/authSlice';
import images from '../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ProfileScreen = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        // Clear the authentication state
                        dispatch(clearAccessToken());
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const menuItems = [
        { id: '1', title: 'Edit Profile', icon: 'edit', action: () => navigation.navigate('EditProfile') },
        { id: '2', title: 'My Appointments', icon: 'calendar', action: () => navigation.navigate('Booking') },
        { id: '3', title: 'Payment Methods', icon: 'credit-card', action: () => console.log('Payment Methods') },
        { id: '4', title: 'Notifications', icon: 'bell', action: () => console.log('Notifications') },
        { id: '5', title: 'Help & Support', icon: 'help-circle', action: () => console.log('Help & Support') },
        { id: '6', title: 'Logout', icon: 'log-out', action: handleLogout },
    ];

    const renderMenuItem = (item: { id: string; title: string; icon: string; action: () => void }) => (
        <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.action}
        >
            {/* Replace with actual icon component if available */}
            <View style={styles.iconPlaceholder} />
            <Text style={styles.menuItemText}>{item.title}</Text>
        </TouchableOpacity>
    );

    const getInitials = (name: string) => {
        return name
            ? name.split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()
            : 'U';
    };

    const navigateToEditProfile = () => {
        // Navigate to edit profile screen
        navigation.navigate('EditProfile');
    };

    const navigateToStoreDetails = () => {
        // Navigate to store details screen
        navigation.navigate('StoreDetails', { userData: user });
    };

    const navigateToPaymentMethod = () => {
        // Navigate to payment method screen
        // navigation.navigate('PaymentMethod');
    };

    const navigateToSubscription = () => {
        // Navigate to subscription screen
        navigation.navigate('PremiumPlan', { userData: user });
    };

    const navigateToAbout = () => {
        // Navigate to about screen
        navigation.navigate('About');
    };

    const navigateToStoreListing = () => {
        // Navigate to store listing screen
        navigation.navigate('StoreListing');
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileInfo}>
                        {user?.profile_image ? (
                            <Image source={{ uri: user.profile_image }} style={styles.profileImage} />
                        ) : (
                            <View style={[styles.profileImage, styles.profileImagePlaceholder]}>
                                <Text style={styles.profileImagePlaceholderText}>
                                    {getInitials(user?.name || 'User')}
                                </Text>
                            </View>
                        )}
                        <View style={styles.profileDetails}>
                            <Text style={styles.profileName}>{user?.name || 'User'}</Text>
                            <Text style={styles.profileEmail}>{user?.email || 'No email provided'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={navigateToEditProfile}>
                        <Text style={styles.editButtonText}>Edit</Text>
                        <Image source={images.icon_arrow_right_black} style={{ width: 12, height: 12 }} />
                    </TouchableOpacity>
                </View>

                {/* Store Listing Section */}
                <TouchableOpacity style={styles.storeListing} onPress={navigateToStoreListing}>
                    <View style={styles.storeListingLeft}>
                        <View style={styles.storeIconContainer}>
                            <Image
                                source={images.icon_profile_place_holder}
                                style={styles.storeIcon}
                            />
                        </View>
                        <View style={styles.storeListingText}>
                            <Text style={styles.storeListingTitle}>View Store Listing</Text>
                            <Text style={styles.storeListingSubtitle}>Vel nulla libero arcurus pellentesque</Text>
                        </View>
                    </View>
                    <Image
                        source={images.icon_arrow_right_black}
                        style={styles.arrowIcon}
                    />
                </TouchableOpacity>

                {/* Settings Sections */}
                <View style={styles.settingsSection}>
                    {/* Store Details */}
                    <TouchableOpacity style={styles.settingsItem} onPress={navigateToStoreDetails}>
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.settingsIconContainer}>
                                <Image
                                    source={images.icon_person_black}
                                    style={styles.settingsIcon}
                                />
                            </View>
                            <View>
                                <Text style={styles.settingsTitle}>Store Details</Text>
                                <Text style={styles.settingsSubtitle}>Edit your store details, Services, Staff Details</Text>
                            </View>
                        </View>
                        <Image
                            source={images.icon_arrow_right_black}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>

                    {/* Payment Method */}
                    <TouchableOpacity style={styles.settingsItem} onPress={navigateToPaymentMethod}>
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.settingsIconContainer}>
                                <Image
                                    source={images.icon_person_black}
                                    style={styles.settingsIcon}
                                />
                            </View>
                            <View>
                                <Text style={styles.settingsTitle}>Payment Method</Text>
                                <Text style={styles.settingsSubtitle}>Method for your transaction</Text>
                            </View>
                        </View>
                        <Image
                            source={images.icon_arrow_right_black}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>

                    {/* Subscription */}
                    <TouchableOpacity style={styles.settingsItem} onPress={navigateToSubscription}>
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.settingsIconContainer}>
                                <Image
                                    source={images.icon_person_black}
                                    style={styles.settingsIcon}
                                />
                            </View>
                            <View>
                                <Text style={styles.settingsTitle}>Subscription</Text>
                                <Text style={styles.settingsSubtitle}>Free Trial Activated</Text>
                            </View>
                        </View>
                        <Image
                            source={images.icon_arrow_right_black}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>

                    {/* About */}
                    <TouchableOpacity style={styles.settingsItem} onPress={navigateToAbout}>
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.settingsIconContainer}>
                                <Image
                                    source={images.icon_info_circle_black}
                                    style={styles.settingsIcon}
                                />
                            </View>
                            <View>
                                <Text style={styles.settingsTitle}>About</Text>
                                <Text style={styles.settingsSubtitle}>Shiny 2.3.1</Text>
                            </View>
                        </View>
                        <Image
                            source={images.icon_arrow_right_black}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>

                    {/* Logout */}
                    <TouchableOpacity style={styles.settingsItem} onPress={handleLogout}>
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.logoutIconContainer}>
                                <Image
                                    source={images.icon_logout_red}
                                    style={styles.settingsIcon}
                                />
                            </View>
                            <Text style={styles.logoutText}>Logout</Text>
                        </View>
                        <Image
                            source={images.icon_arrow_right_black}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    profileSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,

    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 58,
        height: 58,
        borderRadius: 29,
        marginRight: 12,
    },
    profileImagePlaceholder: {
        backgroundColor: Color.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImagePlaceholderText: {
        color: Color.white,
        fontSize: 36,
        fontFamily: FontFamily.bold,
    },
    profileDetails: {
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: Color.black,
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingHorizontal: 16,
    },
    editButtonText: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.primary,
    },
    storeListing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        padding: 16,
        marginTop: 10,
        backgroundColor: Color.primary,
        borderRadius: 12,
    },
    storeListingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    storeIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: Color.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    storeIcon: {
        width: 24,
        height: 24,
    },
    storeListingText: {
        flex: 1,
    },
    storeListingTitle: {
        fontSize: 14,
        fontFamily: FontFamily.extra_bold,
        color: Color.white,
        marginBottom: 4,
    },
    storeListingSubtitle: {
        fontSize: 12,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
    },
    arrowIcon: {
        width: 16,
        height: 16,
    },
    settingsSection: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingsItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingsIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Color.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    logoutIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFEBEE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    settingsIcon: {
        width: 24,
        height: 24,
    },
    settingsTitle: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: Color.black,
        marginBottom: 2,
    },
    settingsSubtitle: {
        fontSize: 12,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: '#F44336',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    iconPlaceholder: {
        width: 24,
        height: 24,
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        marginRight: 15,
    },
    menuItemText: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: '#333',
    },
});


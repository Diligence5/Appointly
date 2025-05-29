import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import { strings } from '../../constants/strings';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearAccessToken } from '../../redux/slices/authSlice';
import images from '../../../assets/images/images';

export const ProfileScreen = ({ navigation }: any) => {
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        {user?.profile_image ? (
                            <Image source={{ uri: user.profile_image }} style={styles.profileImage} />
                        ) : (
                            <View style={[styles.profileImage, styles.profileImagePlaceholder]}>
                                <Text style={styles.profileImagePlaceholderText}>
                                    {getInitials(user?.name || 'User')}
                                </Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.profileName}>{user?.name || 'User'}</Text>
                    <Text style={styles.profileDetail}>{user?.email || 'No email provided'}</Text>
                    <Text style={styles.profileDetail}>{user?.phone_number || 'No phone provided'}</Text>
                </View>

                <View style={styles.menuSection}>
                    {menuItems.map(renderMenuItem)}
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
    scrollContainer: {
        flexGrow: 1,
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
    profileSection: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    profileImageContainer: {
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
    profileName: {
        fontSize: 22,
        fontFamily: FontFamily.bold,
        color: '#333',
        marginBottom: 5,
    },
    profileDetail: {
        fontSize: 14,
        fontFamily: FontFamily.regular,
        color: Color.black,
        marginBottom: 5,
    },
    menuSection: {
        padding: 20,
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

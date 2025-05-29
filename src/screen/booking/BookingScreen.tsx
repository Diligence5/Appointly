import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearAccessToken } from '../../redux/slices/authSlice';

export const BookingScreen = ({ navigation }: any) => {
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Home</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeTitle}>Welcome, {user?.name || 'User'}!</Text>
                    <Text style={styles.welcomeSubtitle}>We're glad you're here.</Text>
                </View>

                <View style={styles.userInfoContainer}>
                    <Text style={styles.sectionTitle}>Your Profile Information</Text>
                    
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Name:</Text>
                        <Text style={styles.infoValue}>{user?.name || 'Not provided'}</Text>
                    </View>
                    
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Email:</Text>
                        <Text style={styles.infoValue}>{user?.email || 'Not provided'}</Text>
                    </View>
                    
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Phone:</Text>
                        <Text style={styles.infoValue}>{user?.phone_number || 'Not provided'}</Text>
                    </View>
                </View>

                <View style={styles.contentSection}>
                    <Text style={styles.sectionTitle}>Your Appointments</Text>
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No bookings available</Text>
                        <TouchableOpacity style={styles.bookButton}>
                            <Text style={styles.bookButtonText}>Book an Appointment</Text>
                        </TouchableOpacity>
                    </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: FontFamily.bold,
        color: Color.primary,
    },
    logoutButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    logoutText: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.primary,
    },
    welcomeContainer: {
        padding: 20,
        backgroundColor: Color.primary + '10', // Light version of primary color
        marginBottom: 20,
    },
    welcomeTitle: {
        fontSize: 22,
        fontFamily: FontFamily.bold,
        color: Color.black,
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 16,
        fontFamily: FontFamily.regular,
        color: Color.black,
    },
    userInfoContainer: {
        padding: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: FontFamily.bold,
        color: Color.primary,
        marginBottom: 16,
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 12,
    },
    infoLabel: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: Color.black,
        width: 80,
    },
    infoValue: {
        fontSize: 16,
        fontFamily: FontFamily.regular,
        color: Color.black,
        flex: 1,
    },
    contentSection: {
        padding: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    emptyStateText: {
        fontSize: 16,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
        marginBottom: 16,
    },
    bookButton: {
        backgroundColor: Color.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    bookButtonText: {
        fontSize: 16,
        fontFamily: FontFamily.bold,
        color: Color.white,
    },
});

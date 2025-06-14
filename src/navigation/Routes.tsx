import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { OnboardingScreen } from "../screen/onboarding/main/OnboardingScreen";
import { LoginScreen } from "../screen/onboarding/login/LoginScreen";
import { SignupScreen } from "../screen/onboarding/signup/SignupScreen";
import { ForgotPasswordScreen } from "../screen/onboarding/forgot-password/ForgotPasswordScreen";
import { PremiumPlanScreen } from "../screen/onboarding/premium-plan/PremiumPlanScreen";
import { StoreDetailsScreen } from "../screen/onboarding/store-details/StoreDetailsScreen";
import { StoreProfileScreen } from "../screen/onboarding/store-profile/StoreProfileScreen";
import { StaffScreen } from "../screen/onboarding/staff-details/StaffScreen";
import { ServicesScreen } from "../screen/onboarding/services/ServicesScreen";
import { ServicePricingScreen } from "../screen/onboarding/service-pricing/ServicePricingScreen";
import { ServicesOfferedScreen } from "../screen/onboarding/services-offered/ServicesOfferedScreen";
import { BankDetailsScreen } from "../screen/onboarding/bank-details/BankDetailsScreen";
import { StoreHoursScreen } from "../screen/onboarding/store-hours/StoreHoursScreen";
import { StoreCategoryScreen } from "../screen/onboarding/store-category/StoreCategoryScreen";
import { BookingFeeScreen } from "../screen/onboarding/booking-fee/BookingFeeScreen";
import { StaffAvailabilityScreen } from "../screen/onboarding/staff-availability/StaffAvailabilityScreen";
import { NotificationScreen } from "../screen/booking/NotificationScreen";

import { AboutScreen } from "../screen/profile/about/AboutScreen";
import { StoreListingScreen } from "../screen/profile/storeListing/StoreListingScreen";
import BottomTab from "./BottomTab";
import { MessagesScreen } from "../screen/messages/MessagesScreen";
import { MessageDetailScreen } from "../screen/messages/MessageDetailScreen";
import { View, Text, ActivityIndicator } from "react-native";
import { Color } from "../themes/theme";
import { EditProfileScreen } from "../screen/profile/editprofile/EditProfileScreen";

// Define the types for your Redux state and navigation

// Define the RootStackParamList type for the stack navigator
export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
    PremiumPlan: { userData?: any; token?: string };
    StoreDetails: { userData?: any; token?: string };
    StoreProfile: { userData?: any; token?: string };
    Staff: { userData?: any; token?: string };
    Services: { userData?: any; token?: string };
    ServicePricing: { userData?: any; token?: string; selectedServices?: any[] };
    ServicesOffered: { userData?: any; token?: string; services?: any[] };
    BankDetails: { userData?: any; token?: string };
    StoreHours: { userData?: any; token?: string };
    StoreCategory: { userData?: any; token?: string };
    BookingFee: { userData?: any; token?: string };
    StaffAvailability: { userData?: any; token?: string };
    MainApp: undefined;
    Messages: undefined;
    MessageDetail: { messageId: string };
    Notification: undefined;
    EditProfile: undefined;
    About: undefined;
    StoreListing: undefined;
    Tab: undefined;
    Profile: undefined;
    Booking: undefined;
    // Keep other routes if needed
};

function Routes(): React.JSX.Element {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { accessToken, isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = React.useState(true);

    // Simulate checking token validity or loading initial data
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    console.log("Authentication State:", { accessToken, isAuthenticated, user });

    const stackOption = {
        headerShown: false,
        animation: "slide_from_right" as const, // Ensure that the animation is a valid constant value
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white }}>
                <ActivityIndicator size="large" color={Color.primary} />
                <Text style={{ marginTop: 10, color: Color.black }}>Loading...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackOption}>
                {!isAuthenticated ? (
                    // Auth Flow
                    <>
                        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                        <Stack.Screen name="PremiumPlan" component={PremiumPlanScreen} />
                        <Stack.Screen name="StoreDetails" component={StoreDetailsScreen} />
                        <Stack.Screen name="StoreProfile" component={StoreProfileScreen} />
                        <Stack.Screen name="Staff" component={StaffScreen} />
                        <Stack.Screen name="Services" component={ServicesScreen} />
                        <Stack.Screen name="ServicePricing" component={ServicePricingScreen} />
                        <Stack.Screen name="ServicesOffered" component={ServicesOfferedScreen} />
                        <Stack.Screen name="BankDetails" component={BankDetailsScreen} />
                        <Stack.Screen name="StoreHours" component={StoreHoursScreen} />
                        <Stack.Screen name="StoreCategory" component={StoreCategoryScreen} />
                        <Stack.Screen name="BookingFee" component={BookingFeeScreen} />
                        <Stack.Screen name="StaffAvailability" component={StaffAvailabilityScreen} />
                    </>
                ) : (
                    // App Flow
                    <>
                        <Stack.Screen name="MainApp" component={BottomTab} />
                        <Stack.Screen name="Messages" component={MessagesScreen} />
                        <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
                        <Stack.Screen name="Notification" component={NotificationScreen} />
                        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                        <Stack.Screen name="About" component={AboutScreen} />
                        <Stack.Screen name="StoreListing" component={StoreListingScreen} />
                        <Stack.Screen name="PremiumPlan" component={PremiumPlanScreen} />
                        <Stack.Screen name="StoreDetails" component={StoreDetailsScreen} />
                        <Stack.Screen name="StoreProfile" component={StoreProfileScreen} />
                        <Stack.Screen name="Staff" component={StaffScreen} />
                        <Stack.Screen name="Services" component={ServicesScreen} />
                        <Stack.Screen name="ServicePricing" component={ServicePricingScreen} />
                        <Stack.Screen name="ServicesOffered" component={ServicesOfferedScreen} />
                        <Stack.Screen name="BankDetails" component={BankDetailsScreen} />
                        <Stack.Screen name="StoreHours" component={StoreHoursScreen} />
                        <Stack.Screen name="StoreCategory" component={StoreCategoryScreen} />
                        <Stack.Screen name="BookingFee" component={BookingFeeScreen} />
                        <Stack.Screen name="StaffAvailability" component={StaffAvailabilityScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;

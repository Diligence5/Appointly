import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { OnboardingScreen } from "../screen/onboarding/OnboardingScreen";
import { LoginScreen } from "../screen/onboarding/LoginScreen";
import { SignupScreen } from "../screen/onboarding/SignupScreen";
import { ForgotPasswordScreen } from "../screen/onboarding/ForgotPasswordScreen";
import BottomTab from "./BottomTab";
import { MessagesScreen } from "../screen/messages/MessagesScreen";
import { MessageDetailScreen } from "../screen/messages/MessageDetailScreen";
import { View, Text, ActivityIndicator } from "react-native";
import { Color } from "../themes/theme";

// Define the types for your Redux state and navigation

// Define the RootStackParamList type for the stack navigator
export type RootStackParamList = {
    Onboarding: undefined;
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
    MainApp: undefined;
    Messages: undefined;
    MessageDetail: { messageId: string };
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
                    </>
                ) : (
                    // App Flow
                    <>
                        <Stack.Screen name="MainApp" component={BottomTab} />
                        <Stack.Screen name="Messages" component={MessagesScreen} />
                        <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;

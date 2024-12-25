import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import  SignInLayout  from "./(sign)/_layout";
import Test from './test';
import { Text } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from "../components/SignUp";
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} 
    frontendApi="talented-kodiak-16.clerk.accounts.dev"
    publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} >
       <SignedIn>
        <Test/>
      </SignedIn>
      <SignedOut>
            <SignInLayout/>
      </SignedOut>
    </ClerkProvider>
  );
}

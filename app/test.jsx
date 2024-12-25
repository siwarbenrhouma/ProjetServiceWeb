import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';

export default function Test() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirection ou autre logique après la déconnexion
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <View>
      <Text onPress={handleSignOut}>Sign Out</Text>
    </View>
  );
}

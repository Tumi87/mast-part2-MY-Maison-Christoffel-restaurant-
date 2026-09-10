import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
          }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.forkIcon}>🍴</Text>
          <Text style={styles.title}>Maison</Text>
          <Text style={styles.subtitle}>CHRISTOFFEL</Text>
          <Text style={styles.location}>CAPE TOWN • FRANSCHHOEK</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.welcome}>Welcome to Maison</Text>
        <Text style={styles.description}>
          Experience culinary excellence refined by French heritage and South
          African terroir.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.buttonText}>Explore Chef's Menu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  imageWrap: {
    height: 380,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10,
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.25)',
},
  forkIcon: {
    fontSize: 22,
    color: colors.white,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 42,
    color: colors.white,
  },
  subtitle: {
    color: colors.white,
    letterSpacing: 4,
    fontWeight: '600',
    marginTop: 4,
  },
  location: {
    color: colors.white,
    letterSpacing: 2,
    fontSize: 12,
    marginTop: 10,
  },
  body: { marginTop: 28 },
  welcome: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.text,
  },
  description: {
    marginTop: 10,
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
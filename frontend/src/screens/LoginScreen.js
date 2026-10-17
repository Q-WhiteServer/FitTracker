import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [emailOrUsername, setEmailOrUsername] = useState('valentina.mesy@gmail.com');
  const [password, setPassword] = useState('1234567890');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt:', { emailOrUsername, password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Header Aplikasi & Logo FitTracker */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons name="dumbbell" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>FitTracker</Text>
          </View>

          {/* 2. Banner Hero */}
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
            }}
            style={styles.bannerImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>Selamat datang.</Text>
              <Text style={styles.bannerSubtitle}>
                Langkah kecil hari ini, lebih kuat esok hari.
              </Text>
            </View>
          </ImageBackground>

          {/* 3. Form Input Email/Username */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email atau nama pengguna</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={emailOrUsername}
                onChangeText={setEmailOrUsername}
                placeholder="Masukkan email atau username"
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
              />
              <Feather name="user" size={20} color="#94A3B8" style={styles.inputIcon} />
            </View>
          </View>

          {/* 4. Form Input Kata Sandi */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Kata sandi</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholder="Masukkan kata sandi"
                placeholderTextColor="#94A3B8"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.inputIcon}
              >
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#94A3B8"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* 5. Tampilkan Sandi & Lupa Kata Sandi */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Feather name="check" size={12} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>Tampilkan sandi</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation?.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>Lupa kata sandi?</Text>
            </TouchableOpacity>
          </View>

          {/* 6. Tombol Masuk */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Feather name="arrow-right" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>

          {/* 7. Link Daftar */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
              <Text style={styles.registerLink}>Daftar sekarang</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  /* Header Styles */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#10B981', // Hijau Khas FitTracker
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  /* Hero Banner Styles */
  bannerImage: {
    width: '100%',
    height: 180,
    marginBottom: 24,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 16,
  },
  bannerOverlay: {
    padding: 16,
    backgroundColor: 'rgba(6, 78, 59, 0.65)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#E2E8F0',
    fontWeight: '400',
  },
  /* Input Form Styles */
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
  },
  inputIcon: {
    marginLeft: 8,
  },
  /* Options Row Styles */
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F766E',
  },
  /* Button Styles */
  loginButton: {
    height: 50,
    backgroundColor: '#10B981',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  /* Footer Styles */
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#64748B',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F766E',
  },
});
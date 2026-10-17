import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('valentina.mesy@gmail.com');
  const [password, setPassword] = useState('1234567890');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Logo FitTracker */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Ionicons name="barbell-outline" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.appName}>FitTracker</Text>
        </View>

        {/* Hero Card Banner */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={require('../../assets/gambar 1.jpg')} // Ubah ke gambar1.jpg jika tanpa spasi
            style={styles.bannerImage}
            imageStyle={{ borderRadius: 16 }}
            resizeMode="cover"
          >
            {/* Kosong karena gambar sudah ada tulisannya */}
          </ImageBackground>
        </View>

        {/* Form Inputs */}
        <View style={styles.formContainer}>
          
          {/* Email / Username Input */}
          <Text style={styles.label}>Email atau nama pengguna</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan email"
              placeholderTextColor="#A1A1AA"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Feather name="user" size={20} color="#71717A" />
          </View>

          {/* Password Input */}
          <Text style={[styles.label, { marginTop: 16 }]}>Kata sandi</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Masukkan kata sandi"
              placeholderTextColor="#A1A1AA"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#71717A"
              />
            </TouchableOpacity>
          </View>

          {/* Checkbox Tampilkan Sandi & Lupa Kata Sandi */}
          <View style={styles.rowBetween}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setShowPassword(!showPassword)}
            >
              <View style={[styles.checkbox, showPassword && styles.checkboxActive]}>
                {showPassword && <Feather name="check" size={12} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxText}>Tampilkan sandi</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotText}>Lupa kata sandi?</Text>
            </TouchableOpacity>
          </View>

          {/* Tombol Masuk Utama */}
          <TouchableOpacity 
            style={styles.loginButton} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Personalization')}
          >
            <Feather name="arrow-right" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>

          {/* Link Daftar Sekarang */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Daftar sekarang</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBox: {
    width: 42,
    height: 42,
    backgroundColor: '#059669',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  bannerContainer: {
    height: 210,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3F3F46',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#18181B',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#A1A1AA',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  checkboxText: {
    fontSize: 13,
    color: '#71717A',
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#047857',
  },
  loginButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#71717A',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#047857',
  },
});
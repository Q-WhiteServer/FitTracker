import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('valentina mesy');
  const [email, setEmail] = useState('valentina.mesy@email.com');
  const [password, setPassword] = useState('1234567890');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header Logo FitTracker */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Ionicons name="barbell-outline" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.appName}>FitTracker</Text>
        </View>

        {/* Tombol Kembali */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color="#18181B" style={{ marginRight: 6 }} />
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>

        {/* Judul & Deskripsi */}
        <Text style={styles.title}>Mulai jadi lebih kuat.</Text>
        <Text style={styles.subtitle}>
          Buat akun dan bangun kebiasaan sehatmu bersama FitTracker.
        </Text>

        {/* Form Inputs */}
        <View style={styles.formContainer}>
          
          {/* Nama Pengguna */}
          <Text style={styles.label}>Nama pengguna</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Masukkan nama pengguna"
              placeholderTextColor="#A1A1AA"
            />
            <Feather name="user" size={20} color="#71717A" />
          </View>

          {/* Email */}
          <Text style={[styles.label, { marginTop: 16 }]}>Email</Text>
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
            <Feather name="mail" size={20} color="#71717A" />
          </View>

          {/* Kata Sandi */}
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

          <Text style={styles.hintText}>Minimal 8 karakter, gabungkan huruf dan angka.</Text>

          {/* Indikator Kata Sandi Kuat */}
          <View style={styles.strengthContainer}>
            <Feather name="check-circle" size={16} color="#059669" style={{ marginRight: 6 }} />
            <Text style={styles.strengthText}>Kata sandi kuat</Text>
          </View>

          {/* Tombol Buat Akun (Navigasi ke PersonalizationScreen) */}
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Personalization')}
          >
            <Text style={styles.primaryButtonText}>Buat akun</Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          {/* Ketentuan Layanan */}
          <Text style={styles.termsText}>
            Dengan mendaftar, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi FitTracker.
          </Text>

          {/* Link Sudah Punya Akun (Navigasi Kembali ke LoginScreen) */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Masuk</Text>
            </TouchableOpacity>
          </View>

          {/* Card Info Keamanan Data */}
          <View style={styles.infoCard}>
            <Feather name="shield" size={18} color="#059669" style={{ marginRight: 10, marginTop: 2 }} />
            <Text style={styles.infoText}>
              Data pribadimu aman. Kamu yang menentukan perjalanan latihanmu.
            </Text>
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
    marginBottom: 16,
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#18181B',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#71717A',
    marginBottom: 20,
    lineHeight: 20,
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
  hintText: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 6,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  strengthText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  primaryButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#71717A',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#047857',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#065F46',
    lineHeight: 18,
  },
});
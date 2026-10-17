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

export default function PersonalizationScreen({ navigation }) {
  const [age, setAge] = useState('24');
  const [height, setHeight] = useState('160');
  const [weight, setWeight] = useState('69');
  const [selectedGoal, setSelectedGoal] = useState('weight_loss'); // 'weight_loss', 'muscle', 'fitness'

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Progress */}
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>PERSONALISASI LATIHAN</Text>
          <Text style={styles.topBarStep}>Langkah 1 dari 1</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>

        {/* Judul & Deskripsi */}
        <Text style={styles.title}>Kenalan dulu, yuk!</Text>
        <Text style={styles.subtitle}>
          Bantu kami menyiapkan latihan yang pas untuk tubuh dan tujuanmu.
        </Text>

        {/* Bagian Data Fisik */}
        <Text style={styles.sectionHeader}>Data fisikmu</Text>
        <View style={styles.physicalRow}>
          {/* Usia */}
          <View style={styles.physicalBox}>
            <Text style={styles.physicalLabel}>Usia</Text>
            <View style={styles.physicalInputWrapper}>
              <TextInput
                style={styles.physicalInput}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>th</Text>
            </View>
          </View>

          {/* Tinggi */}
          <View style={styles.physicalBox}>
            <Text style={styles.physicalLabel}>Tinggi</Text>
            <View style={styles.physicalInputWrapper}>
              <TextInput
                style={styles.physicalInput}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>cm</Text>
            </View>
          </View>

          {/* Berat Badan */}
          <View style={styles.physicalBox}>
            <Text style={styles.physicalLabel}>Berat badan</Text>
            <View style={styles.physicalInputWrapper}>
              <TextInput
                style={styles.physicalInput}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>kg</Text>
            </View>
          </View>
        </View>

        <Text style={styles.infoNote}>Data ini bisa diperbarui kapan saja di Pengaturan.</Text>

        {/* Bagian Tujuan Utama */}
        <Text style={[styles.sectionHeader, { marginTop: 20 }]}>Apa tujuan utamamu?</Text>

        {/* Opsi 1: Menurunkan berat badan */}
        <TouchableOpacity
          style={[styles.goalCard, selectedGoal === 'weight_loss' && styles.goalCardActive]}
          activeOpacity={0.8}
          onPress={() => setSelectedGoal('weight_loss')}
        >
          <View style={styles.goalIconBox}>
            <Ionicons name="flame-outline" size={22} color="#059669" />
          </View>
          <View style={styles.goalTextBox}>
            <Text style={styles.goalTitle}>Menurunkan berat badan</Text>
            <Text style={styles.goalSubtitle}>Lebih aktif, lebih ringan.</Text>
          </View>
          <View style={styles.radioContainer}>
            <View style={[styles.radioOuter, selectedGoal === 'weight_loss' && styles.radioOuterActive]}>
              {selectedGoal === 'weight_loss' && <View style={styles.radioInner} />}
            </View>
          </View>
        </TouchableOpacity>

        {/* Opsi 2: Membentuk otot */}
        <TouchableOpacity
          style={[styles.goalCard, selectedGoal === 'muscle' && styles.goalCardActive]}
          activeOpacity={0.8}
          onPress={() => setSelectedGoal('muscle')}
        >
          <View style={styles.goalIconBoxMuted}>
            <Ionicons name="barbell-outline" size={22} color="#71717A" />
          </View>
          <View style={styles.goalTextBox}>
            <Text style={styles.goalTitle}>Membentuk otot</Text>
            <Text style={styles.goalSubtitle}>Bangun kekuatan dan massa otot.</Text>
          </View>
          <View style={styles.radioContainer}>
            <View style={[styles.radioOuter, selectedGoal === 'muscle' && styles.radioOuterActive]}>
              {selectedGoal === 'muscle' && <View style={styles.radioInner} />}
            </View>
          </View>
        </TouchableOpacity>

        {/* Opsi 3: Menjaga kebugaran */}
        <TouchableOpacity
          style={[styles.goalCard, selectedGoal === 'fitness' && styles.goalCardActive]}
          activeOpacity={0.8}
          onPress={() => setSelectedGoal('fitness')}
        >
          <View style={styles.goalIconBoxMuted}>
            <Ionicons name="heart-outline" size={22} color="#71717A" />
          </View>
          <View style={styles.goalTextBox}>
            <Text style={styles.goalTitle}>Menjaga kebugaran</Text>
            <Text style={styles.goalSubtitle}>Tubuh bugar untuk aktivitas harian.</Text>
          </View>
          <View style={styles.radioContainer}>
            <View style={[styles.radioOuter, selectedGoal === 'fitness' && styles.radioOuterActive]}>
              {selectedGoal === 'fitness' && <View style={styles.radioInner} />}
            </View>
          </View>
        </TouchableOpacity>

        {/* Footer Info Privasi */}
        <View style={styles.privacyBox}>
          <Feather name="lock" size={16} color="#71717A" style={{ marginRight: 8, marginTop: 2 }} />
          <Text style={styles.privacyText}>
            Data fisik bersifat pribadi dan tidak ditampilkan di komunitas.
          </Text>
        </View>

        {/* Tombol Mulai Latihan (Langsung ke HomeScreen) */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.primaryButtonText}>Mulai latihan</Text>
          <Feather name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

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
    paddingTop: 12,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topBarTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    letterSpacing: 0.5,
  },
  topBarStep: {
    fontSize: 12,
    color: '#71717A',
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#E4E4E7',
    borderRadius: 2,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#059669',
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
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  physicalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  physicalBox: {
    width: '31%',
  },
  physicalLabel: {
    fontSize: 13,
    color: '#71717A',
    marginBottom: 6,
    fontWeight: '500',
  },
  physicalInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#FFFFFF',
  },
  physicalInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#18181B',
  },
  unitText: {
    fontSize: 13,
    color: '#71717A',
    fontWeight: '500',
  },
  infoNote: {
    fontSize: 12,
    color: '#71717A',
    marginBottom: 20,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  goalCardActive: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  goalIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  goalIconBoxMuted: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  goalTextBox: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  goalSubtitle: {
    fontSize: 12,
    color: '#71717A',
  },
  radioContainer: {
    marginLeft: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D4D4D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#059669',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#059669',
  },
  privacyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    paddingHorizontal: 4,
  },
  privacyText: {
    fontSize: 12,
    color: '#71717A',
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
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
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function WorkoutDetailScreen({ navigation }) {
  const [programName, setProgramName] = useState('Full Body Favorit');
  const [selectedMuscle, setSelectedMuscle] = useState('Seluruh tubuh');
  const [selectedLevel, setSelectedLevel] = useState('Menengah');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Top Back Navigation */}
      <View style={styles.topBackBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color="#18181B" style={{ marginRight: 6 }} />
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Judul & Deskripsi */}
        <Text style={styles.title}>Sesuaikan Latihan</Text>
        <Text style={styles.subtitle}>Program buatanmu, sesuai ritmemu.</Text>

        {/* Nama Program */}
        <Text style={styles.label}>Nama program</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={programName}
            onChangeText={setProgramName}
            placeholder="Masukkan nama program"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        {/* Fokus Otot */}
        <Text style={[styles.label, { marginTop: 16 }]}>Fokus otot</Text>
        <View style={styles.chipRow}>
          {['Seluruh tubuh', 'Otot Perut', 'Lengan'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.chip, selectedMuscle === item && styles.chipActive]}
              onPress={() => setSelectedMuscle(item)}
            >
              <Text style={[styles.chipText, selectedMuscle === item && styles.chipTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.chipRowSecond}>
          <TouchableOpacity
            style={[styles.chip, selectedMuscle === 'Dada' && styles.chipActive]}
            onPress={() => setSelectedMuscle('Dada')}
          >
            <Text style={[styles.chipText, selectedMuscle === 'Dada' && styles.chipTextActive]}>
              Dada
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tingkat Kesulitan */}
        <Text style={[styles.label, { marginTop: 16 }]}>Tingkat kesulitan</Text>
        <View style={styles.chipRow}>
          {['Rendah', 'Menengah', 'Atas'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.chip, selectedLevel === level && styles.chipActive]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text style={[styles.chipText, selectedLevel === level && styles.chipTextActive]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Gerakan Pilihan Header */}
        <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Gerakan pilihan</Text>
          <TouchableOpacity>
            <Text style={styles.reorderText}>Susun ulang</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSub}>Geser pegangan untuk mengubah urutan.</Text>

        {/* Item Gerakan 1: Squat */}
        <View style={styles.exerciseCard}>
          <Feather name="menu" size={18} color="#A1A1AA" style={{ marginRight: 12 }} />
          <View style={styles.exerciseIconBox}>
            <Ionicons name="barbell-outline" size={18} color="#059669" />
          </View>
          <View style={styles.exerciseTextBox}>
            <Text style={styles.exerciseName}>Squat</Text>
            <Text style={styles.exerciseDetail}>3 set × 12 repetisi</Text>
            <Text style={styles.exerciseSubDetail}>Istirahat 45 detik</Text>
          </View>
          <TouchableOpacity>
            <Feather name="edit-2" size={16} color="#71717A" />
          </TouchableOpacity>
        </View>

        {/* Item Gerakan 2: Push-up */}
        <View style={styles.exerciseCard}>
          <Feather name="menu" size={18} color="#A1A1AA" style={{ marginRight: 12 }} />
          <View style={styles.exerciseIconBox}>
            <Ionicons name="fitness-outline" size={18} color="#059669" />
          </View>
          <View style={styles.exerciseTextBox}>
            <Text style={styles.exerciseName}>Push-up</Text>
            <Text style={styles.exerciseDetail}>3 set × 10 repetisi</Text>
            <Text style={styles.exerciseSubDetail}>Istirahat 45 detik</Text>
          </View>
          <TouchableOpacity>
            <Feather name="edit-2" size={16} color="#71717A" />
          </TouchableOpacity>
        </View>

        {/* Item Gerakan 3: Plank */}
        <View style={styles.exerciseCard}>
          <Feather name="menu" size={18} color="#A1A1AA" style={{ marginRight: 12 }} />
          <View style={styles.exerciseIconBox}>
            <MaterialCommunityIcons name="pulse" size={18} color="#059669" />
          </View>
          <View style={styles.exerciseTextBox}>
            <Text style={styles.exerciseName}>Plank</Text>
            <Text style={styles.exerciseDetail}>3 set × 30 detik</Text>
            <Text style={styles.exerciseSubDetail}>Istirahat 30 detik</Text>
          </View>
          <TouchableOpacity>
            <Feather name="edit-2" size={16} color="#71717A" />
          </TouchableOpacity>
        </View>

        {/* Tombol Tambah Gerakan */}
        <TouchableOpacity style={styles.addExerciseButton} activeOpacity={0.8}>
          <Feather name="plus" size={18} color="#059669" style={{ marginRight: 6 }} />
          <Text style={styles.addExerciseText}>Tambah gerakan</Text>
        </TouchableOpacity>

        {/* Estimasi Waktu Card */}
        <View style={styles.estimateCard}>
          <Feather name="clock" size={18} color="#059669" style={{ marginRight: 10 }} />
          <View>
            <Text style={styles.estimateTitle}>Estimasi 18 menit</Text>
            <Text style={styles.estimateSub}>3 gerakan • 9 set • Tanpa alat</Text>
          </View>
        </View>

        {/* Jadwalkan Latihan */}
        <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Jadwalkan latihan</Text>
        
        <View style={styles.scheduleRow}>
          {/* Hari */}
          <View style={styles.scheduleBox}>
            <Text style={styles.scheduleLabel}>Hari</Text>
            <View style={styles.scheduleInputWrapper}>
              <Text style={styles.scheduleInputText}>Jumat, 16 Okt</Text>
              <Feather name="calendar" size={16} color="#71717A" />
            </View>
          </View>

          {/* Jam */}
          <View style={styles.scheduleBox}>
            <Text style={styles.scheduleLabel}>Jam</Text>
            <View style={styles.scheduleInputWrapper}>
              <Text style={styles.scheduleInputText}>18.00</Text>
              <Feather name="clock" size={16} color="#71717A" />
            </View>
          </View>
        </View>

        {/* Tombol Simpan Program */}
        <TouchableOpacity 
          style={styles.saveButton} 
          activeOpacity={0.8}
          onPress={() => alert('Program berhasil disimpan!')}
        >
          <Feather name="check" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.saveButtonText}>Simpan program</Text>
        </TouchableOpacity>

        {/* Info Offline */}
        <View style={styles.offlineFooterRow}>
          <Feather name="download" size={12} color="#059669" style={{ marginRight: 4 }} />
          <Text style={styles.offlineFooterText}>Disimpan di perangkat, tersedia offline</Text>
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
  topBackBar: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#18181B',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#71717A',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3F3F46',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    color: '#18181B',
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  chipRowSecond: {
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  chipText: {
    fontSize: 13,
    color: '#3F3F46',
  },
  chipTextActive: {
    color: '#059669',
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  reorderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  sectionSub: {
    fontSize: 12,
    color: '#71717A',
    marginBottom: 12,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  exerciseIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseTextBox: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  exerciseDetail: {
    fontSize: 12,
    color: '#3F3F46',
    marginTop: 2,
  },
  exerciseSubDetail: {
    fontSize: 11,
    color: '#71717A',
  },
  addExerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#059669',
    borderRadius: 12,
    height: 48,
    borderStyle: 'dashed',
    marginBottom: 16,
    backgroundColor: '#F0FDF4',
  },
  addExerciseText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  estimateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 20,
  },
  estimateTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065F46',
  },
  estimateSub: {
    fontSize: 12,
    color: '#047857',
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 8,
  },
  scheduleBox: {
    width: '48%',
  },
  scheduleLabel: {
    fontSize: 13,
    color: '#71717A',
    marginBottom: 6,
    fontWeight: '500',
  },
  scheduleInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFFFFF',
  },
  scheduleInputText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#18181B',
  },
  saveButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  offlineFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  offlineFooterText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
});
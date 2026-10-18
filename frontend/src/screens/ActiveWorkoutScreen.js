import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function ActiveWorkoutScreen({ navigation }) {
  const [currentSet, setCurrentSet] = useState(2);
  const [weight, setWeight] = useState('8');
  const [reps, setReps] = useState('12');

  const handleSaveSet = () => {
    if (currentSet < 3) {
      setCurrentSet(currentSet + 1);
      Alert.alert('Sukses', `Set ${currentSet} berhasil dicimpan! Melanjutkan ke set berikutnya.`);
    } else {
      Alert.alert('Selesai', 'Semua set latihan telah selesai!', [
        { text: 'Kembali ke Beranda', onPress: () => navigation.navigate('Home') }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color="#18181B" />
        </TouchableOpacity>
        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>Latihan cepat</Text>
          <Text style={styles.headerSubtitle}>Goblet squat • 02:14 berjalan</Text>
        </View>
        <TouchableOpacity style={styles.pauseButton}>
          <Feather name="pause" size={18} color="#18181B" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Banner Gambar & Status Set */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('../../assets/gambar 1.jpg')} // Sesuaikan dengan file gambar lokalmu
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.setIndicatorBadge}>
            <Text style={styles.setIndicatorText}>Set {currentSet} dari 3</Text>
          </View>
          <View style={styles.offlineBadge}>
            <Feather name="download" size={12} color="#059669" style={{ marginRight: 4 }} />
            <Text style={styles.offlineText}>Offline</Text>
          </View>
        </View>

        {/* Timer Istirahat Card */}
        <View style={styles.timerCard}>
          <View style={styles.timerRow}>
            <View style={styles.timerCircle}>
              <Ionicons name="timer-outline" size={22} color="#059669" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.timerLabel}>ISTIRAHAT • DARI 60 DETIK</Text>
              <Text style={styles.timerValue}>00:45</Text>
            </View>
            <View style={styles.timerActions}>
              <TouchableOpacity>
                <Text style={styles.timerActionText}>+15 detik</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 12 }}>
                <Text style={[styles.timerActionText, { fontWeight: '700' }]}>Lewati istirahat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Panel Bawah: Catat Set Latihan */}
        <View style={styles.recordPanel}>
          <View style={styles.dragHandle} />
          
          <View style={styles.panelHeaderRow}>
            <Text style={styles.panelTitle}>Catat set latihan</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Feather name="x" size={20} color="#71717A" />
            </TouchableOpacity>
          </View>
          <Text style={styles.panelSub}>Goblet squat • Target 3 × 12 repetisi</Text>

          {/* Tabel Catatan Set */}
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { width: 40 }]}>Set</Text>
            <Text style={[styles.th, { flex: 1 }]}>Beban</Text>
            <Text style={[styles.th, { flex: 1 }]}>Repetisi</Text>
            <Text style={[styles.th, { width: 90, textAlign: 'right' }]}>Status</Text>
          </View>

          {/* Baris Set 1 */}
          <View style={[styles.tableRow, styles.rowDone]}>
            <Text style={[styles.td, { width: 40, fontWeight: '700' }]}>1</Text>
            <Text style={[styles.td, { flex: 1 }]}>8 kg</Text>
            <Text style={[styles.td, { flex: 1 }]}>12</Text>
            <Text style={[styles.tdStatusDone, { width: 90, textAlign: 'right' }]}>Tersimpan</Text>
          </View>

          {/* Baris Set 2 */}
          <View style={[styles.tableRow, styles.rowActive]}>
            <Text style={[styles.td, { width: 40, fontWeight: '700' }]}>2</Text>
            <Text style={[styles.td, { flex: 1 }]}>8 kg</Text>
            <Text style={[styles.td, { flex: 1 }]}>12</Text>
            <Text style={[styles.tdStatusActive, { width: 90, textAlign: 'right' }]}>Sedang dicatat</Text>
          </View>

          {/* Baris Set 3 */}
          <View style={[styles.tableRow, styles.rowNext]}>
            <Text style={[styles.td, { width: 40, fontWeight: '700', color: '#A1A1AA' }]}>3</Text>
            <Text style={[styles.td, { flex: 1, color: '#A1A1AA' }]}>—</Text>
            <Text style={[styles.td, { flex: 1, color: '#A1A1AA' }]}>—</Text>
            <Text style={[styles.td, { width: 90, textAlign: 'right', color: '#A1A1AA' }]}>Berikutnya</Text>
          </View>

          {/* Input Form Beban & Repetisi */}
          <View style={styles.inputFormRow}>
            <View style={styles.inputBoxContainer}>
              <Text style={styles.inputLabel}>Beban</Text>
              <View style={styles.inputInner}>
                <TextInput
                  style={styles.inputField}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>kg</Text>
                <Ionicons name="checkmark-circle" size={16} color="#059669" style={{ marginLeft: 6 }} />
              </View>
            </View>

            <View style={styles.inputBoxContainer}>
              <Text style={styles.inputLabel}>Repetisi</Text>
              <View style={styles.inputInner}>
                <TextInput
                  style={styles.inputField}
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>rep</Text>
                <Ionicons name="checkmark-circle" size={16} color="#059669" style={{ marginLeft: 6 }} />
              </View>
            </View>
          </View>

          {/* Tombol Simpan Set */}
          <TouchableOpacity style={styles.saveSetButton} activeOpacity={0.8} onPress={handleSaveSet}>
            <Feather name="check" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.saveSetButtonText}>Simpan set {currentSet}</Text>
          </TouchableOpacity>

          <View style={styles.secureFooter}>
            <Feather name="check" size={12} color="#059669" style={{ marginRight: 4 }} />
            <Text style={styles.secureFooterText}>Langsung tersimpan, meski tanpa internet</Text>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },
  backButton: {
    padding: 4,
  },
  headerTitleBox: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#71717A',
  },
  pauseButton: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  bannerContainer: {
    height: 180,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  setIndicatorBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  setIndicatorText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  offlineBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  offlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  timerCard: {
    backgroundColor: '#064E3B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A7F3D0',
    marginBottom: 2,
  },
  timerValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerActionText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  recordPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    padding: 16,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E4E4E7',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  panelHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  panelSub: {
    fontSize: 12,
    color: '#71717A',
    marginBottom: 14,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
    marginBottom: 6,
  },
  th: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  rowDone: {
    backgroundColor: '#F0FDF4',
  },
  rowActive: {
    backgroundColor: '#DCFCE7',
  },
  rowNext: {
    backgroundColor: '#FAFAFA',
  },
  td: {
    fontSize: 13,
    color: '#18181B',
  },
  tdStatusDone: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  tdStatusActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#047857',
  },
  inputFormRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 16,
  },
  inputBoxContainer: {
    width: '48%',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
    marginBottom: 6,
  },
  inputInner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFFFFF',
  },
  inputField: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#18181B',
  },
  unitText: {
    fontSize: 13,
    color: '#71717A',
    marginLeft: 4,
  },
  saveSetButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  saveSetButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  secureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureFooterText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '500',
  },
});
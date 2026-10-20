import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Switch,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  // State Profile
  const [name, setName] = useState('Valentina Mesy');
  const [username, setUsername] = useState('@valentina.mesy');
  const [email, setEmail] = useState('valentina.mesy@gmail.com');

  // State Switch Notifikasi
  const [workoutReminder, setWorkoutReminder] = useState(true);
  const [communityActivity, setCommunityActivity] = useState(true);

  // State Data Fisik
  const [age, setAge] = useState('24');
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('67,8');
  const [goal, setGoal] = useState('menurunkan berat badan');

  // Modal Edit Profil
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempUsername, setTempUsername] = useState(username);
  const [tempEmail, setTempEmail] = useState(email);

  // Modal Perbarui Data Fisik
  const [isEditPhysicalModalVisible, setIsEditPhysicalModalVisible] = useState(false);
  const [tempAge, setTempAge] = useState(age);
  const [tempHeight, setTempHeight] = useState(height);
  const [tempWeight, setTempWeight] = useState(weight);
  const [tempGoal, setTempGoal] = useState(goal);

  // Function Simpan Profil
  const handleSaveProfile = () => {
    if (!tempName.trim()) {
      Alert.alert('Kesalahan', 'Nama tidak boleh kosong.');
      return;
    }
    setName(tempName);
    setUsername(tempUsername);
    setEmail(tempEmail);
    setIsEditProfileModalVisible(false);
  };

  // Function Simpan Data Fisik
  const handleSavePhysical = () => {
    setAge(tempAge);
    setHeight(tempHeight);
    setWeight(tempWeight);
    setGoal(tempGoal);
    setIsEditPhysicalModalVisible(false);
  };

  const getInitials = (fullName) => {
    const words = fullName.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Bar */}
        <Text style={styles.title}>Pengaturan</Text>
        <Text style={styles.subtitle}>Atur FitTracker sesuai kebutuhanmu.</Text>

        {/* Profil Card */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarText}>{getInitials(name)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileUsername}>{username}</Text>
              <Text style={styles.profileEmail}>{email}</Text>
            </View>
            <TouchableOpacity 
              style={styles.editIconBtn} 
              onPress={() => {
                setTempName(name);
                setTempUsername(username);
                setTempEmail(email);
                setIsEditProfileModalVisible(true);
              }}
            >
              <Feather name="edit-2" size={18} color="#059669" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cloud Sync Banner */}
        <View style={styles.cloudBanner}>
          <View style={styles.cloudHeader}>
            <Feather name="cloud" size={18} color="#059669" style={{ marginRight: 8 }} />
            <Text style={styles.cloudTitle}>Cloud tersinkronisasi</Text>
          </View>
          <Text style={styles.cloudTime}>Terakhir: hari ini, 14 Okt • 09.38</Text>
          <Text style={styles.cloudDesc}>
            Jadwal dan log tetap bisa diakses offline. Perubahan akan disinkronkan saat online.
          </Text>
        </View>

        {/* Section: Pengingat & Notifikasi */}
        <Text style={styles.sectionTitle}>Pengingat & notifikasi</Text>
        <View style={styles.card}>
          {/* Item 1: Pengingat latihan */}
          <View style={styles.settingItem}>
            <Feather name="clock" size={20} color="#71717A" style={styles.itemIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Pengingat latihan</Text>
              <Text style={styles.itemSubtitle}>Ingatkan 15 menit sebelum jadwal.</Text>
            </View>
            <Switch
              value={workoutReminder}
              onValueChange={setWorkoutReminder}
              trackColor={{ false: '#E4E4E7', true: '#059669' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          {/* Item 2: Jadwal berikutnya */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Feather name="calendar" size={20} color="#71717A" style={styles.itemIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Jadwal berikutnya</Text>
              <Text style={styles.itemSubtitle}>Hari ini • 18.00</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#A1A1AA" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Item 3: Aktivitas komunitas */}
          <View style={styles.settingItem}>
            <Feather name="users" size={20} color="#71717A" style={styles.itemIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Aktivitas komunitas</Text>
              <Text style={styles.itemSubtitle}>Kabar grup dan tantangan baru.</Text>
            </View>
            <Switch
              value={communityActivity}
              onValueChange={setCommunityActivity}
              trackColor={{ false: '#E4E4E7', true: '#059669' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Section: Data Fisik & Tujuan */}
        <Text style={styles.sectionTitle}>Data fisik & tujuan</Text>
        <View style={styles.card}>
          <View style={styles.physicalRow}>
            <View style={styles.physicalCol}>
              <Text style={styles.physicalValue}>{age} th</Text>
              <Text style={styles.physicalLabel}>Usia</Text>
            </View>
            <View style={styles.physicalCol}>
              <Text style={styles.physicalValue}>{height} cm</Text>
              <Text style={styles.physicalLabel}>Tinggi</Text>
            </View>
            <View style={styles.physicalCol}>
              <Text style={styles.physicalValue}>{weight} kg</Text>
              <Text style={styles.physicalLabel}>Berat badan</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.goalRow}>
            <Feather name="target" size={16} color="#059669" style={{ marginRight: 6 }} />
            <Text style={styles.goalText}>Tujuan: {goal}</Text>
          </View>

          <TouchableOpacity 
            style={styles.updatePhysicalBtn} 
            activeOpacity={0.8}
            onPress={() => {
              setTempAge(age);
              setTempHeight(height);
              setTempWeight(weight);
              setTempGoal(goal);
              setIsEditPhysicalModalVisible(true);
            }}
          >
            <Feather name="edit-3" size={16} color="#059669" style={{ marginRight: 6 }} />
            <Text style={styles.updatePhysicalBtnText}>Perbarui data fisik</Text>
          </TouchableOpacity>
        </View>

        {/* Section: Sistem */}
        <Text style={styles.sectionTitle}>Sistem</Text>
        <View style={styles.card}>
          {/* Item 1: Unduhan offline */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Feather name="download" size={20} color="#71717A" style={styles.itemIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Unduhan offline</Text>
              <Text style={styles.itemSubtitle}>12 program • 148 MB</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#A1A1AA" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Item 2: Bahasa */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Feather name="globe" size={20} color="#71717A" style={styles.itemIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Bahasa</Text>
            </View>
            <Text style={styles.itemValueText}>Indonesia</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Item 3: Bantuan & privasi */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Feather name="help-circle" size={20} color="#71717A" style={styles.itemIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Bantuan & privasi</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#A1A1AA" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Item 4: Tentang FitTracker */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Feather name="info" size={20} color="#71717A" style={styles.itemIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>Tentang FitTracker</Text>
            </View>
            <Text style={styles.itemValueText}>v1.4.0</Text>
          </TouchableOpacity>
        </View>

        {/* Tombol Keluar Akun */}
        <TouchableOpacity 
          style={styles.logoutBtn} 
          activeOpacity={0.8}
          onPress={() => navigation.replace('Login')}
        >
          <Feather name="log-out" size={16} color="#DC2626" style={{ marginRight: 6 }} />
          <Text style={styles.logoutText}>Keluar akun</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Modal Edit Profil */}
      <Modal
        visible={isEditProfileModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEditProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profil</Text>
              <TouchableOpacity onPress={() => setIsEditProfileModalVisible(false)}>
                <Feather name="x" size={20} color="#18181B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Nama Lengkap</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
            />

            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.input}
              value={tempUsername}
              onChangeText={setTempUsername}
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={tempEmail}
              onChangeText={setTempEmail}
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
              <Text style={styles.saveBtnText}>Simpan Perubahan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Edit Data Fisik */}
      <Modal
        visible={isEditPhysicalModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEditPhysicalModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Perbarui Data Fisik</Text>
              <TouchableOpacity onPress={() => setIsEditPhysicalModalVisible(false)}>
                <Feather name="x" size={20} color="#18181B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Usia (tahun)</Text>
            <TextInput
              style={styles.input}
              value={tempAge}
              onChangeText={setTempAge}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Tinggi Badan (cm)</Text>
            <TextInput
              style={styles.input}
              value={tempHeight}
              onChangeText={setTempHeight}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Berat Badan (kg)</Text>
            <TextInput
              style={styles.input}
              value={tempWeight}
              onChangeText={setTempWeight}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Tujuan Latihan</Text>
            <TextInput
              style={styles.input}
              value={tempGoal}
              onChangeText={setTempGoal}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSavePhysical}>
              <Text style={styles.saveBtnText}>Simpan Data Fisik</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="barbell-outline" size={22} color="#71717A" />
          <Text style={styles.navLabel}>Latihan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Discover')}>
          <Feather name="compass" size={22} color="#71717A" />
          <Text style={styles.navLabel}>Temukan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Community')}>
          <Feather name="users" size={22} color="#71717A" />
          <Text style={styles.navLabel}>Komunitas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Report')}>
          <Feather name="bar-chart-2" size={22} color="#71717A" />
          <Text style={styles.navLabel}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
          <Feather name="settings" size={22} color="#059669" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Pengaturan</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#71717A',
    marginTop: 2,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F4F4F5',
    marginBottom: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  profileUsername: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 1,
  },
  editIconBtn: {
    padding: 6,
  },
  cloudBanner: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cloudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloudTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#047857',
  },
  cloudTime: {
    fontSize: 12,
    color: '#059669',
    marginTop: 4,
    marginBottom: 8,
  },
  cloudDesc: {
    fontSize: 12,
    color: '#065F46',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  itemValueText: {
    fontSize: 13,
    color: '#71717A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F4F4F5',
    marginVertical: 4,
  },
  physicalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  physicalCol: {
    alignItems: 'center',
  },
  physicalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  physicalLabel: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  goalText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
  updatePhysicalBtn: {
    borderWidth: 1,
    borderColor: '#059669',
    borderRadius: 12,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  updatePhysicalBtnText: {
    color: '#059669',
    fontSize: 13,
    fontWeight: '600',
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    marginBottom: 10,
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
    backgroundColor: '#FFFFFF',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 11,
    color: '#71717A',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#059669',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 13,
    color: '#18181B',
  },
  saveBtn: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
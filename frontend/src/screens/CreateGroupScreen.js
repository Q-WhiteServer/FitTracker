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
  Alert,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function CreateGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState('Gerak Bareng Jakarta');
  const [description, setDescription] = useState(
    'Teman latihan untuk hidup lebih aktif. Yuk, saling dukung dan konsisten bergerak setiap minggu!'
  );
  const [selectedCategory, setSelectedCategory] = useState('Kekuatan');
  const [privacy, setPrivacy] = useState('Publik'); // 'Publik' atau 'Privat'

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      Alert.alert('Peringatan', 'Silakan masukkan nama grup.');
      return;
    }

    // Kirim data grup baru ke CommunityScreen
    navigation.navigate('Community', {
      newGroup: {
        name: groupName,
        category: selectedCategory,
        description: description,
        privacy: privacy,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Back Bar */}
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
        
        {/* Title & Subtitle */}
        <Text style={styles.title}>Buat Grup</Text>
        <Text style={styles.subtitle}>Satukan tujuan, rayakan progres bersama.</Text>

        {/* Upload Photo Area */}
        <TouchableOpacity style={styles.uploadCard} activeOpacity={0.8}>
          <View style={styles.uploadIconBox}>
            <Feather name="camera" size={22} color="#2563EB" />
          </View>
          <View>
            <Text style={styles.uploadTitle}>Tambah foto grup</Text>
            <Text style={styles.uploadSub}>Opsional • JPG atau PNG</Text>
          </View>
        </TouchableOpacity>

        {/* Input Nama Grup */}
        <Text style={styles.label}>Nama grup</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            maxLength={40}
            placeholder="Masukkan nama grup"
            placeholderTextColor="#A1A1AA"
          />
        </View>
        <Text style={styles.charCount}>{groupName.length}/40 karakter</Text>

        {/* Input Deskripsi */}
        <Text style={[styles.label, { marginTop: 16 }]}>Deskripsi</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer]}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholder="Jelaskan tujuan dan aktivitas grupmu"
            placeholderTextColor="#A1A1AA"
            textAlignVertical="top"
          />
        </View>
        <Text style={styles.helperText}>Jelaskan tujuan dan aktivitas grupmu.</Text>

        {/* Kategori Olahraga */}
        <Text style={[styles.label, { marginTop: 16 }]}>Kategori olahraga</Text>
        <View style={styles.categoryRow}>
          {['Kekuatan', 'Lari', 'Yoga', 'Bersepeda'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryChipText, selectedCategory === cat && styles.categoryChipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Privasi Grup */}
        <Text style={[styles.label, { marginTop: 16 }]}>Privasi grup</Text>
        
        {/* Option Publik */}
        <TouchableOpacity
          style={[styles.privacyCard, privacy === 'Publik' && styles.privacyCardActive]}
          activeOpacity={0.8}
          onPress={() => setPrivacy('Publik')}
        >
          <View style={styles.privacyIconBox}>
            <Feather name="globe" size={18} color="#059669" />
          </View>
          <View style={styles.privacyTextBox}>
            <Text style={styles.privacyTitle}>Publik</Text>
            <Text style={styles.privacySub}>Siapa saja dapat menemukan dan langsung bergabung.</Text>
          </View>
          <Ionicons
            name={privacy === 'Publik' ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={privacy === 'Publik' ? '#059669' : '#A1A1AA'}
          />
        </TouchableOpacity>

        {/* Option Privat */}
        <TouchableOpacity
          style={[styles.privacyCard, privacy === 'Privat' && styles.privacyCardActive]}
          activeOpacity={0.8}
          onPress={() => setPrivacy('Privat')}
        >
          <View style={styles.privacyIconBoxAlt}>
            <Feather name="lock" size={18} color="#71717A" />
          </View>
          <View style={styles.privacyTextBox}>
            <Text style={styles.privacyTitle}>Privat</Text>
            <Text style={styles.privacySub}>Hanya anggota yang diundang atau disetujui admin.</Text>
          </View>
          <Ionicons
            name={privacy === 'Privat' ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color={privacy === 'Privat' ? '#059669' : '#A1A1AA'}
          />
        </TouchableOpacity>

        {/* Info Admin Banner */}
        <View style={styles.adminInfoBanner}>
          <Feather name="shield" size={16} color="#059669" style={{ marginRight: 8 }} />
          <Text style={styles.adminInfoText}>
            Kamu akan menjadi admin. Jaga grup tetap positif dan saling menghargai.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={0.8}
          onPress={handleCreateGroup}
        >
          <Feather name="users" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.createButtonText}>Buat grup</Text>
        </TouchableOpacity>

        {/* Online Status Footer */}
        <View style={styles.statusFooterRow}>
          <Feather name="wifi" size={12} color="#059669" style={{ marginRight: 4 }} />
          <Text style={styles.statusFooterText}>Online • Grup langsung tersedia setelah dibuat</Text>
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
    paddingTop: 12,
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#71717A',
    marginBottom: 20,
  },
  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  uploadIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    borderStyle: 'dashed',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },
  uploadSub: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  input: {
    fontSize: 14,
    color: '#18181B',
  },
  charCount: {
    fontSize: 11,
    color: '#71717A',
    marginTop: 4,
  },
  textAreaContainer: {
    height: 90,
    paddingVertical: 10,
  },
  textArea: {
    height: '100%',
  },
  helperText: {
    fontSize: 11,
    color: '#71717A',
    marginTop: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  categoryChipActive: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#3F3F46',
  },
  categoryChipTextActive: {
    color: '#059669',
    fontWeight: '700',
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  privacyCardActive: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  privacyIconBox: {
    marginRight: 12,
  },
  privacyIconBoxAlt: {
    marginRight: 12,
  },
  privacyTextBox: {
    flex: 1,
    marginRight: 8,
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  privacySub: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  adminInfoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F4F4F5',
  },
  adminInfoText: {
    flex: 1,
    fontSize: 12,
    color: '#71717A',
    lineHeight: 16,
  },
  createButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  statusFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusFooterText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
});
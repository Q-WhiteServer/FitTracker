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

export default function SearchGroupScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // State daftar grup yang tersedia untuk bergabung
  const [groups, setGroups] = useState([
    {
      id: '1',
      name: 'Lari Pagi Indonesia',
      category: 'Lari',
      members: '342',
      description: 'Mulai hari dengan 3–5 km. Semua kecepatan diterima, yang penting konsisten!',
      avatar: 'LP',
      joined: false,
    },
    {
      id: '2',
      name: 'Yoga Biar Rileks',
      category: 'Yoga',
      members: '215',
      description: 'Ruang tenang untuk yoga, mobilitas, dan berbagi rutinitas pemulihan.',
      avatar: 'YB',
      joined: false,
    },
    {
      id: '3',
      name: 'Bodyweight Squad',
      category: 'Kekuatan',
      members: '176',
      description: 'Bangun kekuatan tanpa alat. Tantangan seru dan dukungan setiap minggu.',
      avatar: 'BS',
      joined: false,
    },
  ]);

  const handleJoin = (id, name) => {
    setGroups((prev) =>
      prev.map((item) => (item.id === id ? { ...item, joined: !item.joined } : item))
    );
    Alert.alert('Informasi', `Kamu berhasil bergabung ke grup ${name}!`);
  };

  const filteredGroups = groups.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <Text style={styles.title}>Cari Grup</Text>
        <Text style={styles.subtitle}>Temukan teman dengan semangat yang sama.</Text>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#71717A" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Cari nama atau aktivitas grup"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {['Semua', 'Lari', 'Kekuatan', 'Yoga', 'Bersepeda'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCategory === cat && styles.chipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Rekomendasi untukmu</Text>
          <Text style={styles.subActiveText}>Paling aktif</Text>
        </View>

        {/* Render List Grup */}
        {filteredGroups.map((item) => (
          <View key={item.id} style={styles.groupCard}>
            <View style={styles.groupCardHeader}>
              <View style={styles.avatarBox}>
                <Text style={styles.avatarText}>{item.avatar}</Text>
              </View>
              <View style={styles.groupMeta}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.groupSub}>
                  {item.category} • {item.members} anggota
                </Text>
              </View>
            </View>

            <Text style={styles.groupDesc}>{item.description}</Text>

            <View style={styles.groupFooter}>
              <View style={styles.statusBadge}>
                <Feather name="globe" size={12} color="#059669" style={{ marginRight: 4 }} />
                <Text style={styles.statusText}>Publik • Aktif hari ini</Text>
              </View>

              <TouchableOpacity
                style={[styles.joinButton, item.joined && styles.joinedButton]}
                activeOpacity={0.8}
                onPress={() => handleJoin(item.id, item.name)}
              >
                <Feather name={item.joined ? "check" : "plus"} size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.joinButtonText}>{item.joined ? 'Terabung' : 'Bergabung'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#18181B',
  },
  categoryScroll: {
    marginBottom: 20,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  subActiveText: {
    fontSize: 12,
    color: '#71717A',
  },
  groupCard: {
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  groupCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#059669',
  },
  groupMeta: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  groupSub: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  groupDesc: {
    fontSize: 13,
    color: '#3F3F46',
    lineHeight: 18,
    marginBottom: 14,
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
    paddingTop: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: '#3F3F46',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
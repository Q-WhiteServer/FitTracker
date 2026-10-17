import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DiscoverScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Untukmu');
  const [activeTab, setActiveTab] = useState('Temukan');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Title & Bookmark Icon */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Temukan</Text>
            <Text style={styles.subtitle}>Gerakan baru, semangat baru.</Text>
          </View>
          <TouchableOpacity style={styles.bookmarkHeaderBtn}>
            <Feather name="bookmark" size={22} color="#18181B" />
          </TouchableOpacity>
        </View>

        {/* Search Bar Input */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#71717A" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari latihan atau program"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        {/* Category Horizontal Scroll Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {['Untukmu', 'Kekuatan', 'Kardio', 'Yoga'].map((category, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Rekomendasi Program Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Rekomendasi program</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat semua</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.programScroll}>
          {/* Card Program 1: Kuat dari Rumah (Navigasi ke WorkoutDetail) */}
          <TouchableOpacity 
            style={styles.programCard} 
            activeOpacity={0.85}
            onPress={() => navigation.navigate('WorkoutDetail')}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={require('../../assets/gambar 1.jpg')} // Sesuaikan dengan nama file gambar lokalmu
                style={styles.cardImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.bookmarkBadge}>
                <Feather name="bookmark" size={16} color="#18181B" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardCategory}>Kekuatan • Seluruh tubuh</Text>
            <Text style={styles.cardTitle}>Kuat dari Rumah</Text>
            <Text style={styles.cardSub}>20 menit • Rendah</Text>
            <View style={styles.offlineRow}>
              <Feather name="download" size={12} color="#059669" style={{ marginRight: 4 }} />
              <Text style={styles.offlineText}>Offline</Text>
            </View>
          </TouchableOpacity>

          {/* Card Program 2: Kardio Tanpa Alat (Navigasi ke WorkoutDetail) */}
          <TouchableOpacity 
            style={styles.programCard} 
            activeOpacity={0.85}
            onPress={() => navigation.navigate('WorkoutDetail')}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={require('../../assets/gambar 1.jpg')} // Sesuaikan dengan nama file gambar lokalmu
                style={styles.cardImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.bookmarkBadge}>
                <Feather name="bookmark" size={16} color="#18181B" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardCategory}>Kardio • Seluruh tubuh</Text>
            <Text style={styles.cardTitle}>Kardio Tanpa Alat</Text>
            <Text style={styles.cardSub}>15 menit • Menengah</Text>
            <View style={styles.offlineRow}>
              <Feather name="download" size={12} color="#059669" style={{ marginRight: 4 }} />
              <Text style={styles.offlineText}>Offline</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Peregangan Section */}
        <View style={[styles.sectionHeaderRow, { marginTop: 16 }]}>
          <Text style={styles.sectionTitle}>Peregangan</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat semua</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>
          Siapkan tubuh sebelum latihan, pulihkan setelahnya.
        </Text>

        {/* Item 1: Siap Bergerak */}
        <TouchableOpacity 
          style={styles.stretchCard} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('WorkoutDetail')}
        >
          <View style={styles.stretchIconBox}>
            <Feather name="sun" size={20} color="#059669" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.stretchCategory}>Pemanasan / Warm-up</Text>
            <Text style={styles.stretchTitle}>Siap Bergerak</Text>
            <Text style={styles.stretchSub}>5 menit • Dinamis • Rendah</Text>
            <View style={styles.offlineRow}>
              <Feather name="download" size={12} color="#059669" style={{ marginRight: 4 }} />
              <Text style={styles.offlineTag}>Tersedia offline</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color="#A1A1AA" />
        </TouchableOpacity>

        {/* Item 2: Rileks & Pulih */}
        <TouchableOpacity 
          style={styles.stretchCard} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('WorkoutDetail')}
        >
          <View style={styles.stretchIconBoxAlt}>
            <MaterialCommunityIcons name="weather-windy" size={20} color="#059669" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.stretchCategory}>Pendinginan / Cool-down</Text>
            <Text style={styles.stretchTitle}>Rileks & Pulih</Text>
            <Text style={styles.stretchSub}>8 menit • Statis • Rendah</Text>
            <View style={styles.offlineRow}>
              <Feather name="download" size={12} color="#059669" style={{ marginRight: 4 }} />
              <Text style={styles.offlineTag}>Tersedia offline</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color="#A1A1AA" />
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="barbell-outline" size={22} color="#71717A" />
          <Text style={styles.navLabel}>Latihan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Temukan')}>
          <Feather name="compass" size={22} color="#059669" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Temukan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Komunitas')}>
          <Feather name="users" size={22} color="#71717A" />
          <Text style={styles.navLabel}>Komunitas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Laporan')}>
          <Feather name="bar-chart-2" size={22} color="#71717A" />
          <Text style={styles.navLabel}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Pengaturan')}>
          <Feather name="settings" size={22} color="#71717A" />
          <Text style={styles.navLabel}>Pengaturan</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#71717A',
    marginTop: 2,
  },
  bookmarkHeaderBtn: {
    padding: 4,
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
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#18181B',
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
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
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#71717A',
    marginTop: -8,
    marginBottom: 12,
  },
  programScroll: {
    marginBottom: 16,
  },
  programCard: {
    width: 200,
    marginRight: 14,
  },
  imageWrapper: {
    width: '100%',
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  bookmarkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 6,
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 12,
    color: '#71717A',
    marginBottom: 4,
  },
  offlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offlineText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  stretchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  stretchIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stretchIconBoxAlt: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stretchCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 2,
  },
  stretchTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  stretchSub: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  offlineTag: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '500',
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
});
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [selectedMuscle, setSelectedMuscle] = useState('Otot Perut');
  const [selectedLevel, setSelectedLevel] = useState('Menengah');
  const [activeTab, setActiveTab] = useState('Latihan');

  const days = [
    { day: 'Sen', date: '12', hasDot: true, active: false },
    { day: 'Sel', date: '13', hasDot: true, active: false },
    { day: 'Rab', date: '14', hasDot: true, active: true },
    { day: 'Kam', date: '15', hasDot: false, active: false },
    { day: 'Jum', date: '16', hasDot: false, active: false },
    { day: 'Sab', date: '17', hasDot: false, active: false },
    { day: 'Min', date: '18', hasDot: false, active: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Greeting & Avatar */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.dateText}>Rabu, 14 Oktober 2026</Text>
            <Text style={styles.greetingText}>Halo, Valentina. Siap bergerak?</Text>
          </View>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>VM</Text>
          </View>
        </View>

        {/* Section Title */}
        <Text style={styles.pageTitle}>Latihan</Text>

        {/* Calendar Strip */}
        <View style={styles.calendarHeader}>
          <Text style={styles.monthText}>Oktober 2026</Text>
          <Text style={styles.rangeText}>12–18 Okt</Text>
        </View>

        <View style={styles.daysRow}>
          {days.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.dayItem, item.active && styles.dayItemActive]}
              activeOpacity={0.8}
            >
              <Text style={[styles.dayName, item.active && styles.dayNameActive]}>{item.day}</Text>
              <Text style={[styles.dayDate, item.active && styles.dayDateActive]}>{item.date}</Text>
              {item.hasDot && (
                <View style={[styles.dot, item.active && styles.dotActive]} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Weekly Target Card */}
        <View style={styles.targetCard}>
          <View style={styles.targetHeader}>
            <Text style={styles.targetTitle}>Target mingguan</Text>
            <Text style={styles.targetCount}>2 / 4 latihan</Text>
          </View>
          <View style={styles.targetProgressBg}>
            <View style={styles.targetProgressFill} />
          </View>
          <Text style={styles.targetSubtitle}>Dua sesi lagi untuk mencapai targetmu!</Text>
        </View>

        {/* Today Schedule Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Jadwal hari ini</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Lihat jadwal</Text>
          </TouchableOpacity>
        </View>

        {/* Schedule Banner Card */}
        <View style={styles.scheduleCard}>
          <ImageBackground
            source={require('../../assets/gambar 1.jpg')} // Sesuaikan nama file gambar lokalmu di assets
            style={styles.scheduleImage}
            imageStyle={{ borderRadius: 16 }}
            resizeMode="cover"
          >
            <View style={styles.badgeTime}>
              <Feather name="clock" size={14} color="#18181B" style={{ marginRight: 6 }} />
              <Text style={styles.badgeTimeText}>25 menit</Text>
            </View>
          </ImageBackground>

          <View style={styles.scheduleMetaRow}>
            <Text style={styles.scheduleMetaText}>18.00 • Latihan di rumah</Text>
            <View style={styles.offlineTag}>
              <Feather name="download" size={12} color="#059669" style={{ marginRight: 4 }} />
              <Text style={styles.offlineText}>Offline</Text>
            </View>
          </View>

          <Text style={styles.workoutName}>Core & Kekuatan</Text>
          <Text style={styles.workoutDetail}>Otot Perut • Menengah • 6 gerakan</Text>

          <TouchableOpacity style={styles.startWorkoutButton} activeOpacity={0.8}>
            <Ionicons name="play" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.startWorkoutText}>Mulai latihan</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Program Banner */}
        <TouchableOpacity style={styles.customBanner} activeOpacity={0.8}>
          <View style={styles.customIconBox}>
            <Ionicons name="options-outline" size={20} color="#059669" />
          </View>
          <View style={styles.customTextBox}>
            <Text style={styles.customTitle}>Sesuaikan Latihan</Text>
            <Text style={styles.customSubtitle}>Susun program versimu sendiri.</Text>
          </View>
          <Feather name="arrow-right" size={20} color="#059669" />
        </TouchableOpacity>

        {/* Filter Section */}
        <Text style={styles.sectionTitle}>Temukan latihan yang pas</Text>
        
        {/* Filter Muscle Focus */}
        <Text style={styles.filterLabel}>Fokus otot</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
          {['Otot Perut', 'Lengan', 'Dada', 'Seluruh tubuh'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.filterChip, selectedMuscle === item && styles.filterChipActive]}
              onPress={() => setSelectedMuscle(item)}
            >
              <Text style={[styles.filterChipText, selectedMuscle === item && styles.filterChipTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filter Difficulty Level */}
        <Text style={styles.filterLabel}>Tingkat kesulitan</Text>
        <View style={styles.levelRow}>
          {['Rendah', 'Menengah', 'Atas'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.filterChip, selectedLevel === level && styles.filterChipActive]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text style={[styles.filterChipText, selectedLevel === level && styles.filterChipTextActive]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Program Recommendations */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Pilihan untukmu</Text>
          <Text style={styles.programCount}>2 program</Text>
        </View>

        {/* Item 1 */}
        <TouchableOpacity style={styles.programCard} activeOpacity={0.7}>
          <View style={styles.programIconBox}>
            <Ionicons name="flame-outline" size={20} color="#059669" />
          </View>
          <View style={styles.programTextBox}>
            <Text style={styles.programTitle}>Core Aktif</Text>
            <Text style={styles.programSubtitle}>Otot Perut • Menengah • 15 menit</Text>
            <View style={styles.availableOfflineRow}>
              <Feather name="download" size={12} color="#059669" style={{ marginRight: 4 }} />
              <Text style={styles.availableOfflineText}>Tersedia offline</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color="#A1A1AA" />
        </TouchableOpacity>

        {/* Item 2 */}
        <TouchableOpacity style={styles.programCard} activeOpacity={0.7}>
          <View style={styles.programIconBox}>
            <MaterialCommunityIcons name="pulse" size={20} color="#059669" />
          </View>
          <View style={styles.programTextBox}>
            <Text style={styles.programTitle}>Plank & Stabilitas</Text>
            <Text style={styles.programSubtitle}>Otot Perut • Menengah • 8 menit</Text>
            <View style={styles.availableOfflineRow}>
              <Feather name="download" size={12} color="#059669" style={{ marginRight: 4 }} />
              <Text style={styles.availableOfflineText}>Tersedia offline</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={20} color="#A1A1AA" />
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Latihan')}>
          <Ionicons name="barbell" size={22} color={activeTab === 'Latihan' ? '#059669' : '#A1A1AA'} />
          <Text style={[styles.navText, activeTab === 'Latihan' && styles.navTextActive]}>Latihan</Text>
        </TouchableOpacity>

        {/* Menu Temukan: Diarahkan ke DiscoverScreen */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => {
            setActiveTab('Temukan');
            navigation.navigate('Discover');
          }}
        >
          <Feather name="compass" size={22} color={activeTab === 'Temukan' ? '#059669' : '#A1A1AA'} />
          <Text style={[styles.navText, activeTab === 'Temukan' && styles.navTextActive]}>Temukan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Komunitas')}>
          <Feather name="users" size={22} color={activeTab === 'Komunitas' ? '#059669' : '#A1A1AA'} />
          <Text style={[styles.navText, activeTab === 'Komunitas' && styles.navTextActive]}>Komunitas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Laporan')}>
          <Feather name="bar-chart-2" size={22} color={activeTab === 'Laporan' ? '#059669' : '#A1A1AA'} />
          <Text style={[styles.navText, activeTab === 'Laporan' && styles.navTextActive]}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('Pengaturan')}>
          <Feather name="settings" size={22} color={activeTab === 'Pengaturan' ? '#059669' : '#A1A1AA'} />
          <Text style={[styles.navText, activeTab === 'Pengaturan' && styles.navTextActive]}>Pengaturan</Text>
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
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#71717A',
  },
  greetingText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  avatarBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginVertical: 8,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  rangeText: {
    fontSize: 12,
    color: '#71717A',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  dayItemActive: {
    backgroundColor: '#059669',
  },
  dayName: {
    fontSize: 11,
    color: '#71717A',
    marginBottom: 4,
  },
  dayNameActive: {
    color: '#FFFFFF',
  },
  dayDate: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  dayDateActive: {
    color: '#FFFFFF',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#059669',
    marginTop: 4,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  targetCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F4F4F5',
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  targetTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#18181B',
  },
  targetCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  targetProgressBg: {
    height: 6,
    backgroundColor: '#E4E4E7',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  targetProgressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#059669',
  },
  targetSubtitle: {
    fontSize: 12,
    color: '#71717A',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
    marginTop: 10,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  scheduleCard: {
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  scheduleImage: {
    height: 160,
    width: '100%',
    justifyContent: 'flex-end',
    padding: 12,
    marginBottom: 12,
  },
  badgeTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeTimeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#18181B',
  },
  scheduleMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  scheduleMetaText: {
    fontSize: 12,
    color: '#71717A',
  },
  offlineTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offlineText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  workoutDetail: {
    fontSize: 13,
    color: '#71717A',
    marginBottom: 14,
  },
  startWorkoutButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startWorkoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  customBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  customIconBox: {
    marginRight: 12,
  },
  customTextBox: {
    flex: 1,
  },
  customTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#047857',
  },
  customSubtitle: {
    fontSize: 12,
    color: '#065F46',
  },
  filterLabel: {
    fontSize: 13,
    color: '#71717A',
    marginBottom: 8,
  },
  filterScrollView: {
    marginBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E4E7',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  filterChipActive: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  filterChipText: {
    fontSize: 13,
    color: '#3F3F46',
  },
  filterChipTextActive: {
    color: '#059669',
    fontWeight: '700',
  },
  levelRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  programCount: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
  programCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
  },
  programIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  programTextBox: {
    flex: 1,
  },
  programTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  programSubtitle: {
    fontSize: 12,
    color: '#71717A',
    marginVertical: 2,
  },
  availableOfflineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availableOfflineText: {
    fontSize: 11,
    color: '#059669',
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
  navText: {
    fontSize: 10,
    color: '#A1A1AA',
    marginTop: 2,
  },
  navTextActive: {
    color: '#059669',
    fontWeight: '700',
  },
});
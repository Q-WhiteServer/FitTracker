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
  Modal,
  Alert,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ReportScreen({ navigation }) {
  const [selectedMonth, setSelectedMonth] = useState('Oktober 2026');
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(14); // State tanggal aktif
  const [dayDetailModal, setDayDetailModal] = useState(null);
  const [selectedWorkoutDetail, setSelectedWorkoutDetail] = useState(null);

  // Data Rekap Bulanan
  const monthData = {
    'Oktober 2026': {
      sessions: 8,
      duration: 214,
      calories: '1.460',
      activeDays: [1, 3, 5, 7, 9, 10, 12, 13],
      currentDay: 14,
      weightChange: '-1,2 kg bulan ini',
      currentWeight: '67,8 kg',
    },
    'September 2026': {
      sessions: 12,
      duration: 310,
      calories: '2.100',
      activeDays: [2, 4, 6, 8, 11, 15, 18, 20, 22, 25, 27, 29],
      currentDay: null,
      weightChange: '-0,8 kg bulan ini',
      currentWeight: '69,0 kg',
    },
    'Agustus 2026': {
      sessions: 10,
      duration: 260,
      calories: '1.820',
      activeDays: [1, 3, 6, 9, 12, 14, 17, 21, 24, 28],
      currentDay: null,
      weightChange: '-0,5 kg bulan ini',
      currentWeight: '69,8 kg',
    },
  };

  const currentStats = monthData[selectedMonth] || monthData['Oktober 2026'];

  // Data Detail Per Tanggal
  const dayDetails = {
    13: { title: 'Lengan & Dada', duration: '24 menit', calories: '165 kkal', status: 'Selesai' },
    12: { title: 'Full Body Kekuatan', duration: '30 menit', calories: '210 kkal', status: 'Selesai' },
    10: { title: 'Yoga & Mobilitas', duration: '25 menit', calories: '160 kkal', status: 'Selesai' },
    14: { title: 'Core & Kekuatan', duration: '25 menit', calories: '180 kkal', status: 'Jadwal Hari Ini' },
  };

  // Data Riwayat Latihan
  const [workoutHistory, setWorkoutHistory] = useState([
    {
      id: '1',
      title: 'Lengan & Dada',
      date: 'Sel, 13 Okt • 18.00',
      duration: '24 menit',
      calories: 'Estimasi 165 kkal',
      exercises: ['Push-up (3 Set)', 'Dumbbell Press (3 Set)', 'Tricep Dips (3 Set)'],
    },
    {
      id: '2',
      title: 'Full Body Kekuatan',
      date: 'Sen, 12 Okt • 18.00',
      duration: '30 menit',
      calories: 'Estimasi 210 kkal',
      exercises: ['Squat (4 Set)', 'Push-up (3 Set)', 'Plank (3 Set)'],
    },
    {
      id: '3',
      title: 'Yoga & Mobilitas',
      date: 'Sab, 10 Okt • 08.00',
      duration: '25 menit',
      calories: 'Estimasi 160 kkal',
      exercises: ['Sun Salutation', 'Child Pose', 'Warrior Pose'],
    },
  ]);

  const handleShare = () => {
    Alert.alert('Bagikan Laporan', 'Laporan progres kamu berhasil disalin ke papan klip!');
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    const detail = dayDetails[day];
    if (detail) {
      setDayDetailModal({ day, ...detail });
    } else if (currentStats.activeDays.includes(day)) {
      setDayDetailModal({
        day,
        title: 'Latihan Rutin Selesai',
        duration: '20 menit',
        calories: '150 kkal',
        status: 'Selesai',
      });
    } else {
      setDayDetailModal({
        day,
        title: 'Tidak Ada Sesi Latihan',
        duration: '0 menit',
        calories: '0 kkal',
        status: 'Hari Istirahat',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Bar */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Laporan</Text>
            <Text style={styles.subtitle}>Setiap sesi adalah progres.</Text>
          </View>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Feather name="share-2" size={20} color="#3F3F46" />
          </TouchableOpacity>
        </View>

        {/* Pemilih Bulan */}
        <TouchableOpacity 
          style={styles.monthSelector} 
          activeOpacity={0.7}
          onPress={() => setIsMonthModalVisible(true)}
        >
          <Feather name="calendar" size={18} color="#059669" style={{ marginRight: 8 }} />
          <Text style={styles.monthText}>{selectedMonth}</Text>
          <Feather name="chevron-down" size={18} color="#71717A" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        {/* Highlight Ringkasan Tiga Kolom */}
        <View style={styles.statsCard}>
          <View style={styles.statColumn}>
            <MaterialCommunityIcons name="dumbbell" size={20} color="#059669" />
            <Text style={styles.statNumber}>{currentStats.sessions}</Text>
            <Text style={styles.statLabel}>sesi</Text>
            <Text style={styles.statSubText}>Total latihan</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statColumn}>
            <Feather name="clock" size={20} color="#059669" />
            <Text style={styles.statNumber}>{currentStats.duration}</Text>
            <Text style={styles.statLabel}>menit</Text>
            <Text style={styles.statSubText}>Total durasi</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statColumn}>
            <MaterialCommunityIcons name="fire" size={20} color="#059669" />
            <Text style={styles.statNumber}>{currentStats.calories}</Text>
            <Text style={styles.statLabel}>kkal</Text>
            <Text style={styles.statSubText}>Estimasi kalori</Text>
          </View>
        </View>

        {/* Kalender Latihan Interaktif */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Kalender latihan</Text>
          
          {/* Label Hari */}
          <View style={styles.calendarHeaderRow}>
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, idx) => (
              <Text key={idx} style={styles.calendarDayHeader}>{day}</Text>
            ))}
          </View>

          {/* Grid Tanggal */}
          <View style={styles.calendarGrid}>
            {/* Space kosong untuk awal bulan */}
            <View style={styles.dayBox} />
            <View style={styles.dayBox} />

            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const isCompleted = currentStats.activeDays.includes(day);
              const isToday = day === currentStats.currentDay;
              const isSelected = selectedDay === day;

              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayBox,
                    isCompleted && styles.completedDayBox,
                    isToday && styles.todayDayBox,
                    isSelected && !isCompleted && !isToday && styles.selectedDayBox,
                  ]}
                  onPress={() => handleSelectDay(day)}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isCompleted && styles.completedDayText,
                      isToday && styles.todayDayText,
                      isSelected && !isCompleted && !isToday && styles.selectedDayText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Keterangan Status */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#059669' }]} />
              <Text style={styles.legendText}>Latihan selesai</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#059669' }]} />
              <Text style={styles.legendText}>Hari ini</Text>
            </View>
          </View>
        </View>

        {/* Perkembangan Berat Badan */}
        <View style={styles.sectionCard}>
          <View style={styles.weightHeaderRow}>
            <Text style={styles.sectionTitle}>Perkembangan berat</Text>
            <View style={styles.weightBadge}>
              <Feather name="arrow-down" size={12} color="#059669" />
              <Text style={styles.weightBadgeText}>{currentStats.weightChange}</Text>
            </View>
          </View>

          <Text style={styles.weightValue}>{currentStats.currentWeight}</Text>

          {/* Visual Grafik Berat Sederhana */}
          <View style={styles.chartContainer}>
            <View style={styles.chartYAxis}>
              <Text style={styles.chartYText}>69,0</Text>
              <Text style={styles.chartYText}>68,5</Text>
              <Text style={styles.chartYText}>68,0</Text>
              <Text style={styles.chartYText}>67,5</Text>
            </View>

            <View style={styles.chartPlotArea}>
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />

              {/* Garis Trend */}
              <View style={styles.lineGraphic} />
            </View>
          </View>

          <View style={styles.chartXAxis}>
            <Text style={styles.chartXText}>1 Okt</Text>
            <Text style={styles.chartXText}>5 Okt</Text>
            <Text style={styles.chartXText}>9 Okt</Text>
            <Text style={styles.chartXText}>14 Okt</Text>
          </View>

          <Text style={styles.chartFooterText}>Berat badan (kg) • 1–14 Oktober 2026</Text>
        </View>

        {/* Riwayat Latihan */}
        <View style={styles.historyHeaderRow}>
          <Text style={styles.sectionTitle}>Riwayat latihan</Text>
          <TouchableOpacity onPress={() => Alert.alert('Riwayat Latihan', 'Menampilkan seluruh 8 sesi latihan.')}>
            <Text style={styles.seeAllHistoryText}>Semua {currentStats.sessions} sesi</Text>
          </TouchableOpacity>
        </View>

        {workoutHistory.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.historyCard}
            activeOpacity={0.7}
            onPress={() => setSelectedWorkoutDetail(item)}
          >
            <View style={styles.historyCheckIcon}>
              <Feather name="check" size={16} color="#059669" />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.historyTitle}>{item.title}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
              <Text style={styles.historyMeta}>{item.duration} • {item.calories}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Label Simpan Perangkat */}
        <View style={styles.savedStatusRow}>
          <Feather name="download" size={14} color="#059669" style={{ marginRight: 6 }} />
          <Text style={styles.savedStatusText}>Riwayat tersimpan di perangkat</Text>
        </View>

      </ScrollView>

      {/* Modal Detail Tanggal Diklik */}
      <Modal
        visible={!!dayDetailModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDayDetailModal(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setDayDetailModal(null)}
        >
          <View style={styles.dayModalContent}>
            <Text style={styles.dayModalHeader}>
              Aktivitas Tanggal {dayDetailModal?.day} {selectedMonth}
            </Text>
            <View style={styles.dayDetailRow}>
              <Feather name="activity" size={16} color="#059669" style={{ marginRight: 8 }} />
              <Text style={styles.dayDetailText}>Program: <Text style={{ fontWeight: '700' }}>{dayDetailModal?.title}</Text></Text>
            </View>
            <View style={styles.dayDetailRow}>
              <Feather name="clock" size={16} color="#059669" style={{ marginRight: 8 }} />
              <Text style={styles.dayDetailText}>Durasi: {dayDetailModal?.duration}</Text>
            </View>
            <View style={styles.dayDetailRow}>
              <MaterialCommunityIcons name="fire" size={16} color="#059669" style={{ marginRight: 8 }} />
              <Text style={styles.dayDetailText}>Kalori Terbakar: {dayDetailModal?.calories}</Text>
            </View>
            <TouchableOpacity 
              style={styles.closeDayModalBtn} 
              onPress={() => setDayDetailModal(null)}
            >
              <Text style={styles.closeDayModalText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal Pemilih Bulan */}
      <Modal
        visible={isMonthModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMonthModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsMonthModalVisible(false)}
        >
          <View style={styles.monthModalContent}>
            <Text style={styles.modalHeaderTitle}>Pilih Bulan</Text>
            {Object.keys(monthData).map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.monthOption,
                  selectedMonth === m && styles.selectedMonthOption,
                ]}
                onPress={() => {
                  setSelectedMonth(m);
                  setIsMonthModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.monthOptionText,
                    selectedMonth === m && styles.selectedMonthOptionText,
                  ]}
                >
                  {m}
                </Text>
                {selectedMonth === m && <Feather name="check" size={16} color="#059669" />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal Detail Latihan */}
      <Modal
        visible={!!selectedWorkoutDetail}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedWorkoutDetail(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailModalContent}>
            <View style={styles.detailModalHeader}>
              <Text style={styles.detailModalTitle}>{selectedWorkoutDetail?.title}</Text>
              <TouchableOpacity onPress={() => setSelectedWorkoutDetail(null)}>
                <Feather name="x" size={20} color="#18181B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.detailModalDate}>{selectedWorkoutDetail?.date}</Text>
            <Text style={styles.detailModalMeta}>
              {selectedWorkoutDetail?.duration} • {selectedWorkoutDetail?.calories}
            </Text>

            <Text style={[styles.sectionTitle, { marginTop: 16, marginBottom: 8 }]}>Gerakan yang Selesai:</Text>
            {selectedWorkoutDetail?.exercises.map((ex, i) => (
              <View key={i} style={styles.exDetailRow}>
                <Feather name="check-circle" size={16} color="#059669" style={{ marginRight: 8 }} />
                <Text style={styles.exDetailText}>{ex}</Text>
              </View>
            ))}

            <TouchableOpacity 
              style={styles.closeDetailBtn}
              onPress={() => setSelectedWorkoutDetail(null)}
            >
              <Text style={styles.closeDetailBtnText}>Tutup</Text>
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
          <Feather name="bar-chart-2" size={22} color="#059669" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Laporan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
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
    marginBottom: 12,
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
  shareBtn: {
    padding: 6,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#F4F4F5',
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#F4F4F5',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717A',
  },
  statSubText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F4F4F5',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  calendarDayHeader: {
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    color: '#71717A',
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayBox: {
    width: '14.28%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  dayText: {
    fontSize: 13,
    color: '#3F3F46',
  },
  completedDayBox: {
    backgroundColor: '#059669',
    borderRadius: 12,
  },
  completedDayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  todayDayBox: {
    borderWidth: 1.5,
    borderColor: '#059669',
    borderRadius: 12,
  },
  todayDayText: {
    color: '#059669',
    fontWeight: '700',
  },
  selectedDayBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
  },
  selectedDayText: {
    color: '#059669',
    fontWeight: '700',
  },
  legendRow: {
    flexDirection: 'row',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#71717A',
  },
  weightHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  weightBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 2,
  },
  weightValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 100,
    marginTop: 8,
  },
  chartYAxis: {
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  chartYText: {
    fontSize: 10,
    color: '#A1A1AA',
  },
  chartPlotArea: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#F4F4F5',
    width: '100%',
  },
  lineGraphic: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    height: 70,
    borderBottomWidth: 2,
    borderBottomColor: '#059669',
    backgroundColor: '#ECFDF5',
    opacity: 0.6,
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    marginTop: 8,
  },
  chartXText: {
    fontSize: 10,
    color: '#A1A1AA',
  },
  chartFooterText: {
    fontSize: 11,
    color: '#A1A1AA',
    textAlign: 'center',
    marginTop: 12,
  },
  historyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllHistoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F4F4F5',
    marginBottom: 10,
  },
  historyCheckIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  historyDate: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 2,
  },
  historyMeta: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  savedStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  savedStatusText: {
    fontSize: 12,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayModalContent: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: 16,
    padding: 18,
  },
  dayModalHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  dayDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dayDetailText: {
    fontSize: 13,
    color: '#3F3F46',
  },
  closeDayModalBtn: {
    backgroundColor: '#059669',
    borderRadius: 10,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  closeDayModalText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  monthModalContent: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: 16,
    padding: 16,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  monthOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },
  selectedMonthOption: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  monthOptionText: {
    fontSize: 14,
    color: '#3F3F46',
  },
  selectedMonthOptionText: {
    color: '#059669',
    fontWeight: '700',
  },
  detailModalContent: {
    backgroundColor: '#FFFFFF',
    width: '85%',
    borderRadius: 20,
    padding: 20,
  },
  detailModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  detailModalDate: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 4,
  },
  detailModalMeta: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
    marginTop: 2,
  },
  exDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  exDetailText: {
    fontSize: 13,
    color: '#374151',
  },
  closeDetailBtn: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  closeDetailBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
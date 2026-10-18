import React, { useState, useEffect } from 'react';
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
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function WorkoutDetailScreen({ navigation, route }) {
  const [programName, setProgramName] = useState('Full Body Favorit');
  const [selectedMuscle, setSelectedMuscle] = useState('Seluruh tubuh');
  const [selectedLevel, setSelectedLevel] = useState('Menengah');
  
  const [selectedDay, setSelectedDay] = useState('Jumat, 16 Okt');
  const [selectedTime, setSelectedTime] = useState('18.00');

  // State daftar gerakan (supaya bisa ditambah dan diedit secara dinamis)
  const [exercises, setExercises] = useState([
    { id: '1', name: 'Squat', sets: '3', reps: '12 repetisi', rest: '45', icon: 'barbell-outline', type: 'ionicon' },
    { id: '2', name: 'Push-up', sets: '3', reps: '10 repetisi', rest: '45', icon: 'fitness-outline', type: 'ionicon' },
    { id: '3', name: 'Plank', sets: '3', reps: '30 detik', rest: '30', icon: 'pulse', type: 'material' },
  ]);

  const [selectedExercises, setSelectedExercises] = useState([]);

  // Menangkap data baru atau hasil edit dari EditExerciseScreen
  useEffect(() => {
    if (route.params?.updatedExercise) {
      const { id, name, sets, reps, rest } = route.params.updatedExercise;
      setExercises((prev) =>
        prev.map((item) => (item.id === id ? { ...item, name, sets, reps, rest } : item))
      );
    } else if (route.params?.newExercise) {
      const { name, sets, reps, rest } = route.params.newExercise;
      const newObj = {
        id: Date.now().toString(),
        name,
        sets,
        reps,
        rest,
        icon: 'fitness-outline',
        type: 'ionicon',
      };
      setExercises((prev) => [...prev, newObj]);
    }
  }, [route.params?.updatedExercise, route.params?.newExercise]);

  const toggleSelectExercise = (exerciseName) => {
    if (selectedExercises.includes(exerciseName)) {
      setSelectedExercises(selectedExercises.filter((item) => item !== exerciseName));
    } else {
      setSelectedExercises([...selectedExercises, exerciseName]);
    }
  };

  const handleEditExercise = (item) => {
    navigation.navigate('EditExercise', {
      isEdit: true,
      exercise: item,
    });
  };

  const handleAddExercise = () => {
    navigation.navigate('EditExercise', {
      isEdit: false,
    });
  };

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
        
        <Text style={styles.title}>Sesuaikan Latihan</Text>
        <Text style={styles.subtitle}>Program buatanmu, sesuai ritmemu.</Text>

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

        <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Gerakan pilihan</Text>
          <TouchableOpacity onPress={() => Alert.alert('Susun Ulang', 'Geser gerakan untuk mengubah urutan latihan.')}>
            <Text style={styles.reorderText}>Susun ulang</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSub}>Ketuk gerakan untuk memilih, atau tekan pensil untuk mengedit.</Text>

        {/* Render List Gerakan Dinamis */}
        {exercises.map((item) => {
          const isSelected = selectedExercises.includes(item.name);
          return (
            <TouchableOpacity 
              key={item.id}
              style={[styles.exerciseCard, isSelected && styles.exerciseCardActive]} 
              activeOpacity={0.8} 
              onPress={() => toggleSelectExercise(item.name)}
            >
              <Feather name="menu" size={18} color={isSelected ? '#059669' : '#A1A1AA'} style={{ marginRight: 10 }} />
              <View style={[styles.exerciseIconBox, isSelected && styles.exerciseIconBoxActive]}>
                {item.type === 'material' ? (
                  <MaterialCommunityIcons name={item.icon} size={18} color={isSelected ? '#059669' : '#71717A'} />
                ) : (
                  <Ionicons name={item.icon} size={18} color={isSelected ? '#059669' : '#71717A'} />
                )}
              </View>
              <View style={styles.exerciseTextBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.exerciseName, isSelected && styles.exerciseNameActive]}>{item.name}</Text>
                  {isSelected && <Feather name="check-circle" size={14} color="#059669" style={{ marginLeft: 6 }} />}
                </View>
                <Text style={styles.exerciseDetail}>{item.sets} set × {item.reps}</Text>
                <Text style={styles.exerciseSubDetail}>Istirahat {item.rest} detik</Text>
              </View>
              <TouchableOpacity onPress={() => handleEditExercise(item)} style={{ padding: 4 }}>
                <Feather name="edit-2" size={16} color={isSelected ? '#059669' : '#71717A'} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}

        {/* Tombol Tambah Gerakan */}
        <TouchableOpacity style={styles.addExerciseButton} activeOpacity={0.8} onPress={handleAddExercise}>
          <Feather name="plus" size={18} color="#059669" style={{ marginRight: 6 }} />
          <Text style={styles.addExerciseText}>Tambah gerakan</Text>
        </TouchableOpacity>

        {/* Estimasi Waktu Card */}
        <View style={styles.estimateCard}>
          <Feather name="clock" size={18} color="#059669" style={{ marginRight: 10 }} />
          <View>
            <Text style={styles.estimateTitle}>Estimasi {exercises.length * 6} menit</Text>
            <Text style={styles.estimateSub}>
              {exercises.length} gerakan • {exercises.length * 3} set • Tanpa alat
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Jadwalkan latihan</Text>
        
        <View style={styles.scheduleRow}>
          <View style={styles.scheduleBox}>
            <Text style={styles.scheduleLabel}>Hari</Text>
            <View style={styles.scheduleInputWrapper}>
              <TextInput
                style={styles.scheduleInputText}
                value={selectedDay}
                onChangeText={setSelectedDay}
                placeholder="Jumat, 16 Okt"
                placeholderTextColor="#A1A1AA"
              />
              <Feather name="calendar" size={16} color="#71717A" />
            </View>
          </View>

          <View style={styles.scheduleBox}>
            <Text style={styles.scheduleLabel}>Jam</Text>
            <View style={styles.scheduleInputWrapper}>
              <TextInput
                style={styles.scheduleInputText}
                value={selectedTime}
                onChangeText={setSelectedTime}
                placeholder="18.00"
                placeholderTextColor="#A1A1AA"
              />
              <Feather name="clock" size={16} color="#71717A" />
            </View>
          </View>
        </View>

        {/* Tombol Simpan Program: Diarahkan langsung ke ActiveWorkout */}
        <TouchableOpacity 
          style={styles.saveButton} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ActiveWorkout')}
        >
          <Feather name="check" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.saveButtonText}>Simpan program</Text>
        </TouchableOpacity>

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
  exerciseCardActive: {
    borderColor: '#059669',
    backgroundColor: '#F0FDF4',
  },
  exerciseIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseIconBoxActive: {
    backgroundColor: '#DCFCE7',
  },
  exerciseTextBox: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  exerciseNameActive: {
    color: '#059669',
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
    flex: 1,
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
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
import { Feather } from '@expo/vector-icons';

export default function EditExerciseScreen({ navigation, route }) {
  const isEdit = route.params?.isEdit || false;
  const exerciseData = route.params?.exercise || {};

  const [exerciseName, setExerciseName] = useState(exerciseData.name || '');
  const [sets, setSets] = useState(exerciseData.sets || '3');
  const [reps, setReps] = useState(exerciseData.reps || '12');
  const [restTime, setRestTime] = useState(exerciseData.rest || '45');

  const handleSave = () => {
    if (!exerciseName.trim()) {
      Alert.alert('Peringatan', 'Nama gerakan tidak boleh kosong!');
      return;
    }

    if (isEdit) {
      // Kirim balik data yang di-edit beserta ID-nya
      navigation.navigate('WorkoutDetail', {
        updatedExercise: {
          id: exerciseData.id,
          name: exerciseName,
          sets,
          reps,
          rest: restTime,
        },
      });
    } else {
      // Kirim data gerakan baru
      navigation.navigate('WorkoutDetail', {
        newExercise: {
          name: exerciseName,
          sets,
          reps,
          rest: restTime,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
        
        <Text style={styles.title}>
          {isEdit ? 'Edit Gerakan' : 'Tambah Gerakan Baru'}
        </Text>
        <Text style={styles.subtitle}>
          {isEdit ? 'Sesuaikan jumlah set, repetisi, dan waktu istirahat.' : 'Isi detail gerakan baru untuk program latihanmu.'}
        </Text>

        <Text style={styles.label}>Nama Gerakan</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={exerciseName}
            onChangeText={setExerciseName}
            placeholder="Contoh: Jumping Jacks, Lunges"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        <Text style={[styles.label, { marginTop: 16 }]}>Jumlah Set</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={sets}
            onChangeText={setSets}
            keyboardType="numeric"
            placeholder="Contoh: 3"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        <Text style={[styles.label, { marginTop: 16 }]}>Repetisi atau Durasi</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={reps}
            onChangeText={setReps}
            placeholder="Contoh: 12 repetisi / 30 detik"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        <Text style={[styles.label, { marginTop: 16 }]}>Istirahat per Set (detik)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={restTime}
            onChangeText={setRestTime}
            keyboardType="numeric"
            placeholder="Contoh: 45"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} activeOpacity={0.8} onPress={handleSave}>
          <Feather name="check" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.saveButtonText}>
            {isEdit ? 'Simpan Perubahan' : 'Tambah Gerakan'}
          </Text>
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
  saveButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
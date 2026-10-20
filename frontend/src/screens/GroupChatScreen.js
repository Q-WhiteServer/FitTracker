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
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function GroupChatScreen({ navigation, route }) {
  // Tangkap parameter dari navigasi
  const groupName = route.params?.groupName || 'Lari Pagi Indonesia';
  const category = route.params?.category || 'Lari';
  const membersCount = route.params?.members || '128';

  // Inisial avatar
  const words = groupName.trim().split(' ');
  const avatarInitials = words.length >= 2 
    ? (words[0][0] + words[1][0]).toUpperCase() 
    : groupName.substring(0, 2).toUpperCase();

  // Template Chat & Agenda berdasarkan kategori grup
  const getGroupData = () => {
    switch (category) {
      case 'Bersepeda':
        return {
          icon: 'bike',
          agendaTitle: 'Gowes Santai Surabaya Loop 20K',
          date: 'Minggu, 06:00 WIB',
          location: 'Taman Bungkul Surabaya',
          buttonText: 'Ikut Gowes (+1)',
          joinedText: 'Sudah Ikut Gowes',
          chat1: 'Halo dulur goweser! 🚴‍♂️ Besok Minggu kita ada rute santai Bungkul - Suramadu PP. Jangan lupa cek tekanan ban & bawa minum ya!',
          chat2: 'Titik kumpul tepat di depan air mancur Taman Bungkul kan mas?',
          reply2: 'Iya betul, kita kumpul jam 05:30 WIB biar gak terlalu panas 👍',
        };
      case 'Yoga':
        return {
          icon: 'yoga',
          agendaTitle: 'Morning Stretch & Meditation Session',
          date: 'Sabtu, 07:00 WIB',
          location: 'Area Rumput Taman Barat',
          buttonText: 'Ikut Yoga (+1)',
          joinedText: 'Sudah Ikut Yoga',
          chat1: 'Selamat pagi teman-teman yoga! 🧘‍♀️ Besok pagi kita latihan mobilitas & relaksasi. Jangan lupa bawa matras masing-masing ya!',
          chat2: 'Kalau belum punya matras sendiri bisa sewa di lokasi gak mas?',
          reply2: 'Bisa kok, ada persediaan matras cadangan terbatas dari instruktur 👍',
        };
      case 'Kekuatan':
        return {
          icon: 'dumbbell',
          agendaTitle: 'Bodyweight & Core Strength Session',
          date: 'Sabtu, 16:30 WIB',
          location: 'Lapangan Olahraga Utama',
          buttonText: 'Ikut Latihan (+1)',
          joinedText: 'Sudah Ikut Latihan',
          chat1: 'Halo tim squad! 🏋️‍♂️ Sore ini kita ada tantangan push-up & core workout. Persiapkan fisik dan tetep hidrasi ya!',
          chat2: 'Untuk pemula gerakan push-up nya boleh knee push-up gak?',
          reply2: 'Boleh banget! Semua opsi gerakan disesuaikan dengan tingkat kemampuan masing-masing 👍',
        };
      default: // Lari
        return {
          icon: 'run',
          agendaTitle: 'Morning Run 5K – Senayan Loop',
          date: 'Sabtu, 06:00 WIB',
          location: 'Gate 5 Plaza Barat',
          buttonText: 'Ikut Lari (+1)',
          joinedText: 'Sudah Ikut Lari',
          chat1: 'Halo teman-teman runners! 🏃‍♂️ Besok Sabtu kita ada jadwal lari pagi santai pace 6:30 - 7:00. Jangan lupa bawa tumbler ya!',
          chat2: 'Bisa nitip tas di gate 5 gak ya mas?',
          reply2: 'Bisa, ada mobil marshal standby dari jam 05:30 👍',
        };
    }
  };

  const groupData = getGroupData();

  const [message, setMessage] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [chatList, setChatList] = useState([
    {
      id: '1',
      sender: 'Dimas (Admin)',
      role: 'HOST',
      text: groupData.chat1,
      time: '06:15',
      type: 'chat',
    },
    {
      id: '2',
      sender: 'Siti Rahma',
      role: '',
      text: groupData.chat2,
      time: '06:20',
      type: 'chat',
    },
    {
      id: '3',
      sender: 'Dimas (Admin)',
      role: 'HOST',
      replyTo: `Siti Rahma: ${groupData.chat2}`,
      text: groupData.reply2,
      time: '06:22',
      type: 'chat',
    },
    {
      id: '4',
      sender: 'Kamu',
      role: '',
      text: 'Siap ikutan! Sampai ketemu besok pagi 🔥',
      time: '06:25',
      type: 'self',
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: 'Kamu',
      role: '',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'self',
    };
    setChatList([...chatList, newMsg]);
    setMessage('');
  };

  const handleJoinRun = () => {
    setIsJoined(!isJoined);
    Alert.alert('Informasi', isJoined ? 'Kamu batal mengikuti agenda.' : `Berhasil bergabung ke agenda ${groupData.agendaTitle}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Feather name="arrow-left" size={20} color="#18181B" />
        </TouchableOpacity>
        
        <View style={styles.headerProfile}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>{avatarInitials}</Text>
          </View>
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.headerTitle} numberOfLines={1}>{groupName}</Text>
            <Text style={styles.headerSub}>{membersCount} anggota • {category}</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <Feather name="search" size={18} color="#18181B" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Feather name="more-vertical" size={18} color="#18181B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages Container */}
      <ScrollView contentContainerStyle={styles.chatScroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.dateBadgeContainer}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateBadgeText}>Hari Ini</Text>
          </View>
        </View>

        {/* System Notification */}
        <View style={styles.sysNotification}>
          <Feather name="user-plus" size={14} color="#059669" style={{ marginRight: 6 }} />
          <Text style={styles.sysText}>Budi Santoso <Text style={{ fontWeight: '400', color: '#71717A' }}>bergabung via tautan undangan</Text></Text>
        </View>

        {/* Chat Item 1: Admin */}
        <View style={styles.chatBubbleOther}>
          <View style={styles.senderRow}>
            <Text style={styles.senderName}>Dimas (Admin)</Text>
            <View style={styles.hostBadge}>
              <Text style={styles.hostText}>HOST</Text>
            </View>
          </View>
          <Text style={styles.chatText}>{groupData.chat1}</Text>
          <Text style={styles.timeText}>06:15</Text>
        </View>

        {/* Agenda Komunitas Card */}
        <View style={styles.agendaCard}>
          <View style={styles.agendaHeaderRow}>
            <View style={styles.agendaIconBox}>
              <MaterialCommunityIcons name={groupData.icon} size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.agendaCategory}>AGENDA KOMUNITAS</Text>
              <Text style={styles.agendaTitle}>{groupData.agendaTitle}</Text>
            </View>
            <View style={styles.publicBadge}>
              <Text style={styles.publicBadgeText}>Publik</Text>
            </View>
          </View>

          <View style={styles.agendaInfoGrid}>
            <View style={styles.agendaInfoItem}>
              <Feather name="calendar" size={14} color="#059669" style={{ marginRight: 6 }} />
              <Text style={styles.agendaInfoText}>{groupData.date}</Text>
            </View>
            <View style={styles.agendaInfoItem}>
              <Feather name="map-pin" size={14} color="#059669" style={{ marginRight: 6 }} />
              <Text style={styles.agendaInfoText}>{groupData.location}</Text>
            </View>
          </View>

          <View style={styles.agendaMembersRow}>
            <View style={styles.memberAvatars}>
              <View style={[styles.miniAvatar, { backgroundColor: '#059669' }]}><Text style={styles.miniText}>AD</Text></View>
              <View style={[styles.miniAvatar, { backgroundColor: '#10B981', marginLeft: -10 }]}><Text style={styles.miniText}>SR</Text></View>
              <View style={[styles.miniAvatar, { backgroundColor: '#3B82F6', marginLeft: -10 }]}><Text style={styles.miniText}>RZ</Text></View>
            </View>
            <Text style={styles.memberCountText}>28 orang bergabung</Text>
          </View>

          <TouchableOpacity 
            style={[styles.joinRunButton, isJoined && styles.joinedRunButton]} 
            activeOpacity={0.8}
            onPress={handleJoinRun}
          >
            <Feather name={isJoined ? "check" : "plus"} size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.joinRunButtonText}>{isJoined ? groupData.joinedText : groupData.buttonText}</Text>
          </TouchableOpacity>
        </View>

        {/* Chat 2 */}
        <View style={styles.chatBubbleOther}>
          <Text style={styles.senderName}>Siti Rahma</Text>
          <Text style={styles.chatText}>{groupData.chat2}</Text>
          <Text style={styles.timeText}>06:20</Text>
        </View>

        {/* Chat 3 (Balasan) */}
        <View style={styles.chatBubbleOther}>
          <View style={styles.senderRow}>
            <Text style={styles.senderName}>Dimas (Admin)</Text>
            <View style={styles.hostBadge}><Text style={styles.hostText}>HOST</Text></View>
          </View>
          <View style={styles.replyBox}>
            <Text style={styles.replyName}>Siti Rahma</Text>
            <Text style={styles.replyText} numberOfLines={1}>{groupData.chat2}</Text>
          </View>
          <Text style={styles.chatText}>{groupData.reply2}</Text>
          <Text style={styles.timeText}>06:22</Text>
        </View>

        {/* Chat Kamu */}
        {chatList.filter(c => c.type === 'self').map((item) => (
          <View key={item.id} style={styles.chatBubbleSelf}>
            <Text style={styles.chatTextSelf}>{item.text}</Text>
            <Text style={styles.timeTextSelf}>{item.time}</Text>
          </View>
        ))}

      </ScrollView>

      {/* Bottom Input Chat Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.attachBtn}>
          <Feather name="plus" size={20} color="#71717A" />
        </TouchableOpacity>
        <TextInput
          style={styles.inputChat}
          value={message}
          onChangeText={setMessage}
          placeholder="Kirim pesan..."
          placeholderTextColor="#A1A1AA"
        />
        <TouchableOpacity style={styles.micBtn} onPress={handleSendMessage}>
          <Feather name={message.trim() ? "send" : "mic"} size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  iconBtn: {
    padding: 4,
    marginRight: 8,
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    color: '#71717A',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    padding: 6,
    marginLeft: 4,
  },
  chatScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  dateBadgeContainer: {
    alignItems: 'center',
    marginBottom: 14,
  },
  dateBadge: {
    backgroundColor: '#E4E4E7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  dateBadgeText: {
    fontSize: 11,
    color: '#3F3F46',
    fontWeight: '600',
  },
  sysNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 14,
    alignSelf: 'center',
  },
  sysText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  chatBubbleOther: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    maxWidth: '85%',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  senderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    marginRight: 6,
  },
  hostBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  hostText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#475569',
  },
  chatText: {
    fontSize: 13,
    color: '#18181B',
    lineHeight: 18,
  },
  timeText: {
    fontSize: 10,
    color: '#A1A1AA',
    textAlign: 'right',
    marginTop: 4,
  },
  chatBubbleSelf: {
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    maxWidth: '85%',
    alignSelf: 'flex-end',
  },
  chatTextSelf: {
    fontSize: 13,
    color: '#18181B',
    lineHeight: 18,
  },
  timeTextSelf: {
    fontSize: 10,
    color: '#047857',
    textAlign: 'right',
    marginTop: 4,
  },
  agendaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E4E4E7',
  },
  agendaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  agendaIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agendaCategory: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  agendaTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  publicBadge: {
    backgroundColor: '#F4F4F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  publicBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#71717A',
  },
  agendaInfoGrid: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  agendaInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  agendaInfoText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
  },
  agendaMembersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberAvatars: {
    flexDirection: 'row',
  },
  miniAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  miniText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  memberCountText: {
    fontSize: 12,
    color: '#71717A',
    marginLeft: 8,
  },
  joinRunButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinedRunButton: {
    backgroundColor: '#3F3F46',
  },
  joinRunButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  replyBox: {
    backgroundColor: '#F4F4F5',
    borderLeftWidth: 3,
    borderLeftColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 6,
  },
  replyName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  replyText: {
    fontSize: 11,
    color: '#71717A',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
  },
  attachBtn: {
    padding: 8,
    marginRight: 4,
  },
  inputChat: {
    flex: 1,
    backgroundColor: '#F4F4F5',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 40,
    fontSize: 13,
    color: '#18181B',
  },
  micBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
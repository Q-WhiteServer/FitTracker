import React, { useState, useEffect } from 'react';
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
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function CommunityScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Komunitas');

  // State daftar grup yang diikuti
  const [groups, setGroups] = useState([
    {
      id: '1',
      title: 'Tambak Sumur Runners',
      category: 'Lari',
      members: '128',
      highlight: '2 aktivitas baru hari ini',
      avatarText: 'TS',
      isAlt: false,
    },
    {
      id: '2',
      title: 'Kuat di Rumah',
      category: 'Kekuatan',
      members: '86',
      highlight: 'Tantangan mingguan sedang berjalan',
      avatarText: 'KR',
      isAlt: true,
    },
    {
      id: '3',
      title: 'Yoga Biar Rileks',
      category: 'Yoga',
      members: '215',
      highlight: 'Sesi meditasi sore ini',
      avatarText: 'YB',
      isAlt: false,
    },
    {
      id: '4',
      title: 'Gowes Santai Surabaya',
      category: 'Bersepeda',
      members: '94',
      highlight: 'Rute akhir pekan siap',
      avatarText: 'GS',
      isAlt: true,
    },
  ]);

  // Menangkap data grup baru dari CreateGroupScreen tanpa duplikasi
  useEffect(() => {
    if (route.params?.newGroup) {
      const { name, category } = route.params.newGroup;

      setGroups((prevGroups) => {
        const exists = prevGroups.some(
          (g) => g.title.toLowerCase() === name.trim().toLowerCase()
        );
        if (exists) return prevGroups;

        const words = name.trim().split(' ');
        let initials = 'GP';
        if (words.length >= 2) {
          initials = (words[0][0] + words[1][0]).toUpperCase();
        } else if (words.length === 1 && words[0].length >= 2) {
          initials = words[0].substring(0, 2).toUpperCase();
        }

        const newGroupObj = {
          id: Date.now().toString(),
          title: name,
          category: category || 'Umum',
          members: '1',
          highlight: 'Grup baru saja dibuat',
          avatarText: initials,
          isAlt: false,
        };

        return [newGroupObj, ...prevGroups];
      });

      navigation.setParams({ newGroup: undefined });
    }
  }, [route.params?.newGroup]);

  // State untuk like pada feed aktivitas
  const [likes, setLikes] = useState({
    faiq: 12,
    era: 8,
    mesy: 6,
  });

  const [likedStatus, setLikedStatus] = useState({
    faiq: false,
    era: false,
    mesy: false,
  });

  const toggleLike = (key) => {
    setLikedStatus((prev) => {
      const isLiked = prev[key];
      setLikes((prevLikes) => ({
        ...prevLikes,
        [key]: isLiked ? prevLikes[key] - 1 : prevLikes[key] + 1,
      }));
      return { ...prev, [key]: !isLiked };
    });
  };

  // State untuk Komentar
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  const [commentsData, setCommentsData] = useState({
    faiq: [
      { id: '1', name: 'Rian Prasetya', avatar: 'RP', text: 'Mantap mas Faiq! Besok gass lagi 🔥', time: '20 menit lalu' },
      { id: '2', name: 'Siti Rahma', avatar: 'SR', text: 'Pace berapa tadi mas?', time: '15 menit lalu' },
      { id: '3', name: 'Faiq Ahmad', avatar: 'FA', text: 'Pace 6:15 mbak Siti 😁', time: '10 menit lalu' },
    ],
    era: [
      { id: '1', name: 'Dimas Kurnia', avatar: 'DK', text: 'Siap hadir sore nanti!', time: '45 menit lalu' },
      { id: '2', name: 'Nadia Putri', avatar: 'NP', text: 'Ada latihan leg day gak mas?', time: '30 menit lalu' },
      { id: '3', name: 'Era Zhafran', avatar: 'RN', text: 'Fokus upper body & core hari ini mbak', time: '20 menit lalu' },
      { id: '4', name: 'Budi Santoso', avatar: 'BS', text: 'Izin gabung ya mas', time: '15 menit lalu' },
      { id: '5', name: 'Era Zhafran', avatar: 'RN', text: 'Monggo mas Budi, ditunggu!', time: '10 menit lalu' },
    ],
    mesy: [
      { id: '1', name: 'Rafifah', avatar: 'RF', text: 'Keren banget Valentina! Konsisten terus 💪', time: 'Yesterday' },
    ],
  });

  const openCommentModal = (feedKey, userName) => {
    setSelectedFeed({ key: feedKey, name: userName });
    setIsCommentModalVisible(true);
  };

  const handleAddComment = () => {
    if (!newCommentText.trim() || !selectedFeed) return;

    const newComment = {
      id: Date.now().toString(),
      name: 'Valentina Mesy',
      avatar: 'VM',
      text: newCommentText,
      time: 'Baru saja',
    };

    setCommentsData((prev) => ({
      ...prev,
      [selectedFeed.key]: [...prev[selectedFeed.key], newComment],
    }));

    setNewCommentText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header Title & Notification Bell */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Komunitas</Text>
            <Text style={styles.subtitle}>Lebih semangat saat bergerak bersama.</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Feather name="bell" size={22} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Online Status Badge */}
        <View style={styles.statusRow}>
          <Feather name="wifi" size={14} color="#059669" style={{ marginRight: 6 }} />
          <Text style={styles.statusText}>Online • Terhubung ke komunitas</Text>
        </View>

        {/* Group Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity 
            style={styles.btnPrimary} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SearchGroup')}
          >
            <Feather name="search" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.btnPrimaryText}>Cari Grup</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnOutline} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CreateGroup')}
          >
            <Feather name="plus" size={16} color="#059669" style={{ marginRight: 6 }} />
            <Text style={styles.btnOutlineText}>Buat Grup</Text>
          </TouchableOpacity>
        </View>

        {/* Section: Grup yang kamu ikuti */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Grup yang kamu ikuti</Text>
          <Text style={styles.groupCountText}>{groups.length} grup</Text>
        </View>

        {/* Render List Grup Dinamis */}
        {groups.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.groupCard} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('GroupChat', { groupName: item.title, category: item.category, members: item.members })}
          >
            <View style={item.isAlt ? styles.groupAvatarAlt : styles.groupAvatar}>
              <Text style={item.isAlt ? styles.groupAvatarTextAlt : styles.groupAvatarText}>
                {item.avatarText}
              </Text>
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupTitle}>{item.title}</Text>
              <Text style={styles.groupSub}>{item.category} • {item.members} anggota</Text>
              <Text style={styles.groupHighlight}>{item.highlight}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#A1A1AA" />
          </TouchableOpacity>
        ))}

        {/* Card Tantangan Kuat di Rumah */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeHeaderRow}>
            <Ionicons name="trophy-outline" size={20} color="#059669" style={{ marginRight: 8 }} />
            <Text style={styles.challengeTitle}>Tantangan Kuat di Rumah</Text>
          </View>
          <Text style={styles.challengeSub}>50 sesi bersama • 12–18 Oktober</Text>
          
          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
          </View>
          
          <Text style={styles.progressText}>32 / 50 sesi selesai</Text>
        </View>

        {/* Section: Aktivitas terbaru */}
        <View style={[styles.sectionHeaderRow, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Aktivitas terbaru</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Semua</Text>
          </TouchableOpacity>
        </View>

        {/* Feed Item 1: Faiq Ahmad */}
        <View style={styles.feedCard}>
          <View style={styles.feedHeaderRow}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>FA</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.userName}>Faiq Ahmad</Text>
            </View>
            <Text style={styles.timeAgo}>30 menit lalu</Text>
          </View>
          <Text style={styles.feedContent}>
            Menyelesaikan lari 5 km bersama Tambak sumur Runners. Pagi yang produktif!
          </Text>
          <View style={styles.feedFooterRow}>
            <TouchableOpacity style={styles.likeBtn} onPress={() => toggleLike('faiq')}>
              <Ionicons 
                name={likedStatus.faiq ? "heart" : "heart-outline"} 
                size={16} 
                color={likedStatus.faiq ? "#EF4444" : "#059669"} 
                style={{ marginRight: 4 }} 
              />
              <Text style={styles.feedFooterText}>{likes.faiq} suka</Text>
            </TouchableOpacity>
            <Text style={styles.dotSeparator}>•</Text>
            <TouchableOpacity onPress={() => openCommentModal('faiq', 'Faiq Ahmad')}>
              <Text style={styles.feedFooterText}>{commentsData.faiq.length} komentar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feed Item 2: Era Zhafran */}
        <View style={styles.feedCard}>
          <View style={styles.feedHeaderRow}>
            <View style={styles.userAvatarAlt}>
              <Text style={styles.userAvatarTextAlt}>RN</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.userName}>Era Zhafran</Text>
            </View>
            <Text style={styles.timeAgo}>1 jam lalu</Text>
          </View>
          <Text style={styles.feedContent}>
            Siapa yang ikut latihan kekuatan sore ini? Sampai ketemu pukul 18.00!
          </Text>
          <View style={styles.feedFooterRow}>
            <TouchableOpacity style={styles.likeBtn} onPress={() => toggleLike('era')}>
              <Ionicons 
                name={likedStatus.era ? "heart" : "heart-outline"} 
                size={16} 
                color={likedStatus.era ? "#EF4444" : "#059669"} 
                style={{ marginRight: 4 }} 
              />
              <Text style={styles.feedFooterText}>{likes.era} suka</Text>
            </TouchableOpacity>
            <Text style={styles.dotSeparator}>•</Text>
            <TouchableOpacity onPress={() => openCommentModal('era', 'Era Zhafran')}>
              <Text style={styles.feedFooterText}>{commentsData.era.length} komentar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feed Item 3: Valentina Mesy - Kamu */}
        <View style={styles.feedCard}>
          <View style={styles.feedHeaderRow}>
            <View style={styles.userAvatarSelf}>
              <Text style={styles.userAvatarTextSelf}>VM</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.userName}>Valentina Mesy • <Text style={{ color: '#71717A', fontWeight: '400' }}>Kamu</Text></Text>
            </View>
            <Text style={styles.timeAgo}>Kemarin</Text>
          </View>
          <Text style={styles.feedContent}>
            Latihan Lengan & Dada selesai. 24 menit lebih dekat ke tujuanku.
          </Text>
          <View style={styles.feedFooterRow}>
            <TouchableOpacity style={styles.likeBtn} onPress={() => toggleLike('mesy')}>
              <Ionicons 
                name={likedStatus.mesy ? "heart" : "heart-outline"} 
                size={16} 
                color={likedStatus.mesy ? "#EF4444" : "#059669"} 
                style={{ marginRight: 4 }} 
              />
              <Text style={styles.feedFooterText}>{likes.mesy} suka</Text>
            </TouchableOpacity>
            <Text style={styles.dotSeparator}>•</Text>
            <TouchableOpacity onPress={() => openCommentModal('mesy', 'Valentina Mesy')}>
              <Text style={styles.feedFooterText}>{commentsData.mesy.length} komentar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Modal Komentar */}
      <Modal
        visible={isCommentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCommentModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            {/* Header Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Komentar {selectedFeed ? `(${selectedFeed.name})` : ''}
              </Text>
              <TouchableOpacity onPress={() => setIsCommentModalVisible(false)}>
                <Feather name="x" size={22} color="#18181B" />
              </TouchableOpacity>
            </View>

            {/* List Komentar */}
            <ScrollView style={styles.commentList} showsVerticalScrollIndicator={false}>
              {selectedFeed &&
                commentsData[selectedFeed.key]?.map((comment) => (
                  <View key={comment.id} style={styles.commentItem}>
                    <View style={styles.commentAvatar}>
                      <Text style={styles.commentAvatarText}>{comment.avatar}</Text>
                    </View>
                    <View style={styles.commentBody}>
                      <View style={styles.commentNameRow}>
                        <Text style={styles.commentName}>{comment.name}</Text>
                        <Text style={styles.commentTime}>{comment.time}</Text>
                      </View>
                      <Text style={styles.commentText}>{comment.text}</Text>
                    </View>
                  </View>
                ))}
            </ScrollView>

            {/* Input Komentar Baru */}
            <View style={styles.commentInputRow}>
              <TextInput
                style={styles.commentInput}
                placeholder="Tulis komentar..."
                placeholderTextColor="#A1A1AA"
                value={newCommentText}
                onChangeText={setNewCommentText}
              />
              <TouchableOpacity
                style={[
                  styles.sendCommentBtn,
                  !newCommentText.trim() && { backgroundColor: '#A1A1AA' },
                ]}
                onPress={handleAddComment}
                disabled={!newCommentText.trim()}
              >
                <Feather name="send" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
          <Feather name="users" size={22} color="#059669" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Komunitas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Report')}>
          <Feather name="bar-chart-2" size={22} color="#71717A" />
          <Text style={styles.navLabel}>Laporan</Text>
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
    marginBottom: 4,
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
  bellBtn: {
    padding: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  btnPrimary: {
    width: '48%',
    backgroundColor: '#059669',
    borderRadius: 12,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  btnOutline: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#059669',
    borderRadius: 12,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  btnOutlineText: {
    color: '#059669',
    fontSize: 14,
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
  groupCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 8,
  },
  groupAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  groupAvatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#059669',
  },
  groupAvatarAlt: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  groupAvatarTextAlt: {
    fontSize: 15,
    fontWeight: '700',
    color: '#059669',
  },
  groupInfo: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  groupSub: {
    fontSize: 12,
    color: '#71717A',
    marginTop: 1,
  },
  groupHighlight: {
    fontSize: 12,
    color: '#059669',
    marginTop: 2,
    fontWeight: '500',
  },
  challengeCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 10,
  },
  challengeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#065F46',
  },
  challengeSub: {
    fontSize: 12,
    color: '#047857',
    marginTop: 4,
    marginBottom: 12,
  },
  progressBg: {
    height: 6,
    backgroundColor: '#E4E4E7',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    width: '64%',
    height: '100%',
    backgroundColor: '#059669',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  feedCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
    paddingVertical: 14,
  },
  feedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  userAvatarAlt: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarTextAlt: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  userAvatarSelf: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarTextSelf: {
    fontSize: 13,
    fontWeight: '700',
    color: '#059669',
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  timeAgo: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  feedContent: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
    marginBottom: 8,
  },
  feedFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedFooterText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  dotSeparator: {
    marginHorizontal: 8,
    color: '#9CA3AF',
    fontSize: 12,
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '75%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
    paddingBottom: 12,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  commentList: {
    maxHeight: 280,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  commentAvatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  commentBody: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 10,
  },
  commentNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  commentName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  commentTime: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  commentText: {
    fontSize: 12,
    color: '#374151',
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F4F4F5',
    paddingTop: 10,
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F4F4F5',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 40,
    fontSize: 13,
    color: '#18181B',
    marginRight: 8,
  },
  sendCommentBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
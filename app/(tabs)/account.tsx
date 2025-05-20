import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Switch, Platform, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';

const SettingsItem = ({ icon, title, subtitle, onPress, right, danger }) => (
  <TouchableOpacity 
    style={[styles.settingsItem, danger && styles.dangerItem]} 
    onPress={onPress}
  >
    <View style={styles.settingsItemLeft}>
      <View style={[styles.iconContainer, danger && styles.dangerIcon]}>
        <MaterialIcons name={icon} size={22} color={danger ? '#DC3545' : colors.primary.brown} />
      </View>
      <View>
        <ThemedText style={[styles.settingsTitle, danger && styles.dangerText]}>{title}</ThemedText>
        {subtitle && <ThemedText style={styles.settingsSubtitle}>{subtitle}</ThemedText>}
      </View>
    </View>
    {right || <MaterialIcons name="chevron-right" size={24} color={colors.text.secondary} />}
  </TouchableOpacity>
);

export default function AccountScreen() {
  const [notifications, setNotifications] = React.useState(true);

  const sections = [
    {
      title: 'Account Settings',
      items: [
        { icon: 'person', title: 'Personal Information', subtitle: 'Update your profile details', onPress: () => router.push('/edit-profile') },
        { icon: 'card-membership', title: 'Subscription', subtitle: 'Premium Plan', onPress: () => router.push('/subscription-plans') },
        { icon: 'payment', title: 'Payment Methods', subtitle: 'Manage your payment options', onPress: () => router.push('/payment-methods') },
      ]
    },
    {
      title: 'App Settings',
      items: [
        { icon: 'notifications', title: 'Notifications', right: <Switch value={notifications} onValueChange={setNotifications} /> },
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        { icon: 'security', title: 'Security Settings', subtitle: 'Protect your account', onPress: () => router.push('/security') },
        { icon: 'lock', title: 'Change Password', onPress: () => router.push('/forgot-password') },
        { icon: 'privacy-tip', title: 'Privacy Policy', onPress: () => router.push('/privacy-policy') },
      ]
    },
    {
      title: 'Help & Support',
      items: [
        { icon: 'help', title: 'Help Center', onPress: () => router.push('/help') },
        { icon: 'support-agent', title: 'Contact Support', onPress: () => router.push('/support') },
        { icon: 'info', title: 'About App', subtitle: 'Version 1.0.0', onPress: () => router.push('/about') },
      ]
    }
  ];

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action will freeze your account for 60 days before permanent deletion. Enter your password to confirm.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          style: 'destructive',
          onPress: () => showPasswordPrompt()
        }
      ]
    );
  };

  const showPasswordPrompt = () => {
    Alert.prompt(
      'Confirm Password',
      'Enter your password to delete account',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: (password) => handleConfirmDelete(password)
        }
      ],
      'secure-text'
    );
  };

  const handleConfirmDelete = (password) => {
    // Here you would validate the password with your API
    Alert.alert(
      'Account Frozen',
      'Your account has been frozen for 60 days. You can recover it within this period if you change your mind. Check your email for more details.',
      [{ text: 'OK', onPress: () => router.push('/login') }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.primary.darkBrown, colors.primary.brown]}
        style={styles.header}
      >
        {/* <View style={styles.coverImageArea}> */}
          <TouchableOpacity style={styles.editCoverButton}>
            <MaterialIcons name="edit" size={20} color="#FFF" />
          </TouchableOpacity>
        {/* </View> */}
        <View style={styles.profileSection}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={() => router.push('/edit-profile')}
          >
            <Image
              source={{ uri: 'https://example.com/placeholder.jpg' }}
              style={styles.avatar}
              defaultSource={require('@/assets/images/placeholder.jpeg')}
            />
            <View style={styles.editAvatarButton}>
              <MaterialIcons name="photo-camera" size={16} color="#FFF" />
            </View>
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <ThemedText style={styles.userName}>John Doe</ThemedText>
            <ThemedText style={styles.userEmail}>johndoe@example.com</ThemedText>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={16} color={colors.services.blue} />
              <ThemedText style={styles.verifiedText}>Verified Account</ThemedText>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200)} style={styles.statsContainer}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Sessions</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>4</ThemedText>
            <ThemedText style={styles.statLabel}>Groups</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>8</ThemedText>
            <ThemedText style={styles.statLabel}>Resources</ThemedText>
          </View>
        </Animated.View>

        {sections.map((section, index) => (
          <Animated.View 
            key={section.title} 
            entering={FadeInDown.delay(300 + (index * 100))} 
            style={styles.section}
          >
            <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
            <View style={styles.sectionContent}>
              {section.items.map((item, i) => (
                <SettingsItem key={i} {...item} />
              ))}
            </View>
          </Animated.View>
        ))}

        <Animated.View entering={FadeInDown.delay(1000)} style={styles.logoutSection}>
          <SettingsItem
            icon="logout"
            title="Log Out"
            danger
            onPress={() => router.push('/login')}
          />
          <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
            <ThemedText style={styles.deleteAccountText}>Delete Account</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    height: 280,
    position: 'relative',
  },
  coverImageArea: {
    height: 160,
    position: 'relative',
  },
  editCoverButton: {
    position: 'absolute',
    right: 16,
    top: 60,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  profileSection: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary.brown,
    padding: 8,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  profileInfo: {
    flex: 1,
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: '#E8F6F3',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 4,
  },
  content: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -30,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary.brown,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 8,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary.brown}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  dangerItem: {
    backgroundColor: '#FFF5F5',
  },
  dangerIcon: {
    backgroundColor: '#FFE5E5',
  },
  dangerText: {
    color: '#DC3545',
  },
  logoutSection: {
    marginBottom: 32,
  },
  deleteAccountButton: {
    alignItems: 'center',
    padding: 16,
  },
  deleteAccountText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
});

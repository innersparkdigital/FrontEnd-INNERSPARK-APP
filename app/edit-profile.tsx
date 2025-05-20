import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+256 123 456 789',
    location: 'Kampala, Uganda',
    bio: 'Working on becoming a better version of myself.',
    avatar: 'https://example.com/placeholder.jpg'
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile(prev => ({ ...prev, avatar: result.assets[0].uri }));
    }
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    Alert.alert(
      'Success',
      'Profile updated successfully',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const InputField = ({ label, value, onChangeText, multiline }) => (
    <View style={styles.inputContainer}>
      <ThemedText style={styles.inputLabel}>{label}</ThemedText>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        placeholderTextColor={colors.text.secondary}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary.darkBrown, colors.primary.brown]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Edit Profile</ThemedText>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <MaterialIcons name="check" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={{ uri: profile.avatar }}
              style={styles.avatar}
              defaultSource={require('@/assets/images/placeholder.jpeg')}
            />
            <View style={styles.editAvatarButton}>
              <MaterialIcons name="photo-camera" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>

        <InputField
          label="Full Name"
          value={profile.name}
          onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
        />

        <InputField
          label="Email"
          value={profile.email}
          onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
        />

        <InputField
          label="Phone Number"
          value={profile.phone}
          onChangeText={(text) => setProfile(prev => ({ ...prev, phone: text }))}
        />

        <InputField
          label="Location"
          value={profile.location}
          onChangeText={(text) => setProfile(prev => ({ ...prev, location: text }))}
        />

        <InputField
          label="Bio"
          value={profile.bio}
          onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
          multiline
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  backButton: {
    padding: 8,
  },
  saveButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.primary.brown,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary.brown,
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.text.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

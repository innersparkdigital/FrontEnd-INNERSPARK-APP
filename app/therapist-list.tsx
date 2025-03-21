import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';

type Icon = keyof typeof MaterialIcons.glyphMap;

interface Therapist {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  available: boolean;
  image: string;
}

const { width } = Dimensions.get('window');

const therapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Anxiety & Depression',
    experience: '15 years',
    rating: 4.9,
    reviews: 127,
    available: true,
    image: 'https://example.com/sarah.jpg'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Relationship Counseling',
    experience: '12 years',
    rating: 4.8,
    reviews: 98,
    available: true,
    image: 'https://example.com/michael.jpg'
  },
  {
    id: '3',
    name: 'Dr. Emily Roberts',
    specialty: 'Trauma & PTSD',
    experience: '10 years',
    rating: 4.7,
    reviews: 156,
    available: false,
    image: 'https://example.com/emily.jpg'
  },
];

export default function TherapistListScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBookAppointment = (therapist: Therapist) => {
    router.push({
      pathname: '/book-appointment',
      params: { therapist: JSON.stringify(therapist) }
    });
  };

  const renderTherapistCard = ({ item, index }: { item: Therapist; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 200).springify()}
      style={styles.therapistCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="person" size={32} color={colors.primary.brown} />
        </View>
        <View style={styles.headerInfo}>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
          <ThemedText style={styles.specialty}>{item.specialty}</ThemedText>
        </View>
        {item.available && (
          <View style={styles.availabilityBadge}>
            <ThemedText style={styles.availabilityText}>Available</ThemedText>
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <MaterialIcons name="schedule" size={16} color={colors.text.secondary} />
          <ThemedText style={styles.infoText}>{item.experience} experience</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="star" size={16} color={colors.services.orange} />
          <ThemedText style={styles.infoText}>{item.rating} ({item.reviews} reviews)</ThemedText>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={() => router.push('/support-group')}
        >
          <MaterialIcons name="chat" size={20} color={colors.primary.brown} />
          <ThemedText style={styles.messageButtonText}>Message</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => handleBookAppointment(item)}
        >
          <ThemedText style={styles.bookButtonText}>Book Session</ThemedText>
        </TouchableOpacity>
      </View>
    </Animated.View>
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
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Find Your Therapist</ThemedText>
        </View>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or specialty..."
            placeholderTextColor={colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </LinearGradient>

      <FlatList
        data={therapists}
        renderItem={renderTherapistCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text.primary,
  },
  list: {
    padding: 20,
  },
  therapistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${colors.primary.brown}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  specialty: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
  },
  availabilityBadge: {
    backgroundColor: `${colors.services.green}20`,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  availabilityText: {
    color: colors.services.green,
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.text.secondary,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary.brown}15`,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  messageButtonText: {
    marginLeft: 5,
    color: colors.primary.brown,
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: colors.primary.brown,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
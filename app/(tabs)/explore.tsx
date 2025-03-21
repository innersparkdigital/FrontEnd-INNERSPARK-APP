import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import colors from '@/constants/colors.json';

export default function ExploreScreen() {
  const categories = [
    { 
      title: 'Mental Wellness',
      icon: 'psychology',
      color: colors.services.blue,
      items: ['Anxiety', 'Depression', 'Stress Management']
    },
    { 
      title: 'Relationship',
      icon: 'people',
      color: colors.services.green,
      items: ['Marriage', 'Family', 'Dating']
    },
    { 
      title: 'Personal Growth',
      icon: 'self-improvement',
      color: colors.services.orange,
      items: ['Career', 'Self-esteem', 'Life Goals']
    },
  ];

  const featuredTherapists = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Clinical Psychologist',
      rating: 4.9,
      image: require('@/assets/images/placeholder.jpeg'),
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Family Therapist',
      rating: 4.8,
      image: require('@/assets/images/placeholder.jpeg'),
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.primary.brown, colors.primary.cream]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Explore Services</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Find the support you need</ThemedText>
      </LinearGradient>

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200)}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color={colors.text.secondary} />
            <ThemedText style={styles.searchPlaceholder}>Search therapists, services...</ThemedText>
          </View>
        </Animated.View>

        <View style={styles.categoriesSection}>
          <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
          {categories.map((category, index) => (
            <Animated.View 
              key={category.title}
              entering={FadeInRight.delay(300 + (index * 100))}
            >
              <TouchableOpacity>
                <LinearGradient
                  colors={[`${category.color}15`, `${category.color}30`]}
                  style={styles.categoryCard}
                >
                  <MaterialIcons name={category.icon} size={32} color={category.color} />
                  <View style={styles.categoryContent}>
                    <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
                    <View style={styles.tagContainer}>
                      {category.items.map((item, i) => (
                        <View key={i} style={[styles.tag, { backgroundColor: `${category.color}20` }]}>
                          <ThemedText style={[styles.tagText, { color: category.color }]}>{item}</ThemedText>
                        </View>
                      ))}
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color={category.color} />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <View style={styles.featuredSection}>
          <ThemedText style={styles.sectionTitle}>Featured Therapists</ThemedText>
          {featuredTherapists.map((therapist, index) => (
            <Animated.View 
              key={therapist.name}
              entering={FadeInDown.delay(600 + (index * 100))}
            >
              <TouchableOpacity>
                <LinearGradient
                  colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.95)']}
                  style={styles.therapistCard}
                >
                  <Image source={therapist.image} style={styles.therapistImage} />
                  <View style={styles.therapistInfo}>
                    <ThemedText style={styles.therapistName}>{therapist.name}</ThemedText>
                    <ThemedText style={styles.therapistSpecialty}>{therapist.specialty}</ThemedText>
                    <View style={styles.ratingContainer}>
                      <MaterialIcons name="star" size={16} color={colors.services.orange} />
                      <ThemedText style={styles.rating}>{therapist.rating}</ThemedText>
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color={colors.text.secondary} />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F6F3',
    marginTop: 8,
  },
  content: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: -30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: colors.text.secondary,
    fontSize: 16,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text.primary,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryContent: {
    flex: 1,
    marginLeft: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text.primary,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  featuredSection: {
    marginBottom: 24,
  },
  therapistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  therapistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E1E1E1',
  },
  therapistInfo: {
    flex: 1,
    marginLeft: 16,
  },
  therapistName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  therapistSpecialty: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
  },
});

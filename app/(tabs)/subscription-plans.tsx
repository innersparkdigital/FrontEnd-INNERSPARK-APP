import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '@/constants/colors.json';

export default function SubscriptionPlansScreen() {
  const [selectedPlan, setSelectedPlan] = useState('Premium');

  const subscriptionPlans = {
    Basic: { 
      price: '150,000 UGX',
      description: 'Virtual Counseling & Support Groups',
      features: ['Virtual counseling sessions', 'Access to support groups', 'Chat support'],
      color: colors.services.blue
    },
    Standard: { 
      price: '400,000 UGX',
      description: 'Physical Counseling & Support Groups',
      features: ['All Basic features', 'In-person counseling', 'Priority chat support', 'Wellness resources'],
      color: colors.services.green
    },
    Premium: { 
      price: '600,000 UGX',
      description: 'All services + Priority Scheduling',
      features: ['All Standard features', 'Priority scheduling', '24/7 emergency support', 'Personalized wellness plan'],
      color: colors.services.orange
    },
  };

  const handleSubscriptionChange = (plan) => {
    setSelectedPlan(plan);
    Alert.alert('Subscription Updated', `You have selected the ${plan} plan for ${subscriptionPlans[plan].price}.`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[colors.primary.brown, colors.primary.cream]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <ThemedText style={styles.headerTitle}>Subscription Plans</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Choose the plan that fits your needs</ThemedText>
      </LinearGradient>

      <View style={styles.content}>
        {Object.entries(subscriptionPlans).map(([plan, details], index) => (
          <Animated.View 
            key={plan}
            entering={FadeInDown.delay(200 + (index * 100))}
          >
            <TouchableOpacity
              style={[
                styles.planCard,
                selectedPlan === plan && styles.selectedPlan,
              ]}
              onPress={() => handleSubscriptionChange(plan)}
            >
              <LinearGradient
                colors={[`${details.color}15`, `${details.color}30`]}
                style={styles.planGradient}
              >
                <View style={styles.planHeader}>
                  <View>
                    <ThemedText style={styles.planName}>{plan}</ThemedText>
                    <ThemedText style={[styles.planPrice, { color: details.color }]}>
                      {details.price}
                    </ThemedText>
                  </View>
                  {selectedPlan === plan && (
                    <MaterialIcons name="check-circle" size={24} color={details.color} />
                  )}
                </View>
                <ThemedText style={styles.planDescription}>{details.description}</ThemedText>
                <View style={styles.featuresContainer}>
                  {details.features.map((feature, i) => (
                    <View key={i} style={styles.featureItem}>
                      <MaterialIcons name="check" size={18} color={details.color} />
                      <ThemedText style={styles.featureText}>{feature}</ThemedText>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <TouchableOpacity style={styles.confirmButton}>
          <ThemedText style={styles.confirmButtonText}>Confirm Selection</ThemedText>
        </TouchableOpacity>
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8F6F3',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    padding: 20,
  },
  planCard: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  selectedPlan: {
    borderWidth: 2,
    borderColor: colors.primary.brown,
  },
  planGradient: {
    padding: 20,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  planDescription: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 12,
    marginBottom: 16,
  },
  featuresContainer: {
    marginTop: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.text.secondary,
  },
  confirmButton: {
    backgroundColor: colors.primary.brown,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

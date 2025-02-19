import { StyleSheet, View, TouchableOpacity, ScrollView, Alert, Animated } from 'react-native';
import { useState, useRef } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AccountScreen() {
  const [selectedPlan, setSelectedPlan] = useState('Premium');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const subscriptionPlans = {
    Basic: { price: '150,000 UGX', description: 'Virtual Counseling & Support Groups' },
    Standard: { price: '400,000 UGX', description: 'Physical Counseling & Support Groups' },
    Premium: { price: '600,000 UGX', description: 'All services + Priority Scheduling' },
  };

  const handleSubscriptionChange = (plan) => {
    setSelectedPlan(plan);
    Alert.alert('Subscription Updated', `You have selected the ${plan} plan for ${subscriptionPlans[plan].price}.`);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <IconSymbol
          size={100}
          color="#fff"
          name="person-circle-outline"
          style={styles.profileIcon}
        />
        <ThemedText style={styles.userName}>John Doe</ThemedText>
        <ThemedText style={styles.userEmail}>johndoe@example.com</ThemedText>
      </View>

      {/* Account Details Section */}
      <ThemedView style={styles.detailsContainer}>
        <ThemedText style={styles.sectionTitle}>Account Details</ThemedText>
        <View style={styles.detailItem}>
          <ThemedText style={styles.detailLabel}>Subscription Plan:</ThemedText>
          <Animated.View style={{ opacity: fadeAnim }}>
            <ThemedText style={styles.detailValue}>{selectedPlan}</ThemedText>
          </Animated.View>
        </View>
        <View style={styles.detailItem}>
          <ThemedText style={styles.detailLabel}>Membership Status:</ThemedText>
          <ThemedText style={styles.detailValue}>Active</ThemedText>
        </View>
        <View style={styles.detailItem}>
          <ThemedText style={styles.detailLabel}>Joined:</ThemedText>
          <ThemedText style={styles.detailValue}>March 1, 2023</ThemedText>
        </View>
      </ThemedView>

      {/* Subscription Plans */}
      <ThemedView style={styles.detailsContainer}>
        <ThemedText style={styles.sectionTitle}>Choose Subscription Plan</ThemedText>
        {Object.keys(subscriptionPlans).map((plan) => (
          <TouchableOpacity
            key={plan}
            style={[styles.planButton, selectedPlan === plan && styles.selectedPlan]}
            onPress={() => handleSubscriptionChange(plan)}
          >
            <ThemedText style={styles.planText}>{plan} - {subscriptionPlans[plan].price}</ThemedText>
            <ThemedText style={styles.planDescription}>{subscriptionPlans[plan].description}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText style={styles.actionButtonText}>Edit Profile</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText style={styles.actionButtonText}>Change Password</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <ThemedText style={styles.actionButtonText}>Manage Subscription</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <ThemedText style={styles.logoutButtonText}>Log Out</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  headerContainer: {
    backgroundColor: '#5A9',
    alignItems: 'center',
    paddingVertical: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  profileIcon: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 16,
    color: '#E8F6F3',
    marginTop: 5,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2C3E50',
    textAlign: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  planButton: {
    backgroundColor: '#EAEDED',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedPlan: {
    backgroundColor: '#5A9',
  },
  planText: {
    fontSize: 16,
    fontWeight: '600',
  },
  planDescription: {
    fontSize: 14,
    color: '#555',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: '#5A9',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#C00',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    margin: 40,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

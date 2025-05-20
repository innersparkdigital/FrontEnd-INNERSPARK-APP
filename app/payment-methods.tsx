import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Alert, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';

const PaymentMethodCard = ({ method, onDelete }) => (
  <Animated.View entering={FadeInDown} style={styles.methodCard}>
    <View style={styles.methodInfo}>
      <Image 
        source={method.provider === 'MTN Mobile Money' 
          ? require('@/assets/images/mtn.jpg')
          : require('@/assets/images/airtel.jpg')
        }
        style={styles.mobileMoneyIcon}
        resizeMode="contain"
      />
      <View style={styles.methodDetails}>
        <ThemedText style={styles.methodTitle}>
          {method.phoneNumber}
        </ThemedText>
        <ThemedText style={styles.methodSubtitle}>
          {method.provider}
        </ThemedText>
      </View>
      <View style={styles.methodActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push({
            pathname: '/add-payment-method',
            params: { edit: true, ...method }
          })}
        >
          <MaterialIcons name="edit" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(method.id)}
        >
          <MaterialIcons name="delete" size={20} color={colors.services.red} />
        </TouchableOpacity>
      </View>
    </View>
  </Animated.View>
);

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState([
    { 
      id: '1', 
      type: 'mobile', 
      phoneNumber: '+256 789 012 345',
      provider: 'MTN Mobile Money',
      isDefault: true 
    },
    { 
      id: '2', 
      type: 'mobile', 
      phoneNumber: '+256 753 951 357',
      provider: 'Airtel Money',
      isDefault: false 
    }
  ]);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setPaymentMethods(prev => prev.filter(method => method.id !== id))
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBarPadding} />
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
          <ThemedText style={styles.headerTitle}>Payment Methods</ThemedText>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/add-payment-method')}
          >
            <MaterialIcons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {paymentMethods.map((method, index) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            onDelete={handleDelete}
          />
        ))}

        <TouchableOpacity 
          style={styles.addMethodButton}
          onPress={() => router.push('/add-payment-method')}
        >
          <MaterialIcons name="add-circle-outline" size={24} color={colors.primary.brown} />
          <ThemedText style={styles.addMethodText}>Add New Payment Method</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  statusBarPadding: {
    height: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
    backgroundColor: colors.primary.darkBrown,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.primary.darkBrown,
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
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  methodCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  methodIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  methodSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  methodActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#FFF5F5',
    borderRadius: 20,
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: `${colors.primary.brown}15`,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  addMethodText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.primary.brown,
    fontWeight: '600',
  },
  mobileMoneyIcon: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  methodDetails: {
    flex: 1,
  },
});

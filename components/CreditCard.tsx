import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

interface CreditCardProps {
  type?: 'visa' | 'mastercard';
  last4: string;
  expiry: string;
  name: string;
  variant?: 'gold' | 'platinum' | 'standard';
}

export default function CreditCard({ 
  type = 'visa', 
  last4, 
  expiry, 
  name,
  variant = 'standard' 
}: CreditCardProps) {
  const gradients = {
    gold: ['#BF953F', '#FCF6BA', '#B38728', '#FBF5B7'],
    platinum: ['#8E9298', '#DBDDDF', '#8E9298', '#DBDDDF'],
    standard: type === 'visa' ? ['#1A1F71', '#2557D6'] : ['#EB001B', '#F79E1B']
  };

  const renderLogo = () => {
    if (type === 'visa') {
      return (
        <View style={styles.visaLogo}>
          <ThemedText style={styles.visaText}>VISA</ThemedText>
        </View>
      );
    }
    return (
      <View style={styles.mastercardLogo}>
        <View style={[styles.mastercardCircle, { backgroundColor: '#EB001B' }]} />
        <View style={[styles.mastercardCircle, { backgroundColor: '#F79E1B', marginLeft: -15 }]} />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={gradients[variant]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* EMV Chip */}
      <View style={styles.chipContainer}>
        <View style={styles.chip}>
          <View style={styles.chipLines}>
            {[...Array(4)].map((_, i) => (
              <View key={i} style={styles.chipLine} />
            ))}
          </View>
          <View style={styles.chipSquare} />
        </View>
        {renderLogo()}
      </View>

      {/* Card Number */}
      <View style={styles.numberContainer}>
        <ThemedText style={styles.cardNumber}>
          •••• •••• •••• {last4}
        </ThemedText>
        {variant === 'gold' && (
          <MaterialIcons name="verified" size={24} color="#FFD700" />
        )}
      </View>

      {/* Card Details */}
      <View style={styles.cardDetails}>
        <View style={styles.detailColumn}>
          <ThemedText style={styles.label}>Card Holder</ThemedText>
          <ThemedText style={styles.value}>{name}</ThemedText>
        </View>
        <View style={styles.detailColumn}>
          <ThemedText style={styles.label}>Expires</ThemedText>
          <ThemedText style={styles.value}>{expiry}</ThemedText>
        </View>
      </View>

      {/* Background Pattern */}
      <View style={styles.pattern}>
        {[...Array(3)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.circle,
              { 
                opacity: 0.1 + (i * 0.05),
                transform: [{ scale: 2 - (i * 0.5) }]
              }
            ]}
          />
        ))}
      </View>

      {/* Hologram Effect */}
      {variant !== 'standard' && (
        <LinearGradient
          colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hologram}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 1.586,
    borderRadius: 16,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  chip: {
    width: 45,
    height: 35,
    backgroundColor: '#FFD700',
    borderRadius: 6,
    padding: 4,
    justifyContent: 'space-between',
  },
  chipLines: {
    flex: 1,
    justifyContent: 'space-around',
  },
  chipLine: {
    height: 2,
    backgroundColor: '#DAA520',
    marginVertical: 1,
  },
  chipSquare: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: 12,
    height: 12,
    backgroundColor: '#DAA520',
    borderRadius: 2,
  },
  visaLogo: {
    padding: 4,
  },
  visaText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    fontStyle: 'italic',
    letterSpacing: -1,
  },
  mastercardLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mastercardCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    opacity: 0.9,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  cardNumber: {
    fontSize: 24,
    color: '#FFF',
    letterSpacing: 2,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailColumn: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 16,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
  },
  circle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FFF',
    top: -150,
    right: -150,
  },
  hologram: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    transform: [{ rotate: '45deg' }],
  },
});

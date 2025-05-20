import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Alert, Platform, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import colors from '@/constants/colors.json';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Goal = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

export default function WeeklyGoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (!newGoal.trim()) {
      Alert.alert('Error', 'Please enter a goal');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      text: newGoal.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal('');
  };

  const toggleGoal = (id: string) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (id: string) => {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setGoals(prev => prev.filter(goal => goal.id !== id));
          },
        },
      ]
    );
  };

  const getProgress = () => {
    if (goals.length === 0) return 0;
    return (goals.filter(goal => goal.completed).length / goals.length) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Weekly Goals</ThemedText>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${getProgress()}%` }]} />
            <ThemedText style={styles.progressText}>
              {Math.round(getProgress())}% Complete
            </ThemedText>
          </View>
        </View>

        <View style={styles.addSection}>
          <TextInput
            style={styles.input}
            value={newGoal}
            onChangeText={setNewGoal}
            placeholder="Add a new goal..."
            placeholderTextColor={colors.text.secondary}
          />
          <TouchableOpacity style={styles.addButton} onPress={addGoal}>
            <MaterialIcons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.goalsList}>
          {goals.map((goal, index) => (
            <Animated.View
              key={goal.id}
              entering={FadeInDown.delay(index * 100)}
              style={styles.goalItem}
            >
              <TouchableOpacity
                style={styles.goalCheckbox}
                onPress={() => toggleGoal(goal.id)}
              >
                <MaterialIcons
                  name={goal.completed ? 'check-circle' : 'radio-button-unchecked'}
                  size={24}
                  color={goal.completed ? colors.primary.brown : colors.text.secondary}
                />
              </TouchableOpacity>
              <View style={styles.goalTextContainer}>
                <ThemedText style={[
                  styles.goalText,
                  goal.completed && styles.completedGoalText
                ]}>
                  {goal.text}
                </ThemedText>
                <ThemedText style={styles.goalDate}>
                  {new Date(goal.createdAt).toLocaleDateString()}
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteGoal(goal.id)}
              >
                <MaterialIcons name="delete-outline" size={24} color={colors.services.red} />
              </TouchableOpacity>
            </Animated.View>
          ))}
          
          {goals.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialIcons name="flag" size={48} color={colors.text.secondary} />
              <ThemedText style={styles.emptyStateText}>
                Add your first goal for this week
              </ThemedText>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressContainer: {
    height: 8,
    backgroundColor: `${colors.primary.brown}20`,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary.brown,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'right',
  },
  addSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    fontSize: 16,
    color: colors.text.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary.brown,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalsList: {
    flex: 1,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  goalCheckbox: {
    marginRight: 12,
  },
  goalTextContainer: {
    flex: 1,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 4,
  },
  completedGoalText: {
    textDecorationLine: 'line-through',
    color: colors.text.secondary,
  },
  goalDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

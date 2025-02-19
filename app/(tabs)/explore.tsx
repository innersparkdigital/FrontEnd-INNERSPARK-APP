import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const blogs = [
  {
    id: 1,
    title: 'Mental Wellness in the Workplace',
    description: 'Explore the importance of mental health and strategies to maintain balance at work.',
  },
  {
    id: 2,
    title: 'The Benefits of Virtual Counseling',
    description: 'How virtual counseling is transforming mental health support.',
  },
];

const ads = [
  {
    id: 1,
    title: 'Exclusive Offer!',
    description: 'Get 20% off your first month of Premium subscription!',
  },
];

export default function BlogsAdsScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.sectionContainer}>
        <ThemedText style={styles.sectionTitle}>Latest Blogs</ThemedText>
        {blogs.map((blog) => (
          <TouchableOpacity key={blog.id} style={styles.blogCard}>
            <ThemedText style={styles.blogTitle}>{blog.title}</ThemedText>
            <ThemedText style={styles.blogDescription}>{blog.description}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText style={styles.sectionTitle}>Advertisements</ThemedText>
        {ads.map((ad) => (
          <TouchableOpacity key={ad.id} style={styles.adCard}>
            <ThemedText style={styles.adTitle}>{ad.title}</ThemedText>
            <ThemedText style={styles.adDescription}>{ad.description}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#B0B0B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2C3E50',
  },
  blogCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#FFD580',
    borderRadius: 10,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  blogDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  adCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#FFD580',
    borderRadius: 10,
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  adDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

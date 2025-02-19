import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Reusable Button Component
const ServiceButton = ({ title, onPress, iconName }) => (
  <TouchableOpacity style={styles.serviceButton} onPress={onPress}>
    <Ionicons name={iconName} size={24} color="#6A983C" style={styles.icon} />
    <Text style={styles.serviceButtonText}>{title}</Text>
  </TouchableOpacity>
);

// Reusable Service Card Component
const ServiceCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
    <Text style={styles.serviceText}>{title}</Text>
  </TouchableOpacity>
);

// Home Screen
const HomeScreen = ({ navigation }) => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6A983C" />
      <LinearGradient colors={["#404F69", "#404F69"]} style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}> INNERSPARK</Text>
          <Text style={styles.headerSubtitle}>YOUR RECOVERY PATH</Text>
        </View>

        {/* Wallet Section */}
        <View style={styles.walletSection}>
          <Text style={styles.walletText}>My Wallet</Text>
          <View style={styles.balanceContainer}>
            {showBalance ? (
              <Text style={styles.walletBalance}>UGX 120,000</Text>
            ) : (
              <Text style={styles.walletBalance}>****</Text>
            )}
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Ionicons
                name={showBalance ? "eye-off" : "eye"}
                size={24}
                color="#6A983C"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Section */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.sectionTitle}>Explore Our Services</Text>
          <View style={styles.servicesContainer}>
            <ServiceButton
              title="Therapists"
              onPress={() => navigation.navigate("Therapists")}
              iconName="person-circle-outline"
            />
            <ServiceButton
              title="Support Groups"
              onPress={() => navigation.navigate("SupportGroups")}
              iconName="people-outline"
            />
            <ServiceButton
              title="Feedback"
              onPress={() => navigation.navigate("Feedback")}
              iconName="chatbubble-ellipses-outline"
            />
            <ServiceButton
              title="Book a Session"
              onPress={() => navigation.navigate("BookSession")}
              iconName="calendar-outline"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

// Therapists Screen
const TherapistsScreen = ({ navigation }) => {
  const therapists = [
    { name: "Dr. Sarah Johnson", expertise: "Clinical Psychology", price: "UGX 100,000" },
    { name: "Mr. James Smith", expertise: "Cognitive Behavioral Therapy", price: "UGX 80,000" },
    { name: "Ms. Emily Davis", expertise: "Child Therapy", price: "UGX 90,000" },
    { name: "Dr. Michael Brown", expertise: "Marriage Counseling", price: "UGX 110,000" },
  ];

  const handlePayment = (therapist) => {
    navigation.navigate("Payment", { therapist });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.sectionTitle}>Meet Our Therapists</Text>
      {therapists.map((therapist, index) => (
        <View key={index} style={styles.therapistCard}>
          <Text style={styles.therapistName}>{therapist.name}</Text>
          <Text style={styles.therapistExpertise}>{therapist.expertise}</Text>
          <Text style={styles.therapistPrice}>{therapist.price}</Text>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => handlePayment(therapist)}
          >
            <Text style={styles.paymentButtonText}>Book & Pay</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

// Payment Screen

// Payment Screen
const PaymentScreen = ({ route, navigation }) => {
  const { therapist } = route.params;

  const handlePayment = (method) => {
    Alert.alert("Payment Successful", `You have paid ${therapist.price} via ${method}.`);
    navigation.navigate("BookSession", {
      therapistName: therapist.name,
      therapistPrice: therapist.price,
      isPaid: true,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.sectionTitle}>Payment</Text>
      <Text style={styles.therapistName}>Therapist: {therapist.name}</Text>
      <Text style={styles.therapistPrice}>Amount: {therapist.price}</Text>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => handlePayment("MTN Mobile Money")}
      >
        <Text style={styles.paymentButtonText}>Pay with MTN Mobile Money</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => handlePayment("Airtel Mobile Money")}
      >
        <Text style={styles.paymentButtonText}>Pay with Airtel Mobile Money</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Book Session Screen
import DateTimePicker from '@react-native-community/datetimepicker';
const BookSessionScreen = ({ route, navigation }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const therapistName = route.params?.therapistName || "";
  const therapistPrice = route.params?.therapistPrice || "";
  const isPaid = route.params?.isPaid || false;

  const handleBooking = () => {
    if (!date || !time) {
      Alert.alert("Missing Information", "Please select the date and time for your session.");
      return;
    }

    Alert.alert(
      "Booking Confirmed",
      `Your session with ${therapistName} is scheduled for ${date} at ${time}.`
    );
    setDate("");
    setTime("");
    navigation.navigate("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.sectionTitle}>Book a Session</Text>

      <View style={styles.therapistDetails}>
        <Text style={styles.therapistName}>Therapist: {therapistName}</Text>
        <Text style={styles.therapistPrice}>Price: {therapistPrice}</Text>
      </View>

      {isPaid ? (
        <>
          <Text style={styles.sectionSubtitle}>Schedule Your Session</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              placeholder="Select Date"
              value={date}
              editable={false}
              style={styles.input}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                setDate(selectedDate.toISOString().split("T")[0]);
              }}
            />
          )}

          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <TextInput
              placeholder="Select Time"
              value={time}
              editable={false}
              style={styles.input}
            />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                setTime(
                  selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                );
              }}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.paymentPrompt}>
          Please complete payment before scheduling your session.
        </Text>
      )}
    </ScrollView>
  );
};

// Support Groups Screen
const SupportGroupsScreen = ({ navigation }) => {
  const supportGroups = [
    {
      name: "Depression Support Group",
      description:
        "A safe space for individuals dealing with depression to share experiences and get support.",
      meetingTime: "Every Tuesday, 7 PM - 8:30 PM",
    },
    {
      name: "Anxiety Support Group",
      description:
        "A community to help manage anxiety through shared stories and guided practices.",
      meetingTime: "Every Thursday, 6 PM - 7:30 PM",
    },
    {
      name: "Grief Support Group",
      description:
        "Providing comfort and understanding for those navigating through loss.",
      meetingTime: "Every Saturday, 10 AM - 11:30 AM",
    },
    {
      name: "Addiction Recovery Group",
      description:
        "Support for individuals overcoming addiction with a focus on long-term recovery.",
      meetingTime: "Every Monday, 8 PM - 9:30 PM",
    },
  ];

  const handleJoinGroup = (group) => {
    Alert.alert(
      "Join Group",
      `You have successfully joined the "${group.name}". The next meeting is ${group.meetingTime}.`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.sectionTitle}>Support Groups</Text>
      {supportGroups.map((group, index) => (
        <View key={index} style={styles.supportGroupCard}>
          <Text style={styles.groupName}>{group.name}</Text>
          <Text style={styles.groupDescription}>{group.description}</Text>
          <Text style={styles.groupMeetingTime}>{group.meetingTime}</Text>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => handleJoinGroup(group)}
          >
            <Text style={styles.joinButtonText}>Join Group</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};


// Feedback Screen
const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback) {
      Alert.alert("Error", "Feedback cannot be empty.");
      return;
    }
    Alert.alert("Thank You", "Your feedback has been submitted!");
    setFeedback("");
  };
 
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.sectionTitle}>Share Your Feedback</Text>
      <TextInput
        placeholder="Write your feedback here..."
        placeholderTextColor="#777"
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Therapists" component={TherapistsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="BookSession" component={BookSessionScreen} />
        <Stack.Screen name="SupportGroups" component={SupportGroupsScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  headerSection: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#FFD580",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  supportGroupCard: {
    backgroundColor: "#FFD580",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignSelf: "center",
  },
  groupName: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 5 },
  groupDescription: { fontSize: 16, color: "#555", marginBottom: 10 },
  groupMeetingTime: { fontSize: 14, color: "#6A983C", marginBottom: 10 },
  joinButton: {
    backgroundColor: "#6A983C",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
  },
  joinButtonText: { color: "#FFF", fontWeight: "bold", textAlign: "center" },
  
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#6A983C" },
  headerSubtitle: { fontSize: 16, color: "#777", marginTop: 5 },
  walletSection: {
    margin: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  walletText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  balanceContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  walletBalance: { fontSize: 22, fontWeight: "bold", color: "#6A983C", marginRight: 10 },
  scrollView: { paddingHorizontal: 20, paddingVertical: 10 },
  sectionTitle: { fontSize: 24, fontWeight: "bold", color: "grey", textAlign: "center", marginBottom: 20 },
  servicesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  serviceButton: {
    backgroundColor: "#FFD580",
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  serviceButtonText: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 5, textAlign: "center" },
  icon: { marginBottom: 5 },
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
  screenText: { fontSize: 20, color: "#6A983C" },
  serviceCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD580",
    borderRadius: 10,
    width: "48%",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  serviceText: { fontSize: 16, fontWeight: "bold", color: "#333", textAlign: "center" },
  input: {
    width: "90%",
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginVertical: 10,
    alignSelf: "center",
  },
  button: { backgroundColor: "#6A983C", padding: 15, borderRadius: 5, alignItems: "center", marginVertical: 10 },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  therapistCard: {
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    alignSelf: "center",
  },
  therapistDetails: {
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  paymentPrompt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A983C",
    textAlign: "center",
    marginVertical: 10,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
  
  therapistName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  therapistExpertise: { fontSize: 16, color: "lightgrey", marginTop: 5 },
  therapistPrice: { fontSize: 16, color: "black", marginTop: 5 },
  paymentButton: {
    backgroundColor: "#A4C639",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  paymentButtonText: { color: "#FFF", fontWeight: "bold", textAlign: "center" },
});


// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// IncidentForm Component
const IncidentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log('Incident reported:', { title, description });
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Incident Title"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <Button title="Report Incident" onPress={handleSubmit} />
    </View>
  );
};

// IncidentDetail Component
const IncidentDetail = ({ incident }) => {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>{incident.title}</Text>
      <Text style={styles.detailDescription}>{incident.description}</Text>
    </View>
  );
};

// IncidentList Component
const incidentsData = [
  { id: 1, title: 'Power Outage', description: 'There is a power outage in the building.' },
  { id: 2, title: 'Water Leak', description: 'Water leak detected in the basement.' },
];

const IncidentList = () => {
  const [incidents, setIncidents] = useState(incidentsData);
  const [loading, setLoading] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handlePress = (incident) => {
    setSelectedIncident(incident);
  };

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Reported Incidents</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        incidents.map((incident) => (
          <TouchableOpacity key={incident.id} onPress={() => handlePress(incident)}>
            <View style={styles.incidentBox}>
              <Text style={styles.incidentTitle}>{incident.title}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
      {selectedIncident && <IncidentDetail incident={selectedIncident} />}
    </View>
  );
};

// Main App Component
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Incident Management</Text>
        <IncidentForm />
        <IncidentList />
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20, // Avoid overlap with the status bar
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  listContainer: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  incidentBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  incidentTitle: {
    fontSize: 16,
  },
  detailContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailDescription: {
    marginTop: 10,
    fontSize: 16,
  },
});
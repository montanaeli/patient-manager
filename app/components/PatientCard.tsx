import React, { useState } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native"
import { Patient } from "../types/patient"
import { useAvatar } from "../hooks/useAvatar"

interface PatientCardProps {
  patient: Patient
  onEdit: (patient: Patient) => void
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onEdit,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [animation] = useState(new Animated.Value(0))
  

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
    }).start()
    setExpanded(!expanded)
  }

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 500],
  })

  const patientAvatar = useAvatar({name: patient.name, avatar: patient.avatar});

  return (
    <Animated.View style={[styles.card, { maxHeight }]}>
      <View style={styles.header}>
        <Image
          source={{
            uri: patientAvatar,
          }}
          style={styles.avatar}
          onError={() => {
            setImageError(true)
          }}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{patient.name}</Text>
          <Text style={styles.website}>{patient.website}</Text>
        </View>
        <TouchableOpacity
          onPress={() => onEdit(patient)}
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
        <Text>{expanded ? "Show Less" : "Show More"}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.details}>
          <Text style={styles.description}>{patient.description}</Text>
          <Text style={styles.date}>
            Created: {new Date(patient.createdAt).toLocaleDateString()}
          </Text>
        </View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  website: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    backgroundColor: "#2c369b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  expandButton: {
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 4,
  },
  details: {
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
})

export default PatientCard;
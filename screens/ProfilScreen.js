// screens/ProfilScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilScreen() {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission requise", "Accès à la galerie refusé.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
            source={image ? { uri: image } : { uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
            style={styles.profileImage}
        />
        <Text style={styles.editPhotoText}>Modifier la photo</Text>
      </TouchableOpacity>

      <View style={styles.inputGroup}>
        <Text>Prénom</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder='entrer votre prénom'
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Nom</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder='entrer votre nom'
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Bio</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#00adb5',
    borderWidth: 2,
  },
  editPhotoText: {
    color: '#00adb5',
    marginTop: 5,
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});

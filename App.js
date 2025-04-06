// App.js
// import React, { useState, useEffect, useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// import { AuthProvider, AuthContext } from './context/AuthContext';
// import AuthNavigator from './navigation/AuthNavigator';
// import DrawerNavigator from './navigation/DrawerNavigator'; // Votre navigation principale pour les utilisateurs authentifiés

// const RootNavigator = () => {
//   const { user } = useContext(AuthContext);
//   // Si l'utilisateur n'est pas connecté, afficher le flow d'authentification
//   return user ? <DrawerNavigator /> : <AuthNavigator />;
// };

// export default function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Vous pouvez ici vérifier un token stocké localement avant de charger l'application
//     setTimeout(() => setLoading(false), 2000);
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0066cc" />
//         <Text>Bonjour 😊✨</Text>
//       </View>
//     );
//   }

//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// App.js
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TaskProvider } from './context/TaskContext'; // Importer le provider
import DrawerNavigator from './navigation/DrawerNavigator';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
export default function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text>Bonjour 😊✨</Text>
      </View>
    );
  }
  return (
    <TaskProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </TaskProvider>
  );
}
const styles = StyleSheet.create({

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
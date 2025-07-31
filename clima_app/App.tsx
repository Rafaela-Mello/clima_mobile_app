import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Botao_clima from './src/components/Clima';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('./src/images/IMG_7145.png')}
      >
        <Botao_clima/>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
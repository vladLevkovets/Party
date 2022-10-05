import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import React from "react"




export default function App() {
  const [sound, setSound] = React.useState();
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/Pink—Get-The-Party-Started.mp3') 
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    playSound()
  }, []);

  console.log("test")
  return (
    
    <View style={styles.container}>
      
      
      <View style={styles.part1}><Text style={styles.text}>LETS START MYSELF</Text></View>
      {/* <Button title="Play Sound" onPress={playSound} /> */}
      <View style={styles.part2}><Text style={styles.text}>Open up App.js to start working on your app!</Text></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  part1 :{
    alignItems: "center",
    justifyContent:"center",
    flex: 3,
    backgroundColor: "#199100",
  paddingTop:"10%",
    width: "100%",
  },
  part2:{
    paddingTop:"20%",
    alignItems: "center",
    justifyContent:"center",
    // paddingTop:"25%",
    flex: 3,
    backgroundColor: "#e50904",

    width: "100%",
  },
  text:{
    color: '#cdf104',
    fontSize:20,
    height:"50%",
    width:"100%",
    padding:"10%"
  }
});

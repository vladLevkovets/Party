import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import React from "react"
import Constants from 'expo-constants'



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
    // playSound()
  }, []);

  console.log("test")
  return (
     
    <SafeAreaView style={styles.container}>
      <View style={styles.TOP} >
      <View style={styles.TOPLeftBg} >      
      <Text style={styles.TOPLeft}></Text>
      </View>
      <View style={styles.TABLeftBg} >      
      <Text style={styles.TABLeft}></Text>
      </View>
      <View style={styles.midLeftBg} >      
      <Text style={styles.midLeft}></Text>
      </View>
      <View style={styles.midRightBg} >      
      <Text style={styles.midRight}></Text>
      </View>
      <View style={styles.TABRightBg} >      
      <Text style={styles.TABRight}></Text>
      </View>
      <View style={styles.TOPRightBG} >      
      <Text style={styles.TOPRight}></Text>
      </View>

      </View>
      {/* <View style={styles.part2}><Text style={styles.text}>LETS START MYSELF</Text><Text style={styles.text1}>LETS START MYSELF</Text></View>
      <Button title="Play Sound" onPress={playSound} />  */}
     <View style={styles.part3}><Text style={styles.text}>Open up App.js to start working on your app!</Text></View> 
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    // backgroundColor: '#0000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  part1 :{
    flexDirection: "row",
    // alignItems: 'center',
    // justifyContent:"center",
    flex: 1,
    // backgroundColor: "#e5090000",
    width: "100%",
  },
  part3 :{
    
    alignItems: 'center',
    justifyContent:"center",
    flex: 9,
    // backgroundColor: "#e60900",
    backgroundColor: "#199100",
    width: "100%",
  },
  text:{
    backgroundColor: "#e50999",

    color: '#cdf104',
    fontSize:20,
    height:"50%",
    width:"100%",
    padding:"10%"
  },
  TOP:{   
     flex:1,
     flexDirection:"row",
  
  },
  TOPLeftBg:{
    backgroundColor: "#e50900",
    height:"100%",
    flex:1,
    
  },
  TOPLeft:{
    borderBottomRightRadius:20,
    backgroundColor: "#e50999",
    flex:1,
  },
  TABLeftBg:{
    paddingTop:9,
    backgroundColor: "#e50999",
    height:"100%",
    flex:7,
  },
  TABLeft:{
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: "#e60900",
    color: '#cdf104',
    height:"100%",
    flex:1,
    
  },
  midLeftBg:{
    backgroundColor: "#e50900",
    height:"100%",
    flex:2,
    
  },
  midLeft:{
    borderBottomLeftRadius:20,
    backgroundColor: "#e50999",
    height:"100%",
    flex:1,
  },
  midRightBg:{
    backgroundColor: "#199100",
    height:"100%",
    flex:2,
    
  },
  midRight:{
    borderBottomRightRadius:20,
    backgroundColor: "#e50999",

    height:"100%",
    flex:1,
    
  },
  TABRightBg:{
    paddingTop:9, 
    backgroundColor: "#e50999",
  
    height:"100%",
    flex:7,
    
  },
  TABRight:{
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: "#199100",
    height:"100%",
    flex:1,
    
  },
  TOPRightBG:{
    backgroundColor: "#199100",
    height:"100%",
    flex:1,
    
  },
  TOPRight:{
    borderBottomLeftRadius:20,
    backgroundColor: "#e50999",
    height:"100%",
    flex:1,
    
  },


























});

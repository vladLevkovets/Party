import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import React from "react"
import { useState,useEffect} from 'react';
import Constants from 'expo-constants';
 


export default function App() {
  const [sound, setSound] = useState();
  const [tab,setTab]=useState("left")
  const [isMuted,setIsMuted]=useState(true)
  const [text,setText]=useState("")

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/Pink—Get-The-Party-Started.mp3') ,  { shouldPlay: true }
    );
    setSound(sound);

    console.log('Playing Sound');
    sound.setIsMutedAsync(isMuted)
  }

  useEffect(() => {
    playSound()
  }, []);

  const tabs=()=>{
    


  }



  console.log("test")
  return (
    
    <SafeAreaView style={styles.container}>
       <Text style={styles.statusBar}></Text>
       <SafeAreaView style={styles.top}>
          
           <TouchableWithoutFeedback >
               <Text style={tab==="left"?styles.tabLeftA:styles.tabLeft} onPress={()=>setTab("left")}>My lists</Text>
           </TouchableWithoutFeedback>
           
           <TouchableWithoutFeedback>
               <Text style={styles.tabMid} onPress={()=>setTab("mid")}>Pending</Text> 
           </TouchableWithoutFeedback>
          
           <TouchableWithoutFeedback>
               <Text style={tab==="right"?styles.tabRightA:styles.tabRight} onPress={()=>setTab("right")}>New one</Text>
          </TouchableWithoutFeedback>
        </SafeAreaView>  
      { tab==="left" 
      ? <View style={styles.left}><View style={styles.text}></View></View>
      :tab==="mid"
          ? <View style={styles.mid}><View style={styles.text}></View></View>
          : <View style={styles.right}>
                
                 <View style={styles.text}>
                    <View style={styles.form}>
                     <TextInput style={styles.inputEvent} onChangeText={(text)=>setText(text)}></TextInput>
                     <TextInput style={styles.inputTodo} onChangeText={(text)=>setText(text)}></TextInput>
                    </View>
                    <View style={styles.list}>

                    </View>
                 </View>
            </View> }
      
      <StatusBar style="auto" />
    </SafeAreaView>
          
        
     
      
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#ff0099'
  },
  statusBar:{
    flexDirection:"row",
    flex:0.5,
    backgroundColor:'#ff00eb',
  },

  top:{
    backgroundColor:"#e4ff00",
    flexDirection:"row",
    flex: 1,
  },
 
  left:{
    paddingHorizontal:"3%",
    paddingTop:"3%",
    paddingBottom:"7%",
    alignItems:'center',
    justifyContent: 'center',
    flex: 9,
    width:"100%",
    backgroundColor: "#ff0000",
  },
  mid:{
    paddingHorizontal:"3%",
    paddingTop:"3%",
    paddingBottom:"7%",
    alignItems:'center',
    justifyContent: 'center',
    flex: 9,
    width:"100%",
    backgroundColor: "#005bff",
  },
  right:{
    paddingHorizontal:"3%",
    paddingTop:"3%",
    paddingBottom:"7%",
    alignItems:'center',
    justifyContent: 'center',
    flex: 9,
    width:"100%",
    backgroundColor: '#10ff00',
  },

  text:{
    
    textAlign: 'center',
    borderRadius:20,
    backgroundColor:'#ff00eb',
    color: '#cdf104',
    fontSize:30,
    height:"100%",
    width:"100%",
  },
  form:{
    height:"25%",
    justifyContent: 'space-evenly',
    borderRadius:20,
    margin:"2%",
   backgroundColor:"#e4ff00"
  },
  list:{
    height:"60%",
   backgroundColor:"#e4ff00",
   borderRadius:20,
   margin:"2%",
  },
  inputEvent:{
    paddingLeft:10 ,
    borderRadius:20,
    height:40,
    placeholder:"Event",
    backgroundColor:"#859193",
  },
  inputTodo:{
    paddingLeft:10 ,
    borderRadius:20,
    height:40,
    placeholder:"Task",
    backgroundColor:"#859193",
  },
  tabLeft:{
    paddingTop:9,
    color:"#005bff",
    textAlign:'center',
    marginLeft:1,
    marginTop:15,
    marginRight:-20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: '#ff0000',
    flex:40,
    zIndex:0
  },
  tabLeftA:{
    paddingTop:9,
    color:"#005bff",
    textAlign:'center',
    marginLeft:1,
    marginTop:15,
    marginRight:-20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: '#ff0000',
    flex:40,
    zIndex:2
  },
  tabMid:{
    paddingTop:9,
    color:"#10ff00",
    textAlign:'center',
    marginTop:15,
    marginRight:-20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: '#005bff',
    flex:40,
    zIndex:1,
  },
  
  tabRight:{
    paddingTop:9,
    color:"#ff0000",
    textAlign:'center',
    marginRight:1,
    marginTop:15,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: '#10ff00',
    flex:40,
    zIndex:0,
  },
  tabRightA:{
    paddingTop:9,
    color:"#ff0000",
    textAlign:'center',
    marginRight:1,
    marginTop:15,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: '#10ff00',
    flex:40,
    zIndex:2
  },
  



























});

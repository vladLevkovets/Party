import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback ,Dimensions,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import React from "react"
import {useCallback, useState,useEffect} from 'react';
import LoginReg from "./components/LoginReg.js"
import Left from "./components/Left.js"
import Mid from "./components/Mid.js"
import Right from "./components/Right.js"
import axios from "axios";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync()
import JWT from 'expo-jwt';
import {JWT_SECRET} from "./config.js"


export default function App() {
  const hor = Dimensions.get('window').width;
  const vert = Dimensions.get('window').height;
  const [token,setToken]=useState(null)
  // const {data,setData}=useState({})
  const Pink = require("./assets/Pink—Get-The-Party-Started.mp3")
  const Smoke= require("./assets/Smokie-What_can_i_do.mp3")
  const Help= require("./assets/The_Beatles_-_Help_(Jesusful.com).mp3")
  const [music, setMusic] = useState()
  const [tab,setTab]=useState("left")
  const [isMuted,setIsMuted]=useState(true)
  const [event,setEvent]=useState("")
  const [partys,setPartys]=useState([])
  const [checked,setChecked]=useState(false)
  const [reg,setReg]=useState(false)
  const [logged,setLogged]=useState(null)
  

async function playMusic(url) {
    if (music){
      music.stopAsync()
      }
    const { sound} = await Audio.Sound.createAsync(url);
    setMusic(sound);
    sound.setVolumeAsync(1)
    sound.playAsync ()
    console.log('Playing Sound');
} 
 
const   getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
      // We have data!!
        let temp=JSON.parse(value)        
        setToken(temp)
        console.log(temp);
      }else {setToken("")}
    } catch (error) {
      console.log("nothing")
      // Error retrieving data
    }
};

const login = async () => {
    try {
      await AsyncStorage.setItem('@token',JSON.stringify(token))
      console.log("putted",token)
      setLogged(true);
      setChecked(true) 
    } catch (e) {
      console.log("oops")
      // saving error
    }
};
  
const logout = async () => {
    try {
      await AsyncStorage.removeItem('@token')
      console.log("without token")
      setLogged(false);
      setChecked(true)  
    } catch(e) {
      // remove error
    }
};


useEffect(()=>{
      return music
      ? () => {
          music.unloadAsync();
        }
      : undefined;
},[music])
  
useEffect(()=>{
     if (logged){
        playMusic(Help)
        
     }
        
},[logged])

useEffect(() => {
     getToken()
}, []);

const verify_token = async () => {
  console.log("cheking token")
  try {
     if (token==="") {
         console.log("nothing")
         setLogged(false)
         setChecked(true)                                  
     }else if (token){
 
         axios.defaults.headers.common['Authorization'] = token;
         const response = await axios.post(`http://192.168.0.174:4040/users/verify_token`);
         console.log("we have answer",response)

         return response.data.ok ? login() : logout();
      }
   } catch (error) {
        console.log(error);
      }
};


useEffect(
    () => {
      verify_token();
},[token])

 

useEffect(()=>{
  checked&&logged!==null  && ( async()=>{ await SplashScreen.hideAsync()})()
},[checked,logged])

return (
  <View style={[styles.container, {minHeight: vert}]}  >
      
    { checked && logged
    ? 
    
     <View style={[styles.container,{minHeight: vert}]}>
   
          <Text style={[styles.statusBar,{minHeight: 0.05*vert}]}></Text>
          <SafeAreaView style={[styles.top,{minHeight: 0.1*vert}]}>

          <View style={tab==="left"?styles.tabLeftA:styles.tabLeft}>
          <TouchableWithoutFeedback style={tab==="left"?styles.tabLeftA:styles.tabLeft}>
                   <Text style={styles.tabLeftName} onPress={()=>{ verify_token();  playMusic(Help);setTab("left")}}>My lists </Text>
          </TouchableWithoutFeedback>
          </View> 

          <View style={styles.tabMid}>
              <TouchableWithoutFeedback style={styles.tabMid}>
                   <Text style={styles.tabMidName} onPress={()=>{ verify_token(); playMusic(Smoke);setTab("mid")}}>Pending</Text> 
              </TouchableWithoutFeedback>
          </View>
          

          <View style={tab==="right"?styles.tabRightA:styles.tabRight}>
              <TouchableWithoutFeedback style={tab==="right"?styles.tabRightA:styles.tabRight}>
                   <Text style={styles.tabRightName} onPress={()=>{ verify_token(); playMusic(Pink);setTab("right")}}>New one</Text>
              </TouchableWithoutFeedback>
          </View>

          </SafeAreaView>  
        { tab==="left" 
      
              ?  <Left token={token} partys={partys} setPartys={setPartys} verify_token={verify_token}/>
          
              :tab==="mid"
                      ? <Mid  token={token} logout={logout} verify_token={verify_token}/>
         
                      : <Right token={token} partys={partys} verify_token={verify_token}/>
                      
        }
      
         <StatusBar style="auto" />  
      
      
      </View>
    
    : checked && !logged &&
             <LoginReg reg={reg} setReg={setReg} setLogged={setLogged} playMusic={playMusic} Pink={Pink} setToken={setToken}/>
      
    
             
     
      }
  </View>  
  );
}

const styles = StyleSheet.create({
  screen:{
    height:"100%",
    width:"100%",
  },

screenLog:{height:"100%",
width:"100%",
backgroundColor:"black",
},


  container: {
    height:"110%",
    width:"100%",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#ff0099'
  },

  statusBar:{
    flexDirection:"row",
    height:"5%",
    backgroundColor:'#ff00eb',
  },

  top:{
    
    width:"100%",
    backgroundColor:"#e4ff00",
    flexDirection:"row",
    
  },
 
 
  tabLeft:{
    paddingTop:9,
    color:"#005bff",
    textAlign:'center',
    justifyContent:"center",
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
    justifyContent:"center",
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
  tabLeftName:{
    fontSize:20,
    color:"#005bff",
    textAlign:'center',
    marginLeft:2,
    marginRight:3,
    backgroundColor: '#ff0000',
    flex:40,
    zIndex:0
  },
  tabMidName:{
    fontSize:20,
    color:"#10ff00",
    textAlign:'center',
    marginLeft:2,
    marginRight:3,
    backgroundColor: '#005bff',
    flex:40,
    zIndex:1, 
  },
  tabRightName:{
    fontSize:20,
    color:"#ff0000",
    textAlign:'center',
    marginRight:1,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor: '#10ff00',
    flex:40,
    zIndex:0,
  },
touch:{
width:"100%",height:"100%"
}
});

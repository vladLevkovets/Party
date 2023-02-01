import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, TouchableWithoutFeedback ,Dimensions,ImageBackground  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import React from "react"
import {useCallback, useState,useEffect} from 'react';
import LoginReg from "./components/LoginReg.js"
import Left from "./components/Left.js"
import Mid from "./components/Mid.js"
import Right from "./components/Right.js"
import Friends from "./components/Friends.js"
import axios from "axios";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync()
// import JWT from 'expo-jwt';
// import {JWT_SECRET} from "./config.js"


export default function App() {
  const hor = Dimensions.get('window').width;
  const vert = Dimensions.get('window').height;
  const [token,setToken]=useState(null)
  const Pink = require("./assets/Pink—Get-The-Party-Started.mp3")
  const Smoke= require("./assets/Smokie-What_can_i_do.mp3")
  const Help= require("./assets/The_Beatles_-_Help_(Jesusful.com).mp3")
  const [music, setMusic] = useState()
  const [tab,setTab]=useState("left")
  const [menu,setMenu]=useState(false)
  const [isMuted,setIsMuted]=useState(false)
  const [event,setEvent]=useState("")
  const [partys,setPartys]=useState([])
  const [showFriends,setShowFriends]=useState(false)
  const [checked,setChecked]=useState(false)
  const [reg,setReg]=useState(false)
  const [logged,setLogged]=useState(null)
  const [list,setList]=useState(false)

async function playMusic(url) {
    if (music){
      music.stopAsync()
      }
    if (isMuted){
    }else{
    const { sound} = await Audio.Sound.createAsync(url);
    setMusic(sound);
    sound.setVolumeAsync(1) 
    sound.playAsync ()
    console.log('Playing Sound');}
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

useEffect(() => {
  playMusic()
}, [isMuted]);

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
   { 
     checked && logged && showFriends
     ? 
    <Friends token={token} verify_token={verify_token} showFriends={showFriends} setShowFriends={setShowFriends} list={list} setList={setList}  />
     : checked && logged
      ?<View style={[styles.container,{minHeight: vert}]}>
          
          <Text style={[styles.statusBar,{minHeight: 0.06*vert}]}></Text>
          <SafeAreaView style={[styles.top,{minHeight: 0.13*vert}]}>
          <View style={[{height:0.04*vert},{width:1*hor}]}>
          <TouchableOpacity onPress={()=>{setMenu(!menu)}} style={styles.delete}><Text style={styles.btnsText}>MENU</Text></TouchableOpacity> 
          </View>
          <View style={[styles.tabs,{minHeight:0.1*vert}]}>
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
          </View>
          </SafeAreaView>  
        { tab==="left" 
      
              ?  <Left token={token} partys={partys} setPartys={setPartys} verify_token={verify_token}  setList={setList} />
          
              :tab==="mid"
                      ? <Mid  token={token} logout={logout} verify_token={verify_token}/>
         
                      : <Right token={token} partys={partys} verify_token={verify_token}/>
                      
        }
        {menu && 
        <View style={menu ?styles.menu :{height:0}}>
            <View style={styles.optionTop}>
              <TouchableOpacity onPress={()=>{setIsMuted(!isMuted)}}  style={styles.touchTop}> 
              <View style={styles.image}>
              {isMuted 
                ?<ImageBackground resizeMode='stretch' style={{width:"100%",height:"100%"}} source={require("./assets/unmuted-trans.png")}></ImageBackground>
                :<ImageBackground resizeMode='stretch' style={{width:"100%",height:"100%"}} source={require("./assets/muted-trans.png")}></ImageBackground>
              }
              </View>
              <View style={styles.topText}>
              {isMuted
                ?<Text style={styles.muteText}>SOUND ON</Text>
                :<Text style={styles.muteText}>SOUND OFF</Text>
              }
                </View>
              </TouchableOpacity>
            </View>                        
            <View style={styles.optionMid}>
              <TouchableOpacity onPress={()=>{setShowFriends(true),setMenu(false)}}>
              <Text style={styles.optionText}>FRIENDLIST</Text> 
              </TouchableOpacity>
            </View>            
            
            <View style={styles.optionBot}>
              <TouchableOpacity onPress={()=>{logout(),setMenu(false)}}>
                 <Text style={styles.optionText}>LOGOUT</Text> 
              </TouchableOpacity>
            </View>
           
        </View>} 
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
  menu: {
    height:"30%",
    width:"50%",
    position:'absolute',
    top:"7.5%",
    right:0,
    // flexDirection:"column",
    backgroundColor:'black',
    borderRadius:20,
    zIndex:3
  },
  // menuHid: {
  //   height:"30%",
  //   width:"50%",
  //   position:'absolute',
  //   top:"7.5%",
  //   right:0,
  //   flexDirection:"column",
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor:'#ff0099',
  //   zIndex:3
  // }, 
  optionTop: {
    position:"relative",
    height:"33.3%",
    width:"100%",
    backgroundColor:'black',
    borderBottomColor:"white",
    borderBottomWidth:1,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  touchTop:{
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    width:"100%",
    height:"100%",
    flexDirection:"row",
    justifyContent:'flex-start',
    alignContent:"center",
  },
  image:{
    paddingTop:"10%",
    width:"20%",
    height:"80%",
    textAlign:"center",
    justifyContent:"center", 
    borderTopLeftRadius:20,
  
  },
  topText:{
    width:"80%",
    height:"100%",
    textAlign:"center",
    justifyContent:"center",
    borderTopRightRadius:20,
  },
  muteText:{
    width:"100%",
    height:"50%",
    color:"white",
    fontSize:25,
  },
  optionText:{
    paddingTop:"5%",
    textAlign:"center",
    width:"100%",
    height:"80%",
    color:"white",
    fontSize:25,},
  optionMid: {
    position:"relative",
    height:"33.3%",
    width:"100%",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'black',
    borderBottomColor:"white",
    borderBottomWidth:1
  },
  optionBot: {
    position:"relative",
    height:"33.3%",
    width:"100%",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'black',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20
  },
  
  statusBar:{
    flexDirection:"row",
    height:"5%",
    backgroundColor:'#ff00eb',
  },

  top:{
    
    width:"100%",
    backgroundColor:"#e4ff00",
    // flexDirection:"row",
    
  },
  delete:{
    marginTop:"0.5%",
    marginLeft:"65%",
    width:"30%",
    height:"80%",
    backgroundColor:"black",
    borderRadius:15,
    justifyContent:"center",
   },
  btnsText:{
    width:"100%",      
    fontSize:15,
    color:"white",
    textAlign:'center'
  },  
  tabs:{
    height:"9%",
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
    marginTop:1,
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
    marginTop:1,
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
    marginTop:1,
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
    marginTop:1,
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
    marginTop:1,
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

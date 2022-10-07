import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, TextInput,ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import React from "react"
import { useState,useEffect} from 'react';
import Constants from 'expo-constants';



export default function App() {
  const Pink = require("./assets/Pink—Get-The-Party-Started.mp3")
  const Smoke= require("./assets/Smokie—WhatCanIDo.mp3")
  const Help= require("./assets/The_Beatles_-_Help_(Jesusful.com).mp3")
  const [music, setMusic] = useState()
  const [tab,setTab]=useState("left")
  const [isMuted,setIsMuted]=useState(true)
  const [event,setEvent]=useState("")
  const [text,setText]=useState("")
  const [todos, setTodos] = useState(["a"])
  // const [url,setUrl]=useState(require("./assets/Pink—Get-The-Party-Started.mp3"))

  async function playMusic(url,start,stop) {
    if (music){
      music.stopAsync()
      }
    const { sound} = await Audio.Sound.createAsync(url);
    setMusic(sound);
    sound.setVolumeAsync(1)
    sound.playAsync(true)
    sound.playFromPositionAsync (start)
    setTimeout(() => {
      sound.stopAsync(false)
    }, stop);
    console.log('Playing Sound');
  } 
 
  async function playSmoke() {
    music.stopAsync()
    console.log('Loading Sound');
    const { sound} = await Audio.Sound.createAsync(require("./assets/Smokie—WhatCanIDo.mp3"));
    setMusic(sound);
    sound.setVolumeAsync(1)
    
    sound.playFromPositionAsync (40000)
    setTimeout(() => {
      sound.stopAsync()
    }, 4950);
    console.log('Playing Sound');
  } 

  async function playHelp() {
    if (music){
    music.stopAsync()
    }
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require("./assets/The_Beatles_-_Help_(Jesusful.com).mp3"));
    setMusic(sound);
    sound.setVolumeAsync(0.5)
    sound.playFromPositionAsync (500)
    // sound.playAsync(true)
    setTimeout(() => {
      sound.stopAsync()
    }, 4050);
    console.log('Playing Sound');
  
  } 




  useEffect(() => {
    
    playMusic(Help,500,3600)
  }, []);

  const addToList = () =>{
    console.log(text,todos)
      const temp = [...todos] 
      temp.push(text)
      setTodos([...temp])
      setText('')
  }
  const removeTodo = (idx) => {
      const temp = [...todos]
      temp.splice(idx, 1)
      setTodos([...temp])
  }

  const showTodos = () => {
    console.log(todos)
   return todos.map((todo, idx)=>{
      return  <View style={styles.box} key={idx}>
                  <Text
                    numberOfLines={1} 
                    style={styles.task} >{todo}
                  </Text>
                  <TouchableWithoutFeedback
                      onPress={( ) => removeTodo(idx)}>
                     <Text style={styles.delTask}>X</Text>
                     
                      </TouchableWithoutFeedback>
                
              </View>
    })
  }
  

  console.log("test")
  return (
    
    <View style={styles.container}>
      
       <Text style={styles.statusBar}></Text>
       <SafeAreaView style={styles.top}>
          
           <TouchableWithoutFeedback >
               <Text style={tab==="left"?styles.tabLeftA:styles.tabLeft} onPress={()=>{setTab("left"); playMusic(Help,500,3550)}}>My lists</Text>
           </TouchableWithoutFeedback>
           
           <TouchableWithoutFeedback>
               <Text style={styles.tabMid} onPress={()=>{setTab("mid"); playMusic(Smoke,40000,7000)}}>Pending</Text> 
           </TouchableWithoutFeedback>
          
           <TouchableWithoutFeedback>
               <Text style={tab==="right"?styles.tabRightA:styles.tabRight} onPress={()=>{setTab("right"); playMusic(Pink,9000,7750)}}>New one</Text>
          </TouchableWithoutFeedback>
          
        </SafeAreaView>  
      { tab==="left" 
      ? <View style={styles.left}><View style={styles.text}></View></View>
      :tab==="mid"
          ? <View style={styles.mid}><View style={styles.text}></View></View>
          : <View style={styles.right}>
                
                 <View style={styles.text}>
                    <View style={styles.form}>
                      <TextInput style={styles.inputEvent} onChangeText={(text)=>setEvent(text)} ></TextInput>
                          <View style={styles.inputBox}>
                          <TextInput style={styles.inputTodo} onChangeText={(text)=>setText(text)} ></TextInput>
                          <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={addToList}>
                          <Text style={styles.makeTask}>V</Text>
                          </TouchableWithoutFeedback>
                          </View>
                          
                    </View>
                    <View style={styles.list}>
                      {showTodos()}
                    </View>

                    
                 </View>
    
            </View> }
      
      <StatusBar style="auto" />
    
    </View>
     
     
      
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#ff0099'
  },
  contentContainer:{
    flex:1,
    width:"100%",
    height:647,
    alignItems: 'space-between',
    justifyContent: 'space-around',
  },
  statusBar:{
    flexDirection:"row",
    height:40,
    backgroundColor:'#ff00eb',
  },

  top:{
    marginLeft:-1,
    width:"100%",
    backgroundColor:"#e4ff00",
    flexDirection:"row",
    height:60,
  },
 
  left:{
    paddingHorizontal:"3%",
    paddingTop:"3%",
    paddingBottom:"7%",
    alignItems:'center',
    justifyContent: 'center',
    height:577,
    width:"100%",
    backgroundColor: "#ff0000",
  },
  mid:{
    paddingHorizontal:"3%",
    paddingTop:"3%",
    paddingBottom:"7%",
    alignItems:'center',
    justifyContent: 'center',
    height:577,
    width:"100%",
    backgroundColor: "#005bff",
  },
  right:{
    paddingHorizontal:"3%",
    paddingTop:"3%",
    paddingBottom:"7%",
    alignItems:'center',
    justifyContent: 'center',
    height:577,
    width:"100%",
    backgroundColor: '#10ff00',
  },

  text:{
    
    textAlign: 'center',
    borderRadius:20,
    backgroundColor:'#ff00eb',
    color: '#cdf104',
    fontSize:30,
    height:527,
    width:337,
  },
  form:{
    paddingHorizontal:'1%',
    height:"20%",
    justifyContent: 'space-evenly',
    borderRadius:20,
    margin:"2%",
   backgroundColor:"#e4ff00"
  },
  list:{
    height:"74%",
   backgroundColor:"#e4ff00",
   borderRadius:20,
   margin:"2%",
  },
  inputEvent:{
    paddingLeft:10 ,
    borderRadius:20,
    height:"40%",
  
    backgroundColor:"#abb7b9",
  },
  inputTodo:{
    width:"90%",
    paddingLeft:10 ,
    borderRadius:20,
    height:40,
    placeholder:"Task",
    backgroundColor:"#abb7b9",
  },
  inputBox:{

    flexDirection:"row",
    borderRadius:20,
    height:40,
    backgroundColor:"#abb7b9"
  },
  box:{
    flexDirection:"row",
    paddingLeft:10 ,
    borderRadius:20,
    height:40,
    backgroundColor:"#ff0909",
  },

  task:{
    paddingTop:5,
    fontSize:15,
    width:"90%",
    color:"#161515",
    paddingLeft:3 ,
    borderRadius:30,
    height:40,
    backgroundColor:"#ff0909",
  },
   
 makeTask:{
  textAlign:'center',
  marginTop:5,
  marginRight:5,
  fontSize:20,
  width:30,
  height:30,
  borderRadius:20,
  backgroundColor:"green",
  color:"white"
 },
 delTask:{
  textAlign:'center',
  marginTop:5,
  marginRight:5,
  fontSize:20,
  width:30,
  height:30,
  borderRadius:20,
  backgroundColor:"black",
  color:"white"
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

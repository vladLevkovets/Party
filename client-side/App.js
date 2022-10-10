import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, TextInput,ScrollView,Image,ImageBackground, TouchableOpacity,Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import React from "react"
import { useState,useEffect} from 'react';
import {WebView} from "react-native-webview"
import Screensaver from "./assets/acid-lsd-trip-crop.jpeg"
import Lights from "./assets/photo-disco-o_zpsmkxydmb0_gif.gif"
import Screen from "./components/Screen.js"


export default function App() {
  const hor = Dimensions.get('window').width;
  const vert = Dimensions.get('window').height;
  const Pink = require("./assets/Pink—Get-The-Party-Started.mp3")
  const Smoke= require("./assets/Smokie-What_can_i_do.mp3")
  const Help= require("./assets/The_Beatles_-_Help_(Jesusful.com).mp3")
  const [music, setMusic] = useState()
  const [tab,setTab]=useState("left")
  const [isMuted,setIsMuted]=useState(true)
  const [event,setEvent]=useState("")
  const [text,setText]=useState("")
  const [todos, setTodos] = useState([])
  const [list,setList]=useState(["A"])
  const [partys,setPartys]=useState([])
  const [tapped,setTapped]=useState(false)
  const [reg,setReg]=useState(false)
  const [logged,setLogged]=useState(false)
  const [progress,setProgress]=useState("0%")
  const [showList,setShowList]=useState(false)

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
 
 useEffect(()=>{
  return music
      ? () => {
          music.unloadAsync();
        }
      : undefined;
 },[music])
  
useEffect(()=>{
  (tapped &&logged) && playMusic(Help)
},[logged])
  



  useEffect(() => {
    
    playMusic(Pink)
  }, []);

 const registr = async () =>{
    
     setReg(!reg)
}

const login = async ()=>{
     setLogged(true)

}


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
  

  const makeList=()=>{
     console.log(partys,todos)
     setList([...list,{event:todos}])
     setPartys([...partys,event])
    //  setEvent("")
    //  setText("")
    //  setTodos([])
  }
  
  const showMy=()=>(
     partys.map((el,i)=>{
               
           return <TouchableOpacity key={i} style={styles.party} onPress={(e)=>{setShowList(true)}}><Text style={styles.eventName}>{el}</Text><Text style={styles.eventProgress}>{progress}</Text></TouchableOpacity>
       }

     )

  )

  console.log("test")
  return (
    <View style={styles.container}>
      
    {tapped && logged? 
       
    <View style={styles.container}>
   
       <Text style={styles.statusBar}></Text>
       <SafeAreaView style={styles.top}>
          
           <TouchableWithoutFeedback >
               <Text style={tab==="left"?styles.tabLeftA:styles.tabLeft} onPress={()=>{setTab("left"); playMusic(Help)}}>My lists</Text>
           </TouchableWithoutFeedback>
           
           <TouchableWithoutFeedback>
               <Text style={styles.tabMid} onPress={()=>{setTab("mid"); playMusic(Smoke)}}>Pending</Text> 
           </TouchableWithoutFeedback>
          
           <TouchableWithoutFeedback>
               <Text style={tab==="right"?styles.tabRightA:styles.tabRight} onPress={()=>{setTab("right"); playMusic(Pink)}}>New one</Text>
          </TouchableWithoutFeedback>
          
        </SafeAreaView>  
      { tab==="left" 
      
      ?  showList ?   
               <View style={styles.single}>
               <View style={styles.singleTop}><Text style={styles.singleName}>{event}</Text></View> 
               <View style={styles.singleText}><ScrollView style={styles.singleList}>{showTodos()}</ScrollView></View>
               <View style={styles.listBtns}>
                        <TouchableOpacity onPress={()=>{setShowList(false)}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity> 
                        <TouchableOpacity onPress={()=>{setShowList(false)}} style={styles.delete}><Text style={styles.btnsText}>DELETE</Text></TouchableOpacity>
                    </View> 
               </View>

            :
             <View style={styles.left}><View style={styles.text}>{showMy()}</View>
             </View>
            
            
      :tab==="mid"
          ? <View style={styles.mid}><View style={styles.text}>
            <WebView
            source={{html: '<iframe src="https://giphy.com/embed/jtd6dzbJuEGYnP9QWv" width=120% height=200% frameBorder="0" class="giphy-embed" allowFullScreen></iframe>'}}
            style={{marginTop: 20}}
              />
           </View></View>
          : <View style={styles.right}>
                
                 <View style={styles.text}>
                    <View style={styles.form}>
                      <TextInput style={styles.inputEvent}placeholder= "name of event" onChangeText={(text)=>setEvent(text)} value={event}></TextInput>
                          <View style={styles.inputBox}>
                          <TextInput style={styles.inputTodo} placeholder="name of task" onChangeText={(text)=>setText(text)} value={text} ></TextInput>
                          <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={addToList}>
                          <View style={styles.makeTask} >
                          
                          <Image source={require("./assets/istockphoto-1191442137-170667a.jpg")} style={styles.buttonPic}/>
                          </View>
                          </TouchableWithoutFeedback>
                          </View>
                          
                    </View>
                    
                    <View style={styles.list}>
                       <ScrollView style={styles.scroll}>
                       {showTodos()}
                       </ScrollView> 
                    </View>
                    <View style={styles.listBtns}>
                        <TouchableOpacity onPress={()=>{setTodos([]);console.log(event);setEvent("");setText("")}} style={styles.cancel}><Text style={styles.btnsText}>CANCEL</Text></TouchableOpacity>
                        <TouchableOpacity onPress={makeList} style={styles.create}><Text style={styles.btnsText}>CREATE</Text></TouchableOpacity> 
                    </View>  
                    

                 </View>
                 
                   
                    
    
            </View> }
      
      {/* <StatusBar style="auto" /> */}  
      
      
    </View>
    
    : tapped && !logged ? 
        <View style={styles.screen}>
          <ImageBackground style={styles.screen} source={require("./assets/blackpaint.jpg")}/>


          <View style={{flex:1,flexDirection:'row',justifyContent:"space-between",position:"absolute",zIndex:1,top:0.1*vert,height:0.2*vert,width:hor}}>
          <TouchableOpacity onPress={login}>
           <View style={{width:0.50*hor,height:0.4*vert}}>
           <ImageBackground  resizeMode='stretch' style={{width:0.5*hor,height:0.2*vert}} source={require("./assets/greensplash.png")}>
           <Text style={{fontSize:0.03*vert, color:"blue",height:"80%",paddingTop:0.07*vert,paddingLeft:0.17*hor,fontWeight:"bold"}}>Login</Text>
           </ImageBackground>
           </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={registr}>
            <View style={{width:0.50*hor,height:0.17*vert}}>
            <ImageBackground  resizeMode='stretch' style={{width:0.5*hor,height:0.2*vert}} source={require("./assets/yellowsplash.png")}>
            <Text style={{fontSize:0.03*vert, color:"red",height:"80%",paddingTop:0.07*vert,paddingLeft:0.16*hor,fontWeight:"bold"}} >SighIn</Text>
            </ImageBackground>
            </View>
          </TouchableOpacity>
          </View>


          <View style={{width:0.75*hor,height:0.4*vert,flex:1,justifyContent:'space-between', position:"absolute",top:0.40*vert}}>
           <View style={{flex:1}}>            
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("./assets/thinrainbowMirror.png")}> 
          <TextInput placeholder='Nickname' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}}/>
           </ImageBackground>
          </View>

          <View style={{flex:1}}> 
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("./assets/thinrainbowMirror.png")}> 
          <TextInput  placeholder='Password' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}} />
          </ImageBackground>
          </View>

           {reg &&
           <View style={{flex:2}}> 
           <View style={{flex:1}}> 
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("./assets/thinrainbowMirror.png")}> 
          <TextInput  placeholder='Repeat password' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}} />
           </ImageBackground>
          </View>

           <View style={{flex:1}}> 
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("./assets/thinrainbowMirror.png")}> 
           <TextInput  placeholder='Email' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}}/>
           </ImageBackground>
          </View>
          </View>
          }
          </View>



          <View style={{display:"flex" ,justifyContent:'center', position:"absolute",zIndex:1,left:0.75*hor,top:0.35*vert,height:0.8*hor,width:0.25*hor}}>
          
            <TouchableOpacity style={{flex:1}}> 
                 
               <View style={{width:0.25*hor,height:0.2*hor,zIndex:1}}>
               <ImageBackground  resizeMode='cover' style={{width:0.3*hor,height:0.4*hor}} source={require("./assets/redsplash.png")}>
                 <Text style={{fontSize:0.06*hor, color:"yellow",height:0.4*hor,width:0.3*hor,position:'absolute',paddingTop:0.15*hor,paddingLeft:0.1*hor,fontWeight:"bold"}}>NO</Text>             
               </ImageBackground>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  style={{flex:1}}>
             
               <View style={{width:0.25*hor,height:0.2*hor,zIndex:1,}}>
               <ImageBackground  resizeMode='cover' style={{width:0.3*hor,height:0.4*hor}} source={require("./assets/bluesplash.png")}>
               <Text style={{fontSize:0.06*hor, color:"white",height:0.4*hor,width:0.3*hor,position:'absolute',paddingTop:"50%",paddingLeft:0.11*hor,fontWeight:"bold"}}>OK</Text> 
               </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    
      :<Screen setTapped={setTapped}/>
      // <TouchableWithoutFeedback onPress={()=>{setTapped(true)}}>
      //    <View style={styles.screen}>
      //    <ImageBackground style={styles.screen} source={Screensaver}/>
           
      
      //    <Text style={{height:"20%",width:"40%",position:'absolute',top:"10%",left:"10%",fontSize:0.16*vert,fontWeight:"bold",textShadowColor: '#FCFF00',textShadowOffset: { width: 5, height: -5 },textShadowRadius: 1,color:"#0172fd",}} >A.</Text>
      //    <Text style={{height:"20%",width:"40%",position:'absolute',top:"30%",left:"30%",fontSize:0.16*vert,fontWeight:"bold",textShadowColor: '#FCFF00',textShadowOffset: { width: 5, height: -5 },textShadowRadius: 1,color:"#F300BD",}}>C.</Text>
      //    <Text style={{height:"20%",width:"40%",position:'absolute',top:"50%",left:"55%",fontSize:0.16*vert,fontWeight:"bold",textShadowColor: '#FCFF00',textShadowOffset: { width: 5, height: -5 },textShadowRadius: 1,color:"#FF0700",}}>I.</Text>
      //    <Text style={{height:"20%",width:"40%",position:'absolute',top:"70%",left:"70%",fontSize:0.16*vert,fontWeight:"bold",textShadowColor: '#FCFF00',textShadowOffset: { width: 5, height: -5 },textShadowRadius: 1,color:"#29EE00",}}>D.</Text>
      //    </View> 
      // </TouchableWithoutFeedback>
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
//   AppNameA:{
   
//     height:"20%",
//     width:"40%",
//     position:'absolute',
//     top:"10%",
//     left:"10%",
//     fontSize:100,
//     fontWeight:"bold",
//     textShadowColor: '#FCFF00',
//     textShadowOffset: { width: 5, height: -5 },
//     textShadowRadius: 1,
//     color:"#0172fd",
// },
//   AppNameC:{
//     height:"20%",
//     width:"40%",
//     position:'absolute',
//     top:"30%",
//     left:"30%",
//     fontSize:100,
//     fontWeight:"bold",
//     textShadowColor: '#FCFF00',
//     textShadowOffset: { width: 5, height: -5 },
//     textShadowRadius: 1,
//     color:"#F300BD",

//   },
//   AppNameI:{
//     height:"20%",
//     width:"40%",
//     position:'absolute',
//     top:"50%",
//     left:"55%",
//     fontSize:100,
//     fontWeight:"bold",
//     textShadowColor: '#FCFF00',
//     textShadowOffset: { width: 5, height: -5 },
//     textShadowRadius: 1,
//     color:"#FF0700",

//   },AppNameD:{
//     height:"20%",
//     width:"40%",
//     position:'absolute',
//     top:"70%",
//     left:"70%",
//     fontSize:100,
//     fontWeight:"bold",
//     textShadowColor: '#FCFF00',
//     textShadowOffset: { width: 5, height: -5 },
//     textShadowRadius: 1,
//     color:"#29EE00",

//   },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#ff0099'
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
  party:{
    marginTop:5,
    flexDirection:'row',
    justifyContent:"space-between",
    width:"100%",
    height:60,
    backgroundColor:"blue",
    borderRadius:30,
  },
  eventName:{
    marginTop:10,
    paddingTop:0,
    fontSize:20,
    width:"80%",
    color:"#161515",
    paddingLeft:20 ,
    borderRadius:30,
    height:40,
    color:"white"
  },
  eventProgress:{
    textAlign:'center',
    marginTop:10,
    marginRight:15,
    fontSize:20,
    width:40,
    height:40,
    borderRadius:20,
    color:"white"   
   },
   singleEvent:{
    width:"100%",
    height:"100%"
   },
   single:{
    paddingTop:40,
    backgroundColor:"#ff0000",
    position:'absolute',
    height:"100%",
    width:"100%",
    zIndex:1,
   },
  singleTop:{
   marginLeft:"5%", 
   width:"90%",
   height:40,  
   backgroundColor:"#005bff",
   borderRadius:20,
  },
  singleName:{
    width:"90%",
    color:"yellow",
    paddingLeft:10,
    paddingTop:5,
    fontSize:20,
  },
  singleText:{
    width:"90%",
    fontSize:15,
  },
  singleList:{
    width:"100%",
    borderWidth:1,
    height:"85%",
   backgroundColor:"#ff0099",
   borderRadius:20,
   margin:"5%",
   marginTop:5,
   marginBottom:10,
  },
  delete:{
    paddingLeft:"5%",
    width:"30%",
    height:"60%",
    backgroundColor:"black",
    borderRadius:15,
  },
  back:{
    paddingLeft:"5%",
    width:"30%",
    height:"60%",
    backgroundColor:"blue",
    borderRadius:15,
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
    borderWidth:1,
    paddingHorizontal:'1%',
    height:"20%",
    justifyContent: 'space-evenly',
    borderRadius:20,
    margin:"2%",
   backgroundColor:"#e4ff00"
  },
  scroll:{
    keyboardDismissMode:'none', 
    width:"100%",
    flex:1,
    backgroundColor:"#e4ff00",
    borderRadius:20,
  },
  list:{
   borderWidth:1,
    height:"70%",
   backgroundColor:"#e4ff00",
   borderRadius:20,
   margin:"2%",
   marginTop:0,
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
    height:"100%",
    placeholder:"Task",
    backgroundColor:"#abb7b9",
  },
  inputBox:{
    height:"40%",
    flexDirection:"row",
    borderRadius:20,
    backgroundColor:"#abb7b9"
  },
  box:{
    marginTop:5,
    marginHorizontal:3,
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
 buttonPic:{
  fontSize:15,
  width:30,
  height:30,
  borderRadius:30,
  
 },
 makeTaskButton:{
  textAlign:'center',
  justifyContent:'flex-start',
  margin:5,
  fontSize:15,
  width:20,
  height:20,
  borderRadius:0,
  backgroundColor:"blue",
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
listBtns:{
  justifyContent:"space-around",
  flexDirection:"row",
  height:40,
  width:"100%"
},
cancel:{
  paddingLeft:"5%",
  width:"30%",
  height:"60%",
  backgroundColor:"red",
  borderRadius:15,
},
create:{
  paddingLeft:"5%",
  width:"30%",
  height:"60%",
  backgroundColor:"green",
  borderRadius:15,
},
btnsText:{
  width:"80%",
  height:"100%",
  textAlign:'center',
  fontSize:15,
  color:"yellow",
  paddingBottom:5,
  
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

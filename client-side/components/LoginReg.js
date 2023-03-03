import React from "react"
import { StyleSheet, Text, View, Alert, TouchableWithoutFeedback, TextInput,Keyboard, ImageBackground, TouchableOpacity,Dimensions,KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect} from 'react';
import axios from "axios";





export default function Login({reg,setReg,setLogged,playMusic,Pink,setToken}) {
    
    const hor = Dimensions.get('window').width;
    const vert = Dimensions.get('window').height;
    const URL = "http://192.168.0.174:4040"
    const [form, setValues] = useState({
      nickname: "",
      password: "",
    });
    const [text1,setText1]=useState("")
    const [text2,setText2]=useState("")
    const [text3,setText3]=useState("")
    const [text4,setText4]=useState("")

 useEffect(()=>{
  playMusic(Pink)

 },[])
  



    const handleChange = (text,name) => {
      console.log(name,text)
      setValues({ ...form, [name]: text });
    };

 const reset =()=> {
  setText1(''),
  setText2(''),
  setText3(''),
  setText4('')
 }

    const toRegistr =  () =>{
        
       setReg(true)
           
   }

   const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('@token',JSON.stringify(token))
      console.log("newtoken", token)
      setToken(token)
    } catch (e) {

    }
  }


   
   
   const toLogin =  ()=>{
        
        setReg(false)

   
   }
   
   const login= async() =>{
    console.log("slem login")
      axios
        .post(`${URL}/users/login`, {
          nickname: form.nickname,
          password: form.password,
        })
        .then((res) => {
  
          if (res.data.ok) {
            console.log(
              " token after login:",res.data.token
            );
            storeToken(res.data.token);
            setLogged(true) 
            
          }else{
            Alert.alert("Login",`${res.data.message}`)
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

   const registr = () => {
    console.log("this is form",form);
    if (form.password === form.password2) {
      console.log("cheked")
      axios
        .post(`${URL}/users/add`, {
          email: form.email,
          password: form.password,
          password2:form.password2,
          nickname: form.nickname,
        })
        .then((res) => {
          console.log(res);
          if (res.data.ok) {
            console.log("this is token", res.data.token)
            storeToken(res.data.token)
            setLogged(true)
            }
        })
        .catch((error) => {
          console.log("oops",error);
        });
    }
  };

return(
<KeyboardAvoidingView style={styles.screen} behavior="position" >
          <TouchableWithoutFeedback style={styles.screen} onPress={Keyboard.dismiss}>
          <ImageBackground style={styles.screen} source={require("../assets/blackpaint.jpg")}>

          <View style={{flexDirection:'row',justifyContent:"space-between",marginTop:0.1*vert,height:0.2*vert,width:hor}}>
          <TouchableOpacity onPress={toLogin} style={{height:0.2*vert}} >
           <View style={{width:0.50*hor,height:0.2*vert}}>
           <ImageBackground  resizeMode='stretch' style={{width:0.5*hor,height:0.2*vert}} source={require("../assets/greensplash.png")}>
           <Text style={{fontSize:0.03*vert, color:"blue",height:"60%",paddingTop:0.07*vert,paddingLeft:0.17*hor,fontWeight:"bold"}}>Login</Text>
           </ImageBackground>
           </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={toRegistr}>
            <View style={{width:0.50*hor,height:0.20*vert}}>
            <ImageBackground  resizeMode='stretch' style={{width:0.5*hor,height:0.2*vert}} source={require("../assets/yellowsplash.png")}>
            <Text style={{fontSize:0.03*vert, color:"red",height:"60%",paddingTop:0.07*vert,paddingLeft:0.16*hor,fontWeight:"bold"}} >SighIn</Text>
            </ImageBackground>
            </View>
          </TouchableOpacity>
          </View>

           <View style={{flexDirection:"row", width:hor,height:0.4*vert,marginTop:0.15*vert,justifyContent:'space-between'}} >
          <View style={{width:0.75*hor,height:0.4*vert,justifyContent:'space-between'}}>
           <View style={{flex:1}}>            
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("../assets/thinrainbowMirror.png")}> 
          <TextInput onChangeText={text=>{setText1(text),handleChange(text,"nickname")}} value={text1} placeholder='Nickname' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}}/>
           </ImageBackground>
          </View>

          <View style={{flex:1}}> 
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("../assets/thinrainbowMirror.png")}> 
          <TextInput onChangeText={text=>{setText2(text),handleChange(text,"password")}} value={text2} placeholder='Password' placeholderTextColor="white" secureTextEntry={true} style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}} />
          </ImageBackground>
          </View>

           {reg &&
           <View style={{flex:2}}> 
           <View style={{flex:1}}> 
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("../assets/thinrainbowMirror.png")}> 
          <TextInput onChangeText={text=>{setText3(text),handleChange(text,"password2")}} value={text3} placeholder='Repeat password' placeholderTextColor="white" secureTextEntry={true} style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}} />
           </ImageBackground>
          </View>

           <View style={{flex:1}}> 
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("../assets/thinrainbowMirror.png")}> 
           <TextInput onChangeText={text=>{setText4(text),handleChange(text,"email")}} value={text4} placeholder='Email' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}}/>
           </ImageBackground>
          </View>
          </View>
          }
          </View>



          <View style={{flex:1,justifyContent:'center',height:0.8*hor,width:0.25*hor}}>
          
            <TouchableOpacity style={{flex:1}} onPress={reset}> 
                 
               <View style={{width:0.25*hor,height:0.2*hor}}>
               <ImageBackground  resizeMode='cover' style={{width:0.3*hor,height:0.4*hor}} source={require("../assets/redsplash.png")}>
                 <Text style={{fontSize:0.06*hor, color:"yellow",height:0.4*hor,width:0.3*hor,paddingTop:0.15*hor,paddingLeft:0.1*hor,fontWeight:"bold"}}>NO</Text>             
               </ImageBackground>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  style={{flex:1}}  onPress={reg? registr : login}>
             
               <View style={{width:0.25*hor,height:0.2*hor}}>
               <ImageBackground  resizeMode='cover' style={{width:0.3*hor,height:0.4*hor}} source={require("../assets/bluesplash.png")}>
               <Text style={{fontSize:0.06*hor, color:"white",height:0.4*hor,width:0.3*hor,paddingTop:"50%",paddingLeft:0.11*hor,fontWeight:"bold"}}>OK</Text> 
               </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </ImageBackground> 
        </TouchableWithoutFeedback> 
        
        </KeyboardAvoidingView>
        )

}


const styles = StyleSheet.create({
    screen:{
        height:"101%",
        width:"100%",
      },
    
})
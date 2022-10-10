import React from "react"
import { useCallback } from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, TextInput,ScrollView,Image,ImageBackground, TouchableOpacity,Dimensions } from 'react-native';
import Screensaver from "../assets/acid-lsd-trip-crop.jpeg"
import { useFonts } from 'expo-font';



let customFonts = {
    'batuphat': require('../assets/fonts/Batuphat-Script.otf')
  };



export default function Screen({setTapped}) {
    const hor = Dimensions.get('window').width;
    const vert = Dimensions.get('window').height;
   
    
      const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
    return <AppLoading />;
  }
   



return  <TouchableWithoutFeedback onPress={()=>{setTapped(true)}}>
<View style={styles.screen} >
<ImageBackground style={styles.screen} source={Screensaver}/>
  

<Text style={[styles.letter,{fontFamily:'batuphat',fontSize:0.16*vert,position:'absolute',top:"10%",left:"10%", }]} >A.</Text>
<Text style={{height:"20%",width:"40%",position:'absolute',top:"30%",left:"30%",fontSize:0.16*vert,fontWeight:"bold",textShadowColor: '#FCFF00',textShadowOffset: { width: 5, height: -5 },textShadowRadius: 1,color:"#F300BD",}}>C.</Text>
<Text style={{height:"20%",width:"40%",position:'absolute',top:"50%",left:"55%",fontSize:0.16*vert,fontWeight:"bold",textShadowColor: '#FCFF00',textShadowOffset: { width: 5, height: -5 },textShadowRadius: 1,color:"#FF0700",}}>I.</Text>
<Text style={{height:"20%",width:"40%",position:'absolute',top:"70%",left:"70%",fontSize:0.16*vert,fontWeight:"bold",textShadowColor: '#FCFF00',textShadowOffset: { width: 5, height: -5 },textShadowRadius: 1,color:"#29EE00",}}>D.</Text>
</View> 
</TouchableWithoutFeedback>
}


const styles = StyleSheet.create({
    screen:{
        height:"100%",
        width:"100%",
      },
    letter:{
        height:"20%",
        width:"40%",
        fontWeight:"bold",
        textShadowColor: '#FCFF00'
        ,textShadowOffset: { width: 5, height: -5 },
        textShadowRadius: 1,color:"#0172fd",
       
    }









})
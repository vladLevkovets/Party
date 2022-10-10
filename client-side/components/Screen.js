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
    console.log("NOT",isLoaded)
    return <AppLoading />;
  }else{
    console.log("ISLOADDED",isLoaded)
  }
   



return  <TouchableWithoutFeedback onPress={()=>{setTapped(true)}}>
<View style={styles.screen} >
<ImageBackground style={styles.screen} source={Screensaver}/>
  

<Text style={[styles.letter,{position:'absolute',top:"10%",left:"10%",fontFamily:'batuphat',fontSize:0.16*vert }]} >A.</Text>
<Text style={[styles.letter,{position:'absolute',top:"30%",left:"30%",fontFamily:'batuphat',fontSize:0.16*vert,color:"#F300BD",}]}>C.</Text>
<Text style={[styles.letter,{position:'absolute',top:"50%",left:"55%",fontFamily:'batuphat',fontSize:0.16*vert,color:"#FF0700",}]}>I.</Text>
<Text style={[styles.letter,{position:'absolute',top:"70%",left:"70%",fontFamily:'batuphat',fontSize:0.16*vert,color:"#29EE00",}]}>D.</Text>
</View> 
</TouchableWithoutFeedback>
}


const styles = StyleSheet.create({
    screen:{
        height:"100%",
        width:"100%",
      },
    letter:{
        paddingTop:"5%",
        height:"40%",
        width:"40%",
        fontWeight:"bold",
        textShadowColor: '#FCFF00'
        ,textShadowOffset: { width: 5, height: -5 },
        textShadowRadius: 1,color:"#0172fd",
       
    }









})
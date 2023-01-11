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
  

<Text style={[styles.letter,{position:'absolute',top:"12%",left:"5%",fontFamily:'batuphat',fontSize:0.15*vert }]} >A.</Text>
<Text style={[styles.letter,{position:'absolute',top:"32%",left:"25%",fontFamily:'batuphat',fontSize:0.16*vert,color:"#F300BD",}]}>C.</Text>
<Text style={[styles.letter,{position:'absolute',top:"52%",left:"48%",fontFamily:'batuphat',fontSize:0.16*vert,color:"#FF0700",}]}>I.</Text>
<Text style={[styles.letter,{position:'absolute',top:"72%",left:"60%",fontFamily:'batuphat',fontSize:0.16*vert,color:"#29EE00",}]}>D.</Text>
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
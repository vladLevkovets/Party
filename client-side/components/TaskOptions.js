import React from "react";
import {StyleSheet, View,Text, TouchableOpacity,  } from "react-native";
import { useState,useEffect} from 'react';
import JWT from 'expo-jwt';
import {JWT_SECRET} from "../config.js"
import axios from 'axios';


export default function Task ({token,item,setItem,setShowItem,makeTodos,event}){
const URL = "http://192.168.0.174:4040"


let data =JWT.decode(token, JWT_SECRET);
    console.log(data)
    let user=data.nickname

const mark =(mark)=>{
    console.log(item._id)
    axios
    .post(`${URL}/todos/update`, {_id:item._id,status:mark,name:user})
   
    .then ((res)=>{
     if (res.data.ok){
        console.log("ok")
        makeTodos(item.event_id,event)
        if (mark==="booked"){
            console.log("booked")

        setItem(prev=>({...prev,status:"booked",booked:true,bookedBy:user}))
        
     }else if (mark==="done"){
         console.log("done")
      
        setItem(prev=>({...prev,status:"done",done:true,doneBy:user})) 
                       
     }
   
    }})
    .catch((error) => {
     console.log(error);
   })





}    


return  <View style={item.status==="booked" ?styles.singleBooked :item.status==="done" ?styles.singleDone :item.status==="suggested" ?styles.singleSug :styles.single}>
    <View style={styles.singleTop}><Text style={styles.singleName}>{item.task}</Text></View> 
                    
        <View style={styles.singleList}>
            <View style={styles.secondary}>
              <Text style={styles.title}>Status:</Text>
              <Text style={styles.content}>{item.status}</Text>
            </View>

            <View style={styles.primary}>
              <Text style={styles.title}>Booked:</Text>
              <Text style={item.booked ?styles.contentYes :styles.contentNo}>{item.booked ?"Yes" :"No"}</Text>
            </View>

            
            <View style={styles.secondary} >
              <Text style={styles.title}>{item.booked &&"BookedBy:"}</Text>
              
              <Text style={styles.content}>{item.bookedBy}</Text>
            </View>

            <View style={styles.primary} >
              <Text style={styles.title}>Done:</Text>
              <Text style={item.done ?styles.contentYes :styles.contentNo}>{item.done ?"YES" :"Not yet"}</Text>
            </View>

            
            <View style={styles.secondary} >
              <Text style={styles.title}>{item.done &&"DoneBy:"}</Text>
              <Text style={styles.content}>{item.doneBy}</Text>
            </View>

            <View style={styles.secondary}>
            {item.suggested && 
            <Text style={styles.content}>Suggested and voted</Text>}
            {/* {item.voted && item.status==="wait" &&
            <Text>and voted</Text>} */}
            </View>  

        </View>
        
        <View style={styles.listBtns}>           
            <TouchableOpacity onPress={()=>{setShowItem(false)}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity> 
           {!item.booked && !item.done &&
               <TouchableOpacity onPress={()=>{mark("booked")}} style={styles.book}><Text style={styles.bookText}>BOOK</Text></TouchableOpacity> 
           }
            {!item.done &&
            <TouchableOpacity onPress={()=>{mark("done")}} style={styles.done}><Text style={styles.btnsText}>DONE</Text></TouchableOpacity>
            }
        </View> 
</View>

}


const styles=StyleSheet.create({
    single:{
        paddingTop:40,
        backgroundColor:"#ff0000",
        position:"absolute" ,
        height:"100%",
        width:"100%",
        zIndex:1,
       },
    singleBooked:{
        paddingTop:40,
        backgroundColor:"yellow",
        position:"absolute" ,
        height:"100%",
        width:"100%",
        zIndex:1,
       }, 
    singleDone:{
        paddingTop:40,
        backgroundColor:"#00e600",
        position:"absolute" ,
        height:"100%",
        width:"100%",
        zIndex:1,
       },
    // singleSug:{
    //     paddingTop:40,
    //     backgroundColor:"#c1c1a4",
    //     position:"absolute" ,
    //     height:"100%",
    //     width:"100%",
    //     zIndex:1,
    //    },             
    singleTop:{
        marginLeft:"5%", 
        width:"90%",
        height:60,  
        backgroundColor:"#005bff",
        borderRadius:20,
        textAlign:'center',
        justifyContent:"center",
       },
    singleName:{
        width:"90%",
        color:"yellow",
        paddingLeft:10,
        fontSize:20,
       },
    singleList:{
        textAlign: 'center',
        width:"90%",
        borderWidth:1,
        height:"80%",
        backgroundColor:"#cce8e4ff",
        borderRadius:20,
        margin:"5%",
        marginTop:5,
        marginBottom:10,
       },
    secondary:{
       flexDirection:"row",
       width:"100%",
       height:"15%"
    },
    primary:{
        flexDirection:"row",
        width:"100%",
        height:"6%"
     },
    title:{
       width:"50%",
       height:"100%",
       fontSize:25,
       fontWeight:"bold",
    },
    content:{
        width:"50%",
        height:"100%",
        fontSize:25,
        fontWeight:"bold",
        color:"black"
    },
    contentYes:{
        width:"50%",
        height:"100%",
        fontSize:25,
        fontWeight:"bold",
        color:"#00e600"
    },
    contentNo:{
        width:"50%",
        height:"100%",
        fontSize:25,
        fontWeight:"bold",
        color:"red"
    },
    listBtns:{
        justifyContent:"space-around",
        flexDirection:"row",
        height:40,
        width:"100%"
       }, 
    btnsText:{
        width:"80%",
        textAlign:'center',
        fontSize:14,
        color:"white",       
       }, 
    bookText:{
        width:"80%",
        textAlign:'center',
        fontSize:14,
        color:"black",       
       },       
    done:{
        paddingLeft:"5%",
        width:"30%",
        height:"60%",
        backgroundColor:"green",
        justifyContent:"center",
        borderRadius:15,
       },
    back:{
        paddingLeft:"5%",
        width:"30%",
        height:"60%",
        backgroundColor:"grey",
        justifyContent:"center",
        borderRadius:15,
       },
    book:{
        paddingLeft:"5%",
        width:"30%",
        height:"60%",
        backgroundColor:"yellow",
        justifyContent:"center",
        borderRadius:15,
       },   








})
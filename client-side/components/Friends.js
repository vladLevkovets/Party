import { StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableWithoutFeedback,Image,TextInput, Alert, Button } from 'react-native';
import { useState,useEffect} from 'react';
import JWT from 'expo-jwt';
import {JWT_SECRET} from "../config.js"
import axios from 'axios';







export default function Friends ({token,verify_token,showFriends,setShowFriends}) {
const [friends,setFriends]=useState([])
const [find,setFind]=useState("")
const URL = "http://192.168.0.174:4040"
// const [text,setText]=useState("")




const getFriends= async  ()=>{
  
    let data =JWT.decode(token, JWT_SECRET);
    console.log(data)
    let nickname=data.nickname
    console.log(nickname)
  axios
    .get(`${URL}/users/${nickname}`)

    .then((res)=>{
      if (res.data.ok){
        console.log(res.data)
        
         setFriends([...res.data.user.friends])
  
      }
    }).catch((error) => {
      console.log("error",error);
    })
}

const addFriend = async()=>{
    let user =JWT.decode(token, JWT_SECRET);
    console.log(user)
    let nickname=user.nickname
    console.log(nickname)
     let list =friends
     console.log(list)
     list.push({name:find,nickname:find})
     console.log(list)
  axios
     .post(`${URL}/users/update`, {
        nickname:nickname,
        friends:list
        }) 
    .then((res) => {
             console.log(res.data)
            if (res.data.ok) {
                setFriends([...res.data.user.friends])
            }
          })
    .catch((error) => {
            console.log(error);
          })
      
}


const findFriend=() =>{
    console.log(find)
    axios
    .get(`${URL}/users/${find}`)

    .then((res)=>{
        console.log(res)
      if (res.data.ok){
        Alert.alert("You have found you friend", "Whant to add he/she to friendlist",[{
            text: "Yes",
            onPress: () => {    
            addFriend(find)
            }},
            {
              text: "No",
              onPress: ()=> {
                setFind("")
              }
            },]) 
  
      }else {
        Alert.alert("Doesn`t match with any user","Make sure that nickname is correct ")
      }
    }).catch((error) => {
      console.log(error);
    })

}


// const addFriend = async()=>{
//     let user =JWT.decode(token, JWT_SECRET);
//     console.log(data)
//     let nickname=user.nickname
//     console.log(user.nickname)
//      let list =[...friends]
//      console.log(list)
//      list.push({name:find,nickname:find})
//   axios
//      .post(`${URL}/users/update`, {
//         nickname:nickname,
//         friends:list
//         }) 
//     .then((res) => {
  
//             if (res.data.ok) {
//                 setFriends([...res.data.friends])
//             }
//           })
//     .catch((error) => {
//             console.log(error);
//           })
        
// }

const friendList = () => {
    console.log(friends)
   if (friends.length !==0){
   return friends.map((friend, idx)=>{
      return  <View style={styles.box} key={idx}>
                  <Text
                    numberOfLines={1} 
                    style={styles.task} >{friend.name}
                  </Text>
                 
              </View>
    })
  }  
  }

  useEffect(()=>{
    if (showFriends){
    getFriends()}
   },[showFriends]) 


return <View style={styles.single}>
       <View style={styles.inputBox}>
       <TextInput style={styles.input} placeholder="find a friend" onChangeText={(text)=>setFind(text)} value={find} ></TextInput>
       <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={()=>{findFriend()}}>
                         <View style={styles.makeTask} >
                         
                         <Image source={require("../assets/istockphoto-1191442137-170667a.jpg")} style={styles.buttonPic}/>
                         </View>
        </TouchableWithoutFeedback >                 
       </View>
       <ScrollView style={styles.text}>
                {friendList()}
        </ScrollView> 
        <View style={styles.listBtns}>
        <TouchableOpacity onPress={()=>{setShowFriends(false)}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{setShowFriends(false)}} style={styles.back}><Text style={styles.btnsText}>SENT TO</Text></TouchableOpacity>
        </View>    

































</View>





























}





const styles = StyleSheet.create({
  
    
  
    single:{
        paddingTop:30,
        backgroundColor:"#ff0000",
        position:'absolute',
        height:"100%",
        width:"100%",
        zIndex:1,
    }, 
    text:{    
        textAlign: 'center',
        borderRadius:20,
        backgroundColor:'#ff00eb',
        color: '#cdf104',
        fontSize:30,
        height:"100%",
        width:"100%",
        marginTop:10,
        }, 
    box:{
        marginTop:0,marginHorizontal:10,flexDirection:"row",paddingLeft:10 ,borderRadius:20,height:40,backgroundColor:"#ff0909",
    },      
    task:{
        paddingTop:9,fontSize:16,width:"90%",color:"white",paddingLeft:3 ,borderRadius:30,height:40,backgroundColor:"#ff0909",
    },
    inputBox:{ 
        width:"100%",
        height:"10%",
        flexDirection:"row",
        borderRadius:20,
        backgroundColor:"#abb7b9"
      },
    input :{
        fontSize:16,
        width:"85%",
        paddingLeft:10 ,
        borderRadius:20,
        height:"100%",
        backgroundColor:"#abb7b9",
      },
      makeTask:{
        textAlign:'center',
        marginTop:10,
        marginRight:0,
        fontSize:20,
        width:"12%",
        height:"60%",
        borderRadius:30,
        backgroundColor:"green",
        color:"white"
      },
      buttonPic:{
        fontSize:20,
        width:"100%",
        height:"100%",
        borderRadius:30,
      }, 
    listBtns:{
        marginTop:10,
        justifyContent:"space-around",
        flexDirection:"row",
        height:40,
        width:"100%"
       }, 
    btnsText:{
        width:"80%",      
        fontSize:15,
        color:"white",
        textAlign:'center'
    }, 
    back:{
        paddingLeft:"5%",
        width:"30%",
        height:"60%",
        backgroundColor:"blue",
        borderRadius:15,
        justifyContent:"center",
        textAlign:'center'
    },     
    
})  
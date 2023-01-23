import { StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableWithoutFeedback,Image,TextInput, Alert } from 'react-native';
import { useState,useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import JWT from 'expo-jwt';
import {JWT_SECRET} from "../config.js"
import axios from 'axios';







export default function Friends ({token,verify_token,showFriends,setShowFriends}) {
const [friends,setFriends]=useState([])
const [find,setFind]=useState("")
const[form,setForm]=useState([])
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
                setFind("")
            }
          })
    .catch((error) => {
            console.log(error);
          })
      
}


const findFriend=() =>{
    console.log(find)
    let ind=friends.findIndex(man=>man.nickname===find)
    if(ind!==(-1)){
      Alert.alert("You have found you friend", "He/she is already in your list")
      setFind("")
    }else
    axios
    .get(`${URL}/users/${find}`)

    .then((res)=>{
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

const removeFriend = (idx) => {
  let user =JWT.decode(token, JWT_SECRET);
  console.log(user)
  let nickname=user.nickname
  console.log(nickname)
  let list = [...friends] 
  list.splice(idx,1) 
axios
 .post(`${URL}/users/update`, {
  nickname:nickname,
  friends:list
  }) 

 .then ((res)=>{
  if (res.data.ok)
  setFriends([...list])
  
 })
 .catch((error) => {
  console.log(error);
})



}

const alarm =(idx) =>{
  
  Alert.alert("Are you sure?", "This action will remove your friend from list",[{
    text: "Yes",
    onPress: () => {
    removeFriend(idx)
    }},
    {
      text: "No",
    },]
  )}

const select =(idx)=>{
  let temp=[...friends]
console.log(idx)
if(idx>=0){  
  temp[idx].status=!temp[idx].status
  setFriends(temp)
  console.log(friends)
if (temp[idx].status==true){
  form.push(temp[idx].nickname)
  console.log(form)
}else{
  let i=form.indexOf(temp[idx].nickname)
  form.splice(i,1)
  console.log(i,form)
}
}else{
  console.log(form)
  if (form.length>0){
  temp.forEach(el=>{
  el.status=false
  let i=form.indexOf(el.nickname)  
  form.splice([i,1])
  console.log(form)})
  setFriends(temp)
  }else{
    console.log(form)
    temp.forEach(el=>{
      el.status=true
      form.push(el.nickname)
    })   
  setFriends(temp)
  console.log(form)
  }
}
}

const friendList = () => {
    console.log(friends)
   if (friends.length !==0){
   return friends.map((friend, idx)=>{
     return  <View style={friend.status ?styles.selected :styles.box} key={idx}> 
                  <View style={styles.taskBox}>
                  <TouchableOpacity onPress={()=>select(idx)}>
                  <Text 
                    numberOfLines={1} 

                    style={friend.status ?styles.selTask :styles.task} >{friend.name}
                  </Text>
                  </TouchableOpacity>
                  </View>
                    
                  <View style={styles.delTask}>
                  <TouchableWithoutFeedback
                      onPress={( ) => alarm(idx)}>
                     <Text style={styles.delButton}>X</Text>
                     
                  </TouchableWithoutFeedback>
                  </View>
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
        <TouchableOpacity onPress={()=>select()} style={styles.back}><Text style={styles.btnsText}>Mark all</Text></TouchableOpacity>
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
        marginTop:5,marginHorizontal:10,flexDirection:"row",paddingLeft:10 ,borderRadius:20,height:40,backgroundColor:"#ff0909",
    }, 
    selected:{
      marginTop:5,marginHorizontal:10,flexDirection:"row",paddingLeft:10 ,borderRadius:20,height:40,backgroundColor:"green",
  },   
    taskBox:{width:"90%",height:40,}, 
    task:{
        paddingTop:9,fontSize:16,width:"100%",color:"white",paddingLeft:3 ,borderRadius:30,height:40,backgroundColor:"#ff0909",
    },
    selTask:{
      paddingTop:9,fontSize:16,width:"100%",color:"white",paddingLeft:3 ,borderRadius:30,height:40,backgroundColor:"green",
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
    delTask:{
      textAlign:'center',
      justifyContent:"center",
       marginTop:1,
       marginRight:5,
       fontSize:20,
       width:35,
       height:35,
       borderRadius:20,
       backgroundColor:"black",
       color:"white"},
  delButton:{
    textAlign:'center',
    marginLeft:2,
    fontSize:17,
    width:30,
    borderRadius:20,
    backgroundColor:"black",
    color:"white"},    
    
})  
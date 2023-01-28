import { StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableWithoutFeedback,Image,TextInput, Alert, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useState,useEffect} from 'react';
import JWT from 'expo-jwt';
import {JWT_SECRET} from "../config.js"
import axios from 'axios';







export default function Friends ({token,verify_token,showFriends,setShowFriends,list,eventId,partys,getEvents}) {
const [friends,setFriends]=useState([])
const [find,setFind]=useState("")
const [contact,setContact]=useState("")
const [prompt,setPrompt]=useState(false)
const URL = "http://192.168.0.174:4040"
const [newUserId,setNewUserId]=useState("")
const [form,setForm]=useState([])

console.log(partys)
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

const addFriend = async(id)=>{
  if(prompt && contact===""){
    Alert.alert("Save as ...","type contact name")
  }else {
    let user =JWT.decode(token, JWT_SECRET);
    console.log(user)
    let nickname=user.nickname
    console.log(nickname)
    let list =friends
    console.log(list)
    console.log(newUserId) 
    if (prompt){
    list.push({name:contact,nickname:find,user_id:newUserId})
    console.log(list)
    }else{
      list.push({name:find,nickname:find,user_id:id})
      console.log(list) 
    }

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
                setContact("")
                setPrompt(false)
                
            }
          })
    .catch((error) => {
            console.log(error);
          })
  }   
}


const findFriend=() =>{
    let user =JWT.decode(token, JWT_SECRET);
  if (user.nickname===find){
      Alert.alert("It is YOUR name", "try to find some friend")
      setFind("")
    }else{
    console.log(friends,find)
    let ind=friends.findIndex(man=>man.nickname===find)
    console.log(ind);
    if(ind!==(-1)){
      Alert.alert("You have found you friend", `He/she is already in your list as ${friends[ind].name} `)
      setFind("")
    }else
    axios
    .get(`${URL}/users/${find}`)

    .then((res)=>{
      if (res.data.ok){
        console.log(res.data.user._id)
            setNewUserId(res.data.user._id)
            console.log(newUserId)
        Alert.alert("You have found your friend", `want to save contact as ${find} ?`,[{
            text: "Yes",
            onPress: () => {   
            addFriend(res.data.user._id)
            }},
            {
              text: "change contact name",
              onPress: () => { 
              setPrompt(true)
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
    form.push({user_id:temp[idx].user_id,status:"invited"})
     console.log(form)
  }else{
  let i=form.findIndex(el=>el.user_id===temp[idx].user_id)
  form.splice(i,1)
  console.log(i,form)
  
  }
}else{
  console.log(form)
  if (form.length>0){
     temp.forEach(el=>{
     el.status=false
    //  let i=form.indexOf(el.user_id)  
    //  form.splice([i,1])
    console.log(form)})
     setForm([])
     setFriends(temp)
  }else{
    console.log(form)
    temp.forEach(el=>{
      el.status=true
      form.push({user_id:el.user_id,status:"invited"})
    })   
  setFriends(temp)
  console.log(form,friends)
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
    if (showFriends ){
    getFriends()}
},[showFriends]) 



const share=()=>{
  
  console.log(partys,eventId)
  let i=partys.findIndex(el=>el._id===eventId)
  console.log(partys[i].users)
  let list =[] 
  form.forEach(el=>{
    if(partys[i].users.findIndex(man=>man.user_id===el.user_id)===-1){
       list.push(el)
    }
  }) 
  console.log (list)
   axios
      .post(`${URL}/events/update`, {
        _id:eventId,
        users:list
        }) 
        
        .then ((res)=>{
          if (res.data.ok)
          getEvents()
          setShowFriends(false)
          Alert.alert("Your invitation send")
          
         })
         .catch((error) => {
          console.log(error);})
}

return <View style={styles.single}>
  
       <View style={styles.inputBox}>
       <TextInput style={styles.input} placeholder="find a friend" onChangeText={(text)=>setFind(text)} value={find} ></TextInput>
       <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={()=>{findFriend()}}>
                         <View style={styles.makeTask} >
                         
                         <Image source={require("../assets/istockphoto-1191442137-170667a.jpg")} style={styles.buttonPic}/>
                         </View>
        </TouchableWithoutFeedback >                 
       </View>
       
       <View style={prompt ?styles.prompt :{height:0}}>
       <TextInput style={prompt?styles.input :{width:0}} placeholder="Contact name" onChangeText={(text)=>setContact(text)} defaultValue={find} value={contact} ></TextInput>
          <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={()=>{Keyboard.dismiss();addFriend()}}>
                         <View style={styles.makeTask} >
                         
                         <Image source={require("../assets/istockphoto-1191442137-170667a.jpg")} style={styles.buttonPic}/>
                         </View>
          </TouchableWithoutFeedback >                 
       </View>     
  
       <ScrollView style={styles.text}>
                {friendList()}
        </ScrollView> 
        {/* {list */}
        <View style={list?styles.listBtns :styles.oneBtn }>
        <TouchableOpacity onPress={()=>{setShowFriends(false)}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>select()} style={list ?styles.mark :{width:0}}><Text style={styles.btnsText }>MARK ALL</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>share()} style={list ?styles.sent :{width:0}}><Text style={styles.btnsText}>SENT TO</Text></TouchableOpacity>
        </View>

         {/* :<View style={styles.oneBtn}>
         <TouchableOpacity onPress={()=>{setShowFriendList(false)}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity>
        
         </View>
        } */}































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
    prompt: { 
      marginTop:2,
      width:"100%",
      height:"10%",
      flexDirection:"row",
      borderRadius:20,
      backgroundColor:"#abb7b9",
      
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
    oneBtn:{
        marginTop:10,
        justifyContent:"center",
        flexDirection:"row",
        height:40,
        width:"100%"
       },    
    btnsText:{
        width:"80%",      
        fontSize:14,
        color:"white",
        textAlign:'center'
    }, 
    back:{
        paddingLeft:"5%",
        width:"30%",
        height:"60%",
        backgroundColor:"grey",
        borderRadius:15,
        justifyContent:"center",
        textAlign:'center'
    }, 
    mark:{
      paddingLeft:"5%",
      width:"30%",
      height:"60%",
      backgroundColor:"green",
      borderRadius:15,
      justifyContent:"center",
      textAlign:'center'
    },
    sent:{
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
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


  const getFriends= async  ()=>{  
    let data =JWT.decode(token, JWT_SECRET);
    let nickname=data.nickname

    axios
      .get(`${URL}/users/${nickname}`)

      .then((res)=>{
        if (res.data.ok){        
          setFriends([...res.data.user.friends])  
        }
      })
      .catch((error) => {
      console.log("error",error);
      })
  }

  const addFriend = async(id)=>{
    if(prompt && contact===""){
      Alert.alert("Save as ...","type contact name")
    }
    else {
      let user =JWT.decode(token, JWT_SECRET);
      let nickname=user.nickname
      let list =friends

      if (prompt){
        list.push({name:contact,nickname:find,user_id:newUserId})
      }
      else{
      list.push({name:find,nickname:find,user_id:id})
      }

      axios
        .post(`${URL}/users/update`, {
          nickname:nickname,
          friends:list
      
        }) 
        .then((res) => {
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
    }
    else{
      let ind=friends.findIndex(man=>man.nickname===find)
      console.log(friends,ind)
      
      if(ind!==(-1)){
        Alert.alert("You have found you friend", `He/she is already in your list as ${friends[ind].name} `)
        setFind("")
      }
      else{

        axios
        .get(`${URL}/users/${find}`)

        .then((res)=>{
          if (res.data.ok){
            setNewUserId(res.data.user._id)
            Alert.alert("You have found your friend", `want to save contact as ${find} ?`,
              [
                {
                  text: "Yes",
                  onPress: () => {   
                    addFriend(res.data.user._id)
                  }
                },
                {
                  text: "change contact name",
                  onPress: () => { 
                    setPrompt(true)
                  }
                },
                {
                  text: "No",
                  onPress: ()=> {
                    setFind("")
                  }
                }
              ]
            )   
          }
          else {
            Alert.alert("Doesn`t match with any user","Make sure that nickname is correct ")
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  }

  const removeFriend = (idx) => {
    let user =JWT.decode(token, JWT_SECRET);
    let nickname=user.nickname
    let list = [...friends] 
    list.splice(idx,1) 

    axios
    .post(`${URL}/users/update`, {
      nickname:nickname,
      friends:list
    }) 

    .then ((res)=>{
      if (res.data.ok){
        setFriends([...list]) 
      } 
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const alarm =(idx) =>{
  
    Alert.alert("Are you sure?", "This action will remove your friend from list",
      [
        {
          text: "Yes",
          onPress: () => {
            verify_token(),  
            removeFriend(idx)
          }
        },
        {
          text: "No",
        }
      ]
    )
  }

  const select =(idx)=>{
    let temp=[...friends]

    if(idx>=0){  
      temp[idx].status=!temp[idx].status
      setFriends(temp)
      if (temp[idx].status==true){
        form.push({user_id:temp[idx].user_id,status:"invited"}) 
      
      }
      else{
        let i=form.findIndex(el=>el.user_id===temp[idx].user_id)
        form.splice(i,1) 
      }
    }
    else{
      if (form.length>0){
        temp.forEach(el=>{
          el.status=false
        })
        setForm([])
        setFriends(temp)
      }
      else{
        temp.forEach(el=>{
          el.status=true
          form.push({user_id:el.user_id,status:"invited"})
        })   
        setFriends(temp)
      }
    }
  }

  const friendList = () => {
    if (friends.length !==0){
      return  friends.map((friend, idx)=>{
                return  <View style={friend.status ?styles.selected :styles.box} key={idx}> 
                          <View style={styles.taskBox}>
                            <TouchableOpacity onPress={()=>select(idx)}>
                              <Text numberOfLines={1} style={friend.status ?styles.selTask :styles.task} >{friend.name}</Text>
                            </TouchableOpacity>
                          </View>
                    
                          <View style={styles.delTask}>
                            <TouchableWithoutFeedback onPress={( ) => alarm(idx)}>
                              <Text style={styles.delButton}>X</Text>                     
                            </TouchableWithoutFeedback>
                          </View>
                        </View>
              })
    }     
  }

  useEffect(()=>{  
      if (showFriends ){
        verify_token(),  
        getFriends()
      }
    },
    [showFriends]
  ) 

  const share=()=>{
    let i=partys.findIndex(el=>el._id===eventId)
    let list =[] 
    form.forEach(el=>{
      if(partys[i].users.findIndex(man=>man.user_id===el.user_id)===-1){
        list.push(el)
      }
    }) 

    axios
      .post(`${URL}/events/update`, {
        _id:eventId,
        users:list,
        version:"add"
      }) 
        
      .then ((res)=>{
        if (res.data.ok)
          getEvents()
          setShowFriends(false)
          Alert.alert("Your invitation sent")          
      })
      .catch((error) => {
        console.log(error);})
  }

  return  <View style={styles.single}>
  
            <View style={styles.inputBox}>
              <TextInput style={styles.input} placeholder="Find a friend" onChangeText={(text)=>setFind(text)} value={find} ></TextInput>
              <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={()=>{verify_token(),findFriend()}}>
                <View style={styles.makeTask}>                         
                  <Image source={require("../assets/istockphoto-1191442137-170667a.jpg")} style={styles.buttonPic}/>
                </View>
              </TouchableWithoutFeedback >                 
            </View>
       
            <View style={prompt ?styles.prompt :{height:0}}>
              <TextInput style={prompt?styles.input :{width:0}} placeholder="Contact name" onChangeText={(text)=>setContact(text)} defaultValue={find} value={contact} ></TextInput>
              <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={()=>{Keyboard.dismiss();verify_token(),addFriend()}}>
                <View style={styles.makeTask} >                         
                  <Image source={require("../assets/istockphoto-1191442137-170667a.jpg")} style={styles.buttonPic}/>
                </View>
              </TouchableWithoutFeedback >                 
            </View>     
  
            <ScrollView style={styles.text}>
                {friendList()}
            </ScrollView> 
        
            <View style={list?styles.listBtns :styles.oneBtn }>
              <TouchableOpacity onPress={()=>{setShowFriends(false)}} style={styles.back}>
                <Text style={styles.btnsText}>BACK</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>select()} style={list ?styles.mark :{width:0}}>
                <Text style={styles.btnsText }>MARK ALL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{verify_token(),share()}} style={list ?styles.sent :{width:0}}>
                <Text style={styles.btnsText}>SEND TO</Text>
              </TouchableOpacity>
            </View>
          </View>


}





const styles = StyleSheet.create({  
  single:{
    paddingHorizontal:10,
    paddingTop:30,
    backgroundColor:"yellow",
    position:'absolute',
    height:"100%",
    width:"100%",
    zIndex:1
  }, 
  text:{    
    textAlign: 'center',
    borderRadius:20,
    backgroundColor:'blue',
    color: '#cdf104',
    fontSize:30,
    height:"100%",
    width:"100%",
    marginTop:10
  }, 
  box:{
    marginTop:5,
    marginHorizontal:10,
    flexDirection:"row",
    paddingLeft:10 ,
    borderRadius:20,
    height:40,
    backgroundColor:"#ff0909"
  }, 
  selected:{
    marginTop:5,
    marginHorizontal:10,
    flexDirection:"row",
    paddingLeft:10,
    borderRadius:20,
    height:40,
    backgroundColor:"#00cc00"
  },   
  taskBox:{
    width:"90%",
    height:40
  }, 
  task:{
    paddingTop:9,
    fontSize:16,
    width:"100%",
    color:"white",
    paddingLeft:3,
    borderRadius:30,
    height:40
  },
  selTask:{
    paddingTop:9,
    fontSize:16,
    width:"100%",
    color:"white",
    paddingLeft:3,
    borderRadius:30,
    height:40
  },
  inputBox:{ 
    width:"100%",
    height:"10%",
    flexDirection:"row",
    borderRadius:20,
    backgroundColor:"#abb7b9"
  },
  prompt:{ 
    marginTop:2,
    width:"100%",
    height:"10%",
    flexDirection:"row",
    borderRadius:20,
    backgroundColor:"#abb7b9"     
  }, 
  input:{
    fontSize:16,
    width:"85%",
    paddingLeft:10 ,
    borderRadius:20,
    height:"100%",
    backgroundColor:"#abb7b9"
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
    borderRadius:30
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
    backgroundColor:"#00cc00",
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
    color:"white"
  },
  delButton:{
    textAlign:'center',
    marginLeft:2,
    fontSize:17,
    width:30,
    borderRadius:20,
    backgroundColor:"black",
    color:"white"
  }    
    
})  
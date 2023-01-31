import { StyleSheet, Text, View, ScrollView, TouchableOpacity,TouchableWithoutFeedback,Dimensions, Alert } from 'react-native';
import { useState,useEffect} from 'react';
import JWT from 'expo-jwt';
import {JWT_SECRET} from "../config.js"
import axios from 'axios';
import Friends from "./Friends.js"





export default function Left ({token,logout,verify_token}) {
    const [showList,setShowList]=useState(false)
    const [progress,setProgress]=useState("0%")
    const [partys,setPartys]=useState([])
    const [invited,setInvited]=useState([])
    const [event,setEvent]=useState("")
    const [todos,setTodos]=useState([])
    const [showFriends,setShowFriends]=useState(false)
    const [choose,setChoose]=useState("")
    const URL = "http://192.168.0.174:4040"
    

  const getEvents =async ()=>{
    let data =JWT.decode(token, JWT_SECRET);
    console.log(data)
    let id=data._id
    console.log(id)

    axios
    .get(`${URL}/events/find/${id}+invited+guest`)

    .then((res)=>{
      if (res.data.ok){ 
        console.log(res.data)       
         setPartys([ ...res.data.partys])
         setInvited([...res.data.invitations])
      }
    }).catch((error) => {
      console.log(error);
    })

  }

 useEffect(()=>{
  console.log(token)
 getEvents()
},[token])



    const showMy=()=>{
    
     return   partys.map((el,i)=>{
                  
              return <TouchableOpacity key={i} style={styles.party} onPress={()=>{makeTodos(el._id,el.name)}}><Text style={styles.eventName}>{el.name}</Text><Text style={styles.eventProgress}>{progress}</Text></TouchableOpacity>
              })
              
    }
    
    const showAnother=()=>{
      return   invited.map((el,i)=>{
                  
        return <TouchableOpacity key={i} style={styles.waiting} onPress={()=>{
          Alert.alert(`You are invited to party ${event}`, "do you want take a part ?", [{
            text: "Yes",
            onPress: () => {
              changeStatus(el._id,el.name,"yes")
               }},
               {
                   text: "No",
                   onPress: () => {
                    changeStatus(el._id,el.name,"no")}
                     }])
                }}>
          <Text style={styles.eventName}>{el.name}</Text><Text style={styles.eventProgress}>{progress}</Text></TouchableOpacity>
        })
    }
  
  
    const makeTodos =async(event_id,event)=>{
    axios
    .get(`${URL}/todos/find/${event_id}`)

    .then((res)=>{
      if (res.data.ok){
        console.log(res)
        console.log(res.data.tasks)
        
         setTodos([...res.data.tasks])
         setEvent(event)
         setShowList(true)
      }
    }).catch((error) => {
      console.log(error);
    })

  }

const changeStatus = async(event_id,event,choose)=>{
 let i= invited.findIndex(el=>el._id===event_id)
 let data =JWT.decode(token, JWT_SECRET);
 let id=data._id
 let list=[...invited]
 let y=list[i].users.findIndex(man=>man.user_id===id)
//  Alert.alert(`You are invited to party ${event}`, "do you want take a part ?", [{
//    text: "Yes",
//    onPress: () => {
//      setChoose(true)
//     }},
//     {
//       text: "No",
//       onPress: () => {
//         setChoose(false)}
//       }])
      console.log(i,data,id,list,list[i].users[y])
 if (choose=="yes"){
  console.log(list[i].users[y])
    list[i].users[y].status="guest"
    console.log(list[i].users[y])
    list=list[i].users
    console.log(list)
    axios
    .post(`${URL}/events/update`, {
      _id:event_id,
       users:list,
       version:"change"
     }) 
  
    .then ((res)=>{
      if (res.data.ok)
      Alert.alert("now you can help prepare party")
      getEvents()
    })

   .catch((error) => {
    console.log(error);}) 


  } else if (choose=="no"){

    list[i].users.splice(y,1)
    list=[...list,...partys]

    axios
    .post(`${URL}/events/update`, {
     _id:event_id,
     users:list
    }) 
  
   .then ((res)=>{
     if (res.data.ok)
     Alert.alert("as you wish")
     getEvents()
     })
   .catch((error) => {
     console.log(error);})


  }    

}



const showTodos = () => {
    console.log(todos)
return todos.map((todo, idx)=>{
      return  <View style={styles.box} key={idx}>
                  <Text
                    numberOfLines={1} 
                    style={styles.task} >{todo.task}
                  </Text>
                  <TouchableWithoutFeedback
                      onPress={( ) => removeTodo(idx)}>
                     <Text style={styles.delTask}>Options</Text>
                     
                      </TouchableWithoutFeedback>
                
              </View>
    })
  }
 



return   showList && showFriends
            ? <Friends token={token} verify_token={verify_token} showFriends={showFriends} setShowFriends={setShowFriends} v/>
            
            : showList
              ? <View style={styles.single}>
                    <View style={styles.singleTop}><Text style={styles.singleName}>{event}</Text></View> 
                    <View style={styles.singleText}><ScrollView style={styles.singleList}>{showTodos()}</ScrollView></View>
                    <View style={styles.listBtns}>
                          <TouchableOpacity onPress={()=>{setShowList(false)}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity> 
                          <TouchableOpacity onPress={()=>{}} style={styles.back}><Text style={styles.btnsText}>SUGGEST</Text></TouchableOpacity> 
                          <TouchableOpacity onPress={()=>{logout()}} style={styles.delete}><Text style={styles.btnsText}>DELETE</Text></TouchableOpacity>
                    </View> 
             </View>

            : <View style={styles.mid}>
                <ScrollView style={styles.text}>
                {showAnother()}
                {showMy()}
                </ScrollView> 
                {/* <View style={styles.text}>{showMy()}</View> */}
              </View>

}


const styles=StyleSheet.create({
mid:{
    paddingHorizontal:"3%",
    paddingTop:"4%",
    paddingBottom:"7%",
    palignItems:'center',
    justifyContent: 'center',
    height:"84%",
    width:"100%",
    backgroundColor: "#005bff",
    },
text:{    
    textAlign: 'center',
    borderRadius:20,
    backgroundColor:'#ff00eb',
    color: '#cdf104',
    fontSize:30,
    height:"100%",
    width:"100%",
    }, 
box:{
      marginTop:5,marginHorizontal:3,flexDirection:"row",paddingLeft:10 ,borderRadius:20,height:40,backgroundColor:"#ff0909",},      
task:{
        paddingTop:5,fontSize:16,width:"70%",color:"white",paddingLeft:3 ,borderRadius:30,height:40,backgroundColor:"#ff0909",},
delTask:{
          textAlign:'center',marginTop:5,marginRight:5,fontSize:20,width:"30%",height:30,borderRadius:20,backgroundColor:"black",color:"white"},
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
    height:"90%",
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
listBtns:{
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

},     
delete:{
    paddingLeft:"5%",
    width:"30%",
    height:"60%",
    backgroundColor:"black",
    borderRadius:15,
    justifyContent:"center",
   },

party:{
    marginTop:5,
    flexDirection:'row',
    justifyContent:"space-between",
    width:"100%",
    height:60,
    backgroundColor:"green",
    borderRadius:30,
  },
waiting:{
    marginTop:5,
    flexDirection:'row',
    justifyContent:"space-between",
    width:"100%",
    height:60,
    backgroundColor:"gray",
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
    color:"white" }
})   
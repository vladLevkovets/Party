import { StyleSheet, Text,TextInput, View, ScrollView, TouchableOpacity,TouchableWithoutFeedback,Image,Keyboard,KeyboardAvoidingView, Alert,RefreshControl } from 'react-native';
import { useState,useEffect,useCallback} from 'react';
import JWT from 'expo-jwt';
import {JWT_SECRET} from "../config.js"
import axios from 'axios';
import Friends from "./Friends.js"
import TaskOptions from "./TaskOptions.js"







export default function Left ({token,verify_token,partys,setPartys}) {
    const [showList,setShowList]=useState(false)
    const [event,setEvent]=useState("")
    const [eventId,setEventId]=useState("")
    const [text,setText]=useState("")
    const [todos, setTodos] = useState([])
    const [newTask, setNewTask]= useState(false)
    const [item,setItem]=useState({})
    const [showItem,setShowItem]=useState(false)
    const [showFriends,setShowFriends]=useState(false)
    const [list,setList]=useState(false)
    const [friends,setFriends]=useState([])
    const [members,setMembers]=useState([])
    const [refreshing, setRefreshing] = useState(false);
    const URL = "http://192.168.0.174:4040"

    
    const onRefresh = (() => {
      console.log(eventId,event)
        makeTodos(eventId,event)
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      } );


  const getEvents =async ()=>{
    
    console.log(token)
    let data =JWT.decode(token, JWT_SECRET);
    console.log(data)
    let id=data._id
    console.log(id)
    axios
    .get(`${URL}/events/find/${id}+owner`)

    .then((res)=>{
      
      if (res.data.ok){
        console.log([ ...res.data.events])
        
         setPartys([...res.data.events])
  
      }
    }).catch((error) => {
      console.log(error);
    })
    
  }

 useEffect(()=>{
 getEvents();
 getFriends()
},[token])


  const showMy=()=>{
    
     return   partys.map((el,i)=>{
              return <TouchableOpacity key={i} style={styles.party} onPress={()=>{makeTodos(el._id,el.name),setList(true),getMembers(el._id)}}><Text style={styles.eventName}>{el.name}</Text><Text style={styles.eventProgress}>{el.progress}</Text></TouchableOpacity>
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
        setEventId(prev=>prev=event_id)
        setShowList(true)
    console.log(eventId)
      }
    }).catch((error) => {
      console.log(error);
    })
   }


  const removeTodo = (idx) => {
    let temp = [...todos]  
  axios
   .post(`${URL}/todos/delete`, {_id:temp[idx]._id})

   .then ((res)=>{
    if (res.data.ok)
     temp.splice(idx, 1)
    setTodos([...temp])

   })
   .catch((error) => {
    console.log(error);
  })
}

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

const getMembers = async(event_id)=>{

axios
  .get(`${URL}/events/${event_id}`)

  .then((res)=>{
   console.log(eventId)
    if (res.data.ok){
      console.log(res.data)
      
       setMembers(prev=>prev=[...res.data.members])

    }
  }).catch((error) => {
    console.log("error",error);
  })
}


const showMembers =() => {
  console.log(friends,members)

let people = []

members.forEach(el=>{
  let i= friends.findIndex(friend=>friend.nickname===el)
    console.log(i)
    if(i==-1){people.push(el)
    }else{
      people.push(friends[i].name)
    }
  }
)
console.log(people)
let all =people.join(",")

return <Text style={styles.membersList}>{all}</Text>
}




const showTodos = () => {

  console.log(todos)
  let data =JWT.decode(token, JWT_SECRET);
  console.log(data)
  let user=data.nickname
  console.log(user)
  let ALL=[]
  let wait=todos.filter(el=>el.status==="wait")
  let booked=todos.filter(el=>el.status==="booked")
  let done=todos.filter(el=>el.status==="done")
  let sugg=todos.filter(el=>el.status==="suggested")
  ALL = [...wait,...booked,...done,...sugg]
return ALL.map((todo)=>{
    let idx=todos.findIndex(el=>el._id===todo._id)
    let result=false
    todo.voted 
    ?result=todo.votedBy.some(el=>el===user) 
    :result=false
    return todo.status==="suggested"
    ?<View style={styles.suggested} key={idx}>
                <View style={{width:"70%",height:"100%"} } >   
                <Text
                  numberOfLines={1} 
                  style={styles.task} >{todo.task} 
                </Text>
                </View>
                {!result &&
                <TouchableWithoutFeedback style={{width:"100%",height:"100%",borderColor:"blue"}}
                    onPress={( ) => voting(idx)}>
                   <View style={!result ?styles.vote :{width:0}}> 
                   <Text style={!result ?styles.voteBtn :{width:0}}>Vote Yes</Text> 
                   </View>                      
                </TouchableWithoutFeedback> 
                }
      </View> 
    :<View style={todo.status==="done"?styles.done :todo.status==="booked" ?styles.booked :styles.wait} key={idx}>
              <TouchableOpacity style={{width:"88%",height:"100%"}} onPress={()=>{setShowItem(true),setItem(todo),console.log(todo)}}>   
                <Text
                  numberOfLines={1} 
                  style={todo.status==="booked" ?styles.taskAlt :styles.task} >{todo.task} 
                </Text>
                </TouchableOpacity>
                { (!todo.voted && todo.status !=="done") &&
                <View style={styles.delTask}>
                  <TouchableWithoutFeedback
                      onPress={( ) => alarm(idx)}>
                     <Text style={styles.delButton}>X</Text>
                     
                  </TouchableWithoutFeedback>
                </View>
                
                 }               
            </View>
  })
}

 const DelTasks =() => {
   console.log(eventId)
   
  axios
  .post(`${URL}/todos/delete`, {event_id:eventId})

  .then((res)=>{
    if (res.data.ok){
      DelEvent()
      console.log(res)
      console.log(res.data.tasks)
    }
  }).catch((error) => {
    console.log(error);
  })
  
 } 



 const DelEvent =async ()=>{
  console.log(eventId)
  axios
  .post(`${URL}/events/delete`,{
    _id:eventId
  })

  .then((res)=>{
    if (res.data.ok){
    setPartys([])
    getEvents(),
    setShowList(false) 
    }
  }).catch((error) => {
    console.log(error);
  })

}

const AddOne =()=>{
    console.log(todos,eventId,text,event)
    let data=JWT.decode(token, JWT_SECRET);
    console.log(data,data._id)
    console.log(todos,text)
    if (text===""){
      setNewTask(false)  
    }else{
  axios  
   
   .post(`${URL}/todos/add`, {
    name:event,
    user_id:data._id,
    todos:[text],
    _id:eventId,
    version:"make"
    })
   .then((res) => {

      if (res.data.ok) {

        setTodos([...res.data.all])
        console.log(todos)
        setNewTask(false)
        setText("")
        getEvents()


      }
    })
    .catch((error) => {
      console.log(error);
    }) 
  }   
}

const voting = (idx) => {
  let data =JWT.decode(token, JWT_SECRET);
  let nickname=data.nickname
  let temp = [...todos]  
  console.log(todos,temp[idx]._id)
axios
 .post(`${URL}/todos/update`, {_id:temp[idx]._id,nickname:nickname})

 .then ((res)=>{
  if (res.data.ok){
       makeTodos(eventId,event)
       console.log(todos)
       showTodos()
  }

 })
 .catch((error) => {
  console.log(error);
})
}

const alarm =(idx) =>{
  if(idx==="party"){
  Alert.alert("Are you sure?", "This action will delete your party!",[{
    text: "Yes",
    onPress: () => {
    DelTasks()
    }},
    {
      text: "No",
    },]
  )}else{
    Alert.alert("Are you sure?", "This action will delete this task!",[{
      text: "Yes",
      onPress: () => {
      removeTodo(idx)
      }},
      {
        text: "No",
      },])
  }
}


return  showList && showFriends 
        ? 
        <Friends token={token} verify_token={verify_token} showFriends={showFriends} setShowFriends={setShowFriends} list={list} setList={setList} eventId={eventId} partys={partys} getEvents={getEvents}/> 
        : showList && showItem
              ? <TaskOptions token={token}  setShowItem={setShowItem} item={item} setItem={setItem} makeTodos={makeTodos} event={event}/>
        :showList 
             ? 
             <KeyboardAvoidingView style={styles.single} >
                    <View style={ styles.singleTop}>
                      <Text style={styles.singleName}>{event}</Text>
                    </View > 
                    <ScrollView style={styles.members}>

                      {showMembers()}
                    </ScrollView>
                    <View style={ newTask? styles.inputBox : styles.noBox}>
                         <TextInput style={styles.input} placeholder="name of task" onChangeText={(text)=>setText(text)} value={text} ></TextInput>
                         <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={()=>{Keyboard.dismiss();verify_token(); AddOne()}}>
                         <View style={styles.makeTask} >
                         
                         <Image source={require("../assets/istockphoto-1191442137-170667a.jpg")} style={styles.buttonPic}/>
                         </View>
                         </TouchableWithoutFeedback>
                         </View>
                    
                    <View style={styles.singleText}>
                      <ScrollView style={styles.singleList} refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>{showTodos()}</ScrollView>
                    </View>
                    
                    <View style={styles.listBtns}>
                          <TouchableOpacity onPress={()=>{setShowList(false);setNewTask(false);getEvents()}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity>
                          <TouchableOpacity onPress={()=>{verify_token();setNewTask(true)}} style={styles.addOne}><Text style={styles.btnsText}>ADD ONE</Text></TouchableOpacity> 
                          <TouchableOpacity onPress={()=>{setShowFriends(true)}} style={styles.invite}><Text style={styles.btnsText}>INVITE</Text></TouchableOpacity>
                          <TouchableOpacity onPress={()=>{alarm("party")}} style={styles.delete}><Text style={styles.btnsText}>DELETE</Text></TouchableOpacity>
                          
                    </View> 
                       
             </KeyboardAvoidingView>
    
          
            : <View style={styles.left} >
                <ScrollView style={styles.text} >
                {showMy()}
                </ScrollView> 
               
              </View>

}
  

const styles=StyleSheet.create({
left:{
    paddingHorizontal:"3%",
    paddingTop:"4%",
    paddingBottom:"7%",
    alignItems:'center',
    justifyContent: 'center',
    height:"84%",
    width:"100%",
    backgroundColor: "#ff0000",
    },
text:{    
    textAlign: 'center',
    borderRadius:20,
    backgroundColor:'#ff00eb',
    color: '#cdf104',
    fontSize:30,
    height:"50%",
    width:"100%",
    }, 
wait:{
      marginTop:5,
      marginHorizontal:3,
      flexDirection:"row",
      paddingLeft:10 ,
      borderRadius:20,
      height:40,
      backgroundColor:"#ff0909",},      
suggested:{
  marginTop:5,
  marginHorizontal:3,
  flexDirection:"row",
  paddingLeft:10 ,
  borderRadius:20,
  height:40,
  backgroundColor:"grey",},
booked:{
  marginTop:5,
  marginHorizontal:3,
  flexDirection:"row",
  paddingLeft:10 ,
  borderRadius:20,
  height:40,
  backgroundColor:"yellow",},
done:{
  marginTop:5,
  marginHorizontal:3,
  flexDirection:"row",
  paddingLeft:10 ,
  borderRadius:20,
  height:40,
  backgroundColor:"#00cc00",},
vote:{
    textAlign:'center',
    marginTop:5,
    marginRight:5,
    fontSize:20,
    width:"30%",
    height:30,
    borderRadius:20,
    backgroundColor:"#00e600",
    color:"white"},
voteBtn:{textAlign:'center',
  fontSize:20,
  width:"100%",
  height:30,
  borderRadius:20,
  color:"white"},   
  task:{
  paddingTop:9,
  fontSize:16,
  width:"90%",
  color:"white",
  paddingLeft:3 ,
  borderRadius:30,},
taskAlt:{
      paddingTop:9,
      fontSize:16,
      width:"90%",
      color:"black",
      paddingLeft:3 ,
      borderRadius:30,},   
delTask:{
    textAlign:'center',
    justifyContent:"center",
    marginTop:2,
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
single:{
    paddingTop:40,
    backgroundColor:"#ff3385",
    position:'absolute',
    height:"100%",
    width:"100%",
    zIndex:1,
       },   
singleTop:{
    marginLeft:"5%", 
    width:"90%",
    height:40,  
    backgroundColor:"#0000ff",
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
members:{
  marginTop:10,
  marginLeft:"5%", 
  width:"90%",
  height:"10%",  
  backgroundColor:"white",
  borderRadius:20,
  extAlign:'center',
  ustifyContent:"center",
  },
membersList:{
    color:"black",
    fontSize:15,
    marginTop:0,
    marginLeft:"5%", 
    width:"90%",
    height:"90%",  
    borderRadius:20,
    extAlign:'center',
    ustifyContent:"center",
    },
input :{
    fontSize:16,
    width:"85%",
    paddingLeft:10 ,
    borderRadius:20,
    height:"100%",
    backgroundColor:"#abb7b9",
  },
inputBox:{
  position:'absolute',
  top:"45%",
  zIndex:2,
  width:"100%",
  height:"10%",
  flexDirection:"row",
  borderRadius:20,
  backgroundColor:"#abb7b9",
  justifyContent:"center"
},
noBox:{
  height:0
},
makeTask:{
  textAlign:'center',
  justifyContent:"center",
  marginTop:10,
  marginRight:0,
  fontSize:20,
  width:"15%",
  height:"70%",
  borderRadius:30,
  backgroundColor:"green",
  color:"white"
},
buttonPic:{
  width:"100%",
  height:"100%",
  borderRadius:30,
}, 
singleText:{
    width:"90%",
    height:"80%",
    fontSize:15,
   },
singleList:{
    textAlign: 'center',
    width:"100%",
    borderWidth:1,
    height:"50%",
    backgroundColor:"#ff99cc",
    borderRadius:20,
    margin:"5%",
    marginTop:10,
    marginBottom:10,
   },
listBtns:{
    justifyContent:"space-around",
    flexDirection:"row",
    height:40,
    width:"100%"
   }, 
btnsText:{
    width:"100%",
    textAlign:'center',
    fontSize:14,
    color:"white",
    
   },    
delete:{
    paddingLeft:"1%",
    width:"24%",
    height:"60%",
    backgroundColor:"black",
    justifyContent:"center",
    borderRadius:15,
   },
back:{
    paddingLeft:"1%",
    width:"24%",
    height:"60%",
    backgroundColor:"grey",
    justifyContent:"center",
    borderRadius:15,
   },
invite:{
    paddingLeft:"1%",
    width:"24%",
    height:"60%",
    backgroundColor:"blue",
    justifyContent:"center",
    borderRadius:15,
   },   
addOne:{
    paddingLeft:"1%",
    width:"24%",
    height:"60%",
    backgroundColor:"green",
    justifyContent:"center",
    borderRadius:15,
   },  
party:{
    marginTop:5,
    flexDirection:'row',
    justifyContent:"space-between",
    width:"100%",
    height:60,
    backgroundColor:"blue",
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
    width:"20%",
    height:40,
    borderRadius:20,
    color:"white" }
})   
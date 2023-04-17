import { StyleSheet, Text,TextInput, View, ScrollView,Image, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert,RefreshControl } from 'react-native';
import { useState,useEffect} from 'react';
import JWT from 'expo-jwt';
import {JWT_SECRET} from "../config.js"
import axios from 'axios';
import Friends from "./Friends.js"
import TaskOptions from "./TaskOptions.js"




export default function Left ({token,verify_token}) {
    const [showList,setShowList]=useState(false)
    const [part,setPart]=useState([])
    const [invited,setInvited]=useState([])
    const [event,setEvent]=useState("")
    const [eventId,setEventId]=useState("")
    const [todos,setTodos]=useState([])
    const [item,setItem]=useState({})
    const [showItem,setShowItem]=useState(false)
    const [showFriends,setShowFriends]=useState(false)
    const [newTask, setNewTask]= useState(false)
    const [text,setText]=useState("")
    const [friends,setFriends]=useState([])
    const [members,setMembers]=useState([])
    const [refreshing, setRefreshing] = useState(false);
    const URL = "http://192.168.0.174:4040"

  const onRefresh = (() => {
    verify_token(),
    makeTodos(eventId,event)
    setRefreshing(true);
    setTimeout(() => 
      {
       setRefreshing(false);
      }, 3000
    );
    } 
  );

  const getEvents =async ()=>{
    let data =JWT.decode(token, JWT_SECRET);
    let id=data._id

    axios
      .get(`${URL}/events/find/${id}+invited+guest`)

      .then((res)=>{
        if (res.data.ok){       
          setPart([ ...res.data.partys])
          setInvited([...res.data.invitations])
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(()=>
    {
      getEvents();
      getFriends()
    },
    [token]
  )



  const showMy=()=>{
     return   part.map((el,i)=>{
                  
                return <TouchableOpacity key={i} style={styles.party} onPress={()=>{verify_token(),makeTodos(el._id,el.name),getMembers(el._id)}}><Text style={styles.eventName}>{el.name}</Text><Text style={styles.eventProgress}>{el.progress}</Text></TouchableOpacity>
              })
              
  }
    
  const showAnother=()=>{
      return   invited.map((el,i)=>{
                  
            return <TouchableOpacity key={i} style={styles.waiting} 
                      onPress={()=>{
                          Alert.alert(`You are invited to party ${event}`, "do you want take a part ?", 
                            [
                              {
                                text: "Yes",
                                onPress: () => {
                                  changeStatus(el._id,"yes")
                                }},
                              {
                                text: "No",
                                onPress: () => {
                                  changeStatus(el._id,"no")}
                              }
                            ]
                          )
                      }}>
                     <Text style={styles.eventName}>{el.name}</Text>
                     <Text style={styles.eventProgress}>{el.progress}</Text>
                   </TouchableOpacity>
      })
  }
  
  
  const makeTodos =async(event_id,event)=>{
    axios
    .get(`${URL}/todos/find/${event_id}`)

    .then((res)=>{
      if (res.data.ok){        
         setTodos([...res.data.tasks])
         setEvent(event)
         setEventId(prev=>prev=event_id)
         setShowList(true)
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const AddOne =()=>{
    let data=JWT.decode(token, JWT_SECRET);
    if (text===""){
      setNewTask(false)  
    }
    else{
      axios  
      .post(`${URL}/todos/add`, {
        name:event,
        user:data.nickname,
        user_id:data._id,
        todos:[text],
        _id:eventId,
        version:"suggest"
      })
      .then((res) => {
        if (res.data.ok) {
          setTodos([...res.data.all])
          setNewTask(false)
          setText("")
        }
      })
      .catch((error) => {
      console.log(error);
      }) 
    }   
  }  

  const changeStatus = async(event_id,choose)=>{
    let i= invited.findIndex(el=>el._id===event_id)
    let data =JWT.decode(token, JWT_SECRET);
    let id=data._id
    let list=[...invited]
    let y=list[i].users.findIndex(man=>man.user_id===id)

    if (choose==="yes"){
      list[i].users[y].status="guest"

      axios
      .post(`${URL}/events/update`, {
        _id:event_id,
        users:list[i].users,
        version:"change"
      }) 
  
      .then ((res)=>{
        if (res.data.ok){
          Alert.alert("now you can help prepare party")
          getEvents()
        }
      })

      .catch((error) => {
        console.log(error);}) 


    } 
    else if (choose==="no"){
      list[i].users.splice(y,1)
      list=[...list,...part]  
      axios  
      .post(`${URL}/events/update`, {
        _id:event_id,
        users:list[i].users,
        version:"change"
      }) 
  
      .then ((res)=>{
        if (res.data.ok){
          Alert.alert("as you wish")
          getEvents()
        }
      })
      .catch((error) => {
        console.log(error);})
    }    
  }

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

  const getMembers = async(event_id)=>{

    axios
    .get(`${URL}/events/${event_id}`)

    .then((res)=>{
      if (res.data.ok){      
         setMembers(prev=>prev=[...res.data.members])
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }


  const showMembers =() => {
    let people = []

    members.forEach(el=>{
      let i= friends.findIndex(friend=>friend.nickname===el)
      if(i==-1){
        people.push(el)
      }
      else{
        people.push(friends[i].name)
      }
    })

    let all =people.join(", ")

    return <Text style={styles.membersList}>{all}</Text>
  }


  const showTodos = () => {
    let data =JWT.decode(token, JWT_SECRET);
    let user=data.nickname
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
        ? <View style={styles.suggested} key={idx}>
            <View style={{width:"70%",height:"100%"} } >   
              <Text numberOfLines={1} style={styles.task} >{todo.task} </Text>
            </View>
            { !result &&
                <TouchableWithoutFeedback style={{width:"100%",height:"100%",borderColor:"blue"}}
                      onPress={( ) =>{verify_token(), voting(idx)}}>
                    <Text style={!result ?styles.vote :{width:0}}>Vote Yes</Text>                     
                </TouchableWithoutFeedback> 
            }
          </View>

        : <View style={todo.status==="done"?styles.done :todo.status==="booked" ?styles.booked :styles.wait} key={idx}>
                <TouchableOpacity style={{width:"100%",height:"100%"}} onPress={()=>{setShowItem(true),setItem(todo),console.log(todo)}}>   
                  <Text numberOfLines={1}  style={todo.status==="booked" ?styles.taskAlt :styles.task} >{todo.task} </Text>
                </TouchableOpacity>               
          </View>
    })
  }
 
  const voting = async(idx) => {
    let data =JWT.decode(token, JWT_SECRET);
    let nickname=data.nickname
    let temp = [...todos]  

    axios
    .post(`${URL}/todos/update`, {_id:temp[idx]._id,nickname:nickname})
  
    .then ((res)=>{
      if (res.data.ok){
         makeTodos()
         showTodos()
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  const Delete =async()=>{
    let data =JWT.decode(token, JWT_SECRET);
  
    axios
    .post(`${URL}/events/update`, {
      _id:eventId,
      user_id:data._id,
      version:"delete"})
 
    .then ((res)=>{
      if (res.data.ok){
        let temp=[...part]
        let i=part.findIndex(el=>el._id===eventId)
        temp.splice(i,1)
        setPart(prev=>prev=[...temp]) 
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const alarm =async() =>{
  
    Alert.alert("Are you sure?", "Do you want leave the party ?",
      [
        {
          text: "Yes",
          onPress: () => {
            verify_token(),  
            Delete(),
            setShowList(false)
          }
        },
        {
          text: "No",
        },
      ]
    )
  }

  return   showList && showFriends
        ? <Friends token={token} verify_token={verify_token} showFriends={showFriends} setShowFriends={setShowFriends} />
             
        : showList && showItem
              ? <TaskOptions token={token} verify_token={verify_token} setShowItem={setShowItem}  item={item} setItem={setItem} makeTodos={makeTodos} event={event}/>

              : showList 
                  ?<View style={styles.single}>
                        <View style={styles.singleTop}>
                           <Text style={styles.singleName}>{event}</Text>
                        </View> 

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
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>{showTodos()}
                            </ScrollView>
                        </View>

                        <View style={styles.listBtns}>
                            <TouchableOpacity onPress={()=>{verify_token(),setShowList(false);getEvents()}} style={styles.back}>
                                <Text style={styles.btnsText}>BACK</Text>
                            </TouchableOpacity> 

                            <TouchableOpacity onPress={()=>{setNewTask(true)}} style={styles.suggest}>
                                <Text style={styles.sugText}>SUGGEST</Text>
                            </TouchableOpacity> 

                            <TouchableOpacity onPress={()=>{alarm()}} style={styles.delete}>
                                <Text style={styles.btnsText}>DELETE</Text>
                            </TouchableOpacity>
                        </View> 
                    </View>

                  : <View style={styles.mid}>
                        <ScrollView style={styles.text}>
                            {showMy()}
                            {showAnother()}
                        </ScrollView> 
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
    backgroundColor: "#005bff"
  },
text:{    
    textAlign: 'center',
    borderRadius:20,
    backgroundColor:'#ff00eb',
    color: '#cdf104',
    fontSize:30,
    height:"100%",
    width:"100%"
  }, 
wait:{
    marginTop:5,
    marginHorizontal:3,
    flexDirection:"row",
    paddingLeft:10 ,
    borderRadius:20,
    height:40,
    backgroundColor:"#ff0909"
  },      
suggested:{
    marginTop:5,
    marginHorizontal:3,
    flexDirection:"row",
    paddingLeft:10 ,
    borderRadius:20,
    height:40,
    backgroundColor:"grey"
  },
booked:{
    marginTop:5,
    marginHorizontal:3,
    flexDirection:"row",
    paddingLeft:10 ,
    borderRadius:20,
    height:40,
    backgroundColor:"yellow"
  },
done:{
    marginTop:5,
    marginHorizontal:3,
    flexDirection:"row",
    paddingLeft:10 ,
    borderRadius:20,
    height:40,
    backgroundColor:"#00cc00"
  },
vote:{
    textAlign:'center',
    marginTop:5,
    marginRight:5,
    fontSize:20,
    width:"30%",
    height:30,
    borderRadius:20,
    backgroundColor:"#00e600",
    color:"white"
  },
task:{
    paddingTop:9,
    fontSize:16,
    width:"70%",
    color:"white",
    paddingLeft:3 ,
    borderRadius:30,
    height:40
  },                                
taskAlt:{
    paddingTop:9,
    fontSize:16,
    width:"90%",
    color:"black",
    paddingLeft:3 ,
    borderRadius:30
  },
single:{
    paddingTop:40,
    backgroundColor:"#9933ff",
    position:'absolute',
    height:"100%",
    width:"100%",
    zIndex:1
  },   
singleTop:{
    marginLeft:"5%", 
    width:"90%",
    height:40,  
    backgroundColor:"#0000ff",
    borderRadius:20
  },
singleName:{
    width:"90%",
    color:"yellow",
    paddingLeft:10,
    paddingTop:5,
    fontSize:20
  },   
singleText:{
    height:"80%",
    width:"90%",
    fontSize:15
  },
singleList:{
    width:"100%",
    borderWidth:1,
    height:"85%",
    backgroundColor:"#ff99cc",
    borderRadius:20,
    margin:"5%",
    marginTop:5,
    marginBottom:10
  },
members:{
    marginTop:10,
    marginLeft:"5%", 
    width:"90%",
    height:"10%",  
    backgroundColor:"#66d9ff",
    borderRadius:20,
    extAlign:'center',
    ustifyContent:"center"
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
    ustifyContent:"center"
  },  
input :{
    fontSize:16,
    width:"85%",
    paddingLeft:10 ,
    borderRadius:20,
    height:"100%",
    backgroundColor:"#abb7b9"
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
sugText:{
    width:"80%",      
    fontSize:15,
    textAlign:'center'
  }, 
back:{
    paddingLeft:"5%",
    width:"30%",
    height:"60%",
    backgroundColor:"grey",
    borderRadius:15,
    justifyContent:"center"
  }, 
suggest:{
    paddingLeft:"5%",
    width:"30%",
    height:"60%",
    backgroundColor:"white",
    borderRadius:15,
    justifyContent:"center"
  },         
delete:{
    paddingLeft:"5%",
    width:"30%",
    height:"60%",
    backgroundColor:"black",
    borderRadius:15,
    justifyContent:"center"
  },

party:{
    marginTop:5,
    flexDirection:'row',
    justifyContent:"space-between",
    width:"100%",
    height:60,
    backgroundColor:"#00cc00",
    borderRadius:30
  },
waiting:{
    marginTop:5,
    flexDirection:'row',
    justifyContent:"space-between",
    width:"100%",
    height:60,
    backgroundColor:"gray",
    borderRadius:30
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
    color:"white"
  }
})   
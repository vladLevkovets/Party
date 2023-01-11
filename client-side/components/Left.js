import { StyleSheet, Text,TextInput, View, ScrollView, TouchableOpacity,TouchableWithoutFeedback,Image,Dimensions, Alert } from 'react-native';
import { useState,useEffect} from 'react';
import JWT from 'expo-jwt';
import {JWT_SECRET} from "../config.js"
import axios from 'axios';






export default function Left ({token}) {
    const [showList,setShowList]=useState(false)
    const [progress,setProgress]=useState("0%")
    const [partys,setPartys]=useState([])
    const [event,setEvent]=useState("")
    const [eventId,setEventId]=useState("")
    const [text,setText]=useState("")
    const [todos, setTodos] = useState([])
    const [newTask, setNewTask]= useState(false)
    const URL = "http://192.168.0.174:4040"
    

  const getEvents =async ()=>{
    console.log(token)
    let data =JWT.decode(token, JWT_SECRET);
    console.log(data)
    let id=data._id
    console.log(id)
    setPartys([])
    axios
    .get(`${URL}/events/find/${id}+owner`)

    .then((res)=>{
      if (res.data.ok){
        console.log([...partys, ...res.data.events])
        
         setPartys([...res.data.events])
  
      }
    }).catch((error) => {
      console.log(error);
    })

  }

 useEffect(()=>{
 getEvents()
},[])



    const showMy=()=>{
    
     return   partys.map((el,i)=>{
                  
              return <TouchableOpacity key={i} style={styles.party} onPress={()=>{makeTodos(el._id,el.name)}}><Text style={styles.eventName}>{el.name}</Text><Text style={styles.eventProgress}>{progress}</Text></TouchableOpacity>
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
         setEventId(event_id)
         setShowList(true)
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


const showTodos = () => {
    console.log(todos)
    console.log(event)
    console.log(eventId)
return todos.map((todo, idx)=>{
      return  <View style={styles.box} key={idx}>
                  <Text
                    numberOfLines={1} 
                    style={styles.task} >{todo.task}
                  </Text>
                  <View style={styles.delTask}>
                  <TouchableWithoutFeedback
                      onPress={( ) => removeTodo(idx)}>
                     <Text style={styles.delButton}>X</Text>
                     
                  </TouchableWithoutFeedback>
                  </View>
              </View>
    })
  }

 const DelTasks =(yes) => {
   console.log(eventId)
   

  if (yes==="yes") {
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
    console.log(todos)
  axios  
   
   .post(`${URL}/todos/add`, {
    name:event,
    user_id:data._id,
    todos:[text],
    _id:eventId
    })
   .then((res) => {

      if (res.data.ok) {
        setTodos([...todos,{task:text}])
        console.log(todos)
        setNewTask(false)
        setText("")
        // let data=JWT.decode(token, JWT_SECRET);  
        // console.log(" token after login:",data)
      }
    })
    .catch((error) => {
      console.log(error);
    }) 
       
}


const alarm =() =>{

  Alert.alert("Are you sure?", "This action will delete your party!",[{
    text: "Yes",
    onPress: () => {
    DelTasks("yes")
    }},
    {
      text: "No",
    },]
  )

}

return   showList & newTask
            ? <View style={styles.single}>
                    <View style={styles.singleTop}><Text style={styles.singleName}>{event}</Text></View> 
                    <View style={styles.inputBox}>
                         <TextInput style={styles.input} placeholder="name of task" onChangeText={(text)=>setText(text)} value={text} ></TextInput>
                         <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={()=>{AddOne()}}>
                         <View style={styles.makeTask} >
                         
                         <Image source={require("../assets/istockphoto-1191442137-170667a.jpg")} style={styles.buttonPic}/>
                         </View>
                         </TouchableWithoutFeedback>
                         </View>
                    <View style={styles.singleText}><ScrollView style={styles.singleList}>{showTodos()}</ScrollView></View>
                    
                    <View style={styles.listBtns}>
                          <TouchableOpacity onPress={()=>{setShowList(false)}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity>
                          <TouchableOpacity onPress={()=>{setNewTask(true)}} style={styles.addOne}><Text style={styles.btnsText}>ADD ONE</Text></TouchableOpacity> 
                          <TouchableOpacity onPress={()=>{alarm()}} style={styles.delete}><Text style={styles.btnsText}>DELETE</Text></TouchableOpacity>
                          
                    </View> 
                    
             </View>
            : showList
              ? <View style={styles.single}>
              <View style={styles.singleTop}><Text style={styles.singleName}>{event}</Text></View> 
              <View style={styles.singleText}><ScrollView style={styles.singleList}>{showTodos()}</ScrollView></View>
              <View style={styles.listBtns}>
                    <TouchableOpacity onPress={()=>{setShowList(false)}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setNewTask(true)}} style={styles.addOne}><Text style={styles.btnsText}>ADD ONE</Text></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>{alarm()}} style={styles.delete}><Text style={styles.btnsText}>DELETE</Text></TouchableOpacity>
                    
              </View> 
              
       </View>
             
            : <View style={styles.left}>
                <ScrollView style={styles.text}>
                {showMy()}
                </ScrollView> 
                {/* <View style={styles.text}>{showMy()}</View> */}
              </View>

}
  

const styles=StyleSheet.create({
left:{
    paddingHorizontal:"3%",
    paddingTop:"4%",
    paddingBottom:"7%",
    palignItems:'center',
    justifyContent: 'center',
    height:"86%",
    width:"100%",
    backgroundColor: "#ff0000",
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
    marginTop:10,marginHorizontal:10,flexDirection:"row",paddingLeft:10 ,borderRadius:20,height:40,backgroundColor:"#ff0909",},      
task:{
    paddingTop:9,fontSize:16,width:"90%",color:"white",paddingLeft:3 ,borderRadius:30,height:40,backgroundColor:"#ff0909",},
delTask:{
    textAlign:'center',marginTop:5,marginRight:5,fontSize:20,width:30,height:30,borderRadius:20,backgroundColor:"black",color:"white"},
delButton:{
    textAlign:'center',marginTop:2,marginLeft:5,fontSize:17,width:20,height:20,borderRadius:20,backgroundColor:"black",color:"white"},
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
// singleList:{
//     textAlign: 'center',
//     borderRadius:20,
//     backgroundColor:'#ff00eb',
//     color: '#cdf104',
//     fontSize:30,
//     height:"100%",
//     width:"100%",
//   }, 
input :{
    fontSize:16,
    width:"85%",
    paddingLeft:10 ,
    borderRadius:20,
    height:"100%",
    placeholder:"Task",
    backgroundColor:"#abb7b9",
    zIndex:2
  },
inputBox:{
  position:'absolute',
  top:"45%",
  zIndex:2,
  width:"100%",
  height:"10%",
  flexDirection:"row",
  borderRadius:20,
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
  borderRadius:30,
}, 
singleText:{
    width:"90%",
    height:"90%",
    fontSize:15,
   },
singleList:{
    textAlign: 'center',
    width:"100%",
    borderWidth:1,
    height:"50%",
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
    height:"100%",
    textAlign:'center',
    fontSize:15,
    color:"white",
    paddingBottom:5,
    
   },    
delete:{
    paddingLeft:"5%",
    width:"30%",
    height:"60%",
    backgroundColor:"black",
    borderRadius:15,
   },
back:{
    paddingLeft:"5%",
    width:"30%",
    height:"60%",
    backgroundColor:"blue",
    borderRadius:15,
   },
addOne:{
    paddingLeft:"5%",
    width:"30%",
    height:"60%",
    backgroundColor:"green",
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
    width:40,
    height:40,
    borderRadius:20,
    color:"white" }
})   
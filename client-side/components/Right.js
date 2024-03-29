import { Text, View,  TouchableWithoutFeedback, TextInput,ScrollView,Image,Dimensions, TouchableOpacity,Alert } from 'react-native';
import { useState} from 'react';
import axios from 'axios';
import JWT from 'expo-jwt';
import {JWT_SECRET} from "../config.js"


export default function Right ({token,verify_token,partys}) {

  const vert = Dimensions.get('window').height;
  const [event,setEvent]=useState("")
  const [text,setText]=useState("")
  const [todos, setTodos] = useState([])
  const URL = "http://192.168.0.174:4040" 
  const styles= {
      right:{
        paddingHorizontal:"3%",paddingTop:0.02*vert,paddingBottom:0.04*vert,palignItems:'center',justifyContent: 'center',height:"84%",width:"100%",backgroundColor: '#10ff00',},      
      text:{
        textAlign: 'center',borderRadius:20,backgroundColor:'#ff00eb',color: '#cdf104',fontSize:30,height:"100%",width:"100%",},
      form:{
        borderWidth:1,paddingHorizontal:'1%',height:"20%",justifyContent: 'space-evenly',borderRadius:20,margin:"2%",backgroundColor:"#e4ff00"},
      scroll:{
        keyboardDismissMode:'none', width:"100%",flex:1,backgroundColor:"#e4ff00",borderRadius:20,},
      list:{
        borderWidth:1,height:"70%",backgroundColor:"#e4ff00",borderRadius:20,margin:"2%",marginTop:0,},
      inputEvent:{
        paddingLeft:10 ,borderRadius:20,height:"40%",backgroundColor:"#abb7b9",},
      inputTodo:{
        width:"90%",paddingLeft:10 ,borderRadius:20,height:"100%",placeholder:"Task",backgroundColor:"#abb7b9",},
      inputBox:{
        height:"40%",flexDirection:"row",borderRadius:20,backgroundColor:"#abb7b9"},
      box:{
        marginTop:5,marginHorizontal:3,flexDirection:"row",paddingLeft:10 ,borderRadius:20,height:40,backgroundColor:"#ff0909",},      
      task:{
        paddingTop:5,fontSize:15,width:"90%",color:"#161515",paddingLeft:3 ,borderRadius:30,height:40,backgroundColor:"#ff0909",},         
      makeTask:{
        textAlign:'center',marginTop:10,marginRight:5,fontSize:20,width:30,height:30,borderRadius:20,backgroundColor:"green",color:"white"},
      buttonPic:{
        fontSize:15,width:30,height:30,borderRadius:30,},
      makeTaskButton:{
        textAlign:'center',justifyContent:'flex-start',margin:5,fontSize:15,width:20,height:20,borderRadius:0,backgroundColor:"blue",color:"white"},
      delTask:{
        textAlign:'center',marginTop:5,marginRight:5,fontSize:20,width:30,height:30,borderRadius:20,backgroundColor:"black",color:"white"},
      delButton:{
        textAlign:'center',marginTop:2,marginLeft:5,fontSize:17,width:20,height:20,borderRadius:20,backgroundColor:"black",color:"white"},
      listBtns:{
          marginTop:5,justifyContent:"space-around",flexDirection:"row",height:40,width:"100%"}, 
      cancel:{
        paddingLeft:"5%",width:"30%",height:"60%",backgroundColor:"red",borderRadius:15,justifyContent:"center",textAlign:'center'},
      create:{
        paddingLeft:"5%",width:"30%",height:"60%",backgroundColor:"green",borderRadius:15,justifyContent:"center",textAlign:'center'},
      btnsText:{
          width:"80%",fontSize:15,color:"white",textAlign:'center'}, 
  }
    
      
    




   
  const addToList = () =>{
    if (text===""){    
    }
    else{
      const temp = [...todos] 
      temp.push(text)
      setTodos([...temp])
      setText('')
    }
  }

  const removeTodo = (idx) => {
    const temp = [...todos]
    temp.splice(idx, 1)
    setTodos([...temp])
  }
      
  const makeList=async ()=>{
    let data=JWT.decode(token, JWT_SECRET);
    let i = false
    partys.forEach((task)=> {
      if(task.name===event) {i=true}
    })
    if (i){
        Alert.alert("Event already exist","please change event name")
    }
    else{

        axios         
        .post(`${URL}/todos/add`, {
          name: event,
          user_id:data._id,
          todos:todos,
          version:"make"
        })
        .then((res) => {
  
          if (res.data.ok) {
            setEvent("")
            setText("")
            setTodos([])
            Alert.alert("Succes","Party is added to your list !")
          }
          else {
            Alert.alert("Data is not enough",res.data.message)
          }
        })
        .catch((error) => {
          console.log(error);
        }) 
    }   
  }

  const showTodos = () => {

      return todos.map((todo, idx)=>{
          return  <View style={styles.box} key={idx}>
                      <Text
                        numberOfLines={1} 
                        style={styles.task} >{todo}
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








  return  <View  style={styles.right}>
                
              <View style={styles.text}>
                   <View style={styles.form}>
                      <TextInput style={styles.inputEvent}placeholder= "name of event" onChangeText={(text)=>setEvent(text)} value={event}></TextInput>
                      <View style={styles.inputBox}>
                          <TextInput style={styles.inputTodo} placeholder="name of task" onChangeText={(text)=>setText(text)} value={text} ></TextInput>
                          <TouchableWithoutFeedback title="V" style={styles.makeTask}  onPress={addToList}>
                            <View style={styles.makeTask} >                         
                              <Image source={require("../assets/istockphoto-1191442137-170667a.jpg")} style={styles.buttonPic}/>
                            </View>
                          </TouchableWithoutFeedback>
                      </View>                         
                   </View>
                   
                   <View style={styles.list}>
                      <ScrollView style={styles.scroll}>
                        {showTodos()}
                      </ScrollView> 
                   </View>

                   <View style={styles.listBtns}>
                      <TouchableOpacity onPress={()=>{setTodos([]);console.log(event);setEvent("");setText("")}} style={styles.cancel}>
                         <Text style={styles.btnsText}>CANCEL</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>{verify_token();makeList()}} style={styles.create}>
                        <Text style={styles.btnsText}>CREATE</Text>
                      </TouchableOpacity>                       
                   </View>  
                   

              </View>
                
                  
                   
   
          </View>





}




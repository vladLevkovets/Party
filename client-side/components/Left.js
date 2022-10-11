import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Dimensions } from 'react-native';
import { useState,useEffect} from 'react';






export default function Left ({partys,event}) {
    const [showList,setShowList]=useState(false)
    const [progress,setProgress]=useState("0%")
    console.log({setShowList,showTodos,partys,showList})

    const showMy=()=>(
        partys.map((el,i)=>{
                  
              return <TouchableOpacity key={i} style={styles.party} onPress={(e)=>{setShowList(true)}}><Text style={styles.eventName}>{el}</Text><Text style={styles.eventProgress}>{progress}</Text></TouchableOpacity>
          })
   )

   const removeTodo = (idx) => {
    const temp = [...todos]
    temp.splice(idx, 1)
    setTodos([...temp])
  }


const showTodos = () => {
    console.log(todos)
return todos.map((todo, idx)=>{
      return  <View style={styles.box} key={idx}>
                  <Text
                    numberOfLines={1} 
                    style={styles.task} >{todo}
                  </Text>
                  <TouchableWithoutFeedback
                      onPress={( ) => removeTodo(idx)}>
                     <Text style={styles.delTask}>X</Text>
                     
                      </TouchableWithoutFeedback>
                
              </View>
    })
  }
 



return   showList 
            ? <View style={styles.single}>
                    <View style={styles.singleTop}><Text style={styles.singleName}>{event}</Text></View> 
                    <View style={styles.singleText}><ScrollView style={styles.singleList}>{showTodos()}</ScrollView></View>
                    <View style={styles.listBtns}>
                          <TouchableOpacity onPress={()=>{setShowList(false)}} style={styles.back}><Text style={styles.btnsText}>BACK</Text></TouchableOpacity> 
                          <TouchableOpacity onPress={()=>{setShowList(false)}} style={styles.delete}><Text style={styles.btnsText}>DELETE</Text></TouchableOpacity>
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
singleList:{
    textAlign: 'center',
    borderRadius:20,
    backgroundColor:'#ff00eb',
    color: '#cdf104',
    fontSize:30,
    height:"100%",
    width:"100%",
  },   
singleText:{
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
    height:"100%",
    textAlign:'center',
    fontSize:15,
    color:"yellow",
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
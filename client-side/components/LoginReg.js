import React from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, TextInput,ScrollView,Image,ImageBackground, TouchableOpacity,Dimensions } from 'react-native';





export default function Login({reg,setReg,setLogged}) {
    const hor = Dimensions.get('window').width;
    const vert = Dimensions.get('window').height;

    const registr = async () =>{
        
       
           
   }
   
   const login = async ()=>{
        setLogged(true)
   
   }








return(
<View style={styles.screen}>
          <ImageBackground style={styles.screen} source={require("../assets/blackpaint.jpg")}>


          <View style={{flexDirection:'row',justifyContent:"space-between",marginTop:0.1*vert,height:0.2*vert,width:hor}}>
          <TouchableOpacity onPress={login} style={{height:0.2*vert}} >
           <View style={{width:0.50*hor,height:0.2*vert}}>
           <ImageBackground  resizeMode='stretch' style={{width:0.5*hor,height:0.2*vert}} source={require("../assets/greensplash.png")}>
           <Text style={{fontSize:0.03*vert, color:"blue",height:"60%",paddingTop:0.07*vert,paddingLeft:0.17*hor,fontWeight:"bold"}}>Login</Text>
           </ImageBackground>
           </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={registr}>
            <View style={{width:0.50*hor,height:0.20*vert}}>
            <ImageBackground  resizeMode='stretch' style={{width:0.5*hor,height:0.2*vert}} source={require("../assets/yellowsplash.png")}>
            <Text style={{fontSize:0.03*vert, color:"red",height:"60%",paddingTop:0.07*vert,paddingLeft:0.16*hor,fontWeight:"bold"}} >SighIn</Text>
            </ImageBackground>
            </View>
          </TouchableOpacity>
          </View>

           <View style={{flexDirection:"row", width:hor,height:0.4*vert,marginTop:0.1*vert,justifyContent:'space-between'}} >
          <View style={{width:0.75*hor,height:0.4*vert,justifyContent:'space-between'}}>
           <View style={{flex:1}}>            
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("../assets/thinrainbowMirror.png")}> 
          <TextInput placeholder='Nickname' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}}/>
           </ImageBackground>
          </View>

          <View style={{flex:1}}> 
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("../assets/thinrainbowMirror.png")}> 
          <TextInput  placeholder='Password' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}} />
          </ImageBackground>
          </View>

           {reg &&
           <View style={{flex:2}}> 
           <View style={{flex:1}}> 
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("../assets/thinrainbowMirror.png")}> 
          <TextInput  placeholder='Repeat password' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}} />
           </ImageBackground>
          </View>

           <View style={{flex:1}}> 
           <ImageBackground style={{width:0.75*hor,height:0.1*vert}} source={require("../assets/thinrainbowMirror.png")}> 
           <TextInput  placeholder='Email' placeholderTextColor="white" style={{marginLeft:0.03*hor,marginTop:0.01*hor, width:0.7*hor,height:0.06*vert,fontSize:0.03*vert,fontWeight:"bold",color:'white'}}/>
           </ImageBackground>
          </View>
          </View>
          }
          </View>



          <View style={{flex:1,justifyContent:'center',height:0.8*hor,width:0.25*hor}}>
          
            <TouchableOpacity style={{flex:1}}> 
                 
               <View style={{width:0.25*hor,height:0.2*hor}}>
               <ImageBackground  resizeMode='cover' style={{width:0.3*hor,height:0.4*hor}} source={require("../assets/redsplash.png")}>
                 <Text style={{fontSize:0.06*hor, color:"yellow",height:0.4*hor,width:0.3*hor,paddingTop:0.15*hor,paddingLeft:0.1*hor,fontWeight:"bold"}}>NO</Text>             
               </ImageBackground>
              </View>
            </TouchableOpacity>

            <TouchableOpacity  style={{flex:1}}>
             
               <View style={{width:0.25*hor,height:0.2*hor}}>
               <ImageBackground  resizeMode='cover' style={{width:0.3*hor,height:0.4*hor}} source={require("../assets/bluesplash.png")}>
               <Text style={{fontSize:0.06*hor, color:"white",height:0.4*hor,width:0.3*hor,paddingTop:"50%",paddingLeft:0.11*hor,fontWeight:"bold"}}>OK</Text> 
               </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </ImageBackground>   
        </View>
        )

}


const styles = StyleSheet.create({
    screen:{
        height:"100%",
        width:"100%",
      },
    
})








export default function Screen() {










return <TouchableWithoutFeedback onPress={()=>{setTapped(true)}}>
<View style={styles.screen}>
<ImageBackground style={styles.screen} source={ScreenSaver}/>
  

<Text style={styles.AppNameA}>A.</Text>
<Text style={styles.AppNameC}>C.</Text>
<Text style={styles.AppNameI}>I.</Text>
<Text style={styles.AppNameD}>D.</Text>
</View> 
</TouchableWithoutFeedback>






}
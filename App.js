import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import Toast from 'react-native-toast-message';


const numbers = ['1','0']
const symbols = ['+','-','x','/','=']
const funcs = ['C', 'DEL', 'Transform']

export default function App() {
  const [displayisDecimal,setDisplayisDecimal] = useState(false)
  const [currentDisplay, setcurrentDisplay] = useState('')
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      paddingTop: 50,
    },
    circle:{
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    text:{
      fontSize: 20,
      fontWeight: "bold"
    },
    button: {
      borderColor: '#3f4d5b',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${100/2}%`,
      height: `100%`,
      backgroundColor: '#303946'
    },
    symboml: {
      borderColor: '#3f4d5b',
      alignItems: 'center',
      justifyContent: 'center',
      width: `100%`,
      height: `${100/5}%`,
      backgroundColor: 'lightgreen'
    },
    func: {
      borderColor: '#3f4d5b',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${100/3}%`,
      height: `${100/5}%`,
      backgroundColor: 'grey'
    },
    last: {
      borderColor: '#3f4d5b',
      alignItems: 'center',
      justifyContent: 'center',
      width: `100%`,
      height: `${100/5}%`,
      backgroundColor: '#303946'
    },
  });

  const handleInput = (number) =>{

    if(displayisDecimal){
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'não é possivel fazer operações com decimais, limpe a calculadora'
      });
      return
    }

    if(number == "="){
      handleEqual()
      return;
    }
    
    setcurrentDisplay(currentDisplay + number)
  }

  const isOperation = () =>{
    for(let i=0;i <currentDisplay.length;i++){
      if(symbols.includes(currentDisplay[i])){
        return true
      }
    }
    return false
  }

  const handleOperations = (op) =>{

    if(op == "C"){
      setcurrentDisplay("")
      setDisplayisDecimal(false)
    }

    if(op == "DEL"){
      if(currentDisplay.length==1){
        setcurrentDisplay("")
        setDisplayisDecimal(false)
        return
      }else{
      setcurrentDisplay(currentDisplay.substring(0,currentDisplay.length-1))
      }
    }

    if(displayisDecimal){
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'não é possivel fazer operações com decimais, limpe a calculadora'
      });
      return
    }

    if(op=="Transform"){
      if(isOperation()){
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'não é possivel transformar uma operação'
        });
        return;
      }
      var value = parseInt(currentDisplay, 2);
      setcurrentDisplay(value.toString())
      setDisplayisDecimal(true)
    }
  }
   
  const handleEqual = () =>{
    let numbers = []
    let operations = []
    let lastSymbomlIndex = 0
    for(let i=0;i <currentDisplay.length;i++){
      if(symbols.includes(currentDisplay[i])){
        numbers.push(currentDisplay.substring(lastSymbomlIndex,i))
        if(currentDisplay[i] == "x"){
          operations.push("*")
        }else{
        operations.push(currentDisplay[i])
        }
        lastSymbomlIndex = i + 1
      }
    }
    numbers.push(currentDisplay.substring(lastSymbomlIndex,currentDisplay.length))
    let strfinal = ""
    for(let i=0;i <numbers.length-1;i++){
      let value = parseInt(numbers[i], 2);
      strfinal+= value.toString()
      strfinal+= operations[i]
    }
    strfinal+= parseInt(numbers[numbers.length-1],2).toString()
    setcurrentDisplay(eval(strfinal).toString(2))
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 40 }}>
      
      <View style={ { flexDirection: "row", justifyContent: "flex-end", marginTop: 50}}>
        <Text style= {{ color: "#00b9d6", fontSize: 35}}>{currentDisplay}</Text>
      </View>
      </View>

      <View style={{ flex: 1, marginTop: 5 }}>
        <View style={{ flex:1, flexDirection: "row"}}>
          
        <View style={ {flex: 3, flexDirection: "row", flexWrap: 'wrap'}}>

          {funcs.map( (func,key) => 
            <TouchableOpacity  key={key} style={styles.func} onPress={() => handleOperations(func)} >
            <Text> {func} </Text>
            </TouchableOpacity>
          )}

          {numbers.map( (number,key) => 
            <TouchableOpacity  key={key} style={styles.button}  onPress={() => handleInput(number)} >
            <Text> {number} </Text>
            </TouchableOpacity>
          )}    
        </View>
        <View style={{ flex: 1}}>
        {symbols.map( (symbol,key) => 
            <TouchableOpacity  key={key} style={styles.symboml} onPress={() => handleInput(symbol)} >
            <Text> {symbol} </Text>
            </TouchableOpacity>
        )}
        </View>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}


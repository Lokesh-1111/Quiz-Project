import { StyleSheet, Text, TouchableOpacity, View,ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'


const Quiz = (props) => {

  const handleNextPress =()=>{
    setQuestions(questions+1)
    setOptions(generateOptionsandShuffle(ques[questions+1]))
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

  const [ques, setQues] = useState()
  const [questions, setQuestions] = useState(0)
  const [options,setOptions] = useState([])
  const [score,setScore] = useState(0)
  const [isLoading, setisLoading] = useState(false)

  const getQuiz = async()=>{
    setisLoading(true)
    const url = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986'
    const res = await fetch(url);
    const data = await res.json()
    setQues(data.results)
    setOptions(generateOptionsandShuffle(data.results[questions]))
    setisLoading(false)
  }
  useEffect(() => {
    // fetch('https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986')
    //   .then(res => res.json())
    //   .then(data => { setQues(data.results) })
    //   generateOptionsandShuffle(data.results[0]);
    getQuiz()
  }, [])

  const generateOptionsandShuffle = (_question)=>{
    const options = [..._question.incorrect_answers]
    options.push(_question.correct_answer)
    // console.log(options)
    shuffleArray(options)
    // console.log(options)
    return options
  }

  const HandleOption = (_ans)=>{
    if(_ans===ques[questions].correct_answer){
      setScore(score+10)
    }
    if(questions!==9){
    setQuestions(questions+1)
    setOptions(generateOptionsandShuffle(ques[questions+1]))
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ?<View style={styles.indicator}><ActivityIndicator size='large' animating={true} ></ActivityIndicator></View> : ques && <View style={styles.parent}>
        <View style={styles.top}>
          <Text style={styles.question}>Q. {decodeURIComponent(ques[questions].question)}</Text>
        </View>
        <View style={styles.options}>
          {/* <TouchableOpacity style={styles.Optionbutton}>
            <Text style={styles.option}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Optionbutton}>
            <Text style={styles.option}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Optionbutton}>
            <Text style={styles.option}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Optionbutton}>
            <Text style={styles.option}>Option 1</Text>
          </TouchableOpacity> */}
          <View>
            {options.map( (item,index) => <TouchableOpacity key={index} style={styles.Optionbutton} onPress={()=>HandleOption(item)}>
              <Text style={styles.option}>{decodeURIComponent(item)}</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.bottom}>
          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.btn_text}>SKIP</Text>
          </TouchableOpacity> */}
          {questions!==9 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
            <Text style={styles.btn_text}>NEXT</Text>
          </TouchableOpacity>}
          {
            questions===9 &&<TouchableOpacity style={styles.button} onPress={()=>props.navigation.navigate("Result",{score:score})}>
            <Text style={styles.btn_text}>SHOW RESULT</Text>
          </TouchableOpacity>
          }
          
        </View>
      </View>}
    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%'
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1
  },
  bottom: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1A759F',
    padding: 12,
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal:30
  },
  btn_text: {
    fontSize: 25,
    color: 'white',
    borderBottomColor: 'red',
    fontWeight: '400',
  },
  question: {
    fontSize: 28
  },
  option: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500'
  },
  Optionbutton: {
    backgroundColor: '#34A0A4',
    padding: 12,
    borderRadius: 18,
    marginBottom: 12
  },
  parent:{
    height:'100%'
  },
  indicator:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
})
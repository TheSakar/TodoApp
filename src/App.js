/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Text,
  Alert
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { willDo: [], completed: [], text: '' }
  }



  addTodo() {
    if (this.state.text.length > 0) {
      let newWillDo = [...this.state.willDo]
      let completed = [...this.state.completed]
      newWillDo.push(this.state.text)
      this.setState({ willDo: newWillDo, completed: completed, text: '' })
      console.warn(this.state)
    } else {
      Alert.alert(
        'Invalid input!',
        'Input is Empty.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }
  }

  onPressTodo = (item) => {
    let newWillDo = [...this.state.willDo]
    //remove item from newWillDo
    var index = newWillDo.indexOf(item)
    if (index > -1) {
      newWillDo.splice(index, 1)
    }
    let newCompleted = [...this.state.completed]
    newCompleted.push(item)
    let text = this.state.text
    this.setState({ willDo: newWillDo, completed: newCompleted, text: text })
  }

  renderWillDo = (willDo) => {
    return (
      <TouchableOpacity
        onPress={() => this.onPressTodo(willDo)}>
        <Text style={styles.willDo}>{willDo}</Text>
      </TouchableOpacity>
    )
  }

  renderCompleted = (completed) => {
    return (
      <Text style={styles.completed}>{completed}</Text>
    )
  }


  render() {
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={styles.textInput}
          placeholder="Write TODO"
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}>
        </TextInput>
        <Button
          onPress={() => this.addTodo()}
          title="Add TODO"
          color="#841584"
        // accessibilityLabel="Learn more about th  s purple button"
        />
        <ScrollView style={styles.scrollView}>
          <View >
            {this.state.willDo.length <= 0 ? null : <Text style={styles.sectionHeader}>WillDo</Text>}
            {this.state.willDo.map(willDo => this.renderWillDo(willDo))}
          </View>
          <View >
            {this.state.completed.length <= 0 ? null : <Text style={styles.sectionHeader}>Completed</Text>}
            {this.state.completed.map(completed => this.renderCompleted(completed))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderRadius: 12,
    marginBottom: 3
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    paddingTop: 22
  },
  sectionHeader: {
    margin: 10,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(177, 187, 207,1.0)',
  },
  completed: {
    marginLeft: 12,
    textDecorationLine: 'line-through',
    borderRadius: 12,
    textDecorationColor: 'rgba(22, 180, 247,1.0)'

  },
  willDo: {
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
    paddingLeft: 15,
    backgroundColor: 'rgba(242, 203, 44,1.0)'
  },
});


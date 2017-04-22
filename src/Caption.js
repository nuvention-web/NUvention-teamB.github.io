import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Button, ListView, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';


export default class Caption extends Component {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.goToPost = this.goToPost.bind(this);
    this.goToTagEditor = this.goToTagEditor.bind(this);
    this.renderRow = this.renderRow.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log(this.props.data);
    this.state = {
      data: this.props.data ? this.props.data : {caption:'',captionWithTags:'',tags:[]}
    };
    if (this.props.data != null) {
      this.setState({tags: ds.cloneWithRows(this.props.data.tags)});
    }
  }

  goToPost() {
    this.state.data.caption = this.state.text;
    Actions.post({post:this.props.post});
  }

  goToTagEditor(tag) {
    Actions.tagEditor({post:this.props.post, tag:tag})
  }

  onChangeText(text) {
    this.setState({text})
  }

  renderRow(rowData) {
    return (
      <View marginBottom={20}>
        <TouchableOpacity
            onPress={() => {this.goToTagEditor(rowData.name)}}>
          <Text>{rowData.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  conditional() {
    if (this.state.tags.length != 0) {
      return (
        <ListView
          dataSource={this.state.tags}
          renderRow={this.renderRow}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.postInput}
          defaultValue={this.state.data.caption}
          multiline={true}
          onChangeText={this.onChangeText}/>
        <Text>{this.state.data.caption}</Text>
        {this.conditional}
        <Button
          title="Next>"
          onPress={this.goToPost}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100
  },
  postInput: {
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
  },
});

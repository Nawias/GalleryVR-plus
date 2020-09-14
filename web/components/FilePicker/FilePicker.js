import React from 'react';
import { VrButton, Text, View, StyleSheet } from 'react-360';

import File from './File';
import Axios from 'axios';

class Stack {
  constructor() {
    this.items = [];
  }
  push = item => this.items.push(item);
  pop = () => this.items.pop();
  isEmpty = () => this.items.length === 0;
  clear = () => {
    this.items.length = 0;
  };
}

export default class FilePicker extends React.Component {
  state = {
    currentDirectoryId: '',
    currentDirectoryName: 'My Drive',
    files: [],
  };

  _parents = new Stack();

  async componentDidMount() {
    await Axios.get('http://localhost:3000/google/listFiles', {
      withCredentials: true,
    })
      .catch(error => {
        console.log('COMPONENT:', error);
      })
      .then(res => {
        data = res.data;
        this.setState({
          files: data,
        });
        console.log(data);
      });
  }

  changeDirectory = file => {
    let parent = file;
    if (file.parents !== undefined)
      this._parents.push({
        id: this.state.currentDirectoryId,
        name: this.state.currentDirectoryName,
      });
    else parent = this._parents.pop();
    Axios.get(
      `http://localhost:3000/google/listFiles${
        parent.id !== '' ? `?parent=${parent.id}` : ''
      }`,
      {
        withCredentials: true,
      },
    )
      .catch(error => {
        console.log('COMPONENT:', error);
      })
      .then(res => {
        data = res.data;
        this.setState({
          currentDirectoryId: parent.id,
          currentDirectoryName: parent.name,
          files: data,
        });
        console.log(this.state);
      });
  };

  playFile = file => {
    console.log('playfile');
    this.props.playFile && this.props.playFile(file);
  };

  handleFileClick = file => {
    console.log(file);
    if (file.mimeType.includes('folder')) this.changeDirectory(file);
    else this.playFile(file);
  };

  renderFiles = () => {
    dir = this.state;
    let files = dir.files.map(file => {
      let name = `${file.name}`;
      return (
        <File
          key={file.name}
          name={name}
          onClick={() =>
            this.handleFileClick({
              id: file.id,
              name: file.name,
              mimeType: file.mimeType,
              parents: file.parents,
            })
          }
        />
      );
    });

    return <View style={styles.files}>{files}</View>;
  };

  renderBackButton = () => {
    if (this.state.currentDirectoryId === '')
      return <View style={{ flexBasis: '5%' }} />;
    return (
      <VrButton
        onClick={() => this.changeDirectory({ id: this.state.parent })}
        style={styles.backButton}
      >
        <Text style={{ textAlign: 'center' }}>{'<'}</Text>
      </VrButton>
    );
  };

  render() {
    return (
      <View style={styles.filePicker}>
        <View style={styles.header}>
          {this.renderBackButton()}
          <Text style={styles.headerText}>
            {`File Picker - ${
              this.state.currentDirectoryName === ''
                ? 'My Drive'
                : this.state.currentDirectoryName
            }`}
          </Text>
          <View
            style={{
              flexBasis: '5%',
            }}
          />
        </View>
        {this.renderFiles()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filePicker: {
    padding: '1 1',
    width: 800,
    height: 400,
    backgroundColor: '#222222',
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: 'column',
  },
  header: {
    padding: '1 1',
    backgroundColor: '#111111',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    height: 40,
    width: '80%',
    paddingTop: 1,
    textAlign: 'center',
  },
  backButton: {
    flexBasis: '5%',
    padding: '1 1',
    width: 40,
    height: 40,
    backgroundColor: '#171717',
  },
  files: {
    padding: '1 1',
    flexGrow: 2,
    backgroundColor: '#151515',
  },
});

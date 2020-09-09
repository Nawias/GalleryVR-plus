import React from "react";
import { VrButton, Text, View, StyleSheet } from "react-360";
import File from "./File";

const Files = {
  name: "",
  type: "dir",
  files: [
    {
      name: "photos/",
      type: "dir",
      files: [
        { name: "360_ocean.jpg", type: "file" },
        { name: "360_city.jpg", type: "file" },
        { name: "360_mountains.jpg", type: "file" },
      ],
    },
    {
      name: "videos/",
      type: "dir",
      files: [
        { name: "360_concert.mp4", type: "file" },
        { name: "360_music.webm", type: "file" },
        { name: "lego.mp4", type: "file" },
      ],
    },
  ],
};

export default class FilePicker extends React.Component {
  state = {
    currentDirectory: "",
  };

  changeDirectory = (file) => {
    this.setState({ currentDirectory: file.name });
  };

  playFile = (file) => {
    console.log("playfile");
    this.props.playFile && this.props.playFile(file.name);
  };

  handleFileClick = (file) => {
    console.log(file);
    if (file.type === "dir") this.changeDirectory(file);
    else this.playFile(file);
  };

  renderFiles = () => {
    let dir = Files.files.find(
      (d) => d.type === "dir" && d.name === this.state.currentDirectory
    );

    if (dir === undefined) dir = Files;
    let files = dir.files.map((file) => {
      let name = `${file.name}`;
      return (
        <File
          key={file.name}
          name={name}
          onClick={() =>
            this.handleFileClick({
              name: this.state.currentDirectory + file.name,
              type: file.type,
            })
          }
        />
      );
    });

    return <View style={styles.files}>{files}</View>;
  };

  render() {
    return (
      <View style={styles.filePicker}>
        <View style={styles.header}>
          <VrButton
            onClick={() => this.changeDirectory({ name: "" })}
            style={styles.backButton}
          >
            <Text> {"<"} </Text>
          </VrButton>
          <Text
            style={{
              alignSelf: "center",
              flexGrow: 2,
              textAlign: "center",
            }}
          >
            {`File Picker - ${
              this.state.currentDirectory === ""
                ? "Home"
                : this.state.currentDirectory
            }`}
          </Text>
        </View>
        {this.renderFiles()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filePicker: {
    padding: "1 1",
    width: 800,
    height: 400,
    backgroundColor: "#222222",
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "column",
  },
  header: {
    padding: "1 1",
    backgroundColor: "#111111",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    padding: "1 1",
    backgroundColor: "#171717",
    alignSelf: "flex-start",
  },
  files: {
    padding: "1 1",
    flexGrow: 2,
    backgroundColor: "#151515",
  },
});

import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  asset,
  Environment,
  VrButton,
  Image,
} from "react-360";
import MediaPlayer from "./components/MediaPlayer/MediaPlayer";
import FilePicker from "./components/FilePicker/FilePicker";

export default class GalleryVR extends React.Component {
  state = {
    hidden: false,
    video: "",
    videoFormat: "",
  };

  toggleWindow = () => {
    if (this.state.videoFormat === "2D") this.setState({ hidden: false });
    else this.setState({ hidden: !this.state.hidden });
  };

  playFile = (file) => {
    file = "" + file;
    if (file.startsWith("photos/360_")) {
      Environment.setBackgroundImage(asset(file), {
        rotateTransform: [{ rotateY: "180deg" }],
      });
    } else if (file.startsWith("videos/360_")) {
      this.setState({ video: file, videoFormat: "3D" });
    } else if (file.startsWith("videos")) {
      this.setState({ video: file, videoFormat: "2D" });
    }
    console.log(file);
  };

  renderPlayerOrPicker() {
    if (this.state.video !== "" && this.state.videoFormat !== "") {
      return (
        <MediaPlayer
          style={styles.mediaPlayer}
          source={asset(this.state.video)}
          stereo={this.state.videoFormat}
        />
      );
    } else {
      return <FilePicker playFile={this.playFile} />;
    }
  }

  render() {
    return (
      <View style={styles.panel}>
        <View
          style={{
            opacity: this.state.hidden ? 0.0 : 1.0,
            height: this.state.hidden ? 0 : "90%",
          }}
        >
          {this.renderPlayerOrPicker()}
        </View>
        <View style={styles.toggleButton}>
          <VrButton
            onClick={this.toggleWindow}
            style={{
              height: 40,
            }}
          >
            <Image
              style={styles.icon}
              source={asset(
                `icons/${this.state.hidden ? "closed.png" : "open.png"}`
              )}
            />
          </VrButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    flexGrow: 2,
    justifyContent: "flex-end",
  },

  icon: {
    height: "100%",
    padding: 10,
    aspectRatio: 1,
  },
  window: {},
});

AppRegistry.registerComponent("GalleryVR", () => GalleryVR);

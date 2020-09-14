import React from 'react';
import { VideoPlayer, VideoControl } from '../../src/VideoExtra';
import { View, Environment, asset, StyleSheet } from 'react-360';
import VideoModule from 'VideoModule';

export default class MediaPlayer extends React.Component {
  spatialPlayer = VideoModule.createPlayer('spatial');

  componentDidMount = () => {
    this.update();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.stereo !== this.props.stereo) this.update();
  };

  update() {
    if (this.props.stereo !== '2D') {
      this.spatialPlayer.play({
        source: { url: this.props.source.uri, fileFormat: 'mp4' },
        muted: false,
      });
      Environment.setBackgroundVideo('spatial', {});
    } else {
      Environment.setBackgroundImage(asset('360_world.jpg'));
    }
  }

  componentWillUnmount() {
    this.spatialPlayer.destroy();
  }

  renderSpatialOrFlatVideo = () => {
    if (this.props.stereo === '2D') {
      return (
        <View
          style={{
            borderColor: '#639dda',
            borderWidth: 2,
          }}
        >
          <VideoPlayer
            muted={false}
            source={{ url: this.props.source.uri }}
            style={{
              width: 800,
              height: 400,
            }}
            player={this.spatialPlayer}
          />
        </View>
      );
    } else {
      return (
        <VideoControl
          player={this.spatialPlayer}
          style={[
            {
              height: '10%',
              width: '100%',
              alignSelf: 'flex-end',
              opacity: 0.5,
            },
          ]}
        />
      );
    }
  };

  render() {
    return (
      <View style={styles.mediaPlayer}>{this.renderSpatialOrFlatVideo()}</View>
    );
  }
}

const styles = StyleSheet.create({
  mediaPlayer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    padding: 20,
  },
});

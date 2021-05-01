/* eslint-disable no-alert */

import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
    this.data = '';

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
      sugars: '',
    };
  }

  onBarCodeRead(scanResult) {
    console.info(scanResult.bounds.origin);
    this.data = scanResult.data;
    this.fetchData();
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        this.barcodeCodes.push(scanResult.data);
        // console.log('onBarCodeRead call');
      }
    }
    return;
  }

  async fetchData() {
    let Barcode = this.data;
    // let Barcode = '8908006077410';

    //console.log(this.data == barcode);
    const res = await Axios.post(
      'https://palm-surf-hellebore.glitch.me/food/barcode',
      {barcode: Barcode},
    );
    // console.log('-----------------------');
    // console.log(res.data.Sugars);
    // console.log('------------------------');
    this.setState({
      sugars: JSON.stringify(res.data.Sugars),
    });
    return Barcode;
  }

  async takePicture() {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  barcodeRecognized = ({barcodes}) => {
    barcodes.forEach(barcode => console.log(barcode));
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          androidCameraPermissionOptions={{
            title: 'Camera Access Request',
            message: 'Hi, Can I access Your Camera ?',
            buttonPositive: 'Yes',
            buttonNegative: 'No',
          }}
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.resultMessage}>
            Hey mate, scan your barcode to get the data.
          </Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={() => {
              this.data !== ''
                ? alert('Sugar content \t' + this.state.sugars)
                : alert('Scan and then try');
            }}
            style={styles.viewResultsButton}
            title={'View Results'}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewResultsButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  resultMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default App;

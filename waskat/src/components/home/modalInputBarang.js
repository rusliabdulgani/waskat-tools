// import library
import React from 'react'
import {View, Text, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native'

// import files
import units from '../../helper/viewPort'

export default class ModalInputBarang extends React.PureComponent {
  render () {
    return (
      <Modal animationType={'fade'} visible={this.props.visibleModal} onRequestClose={() => console.log('close')} transparent>
      <TouchableWithoutFeedback onPress={() => this.props.openModal()}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
                <View style={styles.topModalBox}>
                    <Image source={{uri: this.props.gambar}} style={styles.imageContent} />
                </View>
                <View style={styles.bottomModalBox}>
                  <View style={styles.topBottomModalBox}>
                    <Text style={styles.title}>Keterangan :</Text>
                  </View>
                  <View style={{paddingLeft: 10, paddingRight: 10}}>
                  </View>
                  <TextInput
                        onChange={(event) => { this.props.onChangeInputKeterangan(event) }}
                        editable={true}
                        numberOfLines={4}
                        multiline={true}
                        style={styles.textArea} />
                  <View style={styles.botBottomModalBox}>
                    <TouchableOpacity style={styles.buttonBox} onPress={() => this.props.inputBarang(this.props.gambar, this.props.keterangan)}>
                      <Text style={styles.textButton}>Input Barang</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          </View>
          </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

let {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
  textButton: {
    fontSize: 5 * units.vw,
    color: 'white',
    fontFamily: 'BrandonText-Medium'
  },
  textArea: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    width: 'auto',
    borderRadius: 10,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    fontSize: 20,
    fontFamily: 'BrandonText-Regular'
  },
  buttonBox: {
    width:width,
    height: height * 0.08,
    backgroundColor: 'green',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  },
  iconMargin: {
    marginLeft: 1 * units.vw
  },
  botBottomModalBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerBottomModalBox: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2 * units.vw
  },
  leftBotBottomModalBox: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 3 * units.vw
  },
  rightBotBottomModalBox: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3 * units.vw
  },
  topBottomModalBox: {
    margin: 3 * units.vw,
    bottom: 0
  },
  title: {
    fontFamily: 'BrandonText-Medium',
    fontSize: 4 * units.vw
  },
  contentModal: {
    fontFamily: 'BrandonText-Regular',
    fontSize: 4.5 * units.vw,
    marginTop: 1 * units.vw
  },
  topModalBox: {
    flex: 1,
    backgroundColor: 'green'
  },
  bottomModalBox: {
    flex: 1,
    backgroundColor: '#fff'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    width: 80 * units.vw,
    height: 130 * units.vw
  },
  imageContent: {
    width: 80 * units.vw,
    height: 70 * units.vw
  }
})

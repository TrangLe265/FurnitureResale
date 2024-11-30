import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

import { colors } from '../styling/colors';
import * as T from '../styling/fonts'; 
import { HorizontalDivider } from '../styling/Divider';
import { Row, SmlButton } from '../styling/Components';

export default ConfirmationModal = ({ visible, onConfirm, onCancel, message }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <T.bodyText>{message}</T.bodyText>
          <HorizontalDivider/>
          <Row>
            <SmlButton style={{backgroundColor: colors.orange}} onPress={onCancel}>Cancel</SmlButton>
            <SmlButton onPress={onConfirm}>Proceed</SmlButton>
          </Row>
          </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

});


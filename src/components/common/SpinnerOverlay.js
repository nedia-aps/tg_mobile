import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class SpinnerOverlay extends Component {
  render() {
    const {
      loaderColor,
      isRequest,
      sizeLoader = 'small',
      isLoading = 'false'
    } = this.props;
    const modalColor = isRequest ? 'transparent' : 'rgba(0, 0, 0, 0.7)';
    const loader = isRequest ? 'transparent' : loaderColor;
    return (
      <Modal
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={isLoading || isRequest}
        onRequestClose={() => this.close()}
      >
        <View style={[styles.container, { backgroundColor: modalColor }]}>
          <View style={styles.background}>
            <ActivityIndicator size={sizeLoader} color={loader} />
          </View>
        </View>
      </Modal>
    );
  }
}
SpinnerOverlay.propTypes = {
  loaderColor: PropTypes.string.isRequired,
  sizeLoader: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};
const mapStateToProps = ({ activityIndicatorReducer }) => {
  const { isLoading, isRequest } = activityIndicatorReducer;
  return { isLoading, isRequest };
};
export default connect(
  mapStateToProps,
  []
)(SpinnerOverlay);

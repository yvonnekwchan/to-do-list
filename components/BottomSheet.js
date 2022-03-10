import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { IconButton, Portal } from 'react-native-paper';
import useKeyboardHeight from 'react-native-use-keyboard-height';

const BottomSheet = (props) => {
    const keyboardHeight = useKeyboardHeight();
    //const bottomSheetHeight = keyboardHeight;
    const bottomSheetHeight = Dimensions.get("window").height * 0.85;
    const deviceWidth = Dimensions.get("window").width;
    const [open, setOpen] = useState(props.show);
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;

    const onGesture = (event) => {

    }

    const onGestureEnd = (event) => {

    }

    useEffect(() => {
        if (props.show) {
            setOpen(props.show);
            Animated.timing(bottom, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(bottom, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setOpen(false);
            });
        }
    }, [props.show]);

    if (!open) {
        return null;
    }
    return <Portal>
        <Animated.View style={[styles.root,
        {
            height: bottomSheetHeight,
            bottom: bottom,
            shadowOffset: { height: -3 }
        },
        styles.common]}>
{/* <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}> */}


            <View style={[
                styles.header,
                styles.common,
                {
                    position: 'relative',
                    shadowOffset: {
                        height: 3
                    },
                }]}>
                <View style={{
                    width: 40,
                    position: 'absolute',
                    borderRadius: 1.5,
                    top: 0,
                    left: (deviceWidth - 40) / 2,
                    zIndex: 10,
                    backgroundColor: "#ccc"
                }}
                />
                <IconButton color="red" icon="close" style={styles.closeIcon}
                    onPress={props.onDismiss}></IconButton>
            </View>
            {/* </PanGestureHandler> */}
            {props.children}
        </Animated.View>
    </Portal>
}

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#FFF",
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        overflow: "hidden",
    },
    header: {
        height: 44,
        backgroundColor: '#fff'
    },
    common: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        elevation: 3,
    },
    closeIcon: {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 10,
    },
});

export default BottomSheet;
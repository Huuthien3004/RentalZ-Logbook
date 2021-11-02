import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    Modal
} from "react-native";
import ButtonElements from "../Components/StyledComponents/ButtonElements";
import Icon from "react-native-vector-icons/FontAwesome";

var { width } = Dimensions.get("window");

const ListItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false)


    return (
        <View>
            <TouchableOpacity
                 onPress={() => {
                    props.navigation.navigate("Details", { item: props })
                }}
                onLongPress={() => setModalVisible(true)}
                style={[styles.container, {
                    backgroundColor: props.index % 2 == 0 ? "white" : "gray"
                }]}
            >

                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.property}</Text>
                <Text style={styles.item}>$ {props.price}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.reporter}</Text>
                <TouchableOpacity>
                <ButtonElements 
                        medium
                        onPress={() => [
                            props.navigation.navigate("Update Notes", { item: props})
                        ]}
                        >
                                 <Icon name="pencil" color="black" size={20} />
                        </ButtonElements>
                        <ButtonElements 
                        medium
                        onPress={() => [props.delete(props.id)]}
                        >
                                 <Icon name="close" color="black" size={20} />
                        </ButtonElements>
                        </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 4
    },

    textStyle: {
        color: "white",
        fontWeight: "bold"
    }
})

export default ListItem;
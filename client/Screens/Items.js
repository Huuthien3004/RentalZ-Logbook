import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Header, Item, Input } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import ListItem from './ListItem'
import axios from "axios"
import baseURL from "../assets/common/baseUrl"
var { height, width } = Dimensions.get("window")

const ListHeader = () => {
    return (
        <View
            style={styles.listHeader}
        >
            
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold' }}>Property</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold' }}>Price</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold' }}>Name</Text>
            </View>
        </View>
    )
}

const Items = (props) => {

    const [itemList, setItemList] = useState();
    const [itemFilter, setItemFilter] = useState();
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(
            () => {
                axios
                    .get(`${baseURL}items`)
                    .then((res) => {
                        setItemList(res.data);
                        setItemFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setItemList();
                    setItemFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    const searchItem = (text) => {
        if (text == "") {
            setItemFilter(itemList)
        }
        setItemFilter(
            itemList.filter((i) =>
                i.property.toLowerCase().includes(text.toLowerCase())
            )
        )
    }
    const deleteItem = (id) => {
        axios
            .delete(`${baseURL}items/${id}`)
            .then((res) => {
                const items = itemFilter.filter((item) => item.id !== id)
                setItemFilter(items)
            })
            .catch((error) => console.log(error));
    }
    return (
        <View style={styles.container}>
            <View>
                <Header searchBar rounded>
                    <Item style={{ padding: 5 }}>
                        <Icon name="search" />
                        <Input
                            placeholder="Searching by property type..."
                            onChangeText={(text) => searchItem(text)}
                        />
                    </Item>
                </Header>
            </View>
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : (
                <FlatList
                    data={itemFilter}
                    ListHeaderComponent={ListHeader}

                    renderItem={({ item, index }) => (
                        <ListItem
                            {...item}
                            navigation={props.navigation}
                            index={index}
                            delete={deleteItem}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gray'
    },
    headerItem: {
        margin: 3,
        width: width / 4


    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})

export default Items;
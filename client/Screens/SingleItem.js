import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Container } from 'native-base';


const SingleItem = (props) => {

    const [item, setItem] = useState(props.route.params.item);

    return (
        <Container >
            <ScrollView>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>Property Type: {item.property}</Text>
                    <Text style={styles.contentText}>Bedroom: {item.bedroom}</Text>
                    <Text style={styles.contentText}>Furniture Type: {item.furniture}</Text>
                    <Text style={styles.price}>Monthly Price: {item.price}</Text>
                    <Text style={styles.contentText}>Notes: {item.note}</Text>
                    <Text style={styles.contentText}>Name Reporter: {item.reporter}</Text>
                    <Text style={styles.contentText}>Date and Time: {item.date}</Text>
                </View>
            </ScrollView>
        </Container>
    )

}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentText: {
        fontSize: 18,
        marginBottom: 20
    },
    bottomContainer: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    price: {
        fontSize: 18,
        marginBottom: 20,
        color: 'black'
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

export default SingleItem;
import React, { useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet
} from "react-native"
import FormContainer from "../Components/Form/FormContainer"
import Input from "../Components/Form/Form"
import ButtonElements from "../Components/StyledComponents/ButtonElements"
import Error from "../Components/StyledComponents/Error"
import Toast from "react-native-toast-message"
import baseURL from "../assets/common/baseUrl"
import axios from "axios"


const UpdateNotes = (props) => {
    const [err, setError] = useState();
    const [item, setItem] = useState(null);
    const [note, setNote] = useState('');

    useEffect(() => {
        if (!props.route.params) {
            setItem(null);
        } else {
            setItem(props.route.params.item);
            setNote(props.route.params.item.note);
        }
    }, [])

    const addItem = () => {
        if (
            note == ""
        ) {
            setError("Please fill in the form correctly")
        }
        else {
            let formData = new FormData();
            formData.append("note", note);

            if (item !== null) {
                axios
                    .put(`${baseURL}items/${item.id}`, formData)
                    .then((res) => {
                        if (res.status == 200 || res.status == 201) {
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: "Changes has successfuly updated!",
                                text2: ""
                            });
                            setTimeout(() => {
                                props.navigation.navigate("Items");
                            }, 500)
                        }
                    })
                    .catch((error) => {
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "Something went wrong",
                            text2: "Please try again"
                        })
                    })
            }
        }
    }
    return (
        <FormContainer>
            <View style={styles.label}>
                <Text>Notes:</Text>
            </View>
            <Input
                placeholder="Notes"
                name="note"
                id="note"
                value={note}
                onChangeText={(note) => setNote(note)}
                onChange={() => setNoteError('')}

            />
            {err ? <Error message={err} /> : null}
            <View style={styles.buttonContainer}>
                <ButtonElements
                    large
                    primary
                    onPress={() => addItem()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </ButtonElements>
            </View>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "95%",
        marginTop: 10
    },
    buttonContainer: {
        width: "95%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    }
})

export default UpdateNotes;
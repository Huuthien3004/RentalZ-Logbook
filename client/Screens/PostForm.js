import React, { useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Alert,
    Button
} from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Item, Picker } from "native-base"
import FormContainer from "../Components/Form/FormContainer"
import Form from "../Components/Form/Form"
import DateForm from "../Components/Form/DateForm"
import ButtonElements from "../Components/StyledComponents/ButtonElements"
import Error from "../Components/StyledComponents/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import baseURL from "../assets/common/baseUrl"
import axios from "axios"


const listbedrooms = require("../assets/bedrooms.json");
const Listfurnitures = require("../assets/furnitures.json")
const listproperties = require("../assets/properties.json");

const PostForm = (props) => {
    const [price, setPrice] = useState('');
    const [err, setError] = useState();
    const [item, setItem] = useState(null);
    const [note, setNote] = useState('');
    const [reporter, setReporter] = useState('');
    const [property, setProperty] = useState('');
    const [bedroom, setBedroom] = useState('');
    const [furniture, setFurniture] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');


    const createTwoButtonAlert = () =>
        Alert.alert(
            "Before you submit...",
            "Are everything correct as you wanted?" + "\n"
             + "Property: " + property + "\n" + "Bedroom: " + bedroom +
            "\n" + "DateTime: " + date + "\n" + "Furniture: " + furniture
            + "\n" + "Price: " + price + "$" + "\n" + "Note: " + note + "\n" + "Name: " + reporter,
            [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "Confirm", onPress: () => addItem() }
            ],
            { cancelable: false }
        );
        
    useEffect(() => {

        if (!props.route.params) {
            setItem(null);
        } else {
            setItem(props.route.params.item);
            setPrice(props.route.params.item.price.toString());
            setNote(props.route.params.item.note);
            setText(props.route.params.item.text);
            setReporter(props.route.params.item.reporter);
            setProperty(props.route.params.item.property.name);
            setBedroom(props.route.params.item.bedroom.name);
            setFurniture(props.route.params.item.furniture.name);
        }
    }, [])


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);


        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes()
        setText(fDate + ' ' + fTime)

        // Log the Time & Date values
        console.log(fTime)
        console.log(tempDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const validate = () => {
        if (
            price == "" ||
            price <= 0 ||
            text == "" ||
            reporter == "" ||
            property == "" ||
            bedroom == "" ||
            furniture == ""

        ) {
            setError("Please input the data correctly and not leaving blank")
        } else {
            createTwoButtonAlert();
        }
    }
    const addItem = () => {

        let formData = new FormData();

        formData.append("price", price);
        formData.append("note", note);
        formData.append("text", text);
        formData.append("reporter", reporter);
        formData.append("property", property);
        formData.append("bedroom", bedroom);
        formData.append("furniture", furniture);

    



        if (item == null) {
            axios
                .post(`${baseURL}items`, formData)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Your listing has been added!",
                            text2: ""
                        });
                        setTimeout(() => {
                            clearForm();
                            props.navigation.navigate("Items");
                        }, 500)

                    }
                })


                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text: "Something went wrong"
                    })
                })
        }
    }

    const clearForm = () => {
        setProperty("Please choose a property");
        setBedroom("Please choose a bedroom amount");
        setFurniture("Please choose a furniture style");
        setText("");
        setReporter("");
        setPrice("");
        setNote("")
    }
    return (
        <FormContainer>
            <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{ width: undefined }}
                    value={property}
                    selectedValue={property}
                    placeholderStyle={{ color: "#007aff" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => [setProperty(e)]}
                >
                    {listproperties.map((c) => {
                        return <Picker.Item key={c.code} label={c.name} value={c.name} />
                    })}
                </Picker>
            </Item>
            <View>
                <Text></Text>
            </View>
            <Item picker>
                <Picker

                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{ width: undefined }}
                    value={bedroom}
                    selectedValue={bedroom}
                    placeholderStyle={{ color: "#007aff" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => setBedroom(e)}
                >
                    {listbedrooms.map((c) => {
                        return <Picker.Item key={c.code} label={c.name} value={c.name} />
                    })}
                </Picker>
            </Item>
            <View>
                <Text></Text>
            </View>
            <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{ width: undefined }}
                    value={furniture}
                    selectedValue={furniture}
                    placeholderStyle={{ color: "#007aff" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => setFurniture(e)}
                >
                    {Listfurnitures.map((c) => {
                        return <Picker.Item key={c.code} label={c.name} value={c.name} />
                    })}
                </Picker>
            </Item>

            <View style={styles.label}>
                <Text>Date and time:</Text>
            </View>
            <DateForm
                name="datetime"
                id="datetime"
                placeholder="dd-mm-yyyy hh:mm"
                value={text}
                onChangeText={(text) => setDate(text)}
            />
            <View style={styles.datetime}>
                <View style={styles.buttondatetime}>
                    <Button onPress={() => showMode('date')} title="DatePicker" />
                </View>
                <View style={styles.buttondatetime}>
                    <Button onPress={() => showMode('time')} title="TimePicker" />
                </View>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    maximumDate={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            <View style={styles.label}>
                <Text>Price in US$/month:</Text>
            </View>
            <Form
                name="price"
                id="price"
                pattern="/^-?\d+\.?\d*$/"
                placeholder="Must be bigger than 0"
                value={price}
                keyboardType={"numeric"}
                onChangeText={(text) => setPrice(text)}

            />

            <View style={styles.label}>
                <Text>Note (Optional):</Text>
            </View>

            <Form
                name="note"
                id="note"
                placeholder="Describe your household..."
                value={note}
                maxLength={50}
                onChangeText={(text) => setNote(text)}
            />
            <View style={styles.label}>
                <Text>Reporter:</Text>
            </View>
            <Form
                name="reporter"
                id="reporter"
                placeholder="John Doe..."
                value={reporter}
                onChangeText={(text) => setReporter(text)}
            />
            {err ? <Error message={err} /> : null}

            <View style={styles.buttonContainer}>
                <ButtonElements
                    large
                    primary
                    onPress={() => validate()}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </ButtonElements>
                <Text></Text>
                <ButtonElements
                    large
                    primary
                    onPress={() => clearForm()}
                >
                    <Text style={styles.buttonText}>Clear</Text>
                </ButtonElements>
            </View>
        </FormContainer >
    )
}

const styles = StyleSheet.create({
    label: {
        width: "95%",
        marginTop: 20
    },
    buttonContainer: {
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
    },
    datetime: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 50,
        marginLeft: 50
    },
    buttondatetime: {
        flex: 1,
        marginHorizontal: 10
    },
})

export default PostForm;
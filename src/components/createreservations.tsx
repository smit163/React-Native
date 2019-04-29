
import React, { Component } from 'react'
import { Mutation, graphql } from 'react-apollo';
import { create_reservation } from '../apollo/createreservationquery';
import { Alert } from 'react-native'
import { Container, Content, Button, Text, DatePicker, Form, Item, Input, Label, Icon, Left, Body, Right, Title, Header } from 'native-base';
import { get_reservationList } from '../apollo/reservationlistquery';
import { styles } from '../styles/main';



class CreateReservation extends Component<Props> {
    state: {};
    constructor(props) {
        super(props)
        this.state = { name: '', hotelName: '', arrivalDate: '', departureDate: '' };
    }


    goBack = () => {
        const navigateAction = this.props.navigation.navigate('createreservations', {
            selectedHotel: this.state.hotelName
        });
        this.props.navigation.dispatch(navigateAction);
    }

    showAlert = () => {
        Alert.alert(
            'Reservation is Sucessful',
            '',
            [{ text: 'OK', onPress: () => this.goBack() }]
        )
    }

    render() {
        return (
            <Mutation mutation={create_reservation} refetchQueries={[{ query: get_reservationList }]}>
                {(create_reservation, { data }) => (
                    <Container>
                        <Header>
                            <Left></Left>
                            <Body>
                                <Title>Create Reservation</Title>
                            </Body>

                        </Header>
                        <Content>
                            <Form>
                                <Item>
                                    <Icon active name='ios-contact' />
                                    <Input placeholder='Name' value={this.state.name} onChangeText={text => this.setState({ name: text })} />
                                </Item>
                                <Item>
                                    <Icon type="FontAwesome5" name="hotel" />
                                    <Input placeholder='Hotel' value={this.state.hotelName} onChangeText={text => this.setState({ hotelName: text })} />
                                </Item>

                                <Item>
                                    <Label>Check-in Date:</Label>
                                    <DatePicker
                                        defaultDate={this.state.presentDate}
                                        minimumDate={new Date(2019, 4, 30)}
                                        maximumDate={new Date(2019, 5, 30)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        textStyle={{ color: "green" }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={date => this.setState({ arrivalDate: date })}
                                        disabled={false}
                                    />
                                </Item>
                                <Item>
                                    <Label>Check-out Date:</Label>
                                    <DatePicker
                                        defaultDate={this.state.presentDate}
                                        minimumDate={new Date(2019, 4, 30)}
                                        maximumDate={new Date(2019, 5, 30)}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        textStyle={{ color: "green" }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={date => this.setState({ departureDate: date })}
                                        disabled={false}
                                    />
                                </Item>
                                <Button disabled={!this.state.name || !this.state.hotelName || !this.state.arrivalDate || !this.state.departureDate} block onPress={() => {
                                    create_reservation({
                                        variables: {
                                            "hotelName": this.state.hotelName,
                                            "departureDate": this.state.departureDate,
                                            "arrivalDate": this.state.arrivalDate,
                                            "name": this.state.name
                                        }
                                    })
                                        .then(res => {
                                            console.log("query suceesfull", res);
                                            this.showAlert();

                                        })
                                        .catch(err => <Text>Error in Response</Text>);
                                }}>
                                    <Text>Create Reservation</Text>
                                </Button>
                            </Form>

                        </Content>
                    </Container>
                )}
            </Mutation>
        )
    }
}

const MakeReservation = graphql(create_reservation)(CreateReservation)
export default MakeReservation;
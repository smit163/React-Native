import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { get_reservationList } from '../apollo/reservationlistquery';
import { Container, Header, Picker, Content, List, ListItem, Left, Body, Separator, Right, Button, Text, Title, Item, Form, Label, Icon } from 'native-base';
import { styles } from '../styles/main';


interface ReservationsListProps {
  data?: any;
  context: any;
}


class ReservationsList extends Component<ReservationsListProps> {

  constructor(props) {
    super(props)
    this.state = {
      selectedDropDownValue: ""
    };
  }

  parseDate = (value) => {
    let currentDate = new Date(value);

    if (currentDate && currentDate instanceof Date) {
      let date = currentDate.getDate();
      let month = currentDate.getMonth();
      let year = currentDate.getFullYear();
      if (date) {
        return ((month + 1) + "/" + date + "/" + year)
      }
      return '-'
    } else {
      return '-'
    }

  }

  renderReservationsList = (items) => {

    if (this.state.selectedDropDownValue && items.reservations && items.reservations.length > 0) {
      let itemsList = []
      return items.reservations.map((item, key) => {
        if (item.hotelName === this.state.selectedDropDownValue) {
          return (<ListItem key={key} noIndent style={{ backgroundColor: "#cde1f9" }}>
            <Left>
              <Text>{item.name}</Text>
            </Left>
            <Body>
              <Text>
                {this.parseDate(item.arrivalDate)}
              </Text>
            </Body>

            <Text>{this.parseDate(item.departureDate)}</Text>

          </ListItem>
          )
        }

      }
      )


    }

  }

  navigate = () => {
    this.props.navigation.navigate('createreservations')
  }

  dropDownList = (data) => {
    if (data.reservations) {

      return (
        data.reservations.map((item, key) => {
          if (item.id) {
            return <Picker.Item key={key} label={item.hotelName} value={item.hotelName} />
          }


        }
        )
      )
    }
  }

  onValueChange(value: string) {
    debugger;
    this.setState({
      selectedDropDownValue: value
    });

    this.props.navigation.state.params.selectedHotel = value;
  }

  goBack = () => {
    const navigateAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    debugger;
    const { data, navigation } = this.props;
    this.state.selectedDropDownValue = navigation.getParam('selectedHotel', '');
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => { this.goBack() }} >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Reservation List</Title>
          </Body>

        </Header>

        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Pick a Hotel Name</Label>
              <Picker
                note
                mode='dropdown'
                selectedValue={this.state.selectedDropDownValue}
                onValueChange={this.onValueChange.bind(this)}
              >
              {this.dropDownList(data)}
              </Picker>
            </Item>
          </Form>
          <List>
            <Separator>
              <ListItem>
                <Left>
                  <Text>Name</Text>
                </Left>
                <Body>
                  <Text>
                    Arrival
                  </Text>
                </Body>

                <Text >Departure</Text>

              </ListItem>
            </Separator>
            {this.renderReservationsList(data)}
          </List>
        </Content>
      </Container>
    );
  }


}

const Reservations = graphql(get_reservationList)(ReservationsList)

export default Reservations;




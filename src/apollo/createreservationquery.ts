import gql from "graphql-tag";

export const create_reservation = gql`mutation CreateResevration(
    $hotelName: String!
    $departureDate:  String!
    $arrivalDate:  String!
    $name:  String!
  ) {
    createReservation(
      data: {
        hotelName: $hotelName
        departureDate: $departureDate
        arrivalDate: $arrivalDate
        name: $name
      }
    ) {
      hotelName
      departureDate
      arrivalDate
      name
    }
  }
  `
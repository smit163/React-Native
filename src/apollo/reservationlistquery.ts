import gql from "graphql-tag";

export  const get_reservationList = gql`
query{
  reservations{
    id
    name
    hotelName
    departureDate
    arrivalDate
  }
}
`;

export const get_hotelList =gql`
query{
  reservations{
    id
   hotelName
  }
}`
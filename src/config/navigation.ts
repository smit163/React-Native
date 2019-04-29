import { createStackNavigator, createAppContainer } from "react-navigation";
import Reservations from "../components/reservationslist";
import MakeReservation from "../components/createreservations";

const Rootstack = createStackNavigator(
    {
      Home: MakeReservation ,
      createreservations: Reservations,

    },
    {
      initialRouteName: "Home" ,
      headerMode: 'none',
          
    }
  );
  
  export const AppContainer = createAppContainer(Rootstack);
  
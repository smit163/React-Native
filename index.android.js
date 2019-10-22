import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React, { Component } from 'react';


import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { NETWORK_INTERFACE } from './src/config/api';
import App from './src/App';

// Create the client as outlined in the setup guide
const client = new ApolloClient({
    link: new HttpLink({ uri: NETWORK_INTERFACE }),
    cache: new InMemoryCache()
});

class Home extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        );
    }
}


AppRegistry.registerComponent(appName, () => Home);

export default Home;

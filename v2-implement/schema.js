const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList
} = require('graphql');

// axios
const axios = require('axios');
const config = {
    baseURL: 'https://api.spacexdata.com/v3'
};


// Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {
            type: GraphQLString
        },
        rocket_name: {
            type: GraphQLString
        },
        rocket_type: {
            type: GraphQLString
        }
    })
});


// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: {
            type: GraphQLInt
        },
        mission_name: {
            type: GraphQLString
        },
        launch_year: {
            type: GraphQLString
        },
        launch_date_local: {
            type: GraphQLString
        },
        launch_success: {
            type: GraphQLBoolean
        },
        rocket: {
            type: RocketType
        },
    })
});

// RootQuery Type
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parentvalue, args) {
                return axios.get('/launches', config)
                    .then(res => {
                        return res.data;
                    })
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {
                    type: GraphQLInt
                }
            },
            resolve(parentvalue, args) {
                return axios.get(`/launches/${args.flight_number}`, config)
                    .then(res => res.data)
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parentvalue, args) {
                return axios.get('/rockets', config)
                    .then(res => res.data)
            }
        },
        rocket: {
            type: RocketType,
            args: {
                rocket_id: {
                    type: GraphQLString
                }
            },
            resolve(parentvalue, args) {
                return axios.get(`/rockets/${args.rocket_id}`, config)
                    .then(res => res.data)
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});
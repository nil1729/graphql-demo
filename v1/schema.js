const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const axios = require('axios');
const config = {
    baseURL: 'http://localhost:3000'
}

const fetchCustomer = async (query='') => {
    const res = await axios.get(`customers/${query}`, config);
    return res.data
}


// // hardcoded Data
// const customers = [
//     {id: "1", name: 'nilanjan1', email: 'nil1@gmail.com', age: 20},
//     {id: "2", name: 'nilanjan2', email: 'nil2@gmail.com', age: 19},
//     {id: "3", name: 'nilanjan3', email: 'nil3@gmail.com', age: 18}
// ];


// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
}); 

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'MyFirstQuery',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id:{type: GraphQLString}
            },
            resolve(parentvalue, args) {
                return fetchCustomer(args.id)
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentvalue, args){
                return fetchCustomer()
            }
        }
    }
});
// Mutation Type
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentvalue, args){
                return axios.post('/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }, config)
                .then(res => res.data)
            }
        },
        deleteCustomer: {
            type: CustomerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentvalue, args){
                return axios.delete(`/customers/${args.id}`, config)
                    .then(res => res.data)
            }
        },
        updateCustomer: {
            type: CustomerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parentvalue, args){
                return axios.put(`/customers/${args.id}`, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }, config)
                .then(res => res.data)
            }
        },
    }
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
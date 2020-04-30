const { buildSchema }  = require ('graphql')

module.exports = buildSchema(`

        type Booking {
            _id :ID!
            event : Event !
            user : User !
            createdAt : String !
            updatedAt : String !
        }

        type Event {
            _id :ID!
            title : String!
            description:String!
            price : Float!
            date : String!
            creator : User!
        }
        input EventInput {
            title : String!
            description:String!
            price : Float!
            date : String!

        }

        type AuthData {
            userId : ID!,
            accessToken :String!,
            refreshToken :String!,
            tokenExpiration : Int!
        }

        type User {
            _id : ID !
            email : String!
            password : String
            eventsCreated : [Event!]
        }
        input UserInput {
            email : String!
            password : String
        }


        type RootQuery {
            events : [Event!]!
            bookings : [Booking!]! 
            login(email :String!, password : String!) : AuthData!
        }
        type RootMutation {
            createEvent(eventInput :EventInput ) : Event
            createUser(userInput :UserInput ) : User
            bookEvent (eventId: ID!): Booking
            cancelEvent (bookingId :ID!) : Event    
           
        }
        schema {
            query :RootQuery
            mutation :RootMutation
        }
    `)
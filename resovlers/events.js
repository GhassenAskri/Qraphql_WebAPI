
const Event = require("../models/event");
const User = require("../models/user");
const { dateToString } = require("../helpers/date")
const { user } = require('./merge')

const transformedEvent = ( event ) => {
    return {
        ...event._doc,
        id: event.id,
        date : dateToString(event.date),
        creator: user.bind(this, event.creator),
      };
}


module.exports = {
  events: async (args , req) => {
    if( req.isAuth == false ){
      throw new Error('User not authenticated')
    }
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformedEvent(event)  ;
      });
    } catch (error) {
      throw error;
    }
  },

  createEvent: async(args , req) => {
    if( req.isAuth == false ){
      throw new Error('User not authenticated')
    }
     try {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: "5ea811ab8a037f4b842f05fd",
        });
        let createdEvent;
        const eventSaved = await event.save()           
        createdEvent = { ...eventSaved._doc };     
        let usertosave = await User.findById("5ea811ab8a037f4b842f05fd");
        if (!usertosave) {
            throw new Error(`we can't not find this user sorry .....`);
        }
        else{
            usertosave.eventsCreated.push(event);
            await usertosave.save()
            return transformedEvent(createdEvent)  ;
            
         
     }}catch (error) {
         throw error
     } 
  },

};

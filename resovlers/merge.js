const User = require("../models/user");
const Event = require('../models/event')

exports.events = async (eventsIds) => {
    const events = await Event.find({ _id: { $in: eventsIds } });
   
    try {
      return events.map((eventToTreat, i) => {
          return transformedEvent(eventToTreat)  
      });
    } catch (error) {
      throw error;
    }
  };

exports.user = async (userId) => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        id: user.id,
        eventsCreated: this.events.bind(this, user.eventsCreated),
      };
    } catch (error) {
      throw new Error('Error from merge'+error);
    }
  };

exports.singleEvent = async (eventId) => {
    try {
      const event = await Event.findById(eventId);
      return transformedEvent(event)  
    } catch (error) {
      throw error;
    }
  };

  
 
 
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
        eventsCreated: events.bind(this, user.eventsCreated),
      };
    } catch (error) {
      throw error;
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

  
 
 
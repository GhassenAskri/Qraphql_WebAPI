
const Event = require("../models/event");
const Booking = require("../models/booking");
const { dateToString } = require("../helpers/date")
const { user , singleEvent } = require('./merge')

const transformedBooking = (booking) => {
    return {
        ...booking._doc,
        _id: booking.id,
        event : singleEvent.bind(this,booking.event),
        user : user.bind(this,booking.user),
        createdAt: dateToString(booking.createdAt),
        updatedAt: dateToString(booking.updatedAt)
      };
}

module.exports = {
  booking: async (req) => {
    if( req.isAuth == false ){
      throw new Error('User not authenticated')
    }
    try {
      const bookings = await Booking.find();
      bookings.map((booking) => {
       return  transformedBooking(booking)
      });
    } catch (error) {
      console.log(error);
    }
  },
  
  bookEvent: async (args ,req) => {
    if( req.isAuth == false ){
      throw new Error('User not authenticated')
    }
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });

      const booking = new Booking({
        event: fetchedEvent,
        user: req.userId,
      });
      const res = await booking.save();
      return transformedBooking(res)
    } catch (error) {
      console.log(error);
    }
  },

  cancelEvent: async (args) => {
    const BookedEvent = await Booking.findById(args.bookingId).populate(
      "event"
    );

    return transformedBooking(BookedEvent)
    await Booking.findByIdAndDelete({ _id: args.bookingId });
  },
};

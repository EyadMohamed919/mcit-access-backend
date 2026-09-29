const {getAllEventsByProjectID} = require("../models/EventModel")

const getAllEvents = async (id)=>{
    const events = await getAllEventsByProjectID(id);
    return events;
}

module.exports = {getAllEvents}
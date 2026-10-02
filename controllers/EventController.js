const {getAllEventsByProjectID, addEvent} = require("../models/EventModel")

const getAllEvents = async (id)=>{
    const events = await getAllEventsByProjectID(id);
    return events;
}

const addNewEvent = async (req, res) => {
    try {
        console.log("--> Received Form Data:", req.body);

        await addEvent(req.body);

        res.redirect('/Events');
    } catch (error) {
        console.error("Failed to create event:", error);
        res.status(500).send("خطأ أثناء حفظ بيانات الفعالية");
    }
};

module.exports = {getAllEvents, addNewEvent}
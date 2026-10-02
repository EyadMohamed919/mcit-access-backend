const {getAllEventsByProjectID, addEvent, deleteEvent} = require("../models/EventModel")

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

const deleteEventByID = async (req, res) =>{
    try {
        const {eventID} = req.body;
        await deleteEvent(eventID);
        res.redirect("/Events");
    } catch (error) {
        console.error("Failed to delete event:", error);
        res.status(500).send("خطأ أثناء حذف البيانات");
    }
}

module.exports = {getAllEvents, addNewEvent, deleteEventByID}
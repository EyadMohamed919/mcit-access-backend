const {getAllEventsByProjectID, addEvent, deleteEvent, getEventByID, updateEvent} = require("../models/EventModel")

const getAllEvents = async (projectID)=>{
    if(projectID)
    {
        const events = await getAllEventsByProjectID(projectID);
        return events;
    }
}

const getEvent = async (eventID)=>{
    if(eventID)
    {
        const event = await getEventByID(eventID);
        return event[0];
    }
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

const editEvent = async (req, res) => {
    try {
        console.log("--> Received Form Data:", req.body);

        await updateEvent(req.body);

        res.redirect('/Events');
    } catch (error) {
        console.error("Failed to edit event:", error);
        res.status(500).send("خطأ أثناء حفظ بيانات الفعالية");
    }
};


module.exports = {getAllEvents, addNewEvent, deleteEventByID, getEvent, editEvent}
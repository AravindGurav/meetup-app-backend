const express = require('express')
const app = express()
const cors = require("cors")

app.use(express.json())
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

//connect to Database
const { initializeDatabase } = require('./db/db.connect')
initializeDatabase()

require('dotenv').config()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
  res.send("Hello express server")
})


//import Event Model
const Event = require('./models/event.models')


//function to save an event in DB 
async function createEvent(newEvent) {
     try {
          const event = new Event(newEvent)
          const saveEvent = await event.save()
          // console.log("Saved Event:", saveEvent)
          return saveEvent
     } catch (error) {
          console.log("error in saving the event",error)
     }
}

app.post("/events", async (req, res) => {
     try {
          const savedEvent = await createEvent(req.body)
          if (savedEvent) {
               res.status(201).json({
                    message: "Event added successfully",
                    event: savedEvent
               })
          } else {
               res.status(400).json(error)
          }
     } catch (error) {
           res.status(500).json({ error: "Failed to add a event" })
     }
})



//function get event by title
async function readEventByTitle(eventTitle) {
     try {
          const event = await Event.findOne({ title: eventTitle })
          console.log(event)
          return event
     } catch (error) {
          console.log(error)
     }
}

app.get("/events/:title", async (req, res) => {
     try {
          const event = await readEventByTitle(req.params.title)
          
          if (event) {
               res.json(event)
          } else {
               res.status(404).json({error: "Event not found"})
          }
     } catch (error) {
          res.status(500).json({error: "Failed to fetch event"})
     }
})

//function to get all events from mongoose
async function readAllEvents() {
     try {
       const events = await Event.find()
       console.log(events)
       return events
     } catch (error) {
       console.log(error)
     }
}

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents()

    if (events.length !=0) {
      res.json(events)
    } else {
      res.status(404).json({ error: "Events not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" })
  }
})


// updates event by its id
async function updateEvent(eventId, dataToUpdate) {
  try {
    const event = await Event.findByIdAndUpdate(eventId, dataToUpdate, {new: true})
//     console.log(recipe)
    return event
  } catch (error) {
    console.log(error)
  }
}

app.post("/events/:eventId", async (req, res) => {
  try {
    const event = await updateEvent(req.params.eventId, req.body)
    if (event) {
         res.status(200).json({
              message: "Event updated successfully.",
           UpdatedEvent: event
      })
    } else {
      res.status(404).json({ error: "Event not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get event" })
  }
})

// Delete a event by id
async function deleteEvent(eventId) {
  try {
    const event = await Event.findByIdAndDelete(eventId)
//     console.log(recipe)
    return event
  } catch (error) {
    console.log(error)
  }
}

app.delete("/events/:eventId", async (req, res) => {
  try {
    const event = await deleteEvent(req.params.eventId)
    if (recipe) {
      res.status(200).json({
        message: "event deleted successfully.",
        deletedEvent: event,
      })
    } else {
      res.status(404).json({ error: "event not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get event" })
  }
})
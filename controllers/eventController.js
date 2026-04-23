const event = require('../models/Event');

exports.getAllEvents = async (req,res)=>{
    try{

        const filters = {};
        if(req.queary.category){
            filters.category = req.queary.category;
        }
        if( req.queary.ticketPrice){
            filters.ticketPrice = req.queary.ticketPrice;
        }

        const events = await Event.find();
        res.json(events);
    }catch(error){
        res.status(500).json({
            error: error.message
        });
    }
};


exports.getEventById = async (req,res)=> {
    try{
        const event = await Event.findById(req.params.id);

        if(!event){
            return res.status(404).json({error: 'Event not Found'});
        }
        res.json(event);
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

exports.createEvent = async (req,res)=>{
    const{title, deccription, date, location, category, totalSeats, ticketPrice, imageUri} = req.body;
    try{
        const event = await Event.create({
            title,
            deccription,
            data,
            location,
            category,
            totalSeats,
            ticketPrice,
            imageUri
        });
        res.status(201).json(event);
    }catch(error){
        res.status(500).json({
            error: error.message
        });
    };
}

exports.createEvent = async (req,res)=>{
    const{title, deccription, date, location, category, totalSeats, ticketPrice, imageUri} = req.body;
    try{
        const event = await Event.findByIdAndUpdate(req,params.id,{
            title,
            deccription,
            data,
            location,
            category,
            totalSeats,
            ticketPrice,
            imageUri
        },{new: true});
        if(!event){
            return res.status(404).json({error: 'Event not found'});
        }
        res.json(event);
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

exports.deleteEvent = async (req,res)=>{
    try{
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event){
            return res.status(404).json({error: 'Event not found'});
        }
        res.json({message: 'Event deleted successfully'});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};
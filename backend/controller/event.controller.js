import mongoose from "mongoose";
import eventModel from "../model/event.model.js";

export const add = async (req, res) => {
    try {
        const { title, description, event, date, image, dressCode, speaker, price } = req.body;

        if (!title || !description || !event || !date || !image || !speaker) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const data = new eventModel({
            title,
            description,
            event,
            date,
            image,
            dressCode,
            speaker,
            price
        });

        const result = await data.save();

        return res.status(201).json({
            success: true,
            message: "Event added successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const allEvent = async (req, res) => {
    try {
        // const { event } = req.body;

        // if (event !== "Both" && event !== undefined) {
        //     const eventData = await eventModel.find({ event });
        //     return res.status(200).json({
        //         success: true,
        //         message: "Data fetch successfully.",
        //         data: eventData,
        //     });
        // }

        // if(event === "Both") {
        //     const eventData = await eventModel.find();
        //     return res.status(200).json({
        //         success: true,
        //         message: "Data fetch successfully.",
        //         data: eventData,
        //     });
        // }

        const { query } = req.query;

        if (query) {
            const findSearchQuery = await eventModel.find({
                $or: [
                    {
                        title: {
                            $regex: query,
                            $options: "i",
                        },
                    },
                    {
                        event: {
                            $regex: query,
                            $options: "i",
                        },
                    },
                ],
            });

            if(!findSearchQuery || findSearchQuery.length === 0) {
                return res
                .status(404)
                .json({
                    success: false,
                    message: "No data found"
                })
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: "Data fetch from query.",
                    data: findSearchQuery
                });
        };

        const findAll = await eventModel.find();

        if (!findAll || findAll.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Event data available.",
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch successfully",
                data: findAll
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid MongoDb Id"
                });
        };

        const eventExist = await eventModel.findById(id);

        if (!eventExist) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "No Event Details found."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Event Details found successfully.",
                data: eventExist
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
}
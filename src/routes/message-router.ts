import { Router } from "express";
import { IMessage } from "../@types/@types";
import { isAdmin } from "../middleware/is-admin";
import { analyticsService } from "../services/analytics-service";
import { messageService } from "../services/message-service";

const router = Router();

//create new message
router.post('/send-message', async (req, res, next) => {
    try {
        const result = await messageService.createMessage(req.body as IMessage);
        res.status(201).json(result);
    } catch (e) {
        next(e.message);
    }
});

//get all messages
router.get('/all-messages/get', async (req, res, next) => {
    try {
        const messages = await messageService.getAllMessages();
        res.json(messages);
    } catch (e) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

export { router as messageRouter };
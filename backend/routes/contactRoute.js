import { Router } from "express";
import { getAllContacts } from "../controllers/Contactcontroller.js";

const router = Router();

router.get("/", getAllContacts);


export default router;

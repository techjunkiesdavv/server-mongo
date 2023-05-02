import express from "express";
import {signin} from "../controllers/user.js";
 const router =express.Router();
 router.post('/signin',signin);
<<<<<<< HEAD
=======

>>>>>>> 86c6d58a60e9c1ea1e7f89ca1397843b212a1053
 export default router;
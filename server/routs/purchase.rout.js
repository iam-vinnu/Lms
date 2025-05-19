import express, { application } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailsWithPurchaseStatus, stripeWebhook } from '../controllers/purchaseCourse.controller.js';

const router = express.Router();

router.route('/checkout/create-checkout-session').post(isAuthenticated , createCheckoutSession);
router.route('/webhook').post(express.raw({type:"application/json"}),stripeWebhook);
router.route('/course/:courseId/detail-with-status').get(isAuthenticated,getCourseDetailsWithPurchaseStatus);
router.route('/').get(isAuthenticated,getAllPurchasedCourse);

export default router;
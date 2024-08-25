const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const {
  assignEarliestAppointment,
  completeRequest,
} = require("../controllers/transporterController");

// Define the route for assigning the earliest appointment to a transporter
router.get("/test", (req, res) => {
  res.send("Route is working");
});
router.post(
  "/assign-appointment",
  authenticate,
  authorize("patient_transporter"),
  assignEarliestAppointment
);

router.put(
  "/:id/complete-request",
  authenticate,
  authorize("patient_transporter"),
  completeRequest
);

// Test route
router.get("/test-auth", authorize, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

module.exports = router;

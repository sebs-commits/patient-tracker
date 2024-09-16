const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const {
  assignEarliestAppointment,
  getAssignedAppointment,
  completeRequest,
} = require("../controllers/transporterController");

// Route to assign an appointment
router.post(
  "/assign-appointment",
  authenticate,
  authorize("patient_transporter"),
  assignEarliestAppointment
);
// Route to complete an assigned request
router.put(
  "/complete-request",
  authenticate,
  authorize("patient_transporter"),
  completeRequest
);
// Route to get the assigned appointment
router.get(
  "/assigned-appointment",
  authenticate,
  authorize("patient_transporter"),
  getAssignedAppointment 
);

// Test routes
router.get("/test", (req, res) => {
  res.send("Route is working");
});

router.get("/test-auth", authorize, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

module.exports = router;

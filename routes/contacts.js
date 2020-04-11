const express = require("express");
const router = express.Router();

//@route GET api/contacts
//@desc Get all users contacts
//@access Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
});
//@route GET api/contacts
//@desc Get all users contacts
//@access Private
router.post("/", (req, res) => {
  res.send("Add contact");
});

//@route delete api/contacts/:id
//@desc delete contact
//@access Private
router.put("/:id", (req, res) => {
  res.send("delete contact");
});

//@route GE api/contacts/:id
//@desc update contact
//@access Private
router.delete("/;id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;

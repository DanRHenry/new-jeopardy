const router = require("express").Router();
const QuestionAndAnswer = require("../models/questionAndAnswer.model");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

// ------------------------ POST ----------------------

router.post("/store", async (req, res) => {
  try {
    const questionAndAnswerInfo = new QuestionAndAnswer({
      email: req.body.email,
      question: req.body.question,
      answer: req.body.answer,
      defaultCategory: req.body.defaultCategory,
      defaultClass: req.body.defaultClass
    });

    const newQuestionAndAnswerInfo = await questionAndAnswerInfo.save();
    if (newQuestionAndAnswerInfo) {
      res.status(200).json({
        questionInfo: newQuestionAndAnswerInfo,
        message: `Success! Question and Answer Saved!`,
      });
    }
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});

// ------------------------- GET -----------------------

router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    const findQuestion = await Question.findOne({ _id: id });

    findQuestion
      ? res.status(200).json({
          message: "Found!",
          findQuestion,
        })
      : res.status(404).json({
          message: `Can't Find the Question.`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

// --------------------------Get All ---------------------
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email
    console.log("email: ",email)
    const getAllQuestionsAndAnswers = await QuestionAndAnswer.find({email});

    getAllQuestionsAndAnswers
      ? res.status(200).json({
          message: "All Questions:",
          getAllQuestionsAndAnswers,
        })
      : res.status(404).json({
          message: `No Questions Found!`,
        });
  } catch (err) {
    serverError(res, err);
  }
});


//? ---------------------- Not Used ------------------------

/* 
----------------------------- Delete QuestionsAndAnswers Endpoint ------------------------
*/
router.delete("/delete/:id", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // console.log("deleting...");
  try {
    //* Pull the category's info from the req
    const { id } = req.params;

    const categoryID = { _id: id };

    // const returnOption = { new: true };

    //* Remove user profile
    const deleteCategory = await Question.deleteOne(categoryID);

    deleteCategory.deletedCount === 1
      ? res.status(200).json({
          message: `The category was successfully deleted!`,
        })
      : res.status(404).json({
          message: `The category was unable to be deleted.`,
        });
  } catch (err) {
    console.log("oops");
    serverError(res, err);
  }
});

module.exports = router;

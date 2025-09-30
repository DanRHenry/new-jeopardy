const router = require("express").Router();
const Category = require("../models/category.model");

const serverError = (res, error) => {
  console.log("Server-side error");
  return res.status(500).json({
    Error: error.message,
  });
};

router.get("/", async (req, res) => {
  try {
    console.log("getting all categories")
    const categories = await Category.find();

    categories
      ? res.status(200).json({
          message: "All Categories Found",
          categories,
        })
      : res.status(404).json({
          message: `No Categories Found`,
        });
  } catch (err) {
    serverError(res, err);
  }
});

router.post("/newCategory", async (req, res) => {
  try {
    const {className, email, prompts, responses, category} = req.body

    const newCategoryObject = new Category({
      className: className,
      email: email,
      prompts: prompts,
      responses: responses,
      category: category
    })

    const existingCategory = await Category.findOne({category: category}, {className: className}, {email: email})

    if (existingCategory) {
      res.status(409).json({
        message: "existing category",
      })
      }
      const newCategory = await newCategoryObject.save()

      if (newCategory) {
        res.status(200).json({
          category: newCategory,
          message: "category saved"
        })
  }
  } catch (err) {
    serverError(res,err)
  }
})

module.exports = router;

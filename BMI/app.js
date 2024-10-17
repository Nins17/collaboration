const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route for home page (the form to calculate BMI)
app.get('/', (req, res) => {
  res.render('home', { bmi: undefined, result: undefined });
});


// Route to handle form submission and calculate BMI
app.post('/calculate', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  // Check if weight or height is not a number or zero
  if (isNaN(weight) || isNaN(height) || height <= 0) {
    return res.render('index', { bmi: 0, result: 'Invalid input. Please enter valid numbers for weight and height.' });
  }

  const bmi = weight / (height * height);
  let result;

  // Determine BMI category
  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (bmi < 24.9) {
    result = 'Normal weight';
  } else if (bmi < 29.9) {
    result = 'Overweight';
  } else {
    result = 'Obese';
  }

  // Render the index view with calculated BMI and category
  res.render('index', { bmi: bmi.toFixed(2), result });
});

// Go Foods (Energy)
const goFoodsUnderweight = ['Rice', 'Bread', 'Pasta'];
const goFoodImagesUnderweight = ['/images/rice.jpeg', '/images/bread.jpg', '/images/pasta.jpg'];

const goFoodsNormalWeight = ['Whole grains', 'Oats', 'Sweet potatoes'];
const goFoodImagesNormalWeight = ['/images/whole-grains.jpg', '/images/oats.jpg', '/images/sweet-potatoes.jpg'];

const goFoodsOverweight = ['Brown rice', 'Quinoa', 'Whole wheat bread'];
const goFoodImagesOverweight = ['/images/brown-rice.jpg', '/images/quinoa.jpg', '/images/whole-wheat-bread.jpg'];

const goFoodsObese = ['Oats', 'Barley', 'Whole grain pasta'];
const goFoodImagesObese = ['/images/oats.jpg', '/images/barley.jpg', '/images/whole-grain-pasta.jpg'];

// Grow Foods (Protein)
const growFoodsUnderweight = ['Lean meats', 'Eggs', 'Beans'];
const growFoodImagesUnderweight = ['/images/lean-meats.jpg', '/images/eggs.jpg', '/images/beans.jpg'];

const growFoodsNormalWeight = ['Chicken', 'Fish', 'Tofu'];
const growFoodImagesNormalWeight = ['/images/chicken.jpg', '/images/fish.jpg', '/images/tofu.jpg'];

const growFoodsOverweight = ['Turkey', 'Legumes', 'Nuts'];
const growFoodImagesOverweight = ['/images/turkey.jpg', '/images/legumes.jpg', '/images/nuts.jpg'];

const growFoodsObese = ['Skinless chicken', 'Lentils', 'Low-fat dairy'];
const growFoodImagesObese = ['/images/skinless-chicken.jpg', '/images/lentils.jpg', '/images/low-fat-dairy.jpg'];

// Glow Foods (Vitamins and Minerals)
const glowFoodsUnderweight = ['Leafy greens', 'Carrots', 'Mangoes'];
const glowFoodImagesUnderweight = ['/images/leafy-greens.jpg', '/images/carrots.jpg', '/images/mangoes.jpg'];

const glowFoodsNormalWeight = ['Berries', 'Spinach', 'Broccoli'];
const glowFoodImagesNormalWeight = ['/images/berries.jpg', '/images/spinach.jpg', '/images/broccoli.jpg'];

const glowFoodsOverweight = ['Cucumbers', 'Tomatoes', 'Apples'];
const glowFoodImagesOverweight = ['/images/cucumbers.jpg', '/images/tomatoes.jpg', '/images/apples.jpg'];

const glowFoodsObese = ['Zucchini', 'Kale', 'Oranges'];
const glowFoodImagesObese = ['/images/zucchini.jpg', '/images/kale.jpg', '/images/oranges.jpg'];

// Render function
app.get('/recommendation', (req, res) => {
    const { result } = req.query;

    let recommendations = {
        go: [],
        goImages: [],
        grow: [],
        growImages: [],
        glow: [],
        glowImages: []
    };

    // Provide food recommendations based on BMI category
    if (result === 'Underweight') {
        recommendations.go = goFoodsUnderweight;
        recommendations.goImages = goFoodImagesUnderweight;
        recommendations.grow = growFoodsUnderweight;
        recommendations.growImages = growFoodImagesUnderweight;
        recommendations.glow = glowFoodsUnderweight;
        recommendations.glowImages = glowFoodImagesUnderweight;
    } else if (result === 'Normal weight') {
        recommendations.go = goFoodsNormalWeight;
        recommendations.goImages = goFoodImagesNormalWeight;
        recommendations.grow = growFoodsNormalWeight;
        recommendations.growImages = growFoodImagesNormalWeight;
        recommendations.glow = glowFoodsNormalWeight;
        recommendations.glowImages = glowFoodImagesNormalWeight;
    } else if (result === 'Overweight') {
        recommendations.go = goFoodsOverweight;
        recommendations.goImages = goFoodImagesOverweight;
        recommendations.grow = growFoodsOverweight;
        recommendations.growImages = growFoodImagesOverweight;
        recommendations.glow = glowFoodsOverweight;
        recommendations.glowImages = glowFoodImagesOverweight;
    } else if (result === 'Obese') {
        recommendations.go = goFoodsObese;
        recommendations.goImages = goFoodImagesObese;
        recommendations.grow = growFoodsObese;
        recommendations.growImages = growFoodImagesObese;
        recommendations.glow = glowFoodsObese;
        recommendations.glowImages = glowFoodImagesObese;
    }

    res.render('recommendation', { result, recommendations });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

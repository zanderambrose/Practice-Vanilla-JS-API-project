let form = document.querySelector('#form');
let ingredientsInput = document.querySelector('#ingredients');
let body = document.querySelector('body');

const getRecipe = async () => {
    let newList = ingredientsInput.value.trim().replace(/,/gi, '').split(' ').join(',+');
    try {
        let data = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=4e345a393bbd462182c89705d3914f24&ingredients=${newList}&number=1`);
        return (data);
    } catch (error) {
        return ("Today ain't your day boi", error);
    }
}

const getRecipeId = async () => {
    let theData = await getRecipe();
    return theData.data[0].id;
};

const searchRecipe = async () => {
    let id = await getRecipeId();
    try {
        let idCall = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=4e345a393bbd462182c89705d3914f24&includeNutrition=false`);
        return idCall;
    } catch (error) {
        return ("Today ain't your day boi", error);
    }
};

const abstractUrl = async () => {
    try {
        let data = await searchRecipe();
        return data.data.sourceUrl;
    } catch (error) {
        return ("Today ain't your day boi", error);
    }
};

const abstractFoodImage = async () => {
    try {
        let data = await searchRecipe();
        return data.data.image;
    } catch (error) {
        return ("Today ain't your day boi", error);
    }
};

const abstractFoodTitle = async () => {
    try {
        let data = await searchRecipe();
        return data.data.title;
    } catch (error) {
        return ("Today ain't your day boi", error);
    }
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let url = await abstractUrl();
    let image = await abstractFoodImage();
    let title = await abstractFoodTitle();
    ingredientsInput.value = '';
    let h1 = document.createElement('h1');
    h1.innerHTML = title;
    body.append(h1);
    let img = document.createElement('img');
    img.src = image;
    body.append(img);
    let link = document.createElement('a');
    link.href = url;
    link.textContent = "Click this link for recipe!"
    link.target = "_blank";
    body.append(link);
});




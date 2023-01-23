# Find a Star Wars Character!

![alt screenshot of the program](/resources/img/screeenshot.jpg "Program screenshot")

## What it is?
This project finds a character from the Star Wars franchise that meets a certain number of criteria defined by the user. The criteria are:

1. Eye Color
2. Height
3. Shot first? `this is actually a joke that will always select Han Solo when checked`

## Project Goal
I developed this project to train **async functions**, get **data from API**, and create elements through **DOM manipulation**.

## How it works?
- `Step 1:` Program will create an array with all character objects extracted from API. However, there are 9 pages of character objects and the program will store each page in a sub-array inside the mother array.
- `Step 2:` Unify all sub-arrays into a single mother array containing all character objects.
- `Step 3` Iterate through all objects of the unified array and check if they meet the criteria set by the user.
- `Step 4:` Populate and display the **results div** with either a random character that meets the criteria, an error object if no matches were made or Han Solo object if the **"Shot Fist?"** option is checked.

## Technologies Used:

### Javascript:

>*Main concepts used:*

1. Async Functions.
2. API requests.
3. Promise.
4. Creating and displaying info through DOM events.

### HTML and CSS:

>*Main concepts used:*
1. Semantic elements.
2. Responsive Design.

### Markdown:

- To write a README file

## Here is the deployed finished program, hope you like it!: [Star Wars Character Finder!](https://ribeiroallison.github.io/star-wars/)
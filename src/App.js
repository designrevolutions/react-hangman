// https://www.youtube.com/watch?v=FQrqrMExiLs
// I built this code by going through this tutorial on Youtube
// It didn't work!!!!!!!!
// The guy made some big mistakes in the code.
// The guy used Typescript.
// I had to rewrite everything. His logic and code snippets were super helpful though - even though they were all over the place.
// I've added many more features that he had missing, inclduing:
// - Re-writing the map function for the buttons and moving them into a hook decleration
// - Adding images for the hangman
// - Splitting into components

import React, { useState, useEffect } from "react";
import './css/App.css';

import './codeSections/words.js';

// I move all the words we'll have for the game in here
import WORDS from './codeSections/words.js';

//
import { game_instructions } from './htmlSections/game_instructions';

// I wanted code to get all images in a folder without accessing each image by name directly.
// This is what Chat GPT gave me:
// ########### START: Get image paths from images folder
const importAll = (image_files) =>
{
  let images = {};
  image_files.keys().forEach((key) =>
  {
    images[key] = image_files(key);
  });
  return images;
};

const images = importAll(
  require.context("./images", false, /\.(gif|png|jpe?g|svg)$/)
);

// console.log(images); // Testing to see if I can access the images
// ########### END: Get image paths from images folder

function App()
{
  // Max allowed guesses
  const max_allowed_guesses = 6;

  // Let's get a random word
  const [word, set_word] = useState(WORDS[Math.floor(Math.random() * WORDS.length)]);

  // We set up an array to store the letters the user guesses
  const [guesses, set_guesses] = useState([]);

  // We need to keep track of incorrect guesses
  const [incorrect_guesses, set_incorrect_guesses] = useState(0);

  const [game_over, set_game_over] = useState(false);
  const [won, set_won] = useState(false);

  // I added this part! To disable buttons after they are clicked!
  // We use a map to ceate an array of objects - we later use this to make an a button for each letter

  // NOTE: I did not need to add a key value for the letters. Because they are JUST single letters, 
  // they can be identified by their index number
  const [buttons_state, set_buttons_state] = useState(
    'abcdefghijklmnopqrstuvwxyz'
      .split('')
      .map((letter) => ({ letter: letter, clicked: false }))
  );
  // I got the above code with the help of Chat GPT. I needed to check the full working, using an if statement 
  // - to make sure the correct code was being executed. This is what the same code is using an if statement:
  // const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  // REMEMBER: only in the beginning is the button array set to all false - a the game is played, this array changes.

  // let initialButtonsState = [];

  // for (let i = 0; i < alphabet.length; i++) {
  //   const letter = alphabet[i];
  //   initialButtonsState.push({ letter: letter, clicked: false });
  // }

  // const [buttonsState, setButtonsState] = useState(initialButtonsState);


  // I didn't need a key, since the index serves a purpose as being a key to identify the letter
  const handle_guess = (guess, index) =>
  {
    // console.log(`guesses: ${guesses}`);
    // console.log(`incorrectGuesses: ${incorrectGuesses}`);

    // I decided not to make one single if statement with else if's - it made it hard to read
    if (game_over) return;

    // This one is no longer needed. I originally added this one, so that if a letter had been 
    // clicked once and was in the guesses array, then don't take any action.
    if (guesses.includes(guess)) return;

    // Now the real work: check if the guess is included in our word
    if (word.includes(guess))
    {
      // The 'guess' letter is in our word, so we add to the guesses are
      // A new copy is made of the guesses array and the new guess letter is added at the end
      set_guesses([...guesses, guess]);
    } else
    {
      // Else, we increment the number of incorrect guesses
      set_incorrect_guesses(incorrect_guesses + 1);
    }

    // Disable the button that was clicked
    // We make a copy of the buttons objects in an array stored
    const new_buttons_state = [...buttons_state];
    // We then take index that is passed in from the function call of the letter clicked and 
    // change its HTML state to be true - therebye make the button disabled - which is what we want
    new_buttons_state[index].clicked = true; // Here in the newly copied array, we change the 'clicked' element of the object to 'true'.
    // Now we make our array of buttons state be reset to the new array
    set_buttons_state(new_buttons_state);
  };

  // We will monitor incorrectGuesses (a number) and correct guesses (an array) 
  // If either of these changes, then all the code in useEffect gets changed
  useEffect(() =>
  {
    if (incorrect_guesses >= max_allowed_guesses)
    {
      set_game_over(true);
      set_won(false);

      // If gameOver is true - then this is the end of the game.
      // The youtube guy didn't have this in his code - bad programming.
      return;
    }

    if (word.split('').every((letter) => guesses.includes(letter)))
    {
      set_game_over(true);
      set_won(true);

      // If gameOver is true - then this is the end of the game.
      // The youtube guy didn't have this in his code - bad programming.
      return;
    }

    // Let's get access to the image object in our HTML so we can change
    const hangmanimage = document.getElementById('hangmanimage');
    // Here we add code to change the image according to what number guess the user has had
    // #######======
    // if (incorrectGuesses === 1)
    // {
    //   //console.log("Number 1");
    //   hangmanimage.src = images['./1.gif'];
    // }

    // I used a switch statement instead of if statements to determine which image we need to change to
    switch (incorrect_guesses)
    {
      case 1:
        hangmanimage.src = images['./1.gif'];
        break;
      case 2:
        hangmanimage.src = images['./2.gif'];
        break;
      case 3:
        hangmanimage.src = images['./3.gif'];
        break;
      case 4:
        hangmanimage.src = images['./4.gif'];
        break;
      case 5:
        hangmanimage.src = images['./5.gif'];
        break;
      default:
        hangmanimage.src = images['./0.gif'];
    }
    // #######======
  }, [incorrect_guesses, guesses]);

  const reset_game = () =>
  {
    // We reset everything and the user starts from the first initial state

    set_word(WORDS[Math.floor(Math.random() * WORDS.length)]);
    set_guesses([]);
    set_incorrect_guesses(0);
    set_game_over(false);
    set_won(false);

    set_buttons_state(
      'abcdefghijklmnopqrstuvwxyz'
        .split('')
        .map((letter) => ({ letter: letter, clicked: false }))
    );
  };

  return (
    <div className='container'>
      <h1 className="inTheMiddle">Hangman</h1>
      {
        // Everything is surrounded in a big if statement (a ternary if statement - no if included)
        (game_over ? (
          <div className="inTheMiddleBlock">
            <p>{won ? `You won! You guessed the correct word: ${word}` : `You lost! The correct word was ${word}`}</p>
            <button onClick={() => reset_game()}>Play Again! </button>
          </div>
        ) : (
          <div>
            <p className='incorrect'>Incorrect guesses: {incorrect_guesses}</p>
            <p className='incorrect'>(Max guesses allowed are: {max_allowed_guesses})</p>

            {/* I was going to leave out the image, but then I thought I might get marked down for not including! */}
            {/* #### */}
            <div className="inTheMiddle"><img id="hangmanimage" className="smallerImage" src={images['./0.gif']} alt="Hangman Game" /></div>
            {/* #### */}

            <p className='guess'>
              {/* We take our word and check if each letter in our 'word' exists in the 'guesses' array.
              If it exists, then we print out. Else we print out '_'. So to start off, the 'guesses' array 
              is empty, so we print out '_' for each letter of the mystery word. */}
              {word.split('').map((letter) => (guesses.includes(letter) ? letter : '_'))}
            </p>

            {/* Now we make our letter buttons */}
            <p className='buttons'>
              {buttons_state.map((buttonObject, index) => (
                <button
                  // We make the key for each button the letter itself. But we don't actually use the key anywhere - we use index
                  // I left this in, just for completeness - in a future revision of the code, I may need the key value
                  key={buttonObject.letter}
                  onClick={() => handle_guess(buttonObject.letter, index)}
                  disabled={buttonObject.clicked}
                >
                  {buttonObject.letter}
                </button>
              ))}
              {/* Chat GPT helped me make the map code */}
              {/* 
                I needed to check with a full if statement if the map worked:

                  {   
                    let buttons = [];
                    for (let i = 0; i < buttonsState.length; i++) {
                      const button = buttonsState[i];
                      buttons.push(
                        <button
                          key={button.letter}
                          onClick={() => handleGuess(button.letter, i)}
                          disabled={button.clicked}
                        >
                          {button.letter}
                        </button>
                      );
                    }
                    return buttons;
                  }
                 */}
            </p>
            <div><p className='buttons'><button onClick={() => reset_game()}>Reset the game</button><button onClick={() => game_instructions()}>Instructions</button></p></div>
          </div>
        ))}
    </div>
  );
}

export default App;
// We need to give instructions to the user about how to play the game.
export const game_instructions = () =>
{
    alert(`Guess the mystery word that has been blanked out.
    
To play this game, you have to guess our word by selecting letters.

Start by clicking a letter.

If your clicked letter is in the mystery word, then that letter will appear in the blanked out word.

Else, if the letter is not in the mystery word, the hangman graphic will change and you'll see a tally of the number of incorrect guesses you have made.

Continue clicking letters. You'll either win by guessing the words or you'll lose because you've reached the maximum allowed guesses.

In either of these cases, the game is over. You can then choose to play again.

In the middle of the game, you can always reset the game and start from fresh with a randomly chosen word.`);
};
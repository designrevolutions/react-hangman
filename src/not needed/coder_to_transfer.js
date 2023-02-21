


  // We make sure 'guess' is a string
  // The guy had this line originally:
  //const handleGuess = (guess: string) =>
  // VSCODE complained and had a red underline. The error said something about Typescript
  // So, I have left out the 'string' part. Looks OK to me
  const handleGuess = (guess) =>
  {
    if (gameOver) return;

    if (guesses.includes(guess)) return;

    if (word.includes(guess))
    {
      setGuessess([...guesses, guess]);
    } else
    {
      setIncorrectGuesses(incorrectGuesses + 1);
    }

    useEffect(() =>
    {
      if(incorrectGuesses > 5) {
        setGameover(true);
        setWon(false);
      }

      if(word.split('').every((letter) => guesses.includes(letter))) {
        setGameover(true);
        setWon(true);
      }
    }, [incorrectGuesses, guesses]);

    const resetGame = () => {
      setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
      setGuesses([]);
      setIncorrectGuesses(0);
      setGameover(false);
      setWon(false);
    };
  };



return
(
    (gameOver ? (
        <div>
          {won ? 'You won!': 'You lost!'}
          <button onClick={() => resetGame()}>Play Again!</button>
        </div>
      ) : (
        <div>
          <p className='incorrect'>Incorrect guesses: {incorrectGuesses}</p>
          <p className='guess'>
            {word
            .split('')
            .map((letter) => (guesses.includes(letter) ? letter : '_'))}
          </p>
          <p className='buttons'>
            {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) =>(
              <button key={letter} onClick={() => handleGuess(letter)}>
                {letter}
              </button>
            ))}
          </p>
        </div>
      ))

)
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const CrosswordGame = () => {
  const portugueseDictionary = [
    { word: 'COMPUTADOR', clue: 'Máquina eletrônica para processar dados' },
    { word: 'TELEFONE', clue: 'Aparelho para comunicação à distância' },
    { word: 'BICICLETA', clue: 'Veículo de duas rodas movido a pedal' },
    { word: 'CHOCOLATE', clue: 'Doce feito de cacau' },
    { word: 'FELICIDADE', clue: 'Estado de contentamento' },
    { word: 'BORBOLETA', clue: 'Inseto colorido com asas' },
    { word: 'ELEFANTE', clue: 'Maior animal terrestre com tromba' },
    { word: 'MANTEIGA', clue: 'Produto cremoso derivado do leite' },
    { word: 'CACHORRO', clue: 'Animal doméstico leal' },
    { word: 'GALINHA', clue: 'Ave doméstica que põe ovos' },
    { word: 'CAVALO', clue: 'Animal usado para montaria' },
    { word: 'LIVRO', clue: 'Conjunto de páginas encadernadas' },
    { word: 'ESCOLA', clue: 'Lugar onde se aprende' },
    { word: 'CADEIRA', clue: 'Assento com encosto' },
    { word: 'JANELA', clue: 'Abertura na parede para luz' },
    { word: 'CARRO', clue: 'Veículo automotor de quatro rodas' },
    { word: 'BARCO', clue: 'Embarcação que navega na água' },
    { word: 'CASA', clue: 'Lugar onde se mora' },
    { word: 'CIDADE', clue: 'Área urbana densamente povoada' },
    { word: 'MUNDO', clue: 'Planeta Terra e tudo que existe' },
    { word: 'ESTRELA', clue: 'Corpo celeste que brilha no céu' },
    { word: 'AGUA', clue: 'Líquido essencial à vida' },
    { word: 'FOGO', clue: 'Combustão que produz calor e luz' },
    { word: 'TERRA', clue: 'Planeta onde vivemos' },
    { word: 'ARVORE', clue: 'Planta de grande porte com tronco' },
    { word: 'FLOR', clue: 'Parte colorida da planta' },
    { word: 'FRUTA', clue: 'Alimento doce de origem vegetal' },
    { word: 'COMIDA', clue: 'Alimento preparado para comer' },
    { word: 'BEBIDA', clue: 'Líquido para beber' },
    { word: 'CAFE', clue: 'Bebida escura feita de grãos torrados' },
    { word: 'LEITE', clue: 'Líquido branco nutritivo' },
    { word: 'QUEIJO', clue: 'Derivado do leite coagulado' },
    { word: 'CARNE', clue: 'Alimento de origem animal' },
    { word: 'PEIXE', clue: 'Animal aquático com escamas' },
    { word: 'ARROZ', clue: 'Cereal básico da alimentação' },
    { word: 'FEIJAO', clue: 'Leguminosa rica em proteínas' },
    { word: 'BATATA', clue: 'Tubérculo comestível' },
    { word: 'TOMATE', clue: 'Fruto vermelho usado em saladas' },
    { word: 'CEBOLA', clue: 'Bulbo que faz chorar ao cortar' },
    { word: 'ALHO', clue: 'Tempero forte de cheiro marcante' },
    { word: 'PIZZA', clue: 'Prato italiano redondo com cobertura' },
    { word: 'BOLO', clue: 'Doce assado em festa' },
    { word: 'MACA', clue: 'Fruta vermelha ou verde' },
    { word: 'BANANA', clue: 'Fruta amarela alongada' },
    { word: 'LARANJA', clue: 'Fruta cítrica rica em vitamina C' },
    { word: 'LIMAO', clue: 'Fruta ácida amarela ou verde' },
    { word: 'MORANGO', clue: 'Fruta vermelha pequena e doce' },
    { word: 'GATO', clue: 'Felino doméstico que mia' },
    { word: 'PASSARO', clue: 'Animal que voa e canta' },
    { word: 'LEAO', clue: 'Rei da selva' },
    { word: 'TIGRE', clue: 'Felino listrado grande' },
    { word: 'URSO', clue: 'Animal grande que hiberna' },
    { word: 'MACACO', clue: 'Primata que vive em árvores' },
    { word: 'VACA', clue: 'Animal que produz leite' },
    { word: 'PORCO', clue: 'Animal criado para carne' },
    { word: 'COELHO', clue: 'Animal de orelhas longas' },
    { word: 'COBRA', clue: 'Réptil sem patas' },
    { word: 'ABELHA', clue: 'Inseto que produz mel' },
    { word: 'FORMIGA', clue: 'Inseto trabalhador em colônia' },
    { word: 'PESSOA', clue: 'Ser humano individual' },
    { word: 'HOMEM', clue: 'Ser humano do sexo masculino' },
    { word: 'MULHER', clue: 'Ser humano do sexo feminino' },
    { word: 'FAMILIA', clue: 'Grupo de pessoas aparentadas' },
    { word: 'AMIGO', clue: 'Pessoa com quem temos afeição' },
    { word: 'AMOR', clue: 'Sentimento de afeição profunda' },
    { word: 'MESA', clue: 'Móvel com superfície plana' },
    { word: 'PORTA', clue: 'Abertura para entrar ou sair' },
    { word: 'PRAIA', clue: 'Área costeira de areia' },
    { word: 'NEVE', clue: 'Precipitação congelada' },
    { word: 'CHUVA', clue: 'Água que cai das nuvens' },
    { word: 'VENTO', clue: 'Ar em movimento' },
    { word: 'NUVEM', clue: 'Massa de vapor no céu' },
  ];

  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [userGrid, setUserGrid] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [selectedClue, setSelectedClue] = useState(null);
  const [direction, setDirection] = useState('across');
  const [isComplete, setIsComplete] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [gridHeight, setGridHeight] = useState(15);
  const [gridWidth, setGridWidth] = useState(15);
  const [fetchedData, setFetchedData] = useState(null);
  const inputRefs = useRef({});

  const generateCrossword = () => {
    const targetWords = 20; // 20 horizontais + 20 verticais = 40 palavras
    let bestAttempt = null;
    let maxScore = 0;

    // Tentar várias vezes para encontrar melhor configuração
    for (let attempt = 0; attempt < 5; attempt++) {
      const result = tryGenerateCrossword(targetWords);
      const score = Math.min(result.acrossWords.length, result.downWords.length);

      if (score > maxScore) {
        maxScore = score;
        bestAttempt = result;
      }

      if (result.acrossWords.length === targetWords && result.downWords.length === targetWords) {
        bestAttempt = result;
        break;
      }
    }

    if (bestAttempt) {
      setGrid(bestAttempt.grid);
      setWords(bestAttempt.words);
      setUserGrid(Array(bestAttempt.height).fill(null).map(() => Array(bestAttempt.width).fill('')));
    }

    setIsGenerating(false);
  };

  const tryGenerateCrossword = (targetWords) => {
    const height = gridHeight;
    const width = gridWidth;
    const letterGrid = Array(height).fill(null).map(() => Array(width).fill(null));
    const placedWords = [];
    const usedWords = new Set();
    const shuffled = [...portugueseDictionary].sort(() => Math.random() - 0.5);

    // Colocar primeira palavra horizontal no meio
    let firstWordIndex = 0;
    while (firstWordIndex < shuffled.length && shuffled[firstWordIndex].word.length > width) {
      firstWordIndex++;
    }
    if (firstWordIndex >= shuffled.length) {
      return { acrossWords: [], downWords: [] }; // No word fits
    }
    const firstWord = shuffled[firstWordIndex];
    const startRow = Math.floor(height / 2);
    const startCol = Math.floor((width - firstWord.word.length) / 2);

    for (let i = 0; i < firstWord.word.length; i++) {
      letterGrid[startRow][startCol + i] = firstWord.word[i];
    }

    placedWords.push({
      word: firstWord.word,
      row: startRow,
      col: startCol,
      direction: 'across',
      clue: firstWord.clue
    });
    usedWords.add(firstWord.word);

    // Tentar adicionar palavras que cruzam
    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts && (placedWords.filter(w => w.direction === 'across').length < targetWords || placedWords.filter(w => w.direction === 'down').length < targetWords)) {
      attempts++;

      for (const entry of shuffled) {
        if (usedWords.has(entry.word)) continue;

        const word = entry.word;
        let placed = false;

        // Tentar cruzar com palavras existentes
        for (const existing of placedWords) {
          if (placed) break;

          for (let i = 0; i < existing.word.length; i++) {
            for (let j = 0; j < word.length; j++) {
              if (existing.word[i] === word[j]) {
                let newRow, newCol, newDir;

                if (existing.direction === 'across') {
                  newDir = 'down';
                  newRow = existing.row - j;
                  newCol = existing.col + i;
                } else {
                  newDir = 'across';
                  newRow = existing.row + i;
                  newCol = existing.col - j;
                }

                if (canPlaceWord(letterGrid, word, newRow, newCol, newDir, height, width)) {
                  placeWord(letterGrid, word, newRow, newCol, newDir);
                  placedWords.push({
                    word: word,
                    row: newRow,
                    col: newCol,
                    direction: newDir,
                    clue: entry.clue
                  });
                  usedWords.add(word);
                  placed = true;
                  break;
                }
              }
            }
            if (placed) break;
          }
        }
        if (placed) break;
      }
    }

    // Balancear número de palavras
    const acrossWords = placedWords.filter(w => w.direction === 'across');
    const downWords = placedWords.filter(w => w.direction === 'down');
    const minCount = Math.min(acrossWords.length, downWords.length);

    const balancedWords = [
      ...acrossWords.slice(0, minCount),
      ...downWords.slice(0, minCount)
    ];

    // Criar grade final
    const newGrid = Array(height).fill(null).map(() =>
      Array(width).fill(null).map(() => ({
        letter: null,
        number: null,
        arrows: [],
        isNumberCell: false
      }))
    );

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        newGrid[r][c].letter = letterGrid[r][c];
      }
    }

    // Numerar palavras
    let number = 1;
    const cellNumbers = {};

    balancedWords.sort((a, b) => {
      if (a.row !== b.row) return a.row - b.row;
      if (a.col !== b.col) return a.col - b.col;
      return a.direction === 'across' ? -1 : 1;
    });

    for (let word of balancedWords) {
      const key = `${word.row}-${word.col}`;

      if (!cellNumbers[key]) {
        cellNumbers[key] = {
          number: number,
          arrows: [word.direction === 'across' ? '→' : '▼']
        };
        word.number = number;
        number++;
      } else {
        word.number = cellNumbers[key].number;
        const arrow = word.direction === 'across' ? '→' : '▼';
        if (!cellNumbers[key].arrows.includes(arrow)) {
          cellNumbers[key].arrows.push(arrow);
        }
      }
    }

    for (let key in cellNumbers) {
      const [r, c] = key.split('-').map(Number);
      if (newGrid[r] && newGrid[r][c]) {
        newGrid[r][c].number = cellNumbers[key].number;
        newGrid[r][c].arrows = cellNumbers[key].arrows;
        newGrid[r][c].isNumberCell = true;
      }
    }

    return {
      grid: newGrid,
      words: balancedWords,
      height: height,
      width: width,
      acrossWords: balancedWords.filter(w => w.direction === 'across'),
      downWords: balancedWords.filter(w => w.direction === 'down')
    };
  };

  const canPlaceWord = (grid, word, row, col, direction, height, width) => {
    if (row < 0 || col < 0) return false;

    if (direction === 'across') {
      if (col + word.length > width) return false;

      // Verificar espaço antes e depois
      if (col > 0 && grid[row][col - 1] !== null) return false;
      if (col + word.length < width && grid[row][col + word.length] !== null) return false;

      // Verificar cada letra
      for (let i = 0; i < word.length; i++) {
        const cell = grid[row][col + i];
        if (cell !== null && cell !== word[i]) return false;

        // Verificar células adjacentes verticalmente
        if (row > 0 && grid[row - 1][col + i] !== null && cell === null) return false;
        if (row < height - 1 && grid[row + 1][col + i] !== null && cell === null) return false;
      }
    } else {
      if (row + word.length > height) return false;

      // Verificar espaço antes e depois
      if (row > 0 && grid[row - 1][col] !== null) return false;
      if (row + word.length < height && grid[row + word.length][col] !== null) return false;

      // Verificar cada letra
      for (let i = 0; i < word.length; i++) {
        const cell = grid[row + i][col];
        if (cell !== null && cell !== word[i]) return false;

        // Verificar células adjacentes horizontalmente
        if (col > 0 && grid[row + i][col - 1] !== null && cell === null) return false;
        if (col < width - 1 && grid[row + i][col + 1] !== null && cell === null) return false;
      }
    }

    return true;
  };

  const placeWord = (grid, word, row, col, direction) => {
    if (direction === 'across') {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = word[i];
      }
    }
  };

  useEffect(() => {
    generateCrossword();
  }, []);

  const handleCellClick = (row, col) => {
    if (!grid[row][col].letter) return;

    // Se clicar em célula com número, selecionar a dica
    if (grid[row][col].isNumberCell) {
      // Encontrar palavra que começa nesta posição
      const wordsAtPosition = words.filter(w => w.row === row && w.col === col);

      if (wordsAtPosition.length > 0) {
        // Se tem múltiplas palavras (horizontal e vertical), alternar
        if (wordsAtPosition.length > 1) {
          const currentIndex = wordsAtPosition.findIndex(w =>
            w.direction === direction && w.number === selectedClue?.number
          );
          const nextWord = wordsAtPosition[(currentIndex + 1) % wordsAtPosition.length];
          setSelectedClue(nextWord);
          setDirection(nextWord.direction);
        } else {
          setSelectedClue(wordsAtPosition[0]);
          setDirection(wordsAtPosition[0].direction);
        }
        setSelectedCell({ row, col });
      }
      return;
    }

    if (selectedCell.row === row && selectedCell.col === col) {
      setDirection(direction === 'across' ? 'down' : 'across');
    } else {
      setSelectedCell({ row, col });
    }

    const clue = words.find(w =>
      w.direction === direction &&
      ((w.direction === 'across' && w.row === row && col >= w.col && col < w.col + w.word.length) ||
        (w.direction === 'down' && w.col === col && row >= w.row && row < w.row + w.word.length))
    );
    if (clue) setSelectedClue(clue);
  };

  const handleInputChange = (row, col, value) => {
    if (!grid[row][col].letter) return;

    if (value.length > 1) value = value.slice(-1);
    const newGrid = [...userGrid];
    newGrid[row][col] = value.toUpperCase();
    setUserGrid(newGrid);

    if (value && selectedClue) {
      const { direction: wordDir, row: startRow, col: startCol, word } = selectedClue;
      let nextRow = row, nextCol = col;

      if (wordDir === 'across') {
        nextCol = col + 1;
        if (nextCol >= startCol + word.length) return;
      } else {
        nextRow = row + 1;
        if (nextRow >= startRow + word.length) return;
      }

      const nextKey = `${nextRow}-${nextCol}`;
      if (inputRefs.current[nextKey]) inputRefs.current[nextKey].focus();
    }
  };

  const handleKeyDown = (e, row, col) => {
    if (e.key === 'Backspace' && !userGrid[row][col] && selectedClue) {
      const { direction: wordDir, row: startRow, col: startCol } = selectedClue;
      let prevRow = row, prevCol = col;

      if (wordDir === 'across') {
        prevCol = col - 1;
        if (prevCol < startCol) return;
      } else {
        prevRow = row - 1;
        if (prevRow < startRow) return;
      }

      const prevKey = `${prevRow}-${prevCol}`;
      if (inputRefs.current[prevKey]) inputRefs.current[prevKey].focus();
    }
  };

  const checkSolution = () => {
    let correct = true;
    for (let r = 0; r < gridHeight; r++) {
      for (let c = 0; c < gridWidth; c++) {
        if (grid[r][c].letter && userGrid[r][c] !== grid[r][c].letter) {
          correct = false;
          break;
        }
      }
      if (!correct) break;
    }
    setIsComplete(correct);
  };

  const resetGame = () => {
    setUserGrid(Array(gridHeight).fill(null).map(() => Array(gridWidth).fill('')));
    setIsComplete(false);
    setSelectedCell({ row: null, col: null });
    setSelectedClue(null);
  };

  const newGame = () => {
    setIsGenerating(true);
    setIsComplete(false);
    setSelectedCell({ row: null, col: null });
    setSelectedClue(null);
    setTimeout(() => generateCrossword(), 100);
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch('https://aoer9ip2oa.execute-api.us-east-1.amazonaws.com/dev/items');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFetchedData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchedData({ error: 'Falha ao pegar dados' });
    }
  };

  if (isGenerating) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-100'}`}>
        <div className="text-center">
          <div className={`text-4xl font-bold mb-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-900'}`}>Gerando Palavras Cruzadas...</div>
          <div className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Criando cruzamento perfeito de palavras</div>
        </div>
      </div>
    );
  }

  const acrossClues = words.filter(w => w.direction === 'across').sort((a, b) => a.number - b.number);
  const downClues = words.filter(w => w.direction === 'down').sort((a, b) => a.number - b.number);

  return (
    <div className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-100'}`}>
      <div className="">
        <div className="flex justify-between items-center mb-2">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-900'}`}>Palavras Cruzadas em Português</h1>
          <button onClick={() => setDarkMode(!darkMode)} className={`px-4 py-2 rounded-lg font-semibold transition ${darkMode ? 'bg-gray-700 text-black hover:bg-gray-600' : 'bg-gray-800 text-black hover:bg-gray-700'}`}>
            {darkMode ? '☀️ Claro' : '🌙 Escuro'}
          </button>
        </div>
        <div className="flex gap-4 mb-4">
          <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Altura:
            <input
              type="number"
              value={gridHeight}
              onChange={(e) => setGridHeight(Math.max(5, Number(e.target.value)))}
              className={`ml-2 w-20 px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              min="5"
            />
          </label>
          <label className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Largura:
            <input
              type="number"
              value={gridWidth}
              onChange={(e) => setGridWidth(Math.max(5, Number(e.target.value)))}
              className={`ml-2 w-20 px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
              min="5"
            />
          </label>
        </div>
        <p className={`text-center mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Grade {gridHeight}x{gridWidth} • {acrossClues.length} horizontais • {downClues.length} verticais
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className={`rounded-lg shadow-lg p-4 overflow-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`inline-block border-2 ${darkMode ? 'border-gray-600' : 'border-gray-800'}`}>
                {grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => {
                      const key = `${rowIndex}-${colIndex}`;
                      const isSelected = selectedCell.row === rowIndex && selectedCell.col === colIndex && cell.letter;
                      const isHighlighted = selectedClue && cell.letter && (
                        (selectedClue.direction === 'across' && selectedClue.row === rowIndex && colIndex >= selectedClue.col && colIndex < selectedClue.col + selectedClue.word.length) ||
                        (selectedClue.direction === 'down' && selectedClue.col === colIndex && rowIndex >= selectedClue.row && rowIndex < selectedClue.row + selectedClue.word.length)
                      );

                      // Célula preta (sem letra)
                      if (!cell.letter) {
                        return <div key={key} className={`w-10 h-10 border ${darkMode ? 'bg-gray-900 border-gray-600' : 'bg-black border-gray-400'}`} />;
                      }

                      return (
                        <div
                          key={key}
                          className={`w-10 h-10 border relative text-xs ${darkMode ? 'border-gray-600' : 'border-gray-400'} ${isSelected
                            ? darkMode ? 'bg-yellow-600' : 'bg-yellow-300'
                            : isHighlighted
                              ? darkMode ? 'bg-blue-900' : 'bg-blue-200'
                              : darkMode ? 'bg-gray-700' : 'bg-white'
                            }`}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {cell.number && (
                            <span
                              className={`absolute top-0 left-0 text-[0.6rem] leading-none font-bold pointer-events-none ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}
                            >
                              {cell.number}
                            </span>
                          )}
                          {cell.arrows && cell.arrows.length > 0 && (
                            <span className={`absolute top-0 right-0.5 text-[0.6rem] leading-none pointer-events-none font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                              {cell.arrows.join('')}
                            </span>
                          )}
                          {cell.letter && (
                            <input
                              ref={el => inputRefs.current[key] = el}
                              type="text"
                              maxLength="1"
                              value={userGrid[rowIndex][colIndex]}
                              onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                              className={`w-full h-full text-center text-sm font-bold uppercase bg-transparent outline-none cursor-text ${darkMode ? 'text-white' : 'text-gray-900'}`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-3 flex-wrap">
                <button onClick={checkSolution} className="px-4 py-2 bg-indigo-600 text-black rounded-lg hover:bg-indigo-700 transition text-sm font-semibold">Verificar Solução</button>
                <button onClick={resetGame} className="px-4 py-2 bg-gray-600 text-black rounded-lg hover:bg-gray-700 transition text-sm font-semibold">Limpar</button>
                <button onClick={newGame} className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition text-sm font-semibold">Novo Jogo</button>
                <button onClick={handleFetchData} className="px-4 py-2 bg-green-600 text-black rounded-lg hover:bg-green-700 transition text-sm font-semibold">Pegar dados</button>
              </div>

              {isComplete && (
                <div className={`mt-4 p-4 rounded-lg font-semibold ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                  🎉 Parabéns! Você completou as palavras cruzadas!
                </div>
              )}

              {fetchedData && (
                <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                  <h3 className="text-lg font-semibold mb-2">Dados Pegos:</h3>
                  {fetchedData.error ? (
                    <p>{fetchedData.error}</p>
                  ) : (
                    <ul className="space-y-2">
                      {fetchedData.map((item, index) => (
                        <li key={index} className="border-b pb-2">
                          <p><strong>ID:</strong> {item.id}</p>
                          <p><strong>Palavra:</strong> {item.word}</p>
                          <p><strong>Dica:</strong> {item.glue}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className={`rounded-lg shadow-lg p-4 max-h-screen overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-bold mb-3 ${darkMode ? 'text-yellow-400' : 'text-yellow-900'}`}>Dicas</h2>

              <div className="mb-4">
                <h3 className={`text-base font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Horizontais ({acrossClues.length})</h3>
                <ul className="space-y-1">
                  {acrossClues.map(clue => (
                    <li key={`across-${clue.number}`} onClick={() => { setSelectedClue(clue); setSelectedCell({ row: clue.row, col: clue.col }); setDirection('across'); }} className={`cursor-pointer p-1.5 rounded transition text-sm ${selectedClue?.number === clue.number && selectedClue?.direction === 'across' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900') + ' font-semibold' : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}>
                      <span className="font-bold">{clue.number}.</span> {clue.clue}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className={`text-base font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Verticais ({downClues.length})</h3>
                <ul className="space-y-1">
                  {downClues.map(clue => (
                    <li key={`down-${clue.number}`} onClick={() => { setSelectedClue(clue); setSelectedCell({ row: clue.row, col: clue.col }); setDirection('down'); }} className={`cursor-pointer p-1.5 rounded transition text-sm ${selectedClue?.number === clue.number && selectedClue?.direction === 'down' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-900') + ' font-semibold' : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}>
                      <span className="font-bold">{clue.number}.</span> {clue.clue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrosswordGame;
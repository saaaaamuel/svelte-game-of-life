<script lang="ts">
  import { onMount } from "svelte";
  import { GameOfLifeBoard } from "./board";
  import "./styles.css";

  // Game state
  let board = new GameOfLifeBoard(60, 60);
  let running = false;
  let intervalId: number;
  let speed = 10; // ms between steps
  $: handleSpeedChange(speed); // React to speed changes

  // Initialize with a random pattern
  function init() {
    board.randomize();
    board = board;
  }

  function handleSpeedChange(newSpeed: number) {
    if (running) {
      clearInterval(intervalId);
      intervalId = setInterval(step, newSpeed);
    }
  }

  // Toggle simulation
  function toggle() {
    running = !running;
    if (running) {
      intervalId = setInterval(step, speed);
    } else {
      clearInterval(intervalId);
    }
  }

  // Single step
  function step() {
    board.step();
    board = board; // Trigger reactivity
  }

  // Randomize the board
  function randomize() {
    board.randomize();
    board = board; // This triggers reactivity
  }

  // Clear the board
  function clear() {
    running = false;
    clearInterval(intervalId);
    board = new GameOfLifeBoard(board.width, board.height);
  }

  // Handle cell click
  function toggleCell(x: number, y: number) {
    const idx = board.idx(x, y);
    board.board[idx] = !board.board[idx];
    board = board; // Trigger reactivity
  }

  // Initialize on mount
  onMount(() => {
    init();
    return () => clearInterval(intervalId);
  });
</script>

<h1>Game Of Life</h1>

<div class="controls">
  <button on:click={toggle}>{running ? "Stop" : "Start"}</button>
  <button on:click={step} disabled={running}>Step</button>
  <button on:click={randomize}>Randomize</button>
  <button on:click={clear}>Clear</button>

  <label>
    Speed:
    <input type="range" min="10" max="100" step="10" bind:value={speed} />
    {speed}ms
  </label>
</div>

<div class="grid-container">
  <div class="grid" style={`--cols: ${board.width}`}>
    {#each Array(board.height) as _, y}
      {#each Array(board.width) as _, x}
        <div
          class="cell {board.board[board.idx(x, y)] ? 'alive' : ''}"
          role="button"
          tabindex="0"
          aria-pressed={board.board[board.idx(x, y)]}
          on:click={() => toggleCell(x, y)}
          on:keydown={(e) => {}}
        ></div>
      {/each}
    {/each}
  </div>
</div>

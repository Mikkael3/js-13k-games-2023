export declare global {
  interface Window {
    // How long to sleep between ticks
    wait: number;
    // If true game is stopped
    pause: boolean;
  }
}

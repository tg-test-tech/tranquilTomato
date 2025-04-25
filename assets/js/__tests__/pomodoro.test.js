/**
 * @jest-environment jsdom
 */

// YOU NEED TO COMMENT OUT THE INITIALIZATION OF A POMODORO TIMER IN pomodoro.js IN ORDER FOR THESE TESTS TO WORK

import { PomodoroTimer } from '../src/pomodoro';

describe('Pomodoro Timer', () => {
    let timer;
    beforeEach(() => {
        document.body.innerHTML = `
        <div class="timer">
            <h2 id="timer-display">25:00</h2>
            <div>
                <button class="button primary" id="start-button">Start Work</button>
                <button class="button primary" id="reset-button">Reset All Progress</button>
            </div>
        </div>
        <div id="transition-modal" class="modal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <p id="transition-message"></p>
            </div>
        </div>
        `;
        timer = new PomodoroTimer();

    })
    test('formatTime method should convert seconds into MM:SS format', () => {
        expect(timer.formatTime(1500)).toBe('25:00');
        expect(timer.formatTime(300)).toBe('05:00');
        expect(timer.formatTime(59)).toBe('00:59');
    });

    test('start-pause the timer', () => {
        timer.toggleTimer();
        expect(timer.isRunning).toBe(true);
        expect(document.getElementById('start-button').textContent).toBe('Pause Work');
        timer.toggleTimer();
        expect(timer.isRunning).toBe(false);
        expect(document.getElementById('start-button').textContent).toBe('Start Work');
    });

    test('reset the timer', () => {
        timer.toggleTimer();
        timer.resetTimer();
        expect(timer.isRunning).toBe(false);
        expect(timer.currentDuration).toBe(timer.workDuration);
        expect(document.getElementById('timer-display').textContent).toBe('25:00');
    });

    test('show the modal when the timer runs out', () => {
        timer.currentDuration = 0; // Simulating the timer has run out
        timer.handleTimeRunOut();
        expect(document.getElementById('transition-modal').style.display).toBe('block');
    });

    test('complete work and break cycle', () => {
        jest.useFakeTimers();

        expect(document.getElementById('timer-display').textContent).toBe('25:00'); // Timer should be set to 25 minutes
        
        timer.toggleTimer(); // Start work
        jest.advanceTimersByTime(24 * 60 * 1000); // Forward time by 24 minutes
        expect(document.getElementById('timer-display').textContent).toBe('01:00'); // Timer should say 1 minute left
        jest.advanceTimersByTime(59 * 1000); // Forward time by 59 seconds
        timer.handleTimeRunOut(); // Simulate work time ran out
        expect(document.getElementById('timer-display').textContent).toBe('05:00'); // Timer should say 1 minute left

        expect(document.getElementById('transition-modal').style.display).toBe('block'); // Modal should be shown
        
        timer.toggleTimer(); // Start break
        jest.advanceTimersByTime(4.99 * 60 * 1000); // Forward time by 4min 59.99 second
        timer.handleTimeRunOut(); // Simulate break time ran out

        expect(document.getElementById('timer-display').textContent).toBe('25:00'); // Timer should be reset to 25 minutes
    });
    
});

test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});
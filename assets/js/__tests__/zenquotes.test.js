/**
 * @jest-environment jsdom
 */

// This is a mock response that matches the structure that getApi expects
const mockResponse = [
  {
    q: 'Quote Text',
    a: 'Author Name',
  }
];

beforeEach(() => {
  // Set up the document body with the provided HTML
  document.body.innerHTML = `
    <div class="inner">
      <h1><b>Tranquil</b>Tomato</h1>
      <blockquote>
        <p id="postQuote">Lorem</p>
        <footer id="zenAuthor">-Ipsum</footer>
      </blockquote>
      <ul class="actions">
        <li><a href="#" id="zenquotes" class="button primary icon solid fa-random">New Quote</a></li>
      </ul>
    </div>
  `;

  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
  );
});

test('updates DOM with quote and author when getApi is called', async () => {
  // Dynamically import the getApi function
  const { getApi } = await import('../src/zenquotes');

  // Trigger the event that calls getApi
  document.querySelector('#zenquotes').click();

  // Wait for the getApi function to complete
  await new Promise((resolve) => setTimeout(resolve, 0));

  // Check that the DOM has been updated as expected
  expect(document.querySelector('#postQuote').textContent).toBe('Quote Text');
  expect(document.querySelector('#zenAuthor').textContent).toBe('—Author Name');
});

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

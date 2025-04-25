/**
 * @jest-environment jsdom
 */

// This is a mock response that matches the structure that getApi expects
const mockResponse = {
      "urls": {
        "regular": 'someurl.com'
      }
    };
  
  beforeEach(() => {
    // Set up the document body with the provided HTML
    document.body.innerHTML = `
      <div class="inner">
        <ul class="actions">
            <li>
                <a href="#" id="newbanner" class="button primary icon solid fa-random">New Image</a>
            </li>
        </ul>
      </div>
      <section id="banner">
        </section>
    `;
  
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );
  });
  
  test('updates banner with background image when getApi is called', async () => {
    // Dynamically import the getApi function
    const { getApi } = await import('../src/newbanner');
  
    // Trigger the event that calls getApi
    document.querySelector('#newbanner').click();

  
    // Wait for the getApi function to complete
    await new Promise((resolve) => setTimeout(resolve, 0));
    

    expect(document.querySelector("#banner").style.backgroundImage).toBe("url(someurl.com)");


  });
  
  test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });
  
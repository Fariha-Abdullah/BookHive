import { useHistory, useParams } from 'react-router-dom';

function BookReaderPage() {
  const { id } = useParams();
  const history = useHistory();

  // Direct link to the images HTML version
  const gutenbergUrl = `https://www.gutenberg.org/cache/epub/${id}/pg${id}-images.html`;

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => history.goBack()}
          className="mb-6 text-pink-500 hover:text-pink-600 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Collection
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Reading Options</h1>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
            <a
              href={gutenbergUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-lg inline-block"
            >
              Read HTML Version with Images
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Book ID: {id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookReaderPage;
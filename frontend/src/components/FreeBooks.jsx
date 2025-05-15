import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FreeBooks() {
    // State for books data, loading status, and error handling
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('https://gutendex.com/books?search=fiction&limit=12');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const formattedBooks = data.results.map(book => ({
                    id: book.id,
                    title: book.title,
                    author: book.authors?.[0]?.name || 'Unknown Author',
                    cover: book.formats['image/jpeg'] || 'https://via.placeholder.com/200x300',
                    gutenbergId: book.gutenberg_id || book.id
                }));

                setBooks(formattedBooks);
            } catch (err) {
                console.error('Error fetching books:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // Render a loader while data is fetching
    if (loading) {
        return (
            <div className="flex items-center justify-center h-[100vh]">
                <svg
                    className="animate-spin h-12 w-12 text-pink-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    />
                </svg>
            </div>
        );
    }

    // Render error message if fetch fails
    if (error) {
        return (
            <div className="text-center text-red-500 mt-8">
                <p>Failed to load books: {error}</p>
            </div>
        );
    }

    // Render books grid when data is ready
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Popular Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map(book => (
                    <div key={book.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                        <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-64 object-cover mb-4 rounded-lg"
                            onError={e => { e.target.src = 'https://via.placeholder.com/200x300'; }}
                        />
                        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                        <p className="text-gray-600 mb-4">{book.author}</p>
                        <Link
                            to={`/free-books/${book.gutenbergId}`}
                            className="block text-center bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                        >
                            Read Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FreeBooks;

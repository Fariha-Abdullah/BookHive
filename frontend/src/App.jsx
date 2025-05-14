// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// import AdminDashboard from './components/AdminDashboard.jsx';
// import BookDetails from './components/BookDetails.jsx';
// import BookReaderPage from './components/BookReaderPage.jsx';
// import BooksPage from './components/BooksPage';
// import Dashboard from './components/Dashboard';
// import EditBook from './components/EditBooks.jsx';
// import Footer from './components/Footer.jsx';
// import FreeBooks from './components/FreeBooks.jsx';
// import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage';
// import Navbar from './components/Navbar';
// import NotFound from './components/NotFound';
// import Signup from './components/Signup.jsx';
// import SubscriptionPage from "./components/SubscriptionPage";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className='mb-20' />
//       <Switch>
//         <Route path="/" exact component={HomePage} />
//         <Route path="/subscription" exact component={SubscriptionPage} />
//         <Route path="/signin" exact component={LoginPage} />
//         <Route path="/signup" exact component={Signup} />

//         <Route exact path="/books" component={BooksPage} />
//         <Route exact path="/free-books" component={FreeBooks} />
//         <Route exact path="/free-books/:id" component={BookReaderPage} />

//         {/* Move this first so “edit” isn’t swallowed by the generic :id route */}
//         <Route path="/books/edit/:id" component={EditBook} />

//         {/* Now generic book-detail paths */}
//         <Route path="/books/:id" component={BookDetails} />

//         <Route exact path="/dashboard" component={Dashboard} />
//         <Route exact path="/admin/dashboard" component={AdminDashboard} />

//         {/* 404 fallback */}
//         <Route component={NotFound} />
//       </Switch>
//       <div className='pb-20'></div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

import { useContext } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';


import AdminDashboard from './components/AdminDashboard.jsx';
import { AuthContext, AuthProvider } from './components/AuthProvider.jsx';
import BookDetails from './components/BookDetails.jsx';
import BookReaderPage from './components/BookReaderPage.jsx';
import BooksPage from './components/BooksPage';
import Dashboard from './components/Dashboard';
import EditBook from './components/EditBooks.jsx';
import Footer from './components/Footer.jsx';
import FreeBooks from './components/FreeBooks.jsx';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Signup from './components/Signup.jsx';
import SubscriptionPage from "./components/SubscriptionPage";

// Protect routes for authenticated users
function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

// Protect routes for admin users
function AdminRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        user && user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className='mb-20' />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signin" exact component={LoginPage} />
          <Route path="/signup" exact component={Signup} />

          {/* Public access for free books */}
          <Route exact path="/free-books" component={FreeBooks} />
          <Route exact path="/free-books/:id" component={BookReaderPage} />

          {/* Protected routes */}
          <PrivateRoute exact path="/subscription" component={SubscriptionPage} />
          <PrivateRoute exact path="/books" component={BooksPage} />
          <PrivateRoute path="/books/edit/:id" component={EditBook} />
          <PrivateRoute path="/books/:id" component={BookDetails} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />

          {/* Admin-only route */}
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />

          {/* 404 fallback */}
          <Route component={NotFound} />
        </Switch>
        <div className='pb-20'></div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
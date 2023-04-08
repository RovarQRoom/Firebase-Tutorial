import { initializeApp } from "firebase/app"; // Import the initializeApp function
import { 
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc
 } from "firebase/firestore"; // Import the getFirestore function

 import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth"; // Import the getAuth function

const firebaseConfig = { // Your web app's Firebase configuration
    apiKey: "AIzaSyC8Zo2a-l-IsyaacNwma3ks8A2KRvVRUME",
    authDomain: "fir-tutorial-30691.firebaseapp.com",
    projectId: "fir-tutorial-30691",
    storageBucket: "fir-tutorial-30691.appspot.com",
    messagingSenderId: "140222711415",
    appId: "1:140222711415:web:7150c56c8b1fab6657e872"
  };

// Initialize Firebase The First Step
initializeApp(firebaseConfig); 

// Initialize Firebase The Second Step
const db = getFirestore();

// Initialize Firebase Auth
const auth = getAuth();

// Collection Reference
const booksRef = collection(db, "books");

// Query Reference
const querySelector = query(booksRef, where("author", "==", "Capcom"), orderBy("createdAt"));

// Get Collection Data Not Realtime
// getDocs(booksRef).then((querySnapshot) => {
//   let books = [];
//   querySnapshot.docs.forEach((doc) => {
//     books.push({...doc.data(), id: doc.id});
//   });
//   console.log(books);
// })
// .catch((error) => {
//   console.log("Error getting documents: ", error);
// });

// Realtime Listener
const unsubBooks = onSnapshot(booksRef, (querySnapshot) => {
  let books = [];
  querySnapshot.docs.forEach((doc) => {
    books.push({...doc.data(), id: doc.id});
  });
  console.log(books);
});

// Realtime Query Listener
const unsubQuery = onSnapshot(querySelector, (querySnapshot) => {
  let books = [];
  querySnapshot.docs.forEach((doc) => {
    books.push({...doc.data(), id: doc.id});
  });
  console.log(books);
});

// Add Data to Firestore
const addBook = document.querySelector(".add");
addBook.addEventListener("submit", (e) => {
  e.preventDefault();

  const book = {
    title: addBook.title.value,
    author: addBook.author.value,
    createdAt: serverTimestamp()
  };

  addDoc(booksRef, book).then(() => {
    console.log("Book Added");
    addBook.reset();
  }).catch((error) => {
    console.log(error);
  });
});

// Get A Single Document from Firestore
const docRef = doc(db, "books", "alyu9UBLuuuI0Ru1k2ji");
getDoc(docRef).then((doc) => {
  if (doc.exists()) {
    console.log("Document data:", doc.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});

// Update Data in Firestore
const updateBook = document.querySelector(".update");
updateBook.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = updateBook.id.value;
  const book = {
    title: updateBook.title.value,
    author: updateBook.author.value,
    createdAt: serverTimestamp()
  };

  const docRef = doc(db, "books", id);

  updateDoc(docRef, book).then(() => {
    console.log("Book Updated");
    updateBook.reset();
  }).catch((error) => {
    console.log(error);
  });

});

// Delete Data from Firestore
const deleteBook = document.querySelector(".delete");
deleteBook.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = deleteBook.id.value;

  const docRef = doc(db, "books", id);

  deleteDoc(docRef).then(() => {
    console.log("Book Deleted");
    deleteBook.reset();
  }).catch((error) => {
    console.log(error);
  });
});

// Sign Up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      const user = userCredential.user;
      console.log("User Created", user);
      signupForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});

// Sign In
const signinForm = document.querySelector(".login");
signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signinForm.email.value;
  const password = signinForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User Signed In", user);
      signinForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});

// Sign Out
const logout = document.querySelector(".logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();

  signOut(auth).then(() => {
    console.log("User Signed Out");
  }).catch((error) => {
    console.log(error);
  });
});

// Subscribe to Auth State
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User Logged In: ", user);
  } else {
    console.log("User Logged Out");
  }
});

// Unsubscribe from Auth State
const unsubButton = document.querySelector(".unsub");
unsubButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Unsubscribed from Auth State Change");
  unsubBooks();
  unsubQuery();
});
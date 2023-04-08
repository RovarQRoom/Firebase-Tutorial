import { initializeApp } from "firebase/app"; // Import the initializeApp function
import { 
  getFirestore,
  collection,
  getDocs
 } from "firebase/firestore"; // Import the getFirestore function

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

// Collection Reference
const booksRef = collection(db, "books");

// Get Collection Data
getDocs(booksRef).then((querySnapshot) => {
  let books = [];
  querySnapshot.docs.forEach((doc) => {
    books.push({...doc.data(), id: doc.id});
  });
  console.log(books);
})
.catch((error) => {
  console.log("Error getting documents: ", error);
});

// Add Data to Firestore
const addBook = document.querySelector(".add");
addBook.addEventListener("submit", (e) => {
  e.preventDefault();

  const book = {
    title: addBook.title.value,
    author: addBook.author.value
  };

  db.collection("books").add(book).then(() => {
    console.log("Book Added");
  }).catch((error) => {
    console.log(error);
  });
});

// Delete Data from Firestore
const deleteBook = document.querySelector(".delete");
addBook.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const id = deleteBook.id.value;

  db.collection("books").doc(id).delete().then(() => {
    console.log("Book Deleted");
  }).catch((error) => {
    console.log(error);
  });
});
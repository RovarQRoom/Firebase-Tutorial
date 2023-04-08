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

// Query Reference
const querySelector = query(booksRef, where("author", "==", "Capcom"));

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
onSnapshot(booksRef, (querySnapshot) => {
  let books = [];
  querySnapshot.docs.forEach((doc) => {
    books.push({...doc.data(), id: doc.id});
  });
  console.log(books);
});

// Realtime Query Listener
onSnapshot(querySelector, (querySnapshot) => {
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
    author: addBook.author.value
  };

  addDoc(booksRef, book).then(() => {
    console.log("Book Added");
    addBook.reset();
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
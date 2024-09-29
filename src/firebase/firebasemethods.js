import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDS0sR7bJGpL_z8LioWOgnzi4B5S4c9Ap4",
    authDomain: "react-firebase-f13c6.firebaseapp.com",
    projectId: "react-firebase-f13c6",
    storageBucket: "react-firebase-f13c6.appspot.com",
    messagingSenderId: "653742506011",
    appId: "1:653742506011:web:a2b3298e00a09a7bd5f8be",
    measurementId: "G-R5L9HCL9BN"
  };
import {
    getAuth,
  } from "firebase/auth";
  
  import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  const db = getFirestore(app);
  
  //initialize firestore database
  const storage = getStorage(app);

const sendData = (obj, colName) => {
    return new Promise((resolve, reject) => {
      addDoc(collection(db, colName), obj)
        .then((res) => {
          resolve("data send to db successfully");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  //get data with id from firestore
  const getData = (colName , uid) => {
    return new Promise(async (resolve, reject) => {
      const dataArr = []
      
      const q = query(
        collection(db, colName),
        where("uid", "==", uid)
      );
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataArr.push(doc.data())
        resolve(dataArr);
      });
      reject("error occured");
    });
  };
  export{sendData,getData,auth}
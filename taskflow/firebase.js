import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNZhcdB56AF3XkNjAmJCXyZy0ZxRZVtpw",
  authDomain: "taskflow-c5879.firebaseapp.com",
  projectId: "taskflow-c5879",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
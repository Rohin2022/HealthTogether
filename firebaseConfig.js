// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { get, getDatabase, push, ref, set } from "firebase/database";
import { isToxic } from "./utilityFunctions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd-uc5zABFUKKUWTzbSMuUCO3Xz3jXrlg",
  authDomain: "telehealthprovider-15a7f.firebaseapp.com",
  projectId: "telehealthprovider-15a7f",
  storageBucket: "telehealthprovider-15a7f.appspot.com",
  messagingSenderId: "733632381768",
  appId: "1:733632381768:web:e3156e10d41488eda2e97d"
};



const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getDatabase(app)

export { app, auth, db };

export async function sendMessage(chatId, message, senderId) {
  isToxic(message).then((isToxic) => {
    if (isToxic) {
      alert("Please ensure that your comment is kind, we want to ensure a comforting and safe environment for all! We appreciate your cooperation!")
    }
    else {
      var chatRef = ref(db, 'chats/' + chatId + "/chats")
      push(chatRef, {
        message: message,
        sender: senderId
      })
    }
  })

}

export async function getRecommendedPatients(userId, ailments, setRecommendedPatients) {
  return get(ref(db, "users")).then((querySnapshot) => {
    const snapshot = querySnapshot.val()
    const thisUser = snapshot[userId]
    delete snapshot[userId]
    setRecommendedPatients(recommend(ailments, snapshot, "patient"))
  })
}

export async function getRecommendedDoctors(userId, ailments, setRecommendedDoctors) {
  return get(ref(db, "users")).then((querySnapshot) => {
    const snapshot = querySnapshot.val()
    const thisUser = snapshot[userId]
    delete snapshot[userId]
    console.log("recommend")
    setRecommendedDoctors(recommend(ailments, snapshot, "doctor"))
  })
}

function recommend(ailments, otherUsers, type) {
  const issues = ailments.split(",")
  var similarities = []
  for (var key in otherUsers) {
    if (otherUsers[key].userType != type) {
      continue
    }
    var otherUserIssues = otherUsers[key].data.split(",")
    var similarity = 0
    for (var issue in issues) {
      if (issue in otherUserIssues) {
        similarity += 1
      }
    }
    similarities.push([otherUsers[key], similarity])

  }
  similarities.sort((a, b) => a[1] - b[1]).reverse()
  var out = []
  for (var i = 0; i < similarities.length; i++) {
    out.push(similarities[i][0])
  }
  console.log(out)
  return out.slice(0, 4)
}


export async function joinChat(userId, otherUserId, uid1, uid2, otherIsDoctor) {
  const chatId = crypto.randomUUID()
  var userRef = ref(db, 'users/' + uid1 + '/chats/' + chatId)
  set(userRef, {
    chatId: chatId
  })

  var otherUserRef = ref(db, 'users/' + uid2 + '/chats/' + chatId)
  set(otherUserRef, {
    chatId: chatId
  })

  if (otherIsDoctor) {
    var otherUserPatients = ref(db, 'users/' + uid2 + '/patients')
    push(otherUserPatients, {
      patientId: uid2
    })
  }

  var chatRef = ref(db, 'chats/' + chatId)
  set(chatRef, {
    userId: userId,
    userOther: otherUserId,
    otherIsDoctor: otherIsDoctor

  })
}
export function getPatient(userId, addPatient) {
  return get(ref(db, "users/" + userId)).then((querySnapshot) => {
    var obj = { email: querySnapshot.val().email, data: querySnapshot.val().data }
    addPatient(obj)
  })
}

export function getUser(userId, setUserType, setOpenChatsIds, setUserData) {
  return get(ref(db, "users/" + userId)).then((querySnapshot) => {
    setUserType(querySnapshot.val().userType)
    setUserData(querySnapshot.val().data)
    const chats = querySnapshot.val().chats
    if (chats == null) {
      setOpenChatsIds([])
    }
    else {
      setOpenChatsIds(Object.keys(chats))
    }
    var patients = []
    if (querySnapshot.val().userType == "doctor") {
      patients = querySnapshot.val().patients

    }
    return [patients, querySnapshot.val().userType]

  })
}


export function getUsers() {
  return get(ref(db, "users")).then((querySnapshot) => {
    return querySnapshot.val()
  })
}






export async function forgotPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Your password reset link has been sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }

}

export function logout() {
  signOut(auth)
  console.log("signed out")
}

export async function signInUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert("Incorrect username or password, please try again!");
  }
}


export async function createUser(email, password, userType, data) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    persistUser(email, userType, data, user.uid)
  }
  catch (error) {
    console.log(error)
    alert("That username already exists, please try a different one.")
  }
}

export async function persistUser(email, userType, data, id) {
  await set(ref(db, 'users/' + id), {
    email: email,
    userType: userType,
    data: data,
    uuid: id
  });
}


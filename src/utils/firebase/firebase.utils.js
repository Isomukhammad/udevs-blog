import {initializeApp} from 'firebase/app';

import {
    createUserWithEmailAndPassword,
    getAuth, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signInWithRedirect, 
    signOut
} from 'firebase/auth';

import {
    getFirestore, 
    setDoc, 
    getDoc,
    doc,
    getDocs,
    collection,
    query,
    writeBatch,
    orderBy,
    limit,
    increment,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'

import {
    ref,
    uploadBytes,
    getStorage,
    getDownloadURL
} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCRzIkaJGZlni8CLWahv4U0GVmkyazUM5o",
    authDomain: "udevs-blog-97c6b.firebaseapp.com",
    projectId: "udevs-blog-97c6b",
    storageBucket: "udevs-blog-97c6b.appspot.com",
    messagingSenderId: "981435762600",
    appId: "1:981435762600:web:c245f9fe02c0bcb9447f9d"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {} 
) => {
    if(!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
        
    if(!userSnapshot.exists()){
      const { displayName, email, photoURL} = additionalInformation;
      const createdAt = new Date();
  
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          photoURL,
          createdAt,
          ...additionalInformation
        });
      } catch(error) {
        console.log('Error creating the user', error.message);
      }
    } return userDocRef;
}

export const writeUserData = async (user) => {
    try{
        const docRef = doc(db, 'users', user);
        const q = await getDoc(docRef);
        const docData = q.data();

        return docData;
    } catch(error) {
        return false;
    }
}

export const createBlogNews = async (info) => {
    const {url, uid, title, imageURL, category, createdAt, id} = info;
    let {description} = info;
    description = description.replace('\n', '\\n');
    const views = 0;

    const date = new Date();
    const collectionRef = collection(db, 'blogs');
    const batch = writeBatch(db);
    const disabledButton = false;

    const docRef = doc(collectionRef, id);
    try{
        batch.set(docRef, {
        url,
        uid,
        title,
        description,
        imageURL,
        category,
        id,
        date, 
        views
    });

    await batch.commit();

    return disabledButton;
    } catch(error) {
        console.log('Errorv in uploading data', error);
        return disabledButton;
    }
}

export const uploadImages = async (collectionRef, image) => {
    if(image == null) return;

    try{
        let imageRef = ref(storage, `${collectionRef}/${image.name}`);
        await uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((data) => {
                return data;
            })
        })

    } catch(error) {
        console.log('Error in uploading image', error);
    }
}

export const getCategoriesAndDocuments = async (collectionName) => {
    const q = query(collection(db, collectionName), orderBy('id'));

    const querySnapshot = await getDocs(q);
    const categoriesMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        acc.unshift(docSnapshot.data());
        return acc;
    }, []);

    return categoriesMap;
}

export const incrementView = async (blog) => { 
    const blogRef = doc(db, 'blogs', blog);
    
    try{
        await updateDoc(blogRef, {
            views: increment(1) 
        }) 
    } catch(error) {
        console.log('Error in incrementing value of views: ', error);
    }
}

export const deleteBlog = async (blog) => {
    const blogRef = doc(db, 'blogs', blog);

    try{
        await deleteDoc(blogRef);
        return true;
    } catch {
        return false;
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);  

export const onAuthStateListener = (callback) => onAuthStateChanged(auth, callback);

export const storage = getStorage(firebaseApp);
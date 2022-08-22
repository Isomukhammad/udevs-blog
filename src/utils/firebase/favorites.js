import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, writeBatch } from "firebase/firestore";
import { db } from "./firebase.utils";

export const addToFavorites = async (currentUser, blog) =>{
    if(currentUser && blog){
        const docRef = doc(db, 'users', currentUser, 'favorites', blog);
        const batch = writeBatch(db);
        
        try{
            const id = blog;
            batch.set(docRef, {
                id
            });

            await batch.commit();
            return true;
        } catch {
            return false;
        }
    }
}

export const deleteFromFavorites = async (currentUser, blog) => {
    const docRef = doc(db, 'users', currentUser, 'favorites', blog);
    const docSnapshot = await getDoc(docRef);
    const docData = await docSnapshot.data();
    try{
        await deleteDoc(docRef);
        return true;
    } catch(error) {
        return false;
    }
}

export const getFavorites = async (user) => {
    if(user){
    const q = query(collection(db, 'users', user, 'favorites'), orderBy('id'));
    const querySnapshot = await getDocs(q);

    const b = query(collection(db, 'blogs'), orderBy('id'));
    const blogSnapshot = await getDocs(b);


    const idmap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        acc.unshift(docSnapshot.data());
        return acc;
    }, [])

    const favoritesMap = blogSnapshot.docs.reduce((acc, docSnapshot) => {
        const data = docSnapshot.data();
        idmap.map((id) => {
            if(id.id === data.id){
                acc.unshift(data)
            }
        })
        return acc;
    }, [])
    
    return favoritesMap;
    }
}

export const checkFavorites = async (currentUser, blog) => {
    const docRef = doc(db, 'users', currentUser, 'favorites', blog);
    const docSnapshot = await getDoc(docRef);
    const docData = await docSnapshot.data();
    
    if(docData) {
        return true;
    } else {
        return false;
    } 
}
import { auth, db } from "../firebase"
import { baseUrl } from "../src/data"
import { createUserWithEmailAndPassword } from "firebase/auth"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"

const adminRef = collection(db, 'admins')
const getAdmins = () => getDocs(adminRef).then(res => res.docs.map((doc) => ({ admin: doc.data(), id: doc.id })))
export const useAdminQuery = () => useQuery('admins', getAdmins)



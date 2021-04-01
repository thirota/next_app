import {useState, useEffect} from 'react'
import Layout from '../../components/layout'
import firebase from 'firebase'
import '../../components/fire'

//https://firebase.google.com/docs/auth/web/google-signin?hl=ja
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export default function Home() {
    const [message, setMessage] = useState('wait...')

    useEffect(()=>{
        //signInWithPopup doesn't work (blank page in dialog)
        //https://stackoverflow.com/questions/40467802/firebase-in-react-signinwithpopup-return-a-blank-page
        //https://github.com/firebase/firebaseui-web/issues/170
        //https://github.com/thirota/next_app/issues/1
        auth.signInWithPopup(provider).then((result)=>{

        //signInWithRedirect makes loop...
        //auth.signInWithRedirect(provider).then(result=>{
            setMessage('logined: ' + result.user.displayName)
        })
    }, [])

    return (
        <div>
            <Layout header="Next.js" title="Top page">
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">{message}</h5>
                    <p className="h6 text-left">
                        uid: {auth.currentUser !== null ? auth.currentUser.uid : ''}<br/>
                        displayName: {auth.currentUser !== null ? auth.currentUser.displayName : ''}<br/>
                        email: {auth.currentUser !== null ? auth.currentUser.email : ''}<br/>
                        phoneNumber: {auth.currentUser !== null ? auth.currentUser.phoneNumber : ''}
                    </p>
                </div>
            </Layout>
        </div>
    )
}
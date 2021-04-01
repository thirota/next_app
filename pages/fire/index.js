import {useState, useEffect} from 'react'
import Layout from '../../components/layout'
import firebase from 'firebase'
import '../../components/fire'

const db = firebase.firestore()
//https://firebase.google.com/docs/auth/web/google-signin?hl=ja
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

auth.signOut()

export default function Home() {
    const mydata = []
    const [data, setData] = useState(mydata)
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
        }).catch((error)=>{
            setMessage('not logined.')
        })
    }, [])

    useEffect(() => {
        if (auth.currentUser !== null) {
            db.collection('mydata').get().then((snapshot)=> {
                snapshot.forEach((document)=> {
                    const doc = document.data()
                    mydata.push(
                        <tr key={document.id}>
                            <td><a href={'/fire/del?id=' + document.id}>{document.id}</a></td>
                            <td>{doc.name}</td>
                            <td>{doc.mail}</td>
                            <td>{doc.age}</td>
                        </tr>
                    )
                })
                setData(mydata)
            })
        } else {
            mydata.push(
                <tr key="1"><th colSpan="4">can't get data.</th></tr>
            )
        }
    }, [message])

    return (
        <div>
            <Layout header="Next.js" title="Top page">
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">{message}</h5>
                    <table className="table bg-white text-left">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Mail</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </div>
    )
}
import {useState,useEffect} from 'react'
import Layout from '../../components/layout'
import firebase from 'firebase'
import {useRouter} from 'next/router'
import '../../components/fire'

const db = firebase.firestore()

export default function Delete(props) {
    const [message, setMessage] = useState('wait.')
    const [data, setData] = useState(null)
    const router = useRouter()

    useEffect(()=> {
        if (router.query.id !== undefined) {
            setMessage('Delete id = ' + router.query.id)
            db.collection('mydata').doc(router.query.id).get().then(ob=> {
                setData(ob.data())
            })
        } else {
            setMessage(message + '.')
        }
    }, [message])

    const doAction = (e)=> {
        db.collection('mydata').doc(router.query.id).delete().then(ref=> {
            router.push('/fire')
        })
    }

    return (
        <div>
            <Layout header="Next.js" title="Top page">
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">{message}</h5>
                    <pre className="card p-3 m-3 h5 text-left">
                        Name: {data !== null ? data.name : '...'}<br/>
                        Mail: {data !== null ? data.mail : '...'}<br/>
                        Age : {data !== null ? data.age  : '...'}<br/>
                    </pre>
                    <button onClick={doAction} className="btn btn-primary">Delete</button>
                </div>
            </Layout>
        </div>
    )

}
import {useState, useEffect} from 'react'
import Layout from '../../components/layout'
import firebase from 'firebase'
import {useRouter} from 'next/router'
import '../../components/fire'

const db = firebase.firestore()
const auth = firebase.auth()

export default function Info() {
    const [message, setMessage] = useState('address info')
    const [cmt, setCmt] = useState('')
    const [mydata, setMydata] = useState(null)
    const [msgdata, setMsgdata] = useState([])
    const router = useRouter()

    //Back to Top page if not logined
    useEffect(()=>{
        if (auth.currentUser === null) {
            router.push('/address')
        }
    }, [])

    //Handler for input fields
    const onChangeCmt = ((e)=>{
        setCmt(e.target.value)
    })

    //Post message
    const doAction = ((e)=>{
        const t = new Date().getTime()
        const to = {
            comment:'To: ' + cmt,
            time:t
        }
        const from = {
            comment:'From: ' + cmt,
            time:t
        }
        //XXX Add message to my address
        db.collection('address').doc(auth.currentUser.email)
            .collection('address').doc(router.query.id)
            .collection('message').add(to).then(ref=>{
                //Add message to peer
                db.collection('address').doc(router.query.id)
                    .collection('address').doc(auth.currentUser.email)
                    .collection('message').add(from).then(ref=>{
                        //Change flag of peer
                        db.collection('address').doc(router.query.id)
                            .collection('address').doc(auth.currentUser.email)
                            .update({flag:true}).then(ref=>{
                                router.push('/address')
                            })
                    })
            })
    })

    //Back to Top page
    const goBack = (e)=> {
        router.push('/address')
    }

    //get an address and messages, and show them
    useEffect(()=>{
        if (auth.currentUser !== null) {
            db.collection('address').doc(auth.currentUser.email)
                .collection('address').doc(router.query.id).get().then((snapshot)=>{
                setMydata(snapshot.data())
            })
            db.collection('address').doc(auth.currentUser.email)
                .collection('address').doc(router.query.id)
                .collection('message').orderBy('time', 'desc').get().then(snapshot=>{
                const data = []
                snapshot.forEach((document)=>{
                    data.push(<li className="list-group-item px-3 py-1">
                        {document.data().comment}
                    </li>)
                })
                setMsgdata(data)
            })
            db.collection('address').doc(auth.currentUser.email)
                .collection('address').doc(router.query.id).update({flag:false})
        } else {
            setMessage("no data")
        }
    }, [message])

    return (
        <div>
            <Layout header="Next.js" title="Info & messages.">
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">{message}</h5>
                    <div className="text-left">
                        <div>
                            <div>Name: {mydata !== null ? mydata.name : ''}</div>
                            <div>Mail: {mydata !== null ? mydata.mail : ''}</div>
                            <div>Tel: {mydata !== null ? mydata.tel : ''}</div>
                            <div>Memo: {mydata !== null ? mydata.memo : ''}</div>
                        </div>
                        <hr/>
                        <div className="form-group">
                            <label>Message:</label>
                            <input type="text" onChange={onChangeCmt} className="form-control"/>
                        </div>
                    </div>
                    <button onClick={doAction} className="btn btn-primary">Send Message</button>
                    <button onClick={goBack} className="btn">Go Back</button>
                </div>
                <ul className="list-group">
                    {msgData}
                </ul>
            </Layout>
        </div>
    )
}
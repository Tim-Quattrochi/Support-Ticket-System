import { useEffect } from "react"
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux"
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, reset as notesReset } from "../features/notes/noteSlice"
import { useParams, useNavigate } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import NoteItem from "../components/NoteItem"


const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}


function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)

    const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes)

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))


    }, [isError, dispatch, message, ticketId])

    //close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    if (isLoading || notesIsLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>Something went wrong.</h3>
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url='/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>

            {notes.map((note) => (
                <NoteItem key={note._id} note={note}></NoteItem>
            ))}

            {ticket.status !== 'closed' && (
                <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket
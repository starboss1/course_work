import React, { useEffect, useState } from "react";
import Quill from "quill";
import QuillCursors  from 'quill-cursors';
import 'quill/dist/quill.snow.css';
import Sharedb from "sharedb/lib/client";
import richText from "rich-text";

import ReconnectingWebSocket  from 'reconnecting-websocket'

import "./document.css";
import documentService from "../../services/document.service";

// Registering the rich text type to make sharedb work
// with quill editor

Sharedb.types.register(richText.type);

const Document = (props) => {

    Quill.register('modules/cursors', QuillCursors);
    
    // Querying for out document

    

    const [inviteUserEmail, setInviteUserEmail] = useState("");
    const [redactors, setRedactors] = useState();

    const handleClick = (e) => {
        documentService.inviteUserToDocument(props.match.params.documentId, inviteUserEmail)
            .then((res) => {
                alert('User '+inviteUserEmail+' invited to document');
                setInviteUserEmail("");
            })
            .catch((err) => console.log('Error while inviting user to document ', err));
    }

    useEffect(() => {
        console.log('call user redactors effect');
        let mounted = true;
        documentService.getDocumentRedactors(props.match.params.documentId)
        .then(response => mounted && setRedactors([...response.data.documentRedactors]))
        .catch(error => console.log("error while get document redactors", error));
    }, [props.match.params.documentId]);

   

    useEffect(() => {
        // Connection to out socket server
        const socket = new ReconnectingWebSocket("ws://127.0.0.1:8080");
        const connection = new Sharedb.Connection(socket);
        const doc = connection.get("documents", '' + props.match.params.documentId);
        console.log('call subscribe effect');
        doc.subscribe((err) => {
            if (err) throw err;
            // On Initialising if data is present in server
            // Updaing its content to editor
            console.log('subscribed');
            let quill = new Quill("#editor", {
                theme: 'snow',
                modules: {
                    cursors: true,
                    history: {
                        userOnly: true
                    },
                },
            });
            quill.setContents(doc.data);

            // On text change publishing to our server
            // so that it can be broadcasted to all other clients
            quill.on("text-change", (delta, oldDelta, source) => {
                if (source !== "user") return;
                doc.submitOp(delta, { source: quill });
            });

            // listening to changes in the document
            // that is coming from our server

            doc.on("op", (op, source) => {
                if (source === quill) return;
                quill.updateContents(op);
            });
        });

        return () => {
            console.log('unsubscribe');
            connection.close();
            socket.close();
        };
    }, [props.match.params.documentId]);

    const redactorsList = redactors && <ul className="list-group">
        { redactors.map(elem => {
        return <li key={elem._id} className="list-group-item">{elem.username}</li>
    })
    }
    </ul> 

    return (
        <div className="container">
            <div>
                <label>Введіть пошту користувача, якого ви бажаєте додати</label>
                <input type="email" name="addUserEmail" value={inviteUserEmail} onChange={(e) => setInviteUserEmail(e.target.value)} />
                <button type="button" disabled={!inviteUserEmail} className="btn btn-primary ml-3" onClick={handleClick}>Add user</button>
            </div>
            <div style={{ margin: "3% 0%", border: "1px solid" }}>
                <div id="editor"></div>
            </div>
            <hr className="my-4"></hr>
            <div>
                <div className="my-3">Користувачі</div>
                { redactorsList }
            </div>
        </div>
    );
};

export default Document;


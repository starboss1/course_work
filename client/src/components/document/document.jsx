import React, { useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import Sharedb from "sharedb/lib/client";
import richText from "rich-text";

import "./document.css";

// Registering the rich text type to make sharedb work
// with quill editor

Sharedb.types.register(richText.type);

// Connection to out socket server

const socket = new WebSocket("ws://127.0.0.1:8080");
const connection = new Sharedb.Connection(socket);

// Querying for out document

const doc = connection.get("documents", "firstDocument");

const Document = (props) => {
    console.log('props path = '+props.match.params.documentId);
    useEffect(() => {
        doc.subscribe((err) => {
            if (err) throw err;

            const toolbarOptions = [
                "bold",
                "italic",
                "underline",
                "strike",
                "align",
            ];
            const options = {
                theme: "bubble",
                modules: {
                    toolbar: toolbarOptions,
                },
            };

            let quill = new Quill("#editor", options);

            // On Initialising if data is present in server
            // Updaing its content to editor

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
            connection.close();
        };
    }, []);

    return (
        <div style={{ margin: "5%", border: "1px solid" }}>
            <div id="editor"></div>
        </div>
    );
};

export default Document;


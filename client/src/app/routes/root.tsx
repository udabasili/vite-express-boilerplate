import {useEffect, useState} from "react";

export default function Root() {
    const [serversStatus, setServersStatus] = useState('unknown');

    useEffect(() => {
        const checkServer = async () => {
            try {
                const response = await fetch('/api/status');
                if (response.ok) {
                    setServersStatus('ok');
                }
            } catch (error) {
                console.error(error);
                setServersStatus('error');
            }
        }
        checkServer();
    }, []);

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div id="status">
                    <span>Server Response: </span>
                    <span>{serversStatus === 'unknown' ?
                        'Checking...' : serversStatus}
                    </span>
                </div>
                <div id="spinner" aria-hidden hidden={true}/>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href={`/contacts/1`}>Your Name</a>
                        </li>
                        <li>
                            <a href={`/contacts/2`}>Your Friend</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}

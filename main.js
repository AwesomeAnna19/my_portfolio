import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './main.css';

const WINDOWS_DATA = [
    { id: 'about', title: 'About', icon: 'icons/info.png', content: 'Hi!' },
    { id: 'work', title: 'Work', icon: 'icons/briefcase.png', content: 'Hey!' },
    { id: 'projects', title: 'Projects', icon: 'icons/folder.png', content: 'Hyellow!' },
    { id: 'links', title: 'Links', icon: 'icons/link-alt.png', content: 'Howdy!' },
    { id: 'contact', title: 'Contact', icon: 'icons/paper-plane.png', content: 'Hello!' },
];

export default function App() {
    const [openWindows, setOpenWindows] = useState({});
    const [zIndexLayers, setZIndexLayers] = useState({
        about: 1,
        work: 1,
        projects: 1,
        links: 1,
        contact: 1,
    });

    const [highestZ, setHighestZ] = useState(10);

    const toggleWindow = (id) => {
        setOpenWindows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        bringToFront(id);
    };

    const closeWindow = (id) => {
        setOpenWindows((prev) => ({
            ...prev,
            [id]: false,
        }));
    };

    const bringToFront = (id) => {
        setHighestZ((prev) => {
            const nextZ = prev + 1;
            setZIndexLayers((layers) => ({
                ...layers,
                [id]: nextZ,
            }));
            return nextZ;
        });
    };

    return (
        <div className="window-container">
            {WINDOWS_DATA.map((window) => {
                if (!openWindows[window.id]) return null;

            return (
                <Draggable key={window.id} handle=".window-header" bounds="parent">
                    <div className="window-style" style={{ zIndex: zIndexLayers[window.id] }} onClick={() => bringToFront(window.id)}>
                        <div className="window-header">
                            <span className="window-title">{window.title}</span>
                            <button type="button" className="close-button" onClick={() => closeWindow(window.id)} aria-label={'Close This Window'}>X</button>
                        </div>

                        <div className="window-content">
                            <p>{window.content}</p>
                        </div>
                    </div>
                </Draggable>
            );
        })}

    <nav className="button-nav">
        <ul className="buttons-list">
            {WINDOWS_DATA.map((item) => (
                <li key={item.id}>
                    <button type="button" aria-label={item.title} className={`button ${openWindows[item.id] ? 'active' : ''}`} onClick={() => toggleWindow(item.id)}>
                        <img src={item.icon} alt={item.title} />
                    </button>
                </li>
            ))}
        </ul>
    </nav>
</div>
);
}
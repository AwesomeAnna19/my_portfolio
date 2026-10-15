const { useState } = React;
const Draggable = window.ReactDraggable;

function AboutMeContent() {
    return (
        <div>
            <h3>Who am I?</h3>
            <p>Howdy, I'm Anna Rosé!</p>
            <p>I'm one with a passion for creating user-friendly websites, as well as fun artwork and animations. With that I go by many different titles, such as:</p>
            <ul>
                <li>Frontend Developer</li>
                <li>UI/UX Designer</li>
                <li>2D Artist & Animator</li>
                <li>3D Modeler</li>
                <li>Game Designer</li>
            </ul>

            <h3>Education</h3>
            <p>Bachelor in Medialogy (Graduated AAU 2026)</p>

            <h3>Hobbies</h3>
            <ul>
                <li>Playing video games</li>
                <ul>
                    <li>(especially addicted to Dead By Daylight right now)</li>
                </ul>
                <li>Drawing</li>
                <ul>
                    <li>(mostly <a href="https://www.instagram.com/apb.editz/">digitally</a>)</li>
                </ul>
                <li>Dancing</li>
                <ul>
                    <li>(self-taught freestyle dancer)</li>
                </ul>
                <li>Edit videos</li>
                <ul>
                    <li>(I do have a YouTube channel, but all my videos are hidden muehehe)</li>
                </ul>
                <li>Watching movies, some series and anime</li>
                <li>Lastly, relaxing :P</li>
            </ul>

            <h3>What languages do I speak?</h3>
            <p>I'm native in Danish, and fluent in English and French</p>
        </div>
    );
}

// function WorkContent() {
//     return (
//         <div>
//             <p>A little view of my CV and such.</p>
//         </div>
//     );
// }

function ProjectsContent() {
    return (
        <div>
            <p>Here is a quick review of the different projects I've worked on.</p>
        </div>
    );
}

function LinksContent() {
    return (
        <div>
            <p>Different links to my so-to-say "socials":</p>
            <ul className="links-buttons-list">
                <li>
                    <a href="https://www.instagram.com/apb.editz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <button className="links-button" tabIndex="-1">
                            <img src="icons\instagram.png" alt="instagram"></img>
                        </button>
                    </a>
                    <p className="links-button-text">Instagram</p>
                </li>
                <li>
                    <a href="https://pin.it/1yiZOQ34k" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                        <button className="links-button" tabIndex="-1">
                            <img src="icons\pinterest.png" alt="pinterest"></img>
                        </button>
                    </a>
                    <p className="links-button-text">Pinterest</p>
                </li>
            </ul>

            <ul className="links-buttons-list">
                <li>
                    <a href="https://github.com/AwesomeAnna19" target="_blank" rel="noopener noreferrer" aria-label="Github">
                        <button className="links-button" tabIndex="-1">
                            <img src="icons\github.png" alt="github"></img>
                        </button>
                    </a>
                    <p className="links-button-text">GitHub</p>
                </li>
                <li>
                    <a href="https://discord.com/users/548185153990819840" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                        <button className="links-button" tabIndex="-1">
                            <img src="icons\discord.png" alt="discord"></img>
                        </button>
                    </a>
                    <p className="links-button-text">Discord</p>
                </li>
            </ul>
        </div>
    );
}

function ContactContent() {
    return (
        <div>
            <p>If you want to get in contact with me, work-wise or any other reason, use this email-adress: anbommer@gmail.com</p>
            <p>Please, just note down somewhere in the mail where you found my email-adress, due to it being my personal one O_O</p>
            <p>Else you can press this button below:</p>
            <form className="mail-form-container" method="post" action="mailto:anbommer@gmail.com" value="Mail me something!" >
                <button type="submit" className="mail-form-button">Mail me something!</button>
            </form>
        </div>
    );
}

const WINDOWS_DATA = [
    { id: 'about', title: 'About Me', icon: 'icons/info.png', content: <AboutMeContent /> },
    // { id: 'work', title: 'Work Stuff', icon: 'icons/briefcase.png', content: <WorkContent /> },
    { id: 'projects', title: 'My Projects', icon: 'icons/folder.png', content: <ProjectsContent /> },
    { id: 'links', title: 'Links', icon: 'icons/link-alt.png', content: <LinksContent /> },
    { id: 'contact', title: 'Contact Me!', icon: 'icons/paper-plane.png', content: <ContactContent /> },
];

function App() {
    const [openWindows, setOpenWindows] = useState({});
    const [zIndexLayers, setZIndexLayers] = useState({
        about: 1,
        // work: 1,
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
            <h1>🤠</h1>

            <div class="container">
                <div class="block">
                    <div class="block-title">
                        <h2>Welcome to Anna's Bench of Work!</h2>
                    </div>
                    
                    <p>Howdy! I'm Anna Rosé, and welcome to my bench of work (or should I rather say, my portfolio)!</p>

                <div>
                    <ul class="buttons-list">

                        {WINDOWS_DATA.map((window) => (
                            <li key={window.id}>
                                <button type="button" className={`button ${openWindows[window.id] ? 'active' : ''}`} aria-label={window.title} onClick={() => toggleWindow(window.id)}>
                                    <img src={window.icon} alt={window.title} />
                                </button>
                                <p className="buttons-text">{window.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
            
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
                            {window.content}
                        </div>
                    </div>
                </Draggable>
            );
        })}
    </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
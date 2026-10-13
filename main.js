const { useState } = React;
const Draggable = window.ReactDraggable;

function AboutMeContent() {
    return (
        <div>
            <p>Howdy, I'm Anna Rosé!</p>
            <p>I'm a 22 year old frontend developer, UI/UX designer, 2D artist & animator, 3D modeler, and game designer, who is especially passionate about creating user-friendly websites and fun animations.</p>
            <p>As a new Medialogy graduate, I offer a "Swiss Army Knife" profile with a broad range of skills. 
                I cover everything from programming and code reviewing, designing (UI), 
                conducting user evaluations (UX) and quality assurance (QA), game-development, 
                and 3D-modeling, always with the user in mind. Coupled with a flexible mindset, 
                I pick up new technologies quickly.</p>
        </div>
    );
}

function WorkContent() {
    return (
        <div>
            <p>A little view of my CV and such.</p>
        </div>
    );
}

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
            <p><b>GitHub:</b> <a href="https://github.com/AwesomeAnna19">https://github.com/AwesomeAnna19</a></p>
            <p><b>Instagram (art profile):</b> <a href="https://www.instagram.com/apb.editz/">https://www.instagram.com/apb.editz/</a></p>
        </div>
    );
}

function ContactContent() {
    return (
        <div>
            
        </div>
    );
}

const WINDOWS_DATA = [
    { id: 'about', title: 'A Little About Me', icon: 'icons/info.png', content: <AboutMeContent /> },
    { id: 'work', title: 'Work Stuff', icon: 'icons/briefcase.png', content: <WorkContent /> },
    { id: 'projects', title: 'My Projects', icon: 'icons/folder.png', content: <ProjectsContent /> },
    { id: 'links', title: 'Links', icon: 'icons/link-alt.png', content: <LinksContent /> },
    { id: 'contact', title: 'Contact Me!', icon: 'icons/paper-plane.png', content: <ContactContent /> },
];

function App() {
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
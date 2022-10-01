import { NavLink } from 'react-router-dom';

import { Container } from './components/Container';

export const Header = () => {
    return (
        <header className="w-full h-20 flex font-sans items-center justify-center">
            <Container>
                <div className="flex px-4">
                    <div className="flex-grow flex gap-4 items-center">
                        <img className="h-5 w-5" src="/frontify.svg" alt="Frontify nook logo" />
                        <div className="flex gap-1 items-center justify-center">
                            <span className="text-gray-5/50 hidden md:block">Developer Resources</span>
                            <div className="i-octicon-chevron-right-24 text-gray-5/50 text-xl hidden md:block" />
                            <NavLink to="/" className="whitespace-nowrap">
                                Block Preview
                            </NavLink>
                        </div>
                    </div>

                    <a
                        className="i-octicon-mark-github-16 text-2xl hover:text-gray-7"
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/SamuelAlev/guideline-block-preview"
                    ></a>
                </div>
            </Container>
        </header>
    );
};

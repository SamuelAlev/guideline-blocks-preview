import { Container } from './components/Container';

export const Header = () => {
    return (
        <header className="w-full h-20 flex text-sans items-center justify-center">
            <Container>
                <div className="flex gap-4 items-center">
                    <img className="h-5 w-5" src="/frontify.svg" alt="Frontify nook logo" />
                    <div className="flex gap-1 items-center justify-center">
                        <span className="text-gray-5/50">Developer Resources</span>
                        <div className="i-octicon-chevron-right-24 text-gray-5/50 text-xl" />
                        <span>Block Preview</span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

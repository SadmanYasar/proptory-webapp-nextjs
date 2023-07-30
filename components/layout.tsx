import Footer from './footer';
import Nav from './nav';

type LayoutProps = {
    children: React.ReactNode,
};
export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Nav />
            <main className="grow">{children}</main>
            <Footer />
        </div>
    );
}